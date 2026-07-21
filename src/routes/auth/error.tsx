import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/error")({
  component: Callback,
});

// TODO pretty up
function Callback() {
  return <>ERROR</>;
}
