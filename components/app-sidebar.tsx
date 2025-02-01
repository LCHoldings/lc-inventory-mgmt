"use client"

import * as React from "react"

import {
  Mouse,
  Settings2,
  Laptop,
  Hammer,
  List,
} from "lucide-react"

import { NavMain } from "@/components/nav/nav-main"
import { NavUser } from "@/components/nav/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { OrganizationSwitcher } from "./organization-switcher"

const data = {
  navMain: [
    {
      title: "Devices",
      icon: Laptop,
      url: "/dashboard/devices",
    },
    {
      title: "Items",
      icon: Mouse,
      url: "/dashboard/items",
    },
    {
      title: "Manufacturers",
      icon: Hammer,
      url: "/dashboard/manufacturers",
    },
    {
      title: "Product Models",
      icon: List,
      url: "/dashboard/product-models"
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
      ],
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrganizationSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}