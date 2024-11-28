'use server'

import { Suspense } from 'react'
import { prisma } from '@/prisma'
import { Device } from '@prisma/client'

import { getLocationURL, getUserFromEmail, getUserURL } from '@/lib/utils'

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
    return await prisma.device.findMany()
}

async function DeviceIcon({ categoryId }: { categoryId: string }) {
    const categoryName = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { name: true },
    })

    switch (String(categoryName).toLowerCase()) {
        case 'smartphone':
            return <Smartphone className="w-5 h-5" />
        case 'laptop':
            return <Laptop className="w-5 h-5" />
        default:
            return <Desktop className="w-5 h-5" />
    }
}

async function StatusBadge({ statusId }: { statusId: string }) {
    const status = await prisma.status.findUnique({
        where: { id: statusId },
        select: { name: true, color: true },
    })

    return (
        <Badge
            variant="outline"
            style={{ backgroundColor: (status?.color || "#FFF"), color: 'white' }}
        >
            {status?.name || 'N/A'}
        </Badge>
    )
}

async function getLocationName(locationId: string) {
    const locationName = await prisma.location.findUnique({
        where: { id: locationId },
        select: { name: true },
    })

    if (!locationName) {
        return 'N/A'
    } else {
        return locationName.name
    }
}

function AvailabilityIcon({ available }: { available: boolean }) {
    return available ? (
        <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
        <XCircle className="w-5 h-5 text-red-500" />
    )
}

async function getUserName(userEmail: string) {
    const user = await getUserFromEmail(userEmail)
    return user?.name || ""
}

function DeviceList({ devices }: { devices: Device[] }) {

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
                                    src={device.image}
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
                        <TableCell>{device.modelId || 'N/A'}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                {/* <DeviceIcon categoryId={device.categoryId || 'unknown'} /> Category name */}
                                {device.categoryId || 'N/A'} {/* Category name */}
                            </div>
                        </TableCell>
                        <TableCell>
                            {/* <StatusBadge statusId={device.statusId} /> */}
                            <p>{device.statusId || "N/A"}</p>
                        </TableCell>
                        <TableCell>
                            <a>
                                {/* getLocationName(device?.locationId || "1") */}
                                {device.locationId || 'N/A'}
                            </a>
                        </TableCell>
                        <TableCell>
                            <a>
                                {/* getUserName(device?.currentUserId || 'N/A') */}
                                {device.currentUserId || 'N/A'}
                            </a>
                        </TableCell>
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
                                    <BreadcrumbLink>
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

