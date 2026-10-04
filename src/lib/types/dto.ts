export type UserDto = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
};

export type QuestDto = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: string;
  status: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
};

export type CreateUserDto = {
  username: string;
};

export type CreateQuestDto = {
  title: string;
  description?: string;
  type: string;
  status: string;
  // imageUrl: string;
};

// TODO think about during entry refactor
export type CreateQuestEntryDto = {
  title: string;
  description: string;
};

// TODO remember to consider this in the refactor as well
export type QuestEntryDto = {
  id: string;
  quest_id: string;
  user_id: string;
  type: string;
  content: any;
  created_at: string;
  updated_at: string;
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
