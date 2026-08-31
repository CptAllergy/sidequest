import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar.tsx";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import AppHeader from "@/components/app-header.tsx";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
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
    </SidebarProvider>
  );
}
