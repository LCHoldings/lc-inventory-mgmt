"use client"

// React
import * as React from "react"

// Icons
import { ChevronsUpDown, Plus, Settings } from "lucide-react"

// UI
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import toast from "react-hot-toast"

// Next
import Image from 'next/image'

// Clerk
import { useOrganizationList, useOrganization, useClerk } from '@clerk/nextjs'
import { getRoleName } from "@/lib/utils"


export function OrganizationSwitcher() {
  const { isMobile } = useSidebar()

  const { openCreateOrganization, openOrganizationProfile } = useClerk();

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  })

  const selectedOrganization = useOrganization();

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
      toast.success("You have successfully switched to the selected organization. Redirecting...", { id: toastId });

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
              {selectedOrganization.isLoaded ? (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    {selectedOrganization.isLoaded && selectedOrganization.organization?.imageUrl ? (
                      <Image 
                        src={selectedOrganization.organization.imageUrl} 
                        alt={selectedOrganization.organization.name || "Organization"}
                        width={140} 
                        height={140} 
                        className="rounded-lg" 
                      />
                    ) : (
                      <Skeleton className="size-8" />
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {selectedOrganization.organization?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getRoleName(selectedOrganization.membership?.role)}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </>
              ) : (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Skeleton className="size-8" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight space-y-1">
                    <Skeleton className="w-32 h-3" />
                    <Skeleton className="w-16 h-2" />
                  </div>
                </>
              )}
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
                {userMemberships.data?.map((mem) => (
                  <DropdownMenuItem
                    key={mem.id}
                    onClick={() => setOrganization(mem.organization.id)}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      {isLoaded && mem.organization.imageUrl ? (
                        <Image 
                          src={mem.organization.imageUrl}
                          alt={mem.organization.name || "Organization"}
                          className="rounded-sm"
                          width={140}
                          height={140}
                        />
                      ) : (
                        <Skeleton className="size-6 rounded-sm" />
                      )}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {mem.organization.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {getRoleName(mem.role)}
                      </span>
                    </div>
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