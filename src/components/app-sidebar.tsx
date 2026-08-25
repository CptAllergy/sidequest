import * as React from "react";
import {
  IconCamera,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";

import { Link } from "@tanstack/react-router";
import {
  BookIcon,
  ClapperboardIcon,
  GamepadDirectionalIcon,
  HouseIcon,
  ScrollIcon,
  TvIcon,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HouseIcon,
    },
    {
      title: "Quest Board",
      url: "/quests",
      icon: ScrollIcon,
    },
    {
      title: "Games",
      url: "/quests?type=GAME",
      icon: GamepadDirectionalIcon,
    },
    {
      title: "Movies",
      url: "/quests?type=MOVIE",
      icon: ClapperboardIcon,
    },
    {
      title: "TV Shows",
      url: "/quests?type=TV",
      icon: TvIcon,
    },
    {
      title: "Books",
      url: "/quests?type=BOOK",
      icon: BookIcon,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/" className="flex items-center gap-4">
                <div className="font-mono text-[0.15rem] leading-none tracking-tighter whitespace-pre">
                  {logo}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* TODO include this section maybe with stats or other details*/}
        {/* <NavDocuments items={data.documents} />*/}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
