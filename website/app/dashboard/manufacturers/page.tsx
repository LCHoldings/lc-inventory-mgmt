'use client'

import { Suspense } from 'react'
import { Manufacturer } from '@prisma/client'
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ManufacturerList } from '@/components/manufacturers-list'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function Page() {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])

    useEffect(() => {
        fetch('/api/manufacturers')
            .then(res => res.json())
            .then(data => setManufacturers(data))
    }, [])

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
                                    <BreadcrumbLink>
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Manufacturers</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Suspense fallback={<div>Loading manufacturers...</div>}>
                        <div className='flex flex-row justify-between'>
                            <h1 className="text-2xl font-semibold">Manufacturers</h1>
                            <Button className="btn btn-primary">Add Manufacturer <Plus /> </Button>
                        </div>
                        <ManufacturerList manufacturers={manufacturers} />
                    </Suspense>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}