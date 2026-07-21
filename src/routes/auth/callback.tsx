import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/callback")({
  component: Callback,
});

function Callback() {
  return <>Signing you in…</>;
}
