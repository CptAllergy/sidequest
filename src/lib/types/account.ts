import type { UserResponse } from "@/lib/types/api/dto.ts";

export type Account = {
  /**
   * Whether the user has successfully completed the authentication flow. If false, the user should be redirected to the login page.
   */
  isSuccess: boolean;
  /**
   * Whether the user has completed their account. If false, the user should be redirected to the account completion flow.
   */
  isAccountComplete?: boolean;
  /**
   * The user object returned from the API.
   */
  user?: UserResponse;
};
