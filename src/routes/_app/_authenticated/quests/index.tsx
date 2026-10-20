import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useAccountQuests } from "@/hooks/quests/use-account-quests.ts";
import { QuestCard } from "@/components/quests/quest-card.tsx";
import { Button } from "@/components/ui/button.tsx";

export const Route = createFileRoute("/_app/_authenticated/quests/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAccountQuests();

  const quests = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );

  // TODO loading animation or skeleton
  if (isPending) {
    return <div>Loading...</div>;
  }

  // TODO Error state
  if (isError) {
    return <div>Error state</div>;
  }

  if (quests.length === 0) {
    return (
      <div>
        No quests yet. Click
        <Link to="/quests/new" className="px-2 text-blue-600 underline">
          here
        </Link>
        to create a new one
      </div>
    );
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
      {hasNextPage && (
        <div>
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </section>
  );
}
