import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar.tsx";

const logo = `
   ▄████████  ▄█  ████████▄     ▄████████ ████████▄   ███    █▄     ▄████████    ▄████████     ███     
  ███    ███ ███  ███   ▀███   ███    ███ ███    ███  ███    ███   ███    ███   ███    ███ ▀█████████▄ 
  ███    █▀  ███▌ ███    ███   ███    █▀  ███    ███  ███    ███   ███    █▀    ███    █▀     ▀███▀▀██ 
  ███        ███▌ ███    ███  ▄███▄▄▄     ███    ███  ███    ███  ▄███▄▄▄       ███            ███   ▀ 
▀███████████ ███▌ ███    ███ ▀▀███▀▀▀     ███    ███  ███    ███ ▀▀███▀▀▀     ▀███████████     ███     
         ███ ███  ███    ███   ███    █▄  ███    ███  ███    ███   ███    █▄           ███     ███     
   ▄█    ███ ███  ███   ▄███   ███    ███ ███  ▀ ███  ███    ███   ███    ███    ▄█    ███     ███     
 ▄████████▀  █▀   ████████▀    ██████████  ▀██████▀▄█ ████████▀    ██████████  ▄████████▀     ▄████▀   
`;

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between bg-amber-800 px-4 py-3 text-white shadow-lg">
        <SidebarTrigger className="-ml-1" />
        <h1 className="ml-4 font-semibold">
          <Link to="/">
            <pre className="h-10 font-mono text-[0.22rem] leading-none tracking-tighter whitespace-pre text-white transition-colors hover:text-green-500">
              {logo}
            </pre>
          </Link>
        </h1>
        <button className="rounded-lg p-2 transition-colors hover:cursor-pointer hover:bg-gray-700">
          <User size={24} />
        </button>
      </header>
    </>
  );
}
