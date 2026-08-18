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
  description: string;
  type: string;
  status: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type CreateUserDto = {
  username: string;
};

export type CreateQuestDto = {
  // userId: string;
  title: string;
  description: string;
  type: string;
  status: string;
  // imageUrl: string;
};
