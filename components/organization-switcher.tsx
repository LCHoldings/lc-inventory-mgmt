"use client"

// React
import * as React from "react"

// Icons
import { ChevronsUpDown, Plus, Settings } from "lucide-react"

// UI
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"

// Next
import Image from 'next/image'

// Clerk
import { useOrganizationList, useOrganization, useClerk } from '@clerk/nextjs'


export function OrganizationSwitcher() {
  const { isMobile } = useSidebar()

  const { openCreateOrganization, openOrganizationProfile } = useClerk();

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const selectedOrganization = useOrganization();

  if (!isLoaded) {
    return <Skeleton className="h-8 w-full" />
  }

  function setOrganization(organizationId: string) {
    const toastId = toast.loading("Changing organization...");

    try {
      if (isLoaded) {
        setActive({ organization: organizationId });
      }
    } catch (error) {
      toast.error("An error occurred while switching to the selected organization", { id: toastId });
      console.error(error);
    } finally {
      toast.success("You have successfully switched to the selected organization", { id: toastId });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center overflow-hidden justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
                {selectedOrganization.organization?.imageUrl && <Image loading="lazy" src={selectedOrganization.organization?.imageUrl} width={140} height={140} alt="123" />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {selectedOrganization.organization?.name || "Loading..."}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {Array.isArray(userMemberships.data) && userMemberships.data.length !== 0 ? (
              <>
                {userMemberships.data?.map((mem, index) => (
                  <DropdownMenuItem
                    key={mem.id}
                    onClick={() => setOrganization(mem.organization.id)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      {mem.organization.imageUrl && <Image src={mem.organization.imageUrl} alt="Meow" className="rounded-sm" width={140} height={140} />}
                    </div>
                    {mem.organization.name}

                    <DropdownMenuShortcut>
                      ⌘{index + 1}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
              </>
            ) : (
              <DropdownMenuItem className="gap-2 p-2">
                No teams available
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" onClick={() => openCreateOrganization()}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <button className="font-medium text-muted-foreground">Create team</button>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2" onClick={() => openOrganizationProfile()}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Settings className="size-4" />
              </div>
              <button className="font-medium text-muted-foreground">Manage Organization</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}