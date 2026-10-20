// TODO think about a better way to handle authorization across requests
import { useAuth } from "@zitadel/react-auth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAccountQuests } from "@/services/quest-service.ts";

// TODO must handle error states for ALL hooks, remember to go to all and handle isError
export const useAccountQuests = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;
  const userId = auth.user?.profile.sub;

  return useInfiniteQuery({
    queryKey: ["quests", userId],
    queryFn: ({ pageParam }) => {
      if (!token) {
        throw new Error("Missing access token");
      }
      return getAccountQuests(token, pageParam);
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: !!token,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
