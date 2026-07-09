import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
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

  recipeList: [EmailPassword.init(), Session.init()],
  getRedirectionURL: async (context: any) => {
    if (context.action === "SUCCESS") {
      return "/dashboard";
    }
    return undefined;
  },
};

export const recipeDetails = {
  docsLink: "https://supertokens.com/docs/quickstart/introduction",
};

export const PreBuiltUIList = [EmailPasswordPreBuiltUI];

export const ComponentWrapper = (props: {
  children: JSX.Element;
}): JSX.Element => {
  return props.children;
};
