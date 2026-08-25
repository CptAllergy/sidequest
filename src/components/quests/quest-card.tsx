import { StarIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { QuestDto } from "@/lib/types/dto.ts";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export const QuestCard = ({ quest }: { quest: QuestDto }) => {
  // TODO Find better or create my own custom fallback image
  const cardImage = quest.image_url ?? "/fallback.png";

  return (
    <Card className="gap-2 overflow-hidden pt-0">
      <div className="relative">
        <Link to={`/quests/$questId`} params={{ questId: quest.id }}>
          <img
            src={cardImage}
            alt="Archived Quest"
            className="aspect-2/3 w-full object-cover object-center"
          />
        </Link>

        <div className="absolute top-0 right-0 z-10 p-3">
          <Badge className=" " variant="secondary">
            4 Oct 2025
          </Badge>
        </div>
      </div>

      <CardContent>
        <Link
          className="truncate"
          to={`/quests/$questId`}
          params={{ questId: quest.id }}
        >
          {quest.title}
        </Link>
        <div className="mt-2 flex items-center gap-0.5">
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} fill="currentColor" />
          <StarIcon size={15} />
        </div>
      </CardContent>
    </Card>
  );
};
