"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data;
    },
    retry: false,
  });
};