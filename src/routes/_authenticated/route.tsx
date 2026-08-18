import { Navigate, Outlet, createFileRoute } from "@tanstack/react-router";
import { withAuthenticationRequired } from "@zitadel/react-auth";
import { useAccount } from "@/lib/hooks.ts";

export const Route = createFileRoute("/_authenticated")({
  component: withAuthenticationRequired(ProtectedRoute),
});

/**
 * All routes under _app are protected and require authentication
 */
function ProtectedRoute() {
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
