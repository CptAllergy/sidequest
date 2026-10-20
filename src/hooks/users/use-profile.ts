// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/user-service.ts";

export const useProfile = (username: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  return useQuery({
    // TODO ALL KEYS SHOULD BE EXPORTED CONSTANTS
    queryKey: ["userProfile", username],
    queryFn: () => {
      if (!token) {
        throw new Error("Missing access token");
      }
      return getUser(token, username);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
