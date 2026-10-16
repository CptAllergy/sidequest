import type {
  CreateQuestDto,
  CreateQuestEntryRequest,
  QuestResponse,
  QuestEntryResponse,
} from "@/lib/types/dto.ts";

export const createQuest = async (
  accessToken: string,
  createQuestDto: CreateQuestDto,
): Promise<QuestResponse> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/quests`, {
    method: "POST",
    body: JSON.stringify(createQuestDto),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to create quest: ${res.status}`);
  }

  return (await res.json()) as QuestResponse;
};

export const getQuest = async (
  accessToken: string,
  questId: string,
): Promise<QuestResponse> => {
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

  return (await res.json()) as QuestResponse;
};

export const getAccountQuests = async (
  accessToken: string,
): Promise<QuestResponse[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/quests`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  // TODO check a better setup for these requests
  if (!res.ok) {
    throw new Error("Unable to get quest");
  }

  return (await res.json()) as QuestResponse[];
};

export const createQuestEntry = async (
  accessToken: string,
  createQuestEntryDto: CreateQuestEntryRequest,
  questId: string,
): Promise<QuestEntryResponse> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/quests/${questId}/entries`,
    {
      method: "POST",
      body: JSON.stringify(createQuestEntryDto),
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create quest: ${res.status}`);
  }

  return (await res.json()) as QuestEntryResponse;
};

export const getQuestEntries = async (
  accessToken: string,
  questId: string,
): Promise<QuestEntryResponse[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/quests/${questId}/entries`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  // TODO check a better setup for these requests
  if (!res.ok) {
    throw new Error("Unable to get quest entries");
  }

  return (await res.json()) as QuestEntryResponse[];
};
