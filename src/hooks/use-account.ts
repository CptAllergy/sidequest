import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { Account } from "@/lib/types/account.ts";
import { getAccount } from "@/services/user-service.ts";

export const useAccount = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const { data: account, isPending } = useQuery<Account, Error>({
    queryKey: ["account", token],
    queryFn: async () => {
      return await getAccount(token!);
    },
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    account: account,
    isPending: isPending || auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
  };
};
