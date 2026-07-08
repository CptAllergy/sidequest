import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import logo from "../logo.svg";

export const Route = createFileRoute("/")({
  component: App,
});

// TODO: placeholder type for test
type Quest = {
  id: string;
  userId: string;
  title: string;
  description: string;
};

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
      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-[calc(10px+2vmin)] text-white">
        <img
          src={logo}
          className="pointer-events-none h-[40vmin] animate-[spin_20s_linear_infinite]"
          alt="logo"
        />
        <p>
          Edit <code>src/routes/index.tsx</code> and save to reload.
        </p>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={addQuest}
            className="rounded-md bg-white p-2 text-black hover:cursor-pointer"
          >
            Add Quest
          </button>
        </div>
      </header>
      <div className="flex flex-col">
        <Summary />
        <ActiveQuest />
        <QuestBoardPreview />
        <Link to="/auth/$">Login</Link>
        <div className="h-52"></div>
      </div>
    </div>
  );
}

const Summary = () => {
  return <div>Summary</div>;
};

const ActiveQuest = () => {
  return <div>Active Quest</div>;
};

const QuestBoardPreview = () => {
  const [value, setValue] = useState<Quest[]>();

  const getQuests = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/quests`)
      .then((res) => {
        return res.json();
      })
      .then((data: Quest[]) => {
        setValue(data);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={getQuests}
        className="rounded-md bg-slate-300 p-2 text-black hover:cursor-pointer"
      >
        Get Quests
      </button>
      <h3>Quest Board Preview</h3>
      <div className="flex flex-row gap-2">
        {value?.map((quest) => (
          <QuestCard key={quest.id} quest={quest} />
        ))}
      </div>
    </div>
  );
};

const QuestCard = ({ quest }: { quest: Quest }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-slate-700 p-2">
      <img
        src={logo}
        className="pointer-events-none h-32 bg-white"
        alt="logo"
      />
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
