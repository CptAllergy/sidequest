import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import { withAuthenticationRequired } from "@zitadel/react-auth";

import useAccount from "@/hooks/users/use-account.ts";

export const Route = createFileRoute("/_app/_authenticated")({
  component: withAuthenticationRequired(RouteComponent),
});

/**
 * All routes under _authenticated are protected and require a full account
 */
function RouteComponent() {
  const { data: account, isPending, isError } = useAccount();

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

  return <Outlet />;
}
