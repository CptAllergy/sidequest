import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@zitadel/react-auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign } from "lucide-react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import type { SubmitHandler } from "react-hook-form";
import type { CreateQuestDto, QuestDto } from "@/lib/types.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";

export const Route = createFileRoute("/_authenticated/quests/new")({
  component: NewQuest,
});

function NewQuest() {
  const auth = useAuth();

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

  return (
    <div className="mt-10 flex justify-center">
      <Card className="w-full sm:max-w-md">
        <NewQuestHeader />
        <NewQuestForm />
        <NewQuestFooter />
      </Card>
    </div>
  );
}

const NewQuestHeader = () => {
  return (
    <CardHeader>
      <CardTitle>Start Your Next Quest</CardTitle>
      <CardDescription>Describe the details</CardDescription>
    </CardHeader>
  );
};

const NewQuestForm = () => {
  const createQuestMutation = useCreateQuest();
  // TODO navigate to quest after creationconst navigate = useNavigate({ from: "/auth/account" });

  // TODO check on these constraints
  const formSchema = z.object({
    title: z
      .string()
      .min(1, "Title must be at least 1 character.")
      .max(32, "Title must be at most 32 characters."),
    description: z
      .string()
      .max(100, "Display name must be at most 50 characters."),
    type: z
      .string()
      // .min(1, "Bio must be at least 1 character.")
      .max(100, "Bio must be at most 100 characters.")
      .toUpperCase(),
    status: z
      .string()
      // .min(1, "Bio must be at least 1 character.")
      .max(100, "Bio must be at most 100 characters.")
      .toUpperCase(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "GAME",
      status: "PLANNED",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    console.log(data);
    createQuestMutation.mutate(data, {
      onSuccess: () => {
        // TODO navigate to quest page
        //  void navigate({ to: "/dashboard", replace: true });
      },
      onError: () => {
        // TODO show some error
      },
    });
  };

  // TODO fix IDs
  return (
    <CardContent>
      <form id="form-new-quest" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex items-center justify-center">
            <div className="mt-4 h-40 w-100 rounded-lg bg-black" />
          </div>
          <FieldSeparator />
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-quest-username">Title</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="form-new-quest-username"
                    placeholder="e.g. explorer20"
                    aria-invalid={fieldState.invalid}
                    className="lowercase"
                    required
                  />
                  <InputGroupAddon>
                    <AtSign />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="type"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-quest-display-name">
                  Type
                </FieldLabel>
                <Input
                  {...field}
                  id="form-new-quest-display-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="How others see your name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-quest-display-name">
                  Status
                </FieldLabel>
                <Input
                  {...field}
                  id="form-new-quest-display-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="How others see your name"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-quest-bio">
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-new-quest-bio"
                  placeholder="An account of your past deeds..."
                  rows={6}
                  className="min-h-24 resize-none"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </CardContent>
  );
};

const NewQuestFooter = () => {
  return (
    <CardFooter>
      <Field orientation="horizontal" className="justify-end">
        <Button type="button" variant="outline">
          Discard
        </Button>
        <Button type="submit" form="form-new-quest">
          Commit
        </Button>
      </Field>
    </CardFooter>
  );
};

// TODO review this code and replace with quest
export const useCreateQuest = () => {
  const auth = useAuth();
  const token = auth.user?.access_token;

  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (createQuestDto: CreateQuestDto) => {
      if (!token) {
        // TODO handle
        throw new Error("Unauthorized without token");
      }
      return await createQuest(token, createQuestDto);
    },
    onSuccess: () => {
      // void queryClient.invalidateQueries({ queryKey: [""] });
    },
  });
  return mutation;
};

const createQuest = async (
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
