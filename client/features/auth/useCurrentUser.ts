import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/auth/me");

        if (!data) return null;

        return {
          id: data.userId,
          email: data.email,
          role: data.role,
          name: data.email?.split("@")[0],
          picture: null,
        };
      } catch (error: any) {
        if (error.response?.status === 401) return null;
        throw error;
      }
    },
  });
}