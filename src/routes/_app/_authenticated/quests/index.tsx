import { createFileRoute } from "@tanstack/react-router";
import { useGetAccountQuests } from "@/hooks/use-get-account-quests.ts";
import { QuestCard } from "@/components/quests/quest-card.tsx";

export const Route = createFileRoute("/_app/_authenticated/quests/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { quests, isPending } = useGetAccountQuests();

  // TODO loading
  if (isPending || !quests) {
    return <div>Loading...</div>;
  }

  return (
    <section className="my-10 max-w-5xl">
      <div className="mx-auto space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-4">
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </section>
  );
}
