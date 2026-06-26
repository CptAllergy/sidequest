import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { SuperTokensWrapper } from "supertokens-auth-react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/header.tsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <SuperTokensWrapper>
        <Header />
        <Outlet />
        <ReactQueryDevtools buttonPosition="top-right" />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </SuperTokensWrapper>
    </>
  ),
});
