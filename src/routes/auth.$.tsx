import { createFileRoute } from "@tanstack/react-router";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import { canHandleRoute, getRoutingComponent } from "supertokens-auth-react/ui";

export const Route = createFileRoute("/auth/$")({
  component: AuthCatchAll,
});

function AuthCatchAll() {
  if (canHandleRoute([ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI])) {
    return (
      <div className="flex h-screen items-center justify-center">
        {getRoutingComponent([ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI])}
      </div>
    );
  }

  // TODO render some default/generic not found page
  return (
    <div className="p-4 text-center">
      Authentication Route Error: Page Not Found
    </div>
  );
}
