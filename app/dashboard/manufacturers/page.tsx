

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
import ManufacturerList from '@/components/manufacturer/manufacturers-list'
import { ManufacturerAddModal } from '@/components/manufacturer/manufactuer-add-model'


export default function Page() {

   

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
                            <ManufacturerAddModal />
                        </div>
                        <ManufacturerList/>
                    </Suspense>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}