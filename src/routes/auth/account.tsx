import { Navigate, createFileRoute, useNavigate } from "@tanstack/react-router";
import { withAuthenticationRequired } from "@zitadel/react-auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AtSign } from "lucide-react";
import { toast } from "sonner";
import type { SubmitHandler } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useCreateAccount } from "@/hooks/use-create-account.ts";
import { useAccount } from "@/hooks/use-account.ts";

export const Route = createFileRoute("/auth/account")({
  component: withAuthenticationRequired(RouteComponent),
});

// TODO invalidate profile cache
// TODO if account is already created redirect away from this page
function RouteComponent() {
  const { account, isPending } = useAccount();

  // TODO loading
  if (isPending || !account) {
    return <div>Loading</div>;
  }

  if (!account.isSuccess) {
    return <Navigate to={"/auth/error"} replace={true} />;
  }

  if (account.isAccountComplete) {
    return <Navigate to={"/dashboard"} replace={true} />;
  }

  return (
    <div className="mt-10 flex justify-center">
      <Card className="w-full sm:max-w-md">
        <AccountHeader />
        <AccountForm />
        <AccountFooter />
      </Card>
    </div>
  );
}

const AccountHeader = () => {
  return (
    <CardHeader className="text-center">
      <CardTitle>Who are you?</CardTitle>
      <CardDescription>
        Formalize your entry to begin documenting your journey.
      </CardDescription>
    </CardHeader>
  );
};

const AccountForm = () => {
  const createAccountMutation = useCreateAccount();
  const navigate = useNavigate({ from: "/auth/account" });

  // TODO check on these constraints
  const formSchema = z.object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters.")
      .max(32, "Username must be at most 32 characters.")
      .toLowerCase(),
    displayName: z
      .string()
      // .min(2, "Display name must be at least 2 characters.")
      .max(50, "Display name must be at most 50 characters."),
    bio: z
      .string()
      // .min(1, "Bio must be at least 1 character.")
      .max(100, "Bio must be at most 100 characters."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    createAccountMutation.mutate(data, {
      onSuccess: () => {
        toast.error("Account has been created.");
        void navigate({ to: "/dashboard", replace: true });
      },
      onError: () => {
        toast.error("Failed to create account.");
      },
    });
  };

  return (
    <CardContent>
      <form id="form-account" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex items-center justify-center">
            <div className="mt-4 h-20 w-20 rounded-full bg-black" />
          </div>
          <FieldSeparator />
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-account-username">
                  Username
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="form-account-username"
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
            name="displayName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-account-display-name">
                  Display Name
                </FieldLabel>
                <Input
                  {...field}
                  id="form-account-display-name"
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
            name="bio"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-account-bio">Bio</FieldLabel>
                <Textarea
                  {...field}
                  id="form-account-bio"
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

const AccountFooter = () => {
  return (
    <CardFooter className="mx-auto">
      <Field orientation="horizontal">
        <Button type="submit" form="form-account">
          Complete
        </Button>
      </Field>
    </CardFooter>
  );
};
