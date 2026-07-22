import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@zitadel/react-auth";
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import type { AuthProviderProps } from "@zitadel/react-auth";
import { ZITADEL_SCOPES } from "@/lib/scopes.ts";
import { NotFound } from "@/components/not-found.tsx";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: NotFound,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const cfg: AuthProviderProps = {
  authority: import.meta.env.VITE_ZITADEL_DOMAIN,
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_ZITADEL_CALLBACK_URL,
  post_logout_redirect_uri: import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL,
  scope: ZITADEL_SCOPES,
  loadUserInfo: true,
  onSigninCallback: () => {
    window.history.replaceState(
      {},
      document.title,
      window.location.origin + "/",
    );
    window.location.assign(
      import.meta.env.VITE_ZITADEL_POST_LOGIN_URL || "/dashboard",
    );
  },
};

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider {...cfg}>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
