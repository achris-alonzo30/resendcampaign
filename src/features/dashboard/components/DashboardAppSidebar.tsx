"use client"

import {
  Inbox,
  User2,
  Command,
  AudioWaveform,
  LayoutDashboard,
  GalleryVerticalEnd,
  AlignVerticalJustifyStart,
} from "lucide-react";

import {
  Sidebar,
  SidebarRail,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
} from "@/components/ui/sidebar";
import { DashboardNavMain } from "./DashboardNavMain";
import { DashboardNavUser } from "./DashboardNavUser";
import { DashboardTeamSwitcher } from "./DashboardTeamSwitcher";


const data = {
  user: {
    name: "Resender",
    email: "m@example.com",
    avatar: "/browser-icon.svg",
  },
  teams: [
    {
      name: "Resender",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Audience",
      url: "#",
      icon: User2,
      items: [],
    },
    {
      title: "Campaigns",
      url: "#",
      icon: Inbox,
      items: [],
    },
    {
      title: "Funnels",
      url: "#",
      icon: AlignVerticalJustifyStart,
      items: [],
    },
  ],
}

export const DashboardAppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardTeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <DashboardNavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <DashboardNavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
