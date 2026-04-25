import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { decodeUsers, initProto } from "./decode";
import { getPublicKey } from "../auth/apicall";
import { verifySignature } from "./verify";

export const useVerifiedUsers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["verified-users", page, limit],
    queryFn: async () => {
      await initProto();

      const res = await api.get("/user/export", {
        params: { page, limit },
        responseType: "arraybuffer",
      });

      const decoded = decodeUsers(res.data);

      const total = Number(res.headers["x-total"]);
      const totalPages = Number(res.headers["x-total-pages"]);

      const publicKey = await getPublicKey();

      const verifiedUsers = await Promise.all(
        decoded.users.map(async (user: any) => {
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

      return {
        users: verifiedUsers,
        meta: {
          total,
          totalPages,
          page,
          limit,
        },
      };
    },
    placeholderData: (previousData) => previousData,
  });
};