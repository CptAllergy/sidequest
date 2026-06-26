import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  signOut,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const sessionContext = useSessionContext();
  const navigate = useNavigate({ from: "/dashboard" });

  if (!sessionContext.loading) {
    sessionContext.userId;
  }
  async function logoutClicked() {
    await signOut();
    navigate({ to: "/" });
  }
  return (
    <div className="p-4 text-center">
      <h1>This is the dashboard.</h1>
      <div>
        <div>Your userID is:</div>
        <div className="truncate" id="user-id">
          {!sessionContext.loading ? sessionContext.userId : ""}
        </div>
        <button onClick={logoutClicked} className="dashboard-button">
          Logout
        </button>
      </div>
    </div>
  );
}
