import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import { withAuthenticationRequired } from "@zitadel/react-auth";

import { useAccount } from "@/hooks/use-account.ts";

export const Route = createFileRoute("/_app/_authenticated")({
  component: withAuthenticationRequired(RouteComponent),
});

/**
 * All routes under _authenticated are protected and require a full account
 */
function RouteComponent() {
  const { account, isPending } = useAccount();

  // TODO do some loading animation
  if (isPending || !account) {
    return <div>Loading</div>;
  }

  if (!account.isSuccess) {
    return <Navigate to={"/auth/error"} replace={true} />;
  }

  if (!account.isAccountComplete) {
    return <Navigate to={"/auth/account"} replace={true} />;
  }

  return <Outlet />;
}
