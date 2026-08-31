import { createFileRoute } from "@tanstack/react-router";
import { CircleIcon, ClockIcon, EllipsisVerticalIcon } from "lucide-react";
import { format, parseISO } from "date-fns";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { SubmitHandler } from "react-hook-form";
import type { QuestDto, QuestEntryDto } from "@/lib/types/dto.ts";
import { useGetQuest } from "@/hooks/use-get-quest.ts";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { Field, FieldError, FieldGroup } from "@/components/ui/field.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useCreateQuestEntry } from "@/hooks/use-create-quest-entry.ts";
import { useGetQuestEntries } from "@/hooks/use-get-quest-entries.ts";

// TODO consider using loaders for this
export const Route = createFileRoute("/_app/_authenticated/quests/$questId")({
  component: RouteComponent,
});

// TODO check convention for naming the main component in routes
// TODO Quest details page should have a different view that depends on status (completed quests should display chronologically and and open quests should show the freshest entries first)

function RouteComponent() {
  const { questId } = Route.useParams();
  const { quest } = useGetQuest(questId);

  if (!quest) {
    return <div>Quest not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      {/* <ReturnQuestLog />*/}
      <QuestBanner quest={quest} />
      <div className="w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <Separator />
      </div>
      <NewEntry questId={questId} />
      <QuestEntries questId={questId} />
    </div>
  );
}

// const ReturnQuestLog = () => {
//   return (
//     <div className="mx-auto w-full max-w-5xl space-y-4 px-4 py-6 text-left sm:px-6 lg:px-8">
//       <Button variant="link" asChild>
//         <Link to={"/quests"}>
//           <ArrowLeftIcon />
//           Back to Board
//         </Link>
//       </Button>
//     </div>
//   );
// };

// TODO make this into a proper banner
const QuestBanner = ({ quest }: { quest: QuestDto }) => {
  return (
    <section className="w-full max-w-5xl">
      <div className="w-full space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <div className="flex gap-2">
          <Badge className="" variant="secondary">
            <CircleIcon fill="currentColor" />
            In Progress
          </Badge>
          <span className="flex items-center gap-1 text-sm">
            <ClockIcon size="13" />
            Started {format(parseISO(quest.created_at), "d MMM, yyyy")}
          </span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-4xl">{quest.title}</span>
            <span className="text-muted-foreground">{quest.description}</span>
          </div>
          <div className="">
            <Card className="">
              <CardContent className="">
                <div className="flex min-h-full justify-evenly gap-2 text-sm md:gap-4">
                  <div className="flex flex-col items-center gap-1 px-4">
                    <span className="text-muted-foreground text-xs">
                      Entries
                    </span>
                    <span className="text-lg font-medium">23</span>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-auto"
                  />
                  <div className="flex flex-col items-center gap-1 px-4">
                    <span className="text-muted-foreground text-xs">Other</span>
                    <span className="text-lg font-medium">67</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewEntry = ({ questId }: { questId: string }) => {
  const createQuestEntryMutation = useCreateQuestEntry();
  // TODO check on these constraints
  const formSchema = z.object({
    title: z
      .string()
      .min(1, "Title must be at least 1 character.")
      .max(32, "Title must be at most 32 characters."),
    description: z
      .string()
      .max(100, "Description name must be at most 100 characters."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    createQuestEntryMutation.mutate(
      { createQuestEntryDto: data, questId },
      {
        onSuccess: () => {
          toast.success("Entry has been created.");
          // TODO update screen some animation or something when loading the new entry (maybe fade in or scroll)
        },
        onError: () => {
          toast.error("Failed to create quest entry.");
        },
      },
    );
  };

  return (
    <section className="w-full max-w-5xl">
      <div className="mx-auto space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <div className="mt-6 mb-20 w-full">
          {/* TODO add proper tab support for all types of entry */}
          <Tabs defaultValue="text" className="">
            <TabsList variant="line">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="url">Link</TabsTrigger>
            </TabsList>

            <Card className="w-full rounded-tl-none border-2 border-dashed bg-transparent">
              <form id="form-new-entry" onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="">
                  <FieldGroup>
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Input
                            {...field}
                            id="form-new-entry-title"
                            placeholder="Title this entry..."
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
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <Textarea
                            {...field}
                            id="form-new-entry-description"
                            placeholder="Record the day's event..."
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
                </CardContent>
                <div className="my-6 px-8">
                  <Separator />
                </div>
                <CardFooter className="justify-end">
                  <Button
                    variant="default"
                    size="sm"
                    className=""
                    type="submit"
                    form="form-new-entry"
                  >
                    Inscribe Entry
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

const QuestEntries = ({ questId }: { questId: string }) => {
  const { questEntries, isPending } = useGetQuestEntries(questId);

  if (isPending || !questEntries) {
    return <div>Loading</div>;
  }

  // TODO fix this in the backend
  const processedEntries = questEntries.map((entry) => {
    const jsonString = atob(entry.content);
    const contentObj = JSON.parse(jsonString);
    return { ...entry, content: contentObj };
  });

  // const entries = [
  //   {
  //     type: "TEXT",
  //     content: {
  //       title: "Arrival",
  //       text: "I finally arrived at the destination",
  //     },
  //     created_at: "26 Oct",
  //   },
  //   {
  //     type: "IMAGE",
  //     content: {
  //       image_url: "/elden_ring.png",
  //     },
  //     created_at: "28 Oct",
  //   },
  //   {
  //     type: "URL",
  //     content: {
  //       url: "https://github.com",
  //     },
  //     created_at: "29 Oct",
  //   },
  // ];

  return (
    <section className="w-full max-w-5xl">
      <div className="mx-auto space-y-4 px-4 text-left sm:px-6 lg:px-8">
        <div className="w-full space-y-4">
          {processedEntries.map((entry, index) => (
            <div key={index} className="flex items-start gap-12">
              <CircleIcon size={15} />
              <QuestEntry entry={entry} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// TODO maybe can use props with children instead here
const QuestEntry = ({ entry }: { entry: QuestEntryDto }) => {
  // TODO review how to do this "multiple possible component" setup maybe in a better way than a switch
  const entryComponent = (() => {
    switch (entry.type) {
      case "TEXT":
        return <QuestEntryText entry={entry} />;
      case "IMAGE":
        return <QuestEntryImage entry={entry} />;
      case "URL":
        return <QuestEntryUrl entry={entry} />;
    }
  })();

  return (
    <Card className="w-full gap-0">
      <CardHeader className="w-full">
        <CardTitle className="text-sm">
          {format(parseISO(entry.created_at), "d MMM, yyyy")}
        </CardTitle>
        <CardAction>
          <Button size="sm" variant="ghost">
            <EllipsisVerticalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="">{entryComponent}</CardContent>
    </Card>
  );
};

const QuestEntryText = ({ entry }: { entry: QuestEntryDto }) => {
  return (
    <>
      <p className="text-2xl">{entry.content.title}</p>
      <p className="text-muted-foreground">{entry.content.description}</p>
    </>
  );
};

const QuestEntryImage = ({ entry }: { entry: QuestEntryDto }) => {
  return (
    <>
      <img
        src={entry.content.image_url}
        alt="User picture"
        className="aspect-3/1 w-full object-cover object-center"
      />
    </>
  );
};

const QuestEntryUrl = ({ entry }: { entry: QuestEntryDto }) => {
  return (
    <>
      <a href={entry.content.url} target="_blank">
        {entry.content.url}
      </a>
    </>
  );
};
