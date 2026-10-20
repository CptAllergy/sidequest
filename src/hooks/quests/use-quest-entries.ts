// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getQuestEntries } from "@/services/quest-service.ts";

// TODO query keys should be consts
export const useQuestEntries = (questId: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  return useInfiniteQuery({
    queryKey: ["quests", questId, "entries"],
    queryFn: ({ pageParam }) => {
      if (!token) {
        throw new Error("Missing access token");
      }
      return getQuestEntries(token, questId, pageParam);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
