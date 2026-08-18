import { Navigate, createFileRoute } from "@tanstack/react-router";
import { useAccount } from "@/lib/hooks.ts";

export const Route = createFileRoute("/auth/callback")({
  component: Callback,
});

function Callback() {
  const { account, isPending, isAuthenticated } = useAccount();

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

  if (isPending || !account) {
    return <div>Loading</div>;
  }

  if (!account.isSuccess) {
    return <Navigate to={"/auth/error"} replace={true} />;
  }

  if (!account.isAccountComplete) {
    return <Navigate to={"/auth/account"} replace={true} />;
  }

  // User has an account
  return <Navigate to={"/dashboard"} replace={true} />;
}
