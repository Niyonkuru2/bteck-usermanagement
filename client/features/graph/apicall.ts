import { api } from "@/lib/api";

export const getGraph = async () => {
  const res = await api.get("/user/graph");
  return res.data;
};