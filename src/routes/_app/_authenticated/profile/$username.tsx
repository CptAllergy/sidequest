import { createFileRoute } from "@tanstack/react-router";
import { useProfile } from "@/hooks/users/use-profile.ts";

// TODO consider using loaders for this
export const Route = createFileRoute("/_app/_authenticated/profile/$username")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = Route.useParams();
  const { data: profile, isPending, isError } = useProfile(username);

  // TODO loading animation or skeleton
  if (isPending) {
    return <div>Loading...</div>;
  }

  // TODO add not found or error page??
  if (isError) {
    return <div>Error UI</div>;
  }

  return (
    <div>
      <div>
        <span>User ID:</span>
        <span>{profile.id}</span>
      </div>
      <div>
        <span>Username:</span>
        <span>{profile.username}</span>
      </div>
    </div>
  );
}
