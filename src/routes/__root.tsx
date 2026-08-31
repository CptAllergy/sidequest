import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />

      {/* Portal root for overlays */}
      <div id="portal-root"></div>

      <Toaster />
      <TanStackDevtools
        config={{
          position: "bottom-right",
          triggerHidden: true,
        }}
        plugins={[
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
