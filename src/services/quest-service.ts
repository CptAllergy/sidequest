import type {
  CreateQuestDto,
  CreateQuestEntryDto,
  QuestDto,
  QuestEntryDto,
} from "@/lib/types/dto.ts";

export const createQuest = async (
  accessToken: string,
  createQuestDto: CreateQuestDto,
): Promise<QuestDto> => {
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

  return (await res.json()) as QuestDto;
};

export const getQuest = async (
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

export const getAccountQuests = async (
  accessToken: string,
): Promise<QuestDto[]> => {
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

  return (await res.json()) as QuestDto[];
};

export const createQuestEntry = async (
  accessToken: string,
  createQuestEntryDto: CreateQuestEntryDto,
  questId: string,
): Promise<QuestEntryDto> => {
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

  return (await res.json()) as QuestEntryDto;
};

export const getQuestEntries = async (
  accessToken: string,
  questId: string,
): Promise<QuestEntryDto[]> => {
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

  return (await res.json()) as QuestEntryDto[];
};
