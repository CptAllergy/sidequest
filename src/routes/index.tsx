import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
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
import { Badge } from "@/components/ui/badge.tsx";
import { cn } from "@/lib/utils.ts";
import { Progress } from "@/components/ui/progress.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Field, FieldLabel } from "@/components/ui/field.tsx";

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
        <QuestBoardPreview />
        <ArchivedQuestsSections />
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

const StatsSection = () => {
  const { account, isPending } = useAccount();

  if (isPending || !account) {
    return <div>Loading</div>;
  }

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:px-8 xl:grid-cols-4">
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
    range: "$30k - $50k",
    icon: <Gamepad2Icon />,
  },
  {
    title: "Books Read",
    value: "12",
    status: "exceed",
    range: "Target: $18k",
    icon: <BookCheckIcon />,
  },
  {
    title: "Movies Watched",
    value: "67",
    status: "observe",
    range: "$80k - $120k",
    icon: <ClapperboardIcon />,
  },
  {
    title: "Shows Completed",
    value: "28",
    status: "unknown",
    range: "Q4 Review Pending",
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

const ActiveQuest = () => {
  return (
    <Card className="relative overflow-hidden p-0">
      {/* Image background*/}
      <img
        src="/elden_ring.png"
        alt="Active Quest"
        className="aspect-16/9 w-full object-cover"
      />

      {/* Dark overlay*/}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-black/10" />

      <CardContent className="absolute inset-0 z-10 flex flex-col justify-around">
        <div className="flex flex-col gap-1">
          <Badge className=" ">Legendary Quest</Badge>
        </div>
        <div className="flex w-1/2 flex-col items-start gap-4 text-left text-wrap">
          <p className="text-4xl font-semibold">
            Elden Ring: Shadow of the Erdtree
          </p>
          <p className="text-muted-foreground">
            Navigating the Land of Shadow to find Miquella the Kind. Currently
            facing the challenges of the Shadow Keep.
          </p>
        </div>
        <div className="flex w-2/3 flex-col gap-5">
          <div className="flex flex-col items-start gap-3">
            <Field className="w-full max-w-sm">
              <FieldLabel htmlFor="progress-upload">
                <span>Progress</span>
                <span className="ml-auto">66%</span>
              </FieldLabel>
              <Progress value={45} id="progress-upload" />
            </Field>
          </div>
          <div className="flex gap-4">
            <Button size="lg">Continue Quest</Button>
            <Button variant="secondary" size="lg">
              Abandon Quest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const QuestBoardPreview = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <h3 className="flex items-center gap-2 text-2xl">
          <StarIcon />
          <span>Quest Board</span>
        </h3>
        {/* <ActiveQuest />*/}
      </div>
    </section>
  );
};

const ArchivedQuestsSections = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <h3 className="flex items-center gap-2 text-2xl">
          <StarIcon />
          <span>Archived Quests</span>
        </h3>
        {/* <ActiveQuest />*/}
      </div>
    </section>
  );
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
