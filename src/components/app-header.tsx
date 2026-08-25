import { useAuth } from "@zitadel/react-auth";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";

export default function AppHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Home</h1>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <LoginButton />
        </div>
      </div>
    </header>
  );
}

const LoginButton = () => {
  const auth = useAuth();

  const login = async () => {
    await auth.signinRedirect();
  };

  if (auth.isAuthenticated) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="hidden sm:flex"
      onClick={login}
    >
      Sign In
    </Button>
  );
};
