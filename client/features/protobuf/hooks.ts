import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { decodeUsers } from "./decode";

export const useProtobufUsers = () => {
  return useQuery({
    queryKey: ["protobuf-users"],
    queryFn: async () => {
      const res = await api.get("/user/export", {
        responseType: "arraybuffer",
        headers: {
          Accept: "application/x-protobuf",
        },
      });

      return decodeUsers(res.data);
    },
  });
};