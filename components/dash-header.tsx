"use client"

import { Fragment } from "react"
import { SidebarTrigger } from "./ui/sidebar"
import { Separator } from "./ui/separator"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb"
import { useRouter } from "next/navigation"
import { DashHeaderProps } from "@/lib/types"

export function DashHeader({ title, breadcrumbs }: DashHeaderProps) {
    const router = useRouter()

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 bg-sidebar border-b">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink onClick={() => router.push(breadcrumb.href)}>
                                        {breadcrumb.label}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                            </Fragment>

                        ))}
                        <BreadcrumbItem>
                            <BreadcrumbPage>{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}