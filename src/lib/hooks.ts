import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";

// TODO move to types
export type Profile = {
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

export type UserDto = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
};

export const useProfile = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const { data: profile, isPending } = useQuery<Profile, Error>({
    queryKey: ["profile", token],
    queryFn: async () => {
      return await getProfile(token!);
    },
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    profile,
    isPending: isPending || auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
  };
};

const getProfile = async (accessToken: string): Promise<Profile> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/profile`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  if (!res.ok && res.status !== 404) {
    return { isSuccess: false };
  }

  if (res.status === 404) {
    return { isSuccess: true, isAccountComplete: false };
  }

  const user = (await res.json()) as UserDto;
  return { isSuccess: true, isAccountComplete: true, user };
};
