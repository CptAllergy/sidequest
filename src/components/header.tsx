import { User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <SidebarTrigger className="-ml-1" />
      <button className="rounded-lg p-2 transition-colors hover:cursor-pointer hover:bg-gray-700">
        <User size={24} />
      </button>
    </header>
  );
}
