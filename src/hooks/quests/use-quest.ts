// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import { getQuest } from "@/services/quest-service.ts";

export const useQuest = (questId: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  return useQuery({
    queryKey: ["quest", questId],
    queryFn: () => {
      return getQuest(token!, questId);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
