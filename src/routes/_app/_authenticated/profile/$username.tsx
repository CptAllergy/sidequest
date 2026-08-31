import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@zitadel/react-auth";
import { useGetProfile } from "@/hooks/use-get-profile.ts";

// TODO consider using loaders for this
export const Route = createFileRoute("/_app/_authenticated/profile/$username")({
  component: RouteComponent,
});

function RouteComponent() {
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
