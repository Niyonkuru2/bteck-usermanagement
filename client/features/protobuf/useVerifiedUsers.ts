import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { decodeUsers } from "./decode";
import { getPublicKey } from "../auth/apicall";
import { verifySignature } from "./verify";

export const useVerifiedUsers = () => {
  return useQuery({
    queryKey: ["verified-users"],
    queryFn: async () => {
      // 1. Fetch protobuf users
      const res = await api.get("/user/export", {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/x-protobuf",
        },
      });

      const users = decodeUsers(res.data);

      // 2. Fetch public key
      const publicKey = await getPublicKey();

      // 3. Verify each user
      const verifiedUsers = await Promise.all(
        users.users.map(async (user: any) => {
          const isValid = await verifySignature(
            publicKey,
            user.emailHash,
            user.signature
          );

          return {
            ...user,
            isValid,
          };
        })
      );

      return verifiedUsers;
    },
  });
};