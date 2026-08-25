import type { CreateUserDto, UserDto } from "@/lib/types/dto.ts";

import type { Account } from "@/lib/types/account.ts";

export const createAccount = async (
  accessToken: string,
  createUserDto: CreateUserDto,
): Promise<UserDto> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users`, {
    method: "POST",
    body: JSON.stringify(createUserDto),
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to create profile: ${res.status}`);
  }

  return (await res.json()) as UserDto;
};

export const getAccount = async (accessToken: string): Promise<Account> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  });

  if (!res.ok && res.status !== 404) {
    return { isSuccess: false };
  }

  if (res.status === 404) {
    return { isSuccess: true, isAccountComplete: false };
  }

  const user = (await res.json()) as UserDto;
  return { isSuccess: true, isAccountComplete: true, user };
};

export const getUser = async (
  accessToken: string,
  username: string,
): Promise<UserDto> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/users/${username}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  // TODO check a better setup for these requests
  if (!res.ok) {
    throw new Error("Unable to get user");
  }

  return (await res.json()) as UserDto;
};
