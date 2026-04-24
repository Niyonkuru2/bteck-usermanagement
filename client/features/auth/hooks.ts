import { useEffect, useState } from "react";

export const useAuth = () => {
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const token = document.cookie.includes("token");

    if (token) setStatus("authenticated");
    else setStatus("unauthenticated");
  }, []);

  return status;
};