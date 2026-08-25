import { IconCirclePlusFilled } from "@tabler/icons-react";
import { Link, useMatchRoute } from "@tanstack/react-router";
import type { Icon } from "@tabler/icons-react";

import type { LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | Icon;
  }[];
}) {
  const matchRoute = useMatchRoute();

  const isRouteActive = (targetUrl: string) => {
    return Boolean(matchRoute({ to: targetUrl }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
              asChild
            >
              <Link to={"/quests/new"}>
                <IconCirclePlusFilled />
                <span>New Quest</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isRouteActive(item.url)}
                asChild
              >
                <Link to={item.url} className="">
                  {isRouteActive(item.url) && (
                    <div className="bg-foreground h-full w-1 rounded-2xl"></div>
                  )}
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
