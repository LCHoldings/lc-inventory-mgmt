"use server"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertCircle } from 'lucide-react'
import { Manufacturer } from '@prisma/client'

import Image from 'next/image'
import { prisma } from '@/prisma'

function getDevicesForManufacturer(manufacturerId: string) {
    return prisma.device.findMany({
        where: { manufacturerId },
    })
}

function getItemsForManufacturer(manufacturerId: string) {
    return prisma.item.findMany({
        where: { manufacturerId },
    })
}

export async function ManufacturerList({ manufacturers }: { manufacturers: Manufacturer[] }) {
    const devices: { [key: string]: any[] } = {}
    const items: { [key: string]: any[] } = {}

    for (const manufacturer of manufacturers) {
        devices[manufacturer.id] = await getDevicesForManufacturer(manufacturer.id)
        items[manufacturer.id] = await getItemsForManufacturer(manufacturer.id)
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Website</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Support URL</TableHead>
                        <TableHead>Devices</TableHead>
                        <TableHead>Items</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {manufacturers.map((manufacturer) => (
                        <TableRow key={manufacturer.id}>
                            <TableCell>
                                {manufacturer.image ? (
                                    <Image
                                        src={manufacturer.image}
                                        alt={manufacturer.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md"
                                    />
                                ) : (
                                    <AlertCircle className="w-10 h-10 text-gray-300" />
                                )}
                            </TableCell>
                            <TableCell className="font-medium">{manufacturer.name}</TableCell>
                            <TableCell>
                                <p>{manufacturer.siteUrl || 'N/A'}</p>
                            </TableCell>
                            <TableCell>
                                <p>{manufacturer.supportEmail || "N/A"}</p>
                            </TableCell>
                            <TableCell>
                                <p>{manufacturer.supportPhone || "N/A"}</p>
                            </TableCell>
                            <TableCell>
                                <p>{manufacturer.supportUrl || "N/A"}</p>
                            </TableCell>

                            <TableCell>
                                <p>{devices[manufacturer.id].length}</p>
                            </TableCell>
                            <TableCell>
                                <p>{items[manufacturer.id].length}</p>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}