// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { UserDto } from "@/lib/types/dto.ts";
import { getUser } from "@/services/user-service.ts";

export const useGetProfile = (username: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const { data, isPending } = useQuery<UserDto, Error>({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      return await getUser(token!, username);
    },
    enabled: !!token && !!username,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    user: data,
    isPending,
  };
};
