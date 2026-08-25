// TODO review this code
import { useAuth } from "@zitadel/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserDto } from "@/lib/types/dto.ts";
import { createAccount } from "@/services/user-service.ts";

export const useCreateAccount = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (createUserDto: CreateUserDto) => {
      if (!token) {
        // TODO handle
        throw new Error("Unauthorized without token");
      }
      return await createAccount(token, createUserDto);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
  return mutation;
};
