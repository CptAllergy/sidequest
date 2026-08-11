import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "@zitadel/react-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import type { UserDto } from "@/lib/hooks.ts";

export const Route = createFileRoute("/auth/account")({
  component: Account,
});

type Inputs = {
  username: string;
  exampleRequired: string;
};

// TODO invalidate profile cache
// TODO if account is already created redirect away from this page
function Account() {
  const createProfileMutation = useCreateProfile();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    createProfileMutation.mutate(data.username);
  };

  console.log(watch("username")); // watch input value by passing its name

  return (
    <div>
      <h2>Finish your account</h2>
      <div className="flex flex-col items-center justify-center gap-2">
        <h3>Account Information</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* register your input into the hook by invoking the "register" function */}
          <label htmlFor="username">Username</label>
          <input
            className="rounded-sm border-2 border-black"
            defaultValue="test"
            {...register("username")}
          />

          {/* include validation with required or other standard HTML validation rules */}
          <input
            className="rounded-sm border-2 border-black"
            {...register("exampleRequired", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <button
            type="submit"
            className="cursor-pointer rounded-sm bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// TODO review this code
export const useCreateProfile = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (username: string) => {
      if (!token) {
        throw new Error("Unauthorized");
      }
      return await createProfile(token, username);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  return mutation;
};

const createProfile = async (
  accessToken: string,
  username: string,
): Promise<UserDto> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users`, {
    method: "POST",
    body: JSON.stringify({ username: username }),
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
