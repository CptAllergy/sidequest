import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { UserDto } from "@/lib/types.ts";

// TODO move to types.ts
export type Account = {
  /**
   * Whether the user has successfully completed the authentication flow. If false, the user should be redirected to the login page.
   */
  isSuccess: boolean;
  /**
   * Whether the user has completed their account. If false, the user should be redirected to the account completion flow.
   */
  isAccountComplete?: boolean;
  /**
   * The user object returned from the API.
   */
  user?: UserDto;
};

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

const getAccount = async (accessToken: string): Promise<Account> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (!res.ok && res.status !== 404) {
    return { isSuccess: false };
  }

  if (res.status === 404) {
    return { isSuccess: true, isAccountComplete: false };
  }

  const user = (await res.json()) as UserDto;
  return { isSuccess: true, isAccountComplete: true, user };
};
