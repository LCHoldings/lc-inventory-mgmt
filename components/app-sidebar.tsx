"use client"

import * as React from "react"
import {
  Mouse,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Laptop,
  Hammer,
  List,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

import { useSession } from "next-auth/react"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Devices",
      icon: Laptop,
      items: [
        {
          title: "List",
          url: "/dashboard/devices",
        },
      ],
    },
    {
      title: "Items",
      icon: Mouse,
      items: [
        {
          title: "List",
          url: "/dashboard/items",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings2,
      items: [
        {
          title: "Status Presets",
          url: "/dashboard/settings/status-presets",
        },
        {
          title: "Categories",
          url: "/dashboard/settings/categories",
        },
        {
          title: "Log Settings",
          url: "/dashboard/settings/log-settings",
        },
      ],
    },
    {
      title: "Manufacturers",
      icon: Hammer,
      items: [
        {
          title: "List",
          url: "/dashboard/manufacturers",
        },
        {
          title: "Manage",
          url: "/dashboard/manufacturers/manage",
        }
      ],

    },
    {
      title: "Product Models",
      icon: List,
      items: [
        {
          title: "List",
          url: "/dashboard/product-models",
        },
      ],
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  return (
    <Sidebar className="border-r" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  {session ? (
                   
                    <Image src="https://cloud-i7kx3y785-hack-club-bot.vercel.app/0small_lcholdings.png" alt="logo" width={50} height={50} className="p-1" />
                  ) : (
                    <Skeleton className="size-8 rounded-lg" />
                  )}
                </div>
                {session ? (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">LCHoldings</span>
                    <span className="truncate text-xs">Yap yap</span>
                  </div>
                ) : (
                  <div className="grid flex-1 gap-1.5 text-left text-sm leading-tight">
                    <Skeleton className="h-3 w-32 rounded-lg" />
                    <Skeleton className="h-2 w-24 rounded-lg" />
                  </div>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
