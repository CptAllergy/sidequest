import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@zitadel/react-auth";
import SignOutButton from "@/components/sign-out-button.tsx";

export const Route = createFileRoute("/_app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="flex-1 px-6 py-12">
          <div className="flex min-h-screen items-center justify-center">
            <p>Loading your session…</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <h1>This is the dashboard.</h1>
      <SignOutButton />
      <div>
        <div>Your userID is:</div>
        <div className="rounded-lg border border-gray-200 bg-white p-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-900">
            Session Information
          </h2>
          <p className="mb-6 text-gray-600">
            Below is the authentication data stored in your session after a
            successful PKCE flow:
          </p>
          <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
            <pre className="font-mono text-sm leading-relaxed text-green-400">
              {JSON.stringify(auth.user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
