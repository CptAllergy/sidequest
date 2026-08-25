// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { QuestEntryDto } from "@/lib/types/dto.ts";
import { getQuestEntries } from "@/services/quest-service.ts";

export const useGetQuestEntries = (questId: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const { data: questEntries, isPending } = useQuery<QuestEntryDto[], Error>({
    queryKey: ["questEntries", questId],
    queryFn: async () => {
      return await getQuestEntries(token!, questId);
    },
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    questEntries,
    isPending,
  };
};
