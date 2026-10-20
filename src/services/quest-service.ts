import type {
  CreateQuestEntryRequest,
  CreateQuestRequest,
  CursorPage,
  QuestEntryResponse,
  QuestResponse,
} from "@/lib/types/api/dto.ts";

export const createQuest = async (
  accessToken: string,
  createQuestDto: CreateQuestRequest,
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

  return res.json();
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

  return res.json();
};

export const getAccountQuests = async (
  accessToken: string,
  cursor?: string,
  limit = 20,
): Promise<CursorPage<QuestResponse>> => {
  // TODO is this the way to do it here with params like this?
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) {
    params.set("cursor", cursor);
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/quests?${params}`,
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

  return res.json();
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

  return res.json();
};

export const getQuestEntries = async (
  accessToken: string,
  questId: string,
  cursor?: string,
  limit = 20,
): Promise<CursorPage<QuestEntryResponse>> => {
  // TODO is this the way to do it here with params like this?
  const params = new URLSearchParams({ limit: String(limit) });
  if (cursor) {
    params.set("cursor", cursor);
  }

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/quests/${questId}/entries?${params}`,
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

  return res.json();
};
