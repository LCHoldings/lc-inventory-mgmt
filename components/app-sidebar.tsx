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
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"
import { NavMain } from "@/components/nav/nav-main"
// import { NavProjects } from "@/components/nav/nav-projects"
import { NavUser } from "@/components/nav/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

import { OrganizationSwitcher } from "./organization-switcher"

// const data = {
//   navMain: [
//     {
//       title: "Devices",
//       icon: Laptop,
//       items: [
//         {
//           title: "List",
//           url: "/dashboard/devices",
//         },
//       ],
//     },
//     {
//       title: "Items",
//       icon: Mouse,
//       items: [
//         {
//           title: "List",
//           url: "/dashboard/items",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       icon: Settings2,
//       items: [
//         {
//           title: "Status Presets",
//           url: "/dashboard/settings/status-presets",
//         },
//         {
//           title: "Categories",
//           url: "/dashboard/settings/categories",
//         },
//         {
//           title: "Log Settings",
//           url: "/dashboard/settings/log-settings",
//         },
//       ],
//     },
//     {
//       title: "Manufacturers",
//       icon: Hammer,
//       items: [,

//     },
//     {
//       title: "Product Models",
//       icon: List,
//       items: [
//         {
//           title: "List",
//           url: "/dashboard/product-models",
//         },
//       ],
//     }
//   ],
//   navSecondary: [
//     {
//       title: "Support",
//       url: "#",
//       icon: LifeBuoy,
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }
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
        {
          title: "Log Settings",
          url: "/dashboard/settings/log-settings",
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