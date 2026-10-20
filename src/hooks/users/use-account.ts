import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { Account } from "@/lib/types/account.ts";
import { getAccount } from "@/services/user-service.ts";

const useAccount = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const accountQuery = useQuery<Account, Error>({
    queryKey: ["account", token],
    queryFn: () => {
      if (!token) {
        throw new Error("Missing access token");
      }
      return getAccount(token);
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return { ...accountQuery, isAuthenticated: auth.isAuthenticated };
};
export default useAccount;
