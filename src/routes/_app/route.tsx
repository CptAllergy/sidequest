import { Outlet, createFileRoute } from "@tanstack/react-router";
import { withAuthenticationRequired } from "@zitadel/react-auth";

export const Route = createFileRoute("/_app")({
  component: withAuthenticationRequired(ProtectedRoute),
});

/**
 * All routes under _app are protected and require authentication
 */
function ProtectedRoute() {
  return <Outlet />;
}
