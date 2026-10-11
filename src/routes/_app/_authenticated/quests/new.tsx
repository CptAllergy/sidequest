import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { ImageUpIcon } from "lucide-react";
import type { SubmitHandler } from "react-hook-form";
import type { CreateQuestDto } from "@/lib/types/dto.ts";
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
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useCreateQuest } from "@/hooks/use-create-quest.ts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useImageUpload } from "@/hooks/use-image-upload.ts";

export const Route = createFileRoute("/_app/_authenticated/quests/new")({
  component: RouteComponent,
});

function RouteComponent() {
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

const MAX_SIZE = 5 * 1024 * 1024; // 5MB TODO sync with backend

const NewQuestForm = () => {
  const navigate = useNavigate({ from: "/quests/new" });
  const createQuest = useCreateQuest();
  const uploadImage = useImageUpload();
  const imageId = uploadImage.data ?? null;

  // TODO improve the experience of uploading images, with previews, loading states, and error handling
  // TODO rename this
  const {
    acceptedFiles: renameThis,
    getRootProps,
    getInputProps,
  } = useDropzone({
    multiple: false,
    // accept: { "image/jpeg": [], "image/png": [] },
    maxSize: MAX_SIZE,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        // TODO handle file rejection
        return;
      }
      const selectedFile = acceptedFiles[0];
      uploadImage.mutate(selectedFile);
    },
  });

  const files = renameThis.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  // TODO check on these constraints
  const formSchema = z.object({
    title: z
      .string()
      .min(1, "Title must be at least 1 character.")
      .max(32, "Title must be at most 32 characters."),
    description: z
      .string()
      .max(100, "Description name must be at most 100 characters."),
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
    const createQuestData: CreateQuestDto = { ...data, imageKey: imageId };
    createQuest.mutate(createQuestData, {
      onSuccess: (newQuest) => {
        toast.success("Quest has been created.");
        void navigate({
          to: "/quests/$questId",
          params: { questId: newQuest.id },
        });
      },
      onError: () => {
        toast.error("Failed to create quest.");
      },
    });
  };

  const questTypes = [
    { label: "Book", value: "BOOK" },
    { label: "Game", value: "GAME" },
    { label: "Movie", value: "MOVIE" },
    { label: "Show", value: "SHOW" },
    { label: "Project", value: "PROJECT" },
  ] as const;

  const statusTypes = [
    { label: "Planned", value: "PLANNED" },
    { label: "Started", value: "STARTED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Canceled", value: "CANCELED" },
  ] as const;

  return (
    <CardContent>
      <form id="form-new-quest" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <section className="container rounded-xl border-2 border-dashed">
            <div
              {...getRootProps({ className: "dropzone" })}
              className="cursor-pointer p-8"
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center gap-2">
                <ImageUpIcon />
                <p className="text-sm">Drag or click to select image</p>
              </div>
            </div>
          </section>
          <aside>
            <h4>Files</h4>
            <ul>{files}</ul>
          </aside>
          <FieldSeparator />
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-new-quest-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-new-quest-title"
                  placeholder="e.g. The Witcher 3"
                  aria-invalid={fieldState.invalid}
                  required
                />
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
                <FieldLabel htmlFor="form-new-quest-type">Type</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-new-quest-type"
                    aria-invalid={fieldState.invalid}
                    className="min-w-30"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {questTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <FieldLabel htmlFor="form-new-quest-status">Status</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="form-new-quest-status"
                    aria-invalid={fieldState.invalid}
                    className="min-w-30"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {statusTypes.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <FieldLabel htmlFor="form-new-quest-description">
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-new-quest-description"
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
        <Link to="/">
          <Button type="button" variant="outline">
            Discard
          </Button>
        </Link>
        <Button type="submit" form="form-new-quest">
          Commit
        </Button>
      </Field>
    </CardFooter>
  );
};
