"use client"

import * as React from "react"
import {
  Mouse,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
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
} from "@/components/ui/sidebar"

import { OrganizationSwitcher } from "./organization-switcher"

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
  return (
    <Sidebar className="border-r" collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
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
