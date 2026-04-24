import { api } from "@/lib/api";

export const getPublicKey = async () => {
  const res = await api.get("/auth/public-key");
  return res.data;
};