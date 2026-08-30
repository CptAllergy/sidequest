import { Navigate, createFileRoute } from "@tanstack/react-router";

import { useAccount } from "@/hooks/use-account.ts";

export const Route = createFileRoute("/auth/callback")({
  component: RouteComponent,
});

function RouteComponent() {
  const { account, isPending, isAuthenticated } = useAccount();

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace={true} />;
  }

  if (isPending || !account) {
    return <div>Loading</div>;
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
