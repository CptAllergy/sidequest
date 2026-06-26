import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

export const Route = createFileRoute("/_app")({
  component: AuthenticatedLayout,
});

/**
 * All routes under _app are protected and require authentication
 */
function AuthenticatedLayout() {
  return (
    <SessionAuth>
      <Outlet />
    </SessionAuth>
  );
}
