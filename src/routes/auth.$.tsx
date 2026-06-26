import { createFileRoute } from "@tanstack/react-router";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";

export const Route = createFileRoute("/auth/$")({
  component: AuthCatchAll,
});

function AuthCatchAll() {
  if (canHandleRoute([EmailPasswordPreBuiltUI])) {
    return getRoutingComponent([EmailPasswordPreBuiltUI]);
  }

  // TODO render some default/generic not found page
  return (
    <div className="p-4 text-center">
      Authentication Route Error: Page Not Found
    </div>
  );
}
