import { Link } from "@tanstack/react-router";
import { Home, Menu, User, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";

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

const MenuButton = () => {
  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <div className="rounded-lg p-2 transition-colors hover:cursor-pointer hover:bg-gray-700">
          <Menu size={24} />
        </div>
      </DrawerTrigger>
      <DrawerMenu />
    </Drawer>
  );
};

const DrawerMenu = () => {
  return (
    <DrawerContent className="font-jetbrains border-transparent bg-gray-900 text-white">
      <DrawerHeader className="flex-row items-center justify-between border-b border-gray-700 p-4">
        <DrawerTitle className="text-xl font-bold text-white">
          Navigation
        </DrawerTitle>
        <DrawerClose className="rounded-lg p-2 transition-colors hover:cursor-pointer hover:bg-gray-800">
          <X size={24} />
        </DrawerClose>
      </DrawerHeader>
      <nav className="flex-1 overflow-y-auto p-4">
        <Link
          to="/"
          // onClick={() => setIsOpen(false)}
          className="mb-2 flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
          activeProps={{
            className:
              "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
          }}
        >
          <Home size={20} />
          <span className="">Home</span>
        </Link>
        <Link
          to="/"
          // onClick={() => setIsOpen(false)}
          className="mb-2 flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
          activeProps={{
            className:
              "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
          }}
        >
          <Home size={20} />
          <span className="">Games</span>
        </Link>
        <Link
          to="/"
          // onClick={() => setIsOpen(false)}
          className="mb-2 flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
          activeProps={{
            className:
              "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
          }}
        >
          <Home size={20} />
          <span className="">Shows</span>
        </Link>
        <Link
          to="/"
          // onClick={() => setIsOpen(false)}
          className="mb-2 flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-800"
          activeProps={{
            className:
              "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
          }}
        >
          <Home size={20} />
          <span className="">Projects</span>
        </Link>

        {/* Demo Links Start */}

        {/* Demo Links End */}
      </nav>
      <DrawerFooter className="flex flex-row items-center justify-between"></DrawerFooter>
    </DrawerContent>
  );
};

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-between bg-gray-800 px-4 py-3 text-white shadow-lg">
        <MenuButton />
        <h1 className="ml-4 text-xl font-semibold">
          <Link to="/">
            <pre className="h-10 font-mono text-[0.25rem] leading-none tracking-tighter whitespace-pre text-white transition-colors hover:text-green-500">
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
