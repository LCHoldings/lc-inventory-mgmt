"use client"

import { useEffect } from "react"
import { useRouter } from 'next/navigation';

import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { redirect } from "next/navigation";

import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Page() {
    const { data: session } = useSession()
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!session) {
                redirect('/auth/signin')
            }
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, [session])

    const userData = {
        name: session?.user?.name || "John Doe",
        email: session?.user?.email || "",
        image: session?.user?.image || "",
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink  onClick={() => router.push('/dashboard')}>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Account</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="flex flex-row items-center gap-6">
                        <Avatar className="size-24 rounded-full">
                            <AvatarImage src={userData.image} alt={userData.name} />
                            <AvatarFallback className="rounded-lg">
                                {userData.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-bold">{userData.name}</h1>
                            <p className="text-gray-500">{userData.email}</p>
                        </div>
                    </div>
                </div>
                <a  onClick={() => router.push('/dashboard/account/settings')}>Settings</a>
            </SidebarInset>
        </SidebarProvider>
    )
}
