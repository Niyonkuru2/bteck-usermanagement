import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { decodeUsers, initProto } from "./decode";
import { getPublicKey } from "../auth/apicall";
import { verifySignature } from "./verify";

export const useVerifiedUsers = () => {
  return useQuery({
    queryKey: ["verified-users"],
    queryFn: async () => {
      // 1. Ensure proto loaded
      await initProto();

      // 2. Fetch protobuf
      const res = await api.get("/user/export", {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/x-protobuf",
          "Cache-Control": "no-cache",
        },
      });

      const decoded = decodeUsers(res.data);

      // 3. Get public key
      const publicKey = await getPublicKey();

      // 4. Verify users
      const verifiedUsers = await Promise.all(
        decoded.users.map(async (user: any) => {
          // skip users without crypto (Google users)
          if (!user.emailHash || !user.signature) {
            return { ...user, isValid: false };
          }

          const isValid = await verifySignature(
            publicKey,
            user.emailHash,
            user.signature
          );

          return { ...user, isValid };
        })
      );

      return verifiedUsers;
    },
  });
};