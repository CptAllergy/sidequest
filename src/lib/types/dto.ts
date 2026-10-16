export type UserDto = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
};

export type QuestResponse = {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  type: string;
  status: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserDto = {
  username: string;
};

export type CreateQuestDto = {
  title: string;
  description: string | null;
  type: string;
  status: string;
  imageKey: string | null;
};

export type CreateQuestEntryRequest =
  | { type: "TEXT"; content: EntryTextContent }
  | {
      type: "IMAGE";
      content: EntryImageContent;
    }
  | { type: "LINK"; content: EntryLinkContent };

type QuestEntryResponseBase = {
  id: string;
  questId: string;
  userId: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
};

export type QuestEntryResponse =
  | (QuestEntryResponseBase & { type: "TEXT"; content: EntryTextContent })
  | (QuestEntryResponseBase & {
      type: "IMAGE";
      content: EntryImageContentResponse;
    })
  | (QuestEntryResponseBase & { type: "LINK"; content: EntryLinkContent })
  | (QuestEntryResponseBase & {
      type: "STATUS_CHANGE";
      content: EntryStatusChangeContent;
    });

export type EntryTextContent = {
  title: string;
  description: string;
};

export type EntryImageContent = {
  title: string;
  imageKey: string;
  description: string;
};

export type EntryImageContentResponse = {
  title: string;
  imageUrl: string;
  description: string;
};

export type EntryLinkContent = {
  title: string;
  url: string;
  description: string;
};

export type EntryStatusChangeContent = {
  oldStatus: string;
  newStatus: string;
};

export type PresignedUploadDto = {
  contentType: string;
};

export type PresignedUploadResponseDto = {
  url: string;
  imageKey: string;
  // TODO consider the need for this fields, maybe remove it?? unsure if needed
  // signedHeader: string;
};
