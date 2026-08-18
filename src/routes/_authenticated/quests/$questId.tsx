import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@zitadel/react-auth";
import { useQuery } from "@tanstack/react-query";
import type { QuestDto } from "@/lib/types.ts";

// TODO consider using loaders for this
export const Route = createFileRoute("/_authenticated/quests/$questId")({
  component: QuestRoute,
});

// TODO check convention for naming the main component in routes
function QuestRoute() {
  const auth = useAuth();
  const { questId } = Route.useParams();
  const { quest } = useGetQuest(questId);

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

  if (!quest) {
    return <div>Quest not found</div>;
  }

  return (
    <div>
      <div>
        <span>QuestID:</span>
        <span>{quest.id}</span>
      </div>
      <div>
        <span>Quest Title:</span>
        <span>{quest.title}</span>
      </div>
    </div>
  );
}

// TODO think about a better way to handle authorization across requests
export const useGetQuest = (questId: string) => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const { data: quest, isPending } = useQuery<QuestDto, Error>({
    queryKey: ["quest", questId],
    queryFn: async () => {
      return await getQuest(token!, questId);
    },
    enabled: !!token && !!questId,
    retry: false,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  return {
    quest: quest,
    isPending,
  };
};

const getQuest = async (
  accessToken: string,
  questId: string,
): Promise<QuestDto> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/quests/${questId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  // TODO check a better setup for these requests
  if (!res.ok) {
    throw new Error("Unable to get quest");
  }

  return (await res.json()) as QuestDto;
};
