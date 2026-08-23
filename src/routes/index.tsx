import { createFileRoute } from "@tanstack/react-router";
import {
  BookCheckIcon,
  ClapperboardIcon,
  Gamepad2Icon,
  MinusIcon,
  ShieldAlertIcon,
  StarIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  TvIcon,
} from "lucide-react";
import type { QuestDto } from "@/lib/types.ts";
import { useAccount } from "@/lib/hooks.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils.ts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { ActiveQuest } from "@/components/home/active-quest.tsx";

// TODO add tanstack default error component to absorb errors, it should do something similar to ErrorBoundary => setup errorComponent in RootRoute
// TODO make sure routes are properly protected with full user
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="text-center">
      <div className="flex flex-col items-center justify-center">
        <StatsSection />
        <ActiveQuestSection />
        <QuestBoardPreviewSection />
        <ArchivedQuestsSection />
        <div className="h-52"></div>
      </div>
    </div>
  );
}

const StatsSection = () => {
  const { account, isPending } = useAccount();

  if (isPending || !account) {
    return <div>Loading</div>;
  }

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:px-8">
        <StatCard {...statisticsData[0]} />
        <StatCard {...statisticsData[1]} />
        <StatCard {...statisticsData[2]} />
        <StatCard {...statisticsData[3]} />
      </div>
    </section>
  );
};

const statisticsData: StatisticsCardProps[] = [
  {
    title: "Games Finished",
    value: "34",
    status: "within",
    range: "Down",
    icon: <Gamepad2Icon />,
  },
  {
    title: "Books Read",
    value: "12",
    status: "exceed",
    range: "Up",
    icon: <BookCheckIcon />,
  },
  {
    title: "Movies Watched",
    value: "67",
    status: "observe",
    range: "Down",
    icon: <ClapperboardIcon />,
  },
  {
    title: "Shows Completed",
    value: "28",
    status: "unknown",
    range: "Up",
    icon: <TvIcon />,
  },
];

export type StatisticsCardProps = {
  value: string;
  title: string;
  status: "within" | "observe" | "exceed" | "unknown";
  className?: string;
  range: string;
  icon?: React.ReactNode;
};

const statusConfig = {
  within: {
    color:
      "bg-green-600/10 dark:bg-green-400/10 text-green-600 dark:text-green-400",
    icon: <TrendingUpIcon />,
    label: "On Track",
  },
  observe: {
    color:
      "bg-amber-600/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400",
    icon: <MinusIcon />,
    label: "Stable",
  },
  exceed: {
    color: "bg-destructive/10 text-destructive",
    icon: <TrendingDownIcon />,
    label: "At Risk",
  },
  unknown: {
    color: "bg-sky-600/10 dark:bg-sky-400/10 text-sky-600 dark:text-sky-400",
    icon: <ShieldAlertIcon />,
    label: "Under Review",
  },
};

const StatCard = ({
  value,
  title,
  status,
  className,
  range,
  icon,
}: StatisticsCardProps) => {
  return (
    <Card className={cn("flex flex-col gap-3", className)}>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        {icon && (
          <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-sm [&>svg]:size-4.5">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
        <Badge
          className={cn(
            statusConfig[status].color,
            "gap-1.5 [&>svg]:size-3.5!",
          )}
        >
          {statusConfig[status].icon}
          <span>{statusConfig[status].label}:</span>
          <span>{range}</span>
        </Badge>
      </CardContent>
    </Card>
  );
};

const ActiveQuestSection = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <h3 className="flex items-center gap-2 text-2xl">
          <StarIcon />
          <span>Current Quest</span>
        </h3>
        <ActiveQuest />
      </div>
    </section>
  );
};

const QuestBoardPreviewSection = () => {
  const quests: QuestDto[] = [
    {
      id: "1",
      title: "Quest 1",
      description: "Description for Quest 1",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/elden_ring.png",
    },
    {
      id: "2",
      title: "Quest 2",
      description: "Description for Quest 2",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/elden_ring.png",
    },
    {
      id: "3",
      title: "Quest 3",
      description: "Description for Quest 3",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/player_piano.png",
    },
    {
      id: "4",
      title: "Quest 4",
      description: "Description for Quest 4",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/player_piano.png",
    },
  ];

  return (
    <section className="my-10">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <h3 className="flex items-center justify-between gap-2 text-2xl">
          <span className="flex items-center gap-2 text-2xl">
            <StarIcon />
            <span>Quest Board</span>
          </span>
          <Tabs defaultValue="all" className="">
            <TabsList variant="default">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
            </TabsList>
            {/* <TabsContent value="account">*/}
            {/*  Make changes to your account here.*/}
            {/* </TabsContent>*/}
            {/* <TabsContent value="password">*/}
            {/*  Change your password here.*/}
            {/* </TabsContent>*/}
          </Tabs>
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  );
};

const QuestCard = ({ quest }: { quest: QuestDto }) => {
  return (
    <Card className="gap-2 overflow-hidden pt-0">
      <div className="relative">
        <img
          src={quest.image_url}
          alt="Archived Quest"
          className="aspect-2/3 w-full object-cover object-center"
        />
        <div className="absolute top-0 right-0 z-10 p-3">
          <Badge className=" " variant="secondary">
            4 Oct 2025
          </Badge>
        </div>
      </div>

      <CardContent>
        <p className="truncate">{quest.title}</p>
        <div className="mt-2 flex items-center gap-0.5">
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} />
        </div>
      </CardContent>
    </Card>
  );
};

// TODO I do like the idea of having an archived quests section to check things that have been completed already
const ArchivedQuestsSection = () => {
  const quests: QuestDto[] = [
    {
      id: "1",
      title: "Quest 1",
      description: "Description for Quest 1",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/elden_ring.png",
    },
    {
      id: "2",
      title: "Quest 2",
      description: "Description for Quest 2",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/elden_ring.png",
    },
    {
      id: "3",
      title: "Quest 3",
      description: "Description for Quest 3",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/player_piano.png",
    },
    {
      id: "4",
      title: "Quest 4",
      description: "Description for Quest 4",
      status: "completed",
      type: "main",
      user_id: "user123",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-02T00:00:00Z",
      image_url: "/player_piano.png",
    },
  ];

  return (
    <section className="">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <h3 className="flex items-center gap-2 text-2xl">
          <StarIcon />
          <span>Archived Quests</span>
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {quests.map((quest) => (
            <ArchivedQuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ArchivedQuestCard = ({ quest }: { quest: QuestDto }) => {
  return (
    <Card className="gap-2 overflow-hidden pt-0">
      <div className="relative">
        <img
          src={quest.image_url}
          alt="Archived Quest"
          className="aspect-2/3 w-full object-cover object-center"
        />
        <div className="absolute top-0 right-0 z-10 p-3">
          <Badge className=" " variant="secondary">
            4 Oct 2025
          </Badge>
        </div>
      </div>

      <CardContent>
        <p className="truncate">{quest.title}</p>
        <div className="mt-2 flex items-center gap-0.5">
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} />
        </div>
      </CardContent>
    </Card>
  );
};
