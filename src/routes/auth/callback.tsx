import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useProfile } from "@/lib/hooks.ts";

export const Route = createFileRoute("/auth/callback")({
  component: Callback,
});

function Callback() {
  const { profile, isPending, isAuthenticated } = useProfile();

  console.log(
    "-------->",
    "isPending:",
    isPending,
    "isAuthenticated:",
    isAuthenticated,
  );

  if (!isAuthenticated) {
    return <Navigate to={"/"} replace={true} />;
  }

  if (isPending || !profile) {
    return <div>Loading</div>;
  }

  if (!profile.isSuccess) {
    return <Navigate to={"/auth/account"} replace={true} />;
  }

  if (!profile.isAccountComplete) {
    return <Navigate to={"/auth/account"} replace={true} />;
  }

  // Complete account
  return <Navigate to={"/dashboard"} replace={true} />;
}
