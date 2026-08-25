// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { QuestDto } from "@/lib/types/dto.ts";
import { getQuest } from "@/services/quest-service.ts";

export const useGetQuest = (questId: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const { data: quest, isPending } = useQuery<QuestDto, Error>({
    queryKey: ["quest", questId],
    queryFn: async () => {
      return await getQuest(token!, questId);
    },
    enabled: !!token && !!questId,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    quest,
    isPending,
  };
};
