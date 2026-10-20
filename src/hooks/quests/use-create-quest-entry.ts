// TODO review this code and replace with quest
import { useAuth } from "@zitadel/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestEntryRequest } from "@/lib/types/api/dto.ts";
import { createQuestEntry } from "@/services/quest-service.ts";

export const useCreateQuestEntry = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      createQuestEntryDto,
      questId,
    }: {
      createQuestEntryDto: CreateQuestEntryRequest;
      questId: string;
    }) => {
      if (!token) {
        throw new Error("Missing access token");
      }
      return createQuestEntry(token, createQuestEntryDto, questId);
    },
    onSuccess: (questEntry) => {
      // TODO can probably optimize this so a full refetch isn't done for all the quests, could also use some optimistic cache updates
      void queryClient.invalidateQueries({
        queryKey: ["quests", questEntry.questId, "entries"],
      });
    },
  });
};
