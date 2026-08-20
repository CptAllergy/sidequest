import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { UserDto } from "@/lib/types.ts";

// TODO consider using loaders for this
export const Route = createFileRoute("/_authenticated/profile/$username")({
  component: ProfileRoute,
});

// TODO check convention for naming the main component in routes
function ProfileRoute() {
  const auth = useAuth();
  const { username } = Route.useParams();
  const { user } = useGetProfile(username);

  if (auth.isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="flex-1 px-6 py-12">
          <div className="flex min-h-screen items-center justify-center">
            <p>Loading your session…</p>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div>
        <span>User ID:</span>
        <span>{user.id}</span>
      </div>
      <div>
        <span>Username:</span>
        <span>{user.username}</span>
      </div>
    </div>
  );
}

// TODO think about a better way to handle authorization across requests
export const useGetProfile = (username: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const { data, isPending } = useQuery<UserDto, Error>({
    queryKey: ["userProfile", username],
    queryFn: async () => {
      return await getUser(token!, username);
    },
    enabled: !!token && !!username,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    user: data,
    isPending,
  };
};

const getUser = async (
  accessToken: string,
  username: string,
): Promise<UserDto> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/${username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  // TODO check a better setup for these requests
  if (!res.ok) {
    throw new Error("Unable to get user");
  }

  return (await res.json()) as UserDto;
};
