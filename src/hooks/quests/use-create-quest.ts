// TODO review this code and replace with quest
import { useAuth } from "@zitadel/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestRequest } from "@/lib/types/api/dto.ts";
import { createQuest } from "@/services/quest-service.ts";

export const useCreateQuest = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createQuestDto: CreateQuestRequest) => {
      if (!token) {
        throw new Error("Missing access token");
      }
      return createQuest(token, createQuestDto);
    },
    onSuccess: (quest) => {
      // TODO can probably optimize this so a full refetch isn't done for all the quests, could also use some optimistic cache updates
      void queryClient.invalidateQueries({
        queryKey: ["quests", quest.userId],
      });
    },
  });
};
