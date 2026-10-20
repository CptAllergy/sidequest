// TODO review this code
import { useAuth } from "@zitadel/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateUserRequest } from "@/lib/types/api/dto.ts";
import { createAccount } from "@/services/user-service.ts";

export const useCreateAccount = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createUserDto: CreateUserRequest) => {
      if (!token) {
        throw new Error("Missing access token");
      }
      return createAccount(token, createUserDto);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["account"] });
    },
  });
};
