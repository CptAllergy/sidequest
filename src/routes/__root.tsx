import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import AppHeader from "@/components/app-header.tsx";

export const Route = createRootRoute({
  component: () => (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset id="root-content">
        {/* <SidebarTrigger />*/}
        <AppHeader />
        <Outlet />
      </SidebarInset>

      {/* Portal root for overlays */}
      <div id="portal-root"></div>

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
    </SidebarProvider>
  ),
});
