import { api } from "@/lib/api";

export const getUsers = async () => {
  const res = await api.get("/user");
  return res.data;
};

export const createUser = async (data: any) => {
  const res = await api.post("/user", data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await api.delete(`/user/${id}`);
  return res.data;
};

export const updateUser = async ({id,data,}: {
  id: string;
  data: any;
}) => {
  const res = await api.put(`/user/${id}`, data);
  return res.data;
};