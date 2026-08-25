// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { QuestDto } from "@/lib/types/dto.ts";
import { getAccountQuests } from "@/services/quest-service.ts";

export const useGetAccountQuests = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;
  const userId = auth.user?.profile.sub;

  const { data: quests, isPending } = useQuery<QuestDto[], Error>({
    queryKey: ["quests", userId],
    queryFn: async () => {
      return await getAccountQuests(token!);
    },
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    quests,
    isPending,
  };
};
