import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";

export const NotFound = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex items-center justify-center">
          <span className="text-3xl">404</span>
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <span>Page not found</span>
        </div>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
};
