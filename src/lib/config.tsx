import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
import Session from "supertokens-auth-react/recipe/session";
import type { JSX } from "react";

// TODO check here what needs to be cleaned up
export const SuperTokensConfig = {
  appInfo: {
    appName: "Sidequest",
    apiDomain: import.meta.env.VITE_API_URL,
    websiteDomain: import.meta.env.VITE_WEBSITE_URL,
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },

  recipeList: [
    EmailPassword.init(),
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    Session.init(),
  ],
  getRedirectionURL: async (context: any) => {
    if (context.action === "SUCCESS") {
      return "/dashboard";
    }
    return undefined;
  },
};

export const PreBuiltUIList = [EmailPasswordPreBuiltUI];

export const ComponentWrapper = (props: {
  children: JSX.Element;
}): JSX.Element => {
  return props.children;
};
