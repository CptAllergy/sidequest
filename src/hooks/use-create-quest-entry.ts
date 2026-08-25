// TODO review this code and replace with quest
import { useAuth } from "@zitadel/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestEntryDto } from "@/lib/types/dto.ts";
import { createQuestEntry } from "@/services/quest-service.ts";

export const useCreateQuestEntry = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      createQuestEntryDto,
      questId,
    }: {
      createQuestEntryDto: CreateQuestEntryDto;
      questId: string;
    }) => {
      if (!token) {
        // TODO handle
        throw new Error("Unauthorized without token");
      }
      return await createQuestEntry(token, createQuestEntryDto, questId);
    },
    onSuccess: (questEntry) => {
      // TODO can probably optimize this so a full refetch isn't done for all the quests, could also use some optimistic cache updates
      void queryClient.invalidateQueries({
        queryKey: ["questEntries", questEntry.quest_id],
      });
    },
  });
  return mutation;
};
