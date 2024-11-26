import { Suspense } from 'react'
import { prisma } from '@/prisma'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertCircle, Smartphone, Laptop, ComputerIcon as Desktop } from 'lucide-react'
import Image from 'next/image'

async function getDevices() {
    return await prisma.device.findMany({
        include: {
            status: true,
            current_user: true,
            location: true,
            model: {
                include: {
                    manufacturer: true,
                    category: true,
                },
            },
            image: true,
        },
    })
}

function DeviceIcon({ category }) {
    switch (category.toLowerCase()) {
        case 'smartphone':
            return <Smartphone className="w-5 h-5" />
        case 'laptop':
            return <Laptop className="w-5 h-5" />
        default:
            return <Desktop className="w-5 h-5" />
    }
}

function StatusBadge({ status }) {
    return (
        <Badge
            variant="outline"
            style={{ backgroundColor: status.color, color: 'white' }}
        >
            {status.name}
        </Badge>
    )
}

function AvailabilityIcon({ available }) {
    return available ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
        <XCircle className="w-5 h-5 text-red-500" />
    )
}

function DeviceList({ devices }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Current User</TableHead>
                    <TableHead>Available</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {devices.map((device) => (
                    <TableRow key={device.id}>
                        <TableCell>
                            {device.image ? (
                                <Image
                                    src={device.image.cdn_url}
                                    alt={device.name}
                                    width={50}
                                    height={50}
                                    className="rounded-md"
                                />
                            ) : (
                                <AlertCircle className="w-10 h-10 text-gray-300" />
                            )}
                        </TableCell>
                        <TableCell className="font-medium">{device.name}</TableCell>
                        <TableCell>{device.model?.name || 'N/A'}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <DeviceIcon category={device.model?.category?.name || 'unknown'} />
                                {device.model?.category?.name || 'Unknown'}
                            </div>
                        </TableCell>
                        <TableCell>
                            <StatusBadge status={device.status} />
                        </TableCell>
                        <TableCell>{device.location?.name || 'N/A'}</TableCell>
                        <TableCell>{device.current_user?.name || 'N/A'}</TableCell>
                        <TableCell>
                            <AvailabilityIcon available={device.available} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default async function Page() {
    const devices = await getDevices()

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
                                    <BreadcrumbLink href="/dashboard">
                                        Dashboard
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Devices</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <Suspense fallback={<div>Loading devices...</div>}>
                        <DeviceList devices={devices} />
                    </Suspense>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

