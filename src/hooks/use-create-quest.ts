// TODO review this code and replace with quest
import { useAuth } from "@zitadel/react-auth";
import { useMutation } from "@tanstack/react-query";
import type { CreateQuestDto } from "@/lib/types/dto.ts";
import { createQuest } from "@/services/quest-service.ts";

export const useCreateQuest = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (createQuestDto: CreateQuestDto) => {
      if (!token) {
        // TODO handle
        throw new Error("Unauthorized without token");
      }
      return await createQuest(token, createQuestDto);
    },
    onSuccess: () => {
      // void queryClient.invalidateQueries({ queryKey: [""] });
    },
  });
  return mutation;
};
