import { Navigate, createFileRoute } from "@tanstack/react-router";

import useAccount from "@/hooks/users/use-account.ts";

export const Route = createFileRoute("/auth/callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: account, isPending, isError, isAuthenticated } = useAccount();

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace={true} />;
  }

  // TODO loading animation or skeleton
  if (isPending) {
    return <div>Loading...</div>;
  }

  // TODO add not found or error page??
  if (isError) {
    return <div>Error UI</div>;
  }

  if (!account.isSuccess) {
    return <Navigate to={"/auth/error"} replace={true} />;
  }

  if (!account.isAccountComplete) {
    return <Navigate to={"/auth/account"} replace={true} />;
  }

  // User has an account
  return <Navigate to={"/quests"} replace={true} />;
}
