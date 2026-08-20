import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@zitadel/react-auth";
import type { QuestDto } from "@/lib/types.ts";
import { useAccount } from "@/lib/hooks.ts";
import SignOutButton from "@/components/sign-out-button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

// TODO add tanstack default error component to absorb errors, it should do something similar to ErrorBoundary => setup errorComponent in RootRoute
// TODO make sure routes are properly protected with full user
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  // TODO: placeholder test code

  const addQuest = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/quests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Quest" + Math.random(),
        description: "This is a new quest.",
      }),
    });
  };

  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center">
        <Summary />
        <ActiveQuest />
        <QuestBoardPreview />
        <Login />
        <SignOutButton />
        <div className="h-52"></div>
      </div>
    </div>
  );
}

const Login = () => {
  const auth = useAuth();

  const login = async () => {
    await auth.signinRedirect();
  };

  return <button onClick={login}>Login</button>;
};

const Summary = () => {
  const { account, isPending } = useAccount();

  if (isPending || !account) {
    return <div>Loading</div>;
  }

  return (
    <section className="grid grid-cols-4 gap-3">
      <SummaryCard title={"Total Quests"} amount={122} />
      <SummaryCard title={"Completed"} amount={88} />
      <SummaryCard title={"XP Gained"} amount={43} />
      <SummaryCard title={"Daily Streak"} amount={16} />
    </section>
  );
};

const SummaryCard = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <Card className="px-20">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{amount}</p>
      </CardContent>
    </Card>
  );
};

const ActiveQuest = () => {
  return <Card>Active Quest</Card>;
};

const QuestBoardPreview = () => {
  return <div className="flex flex-col items-center justify-center">Prev</div>;
};

const QuestCard = ({ quest }: { quest: QuestDto }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-slate-700 p-2">
      {/* <img*/}
      {/*  src={logo}*/}
      {/*  className="pointer-events-none h-32 bg-white"*/}
      {/*  alt="logo"*/}
      {/* />*/}
      <div className="flex flex-col items-start">
        <h4 className="text-lg text-white">{quest.title}</h4>
        <span className="text-orange-200">{quest.description}</span>
        <div className="mt-5 flex w-full justify-between text-orange-200">
          <span>Last entry</span>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};
