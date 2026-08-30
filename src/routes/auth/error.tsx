import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/error")({
  component: RouteComponent,
});

// TODO pretty up
function RouteComponent() {
  return <>ERROR</>;
}
