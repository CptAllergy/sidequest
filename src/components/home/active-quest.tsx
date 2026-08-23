import { PlayIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Field, FieldLabel } from "@/components/ui/field.tsx";
import { Progress } from "@/components/ui/progress.tsx";
import { Button } from "@/components/ui/button.tsx";

export const ActiveQuest = () => {
  return (
    <Card className="relative overflow-hidden p-0">
      {/* Image background*/}
      <img
        src="/elden_ring.png"
        alt="Active Quest"
        className="aspect-16/9 w-full object-cover"
      />

      {/* Dark overlay*/}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-black/10" />

      <CardContent className="absolute inset-x-0 bottom-0 z-10 flex h-full flex-col justify-between py-6 lg:h-2/3">
        <div className="flex flex-col gap-1">
          <Badge className=" ">Active Quest</Badge>
        </div>
        <div className="flex w-2/3 flex-col items-start gap-4 text-left text-wrap">
          <p className="text-4xl font-semibold">
            Elden Ring: Shadow of the Erdtree
          </p>
          <p className="text-muted-foreground">
            Navigating the Land of Shadow to find Miquella the Kind. Currently
            facing the challenges of the Shadow Keep.
          </p>
        </div>
        <div className="flex flex-row justify-between gap-5">
          <Field className="w-full max-w-sm">
            <FieldLabel htmlFor="progress-upload">
              <span>Progress</span>
              <span className="ml-auto">66%</span>
            </FieldLabel>
            <Progress value={45} id="progress-upload" />
          </Field>
          <Button size="lg">
            <PlayIcon />
            Resume Journey
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
