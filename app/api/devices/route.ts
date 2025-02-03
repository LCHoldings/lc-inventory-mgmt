import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from "@/db";
import { Device as deviceTable } from "@/db/schema";
import DeviceSchema from "@/lib/schemas/DeviceSchema";
import { eq, and } from 'drizzle-orm'

export const GET = async function GET() {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:device:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let devices;
        try {
            devices = await db.query.Device.findMany({
                with: {
                    Status: true,
                    Location: true,
                    Supplier: true,
                    Model: true,
                    Category: true,
                    Manufacturer: true,
                },
                where: eq(deviceTable.organizationId, orgId)
            });
        } catch {
            devices = await db.query.Category.findMany({
                where: eq(deviceTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: devices });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch device" },
            { status: 500 }
        );
    }
}


export const POST = async function POST(req: NextRequest) {
    try {
        const { userId, orgId, has } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const perms = has({ permission: 'org:device:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const bodyRaw = await req.json()
        const response = DeviceSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { name, statusId, locationId, purchaseCost, purchaseDate, supplierId, purchaseOrderId, serialNumber, modelId, image, byod, notes, available, manufacturerId, categoryId, currentUserId } = response.data;
        await db.insert(deviceTable).values({ name, statusId, locationId, purchaseCost, purchaseDate, supplierId, purchaseOrderId, serialNumber, modelId, image, byod, notes, available, manufacturerId, categoryId, currentUserId, organizationId: orgId });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to create device" },
            { status: 500 }
        );
    }
}

export const DELETE = async function DELETE(req: NextRequest) {
    try {
        const { userId, orgId, has } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const perms = has({ permission: 'org:device:destructive' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        await db.delete(deviceTable).where(and(eq(deviceTable.id, id), eq(deviceTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to delete device" },
            { status: 500 }
        );
    }
}
export const PUT = async function PUT(req: NextRequest) {
    try {
        const { userId, orgId, has } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const perms = has({ permission: 'org:device:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const bodyRaw = await req.json()
        const response = DeviceSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { name, statusId, locationId, purchaseCost, purchaseDate, supplierId, purchaseOrderId, serialNumber, modelId, image, byod, notes, available, manufacturerId, categoryId } = response.data;
        await db.update(deviceTable).set({   name, statusId, locationId, purchaseCost, purchaseDate, modelId, supplierId, purchaseOrderId, serialNumber,  image, byod, notes, available, manufacturerId, categoryId }).where(and(eq(deviceTable.id, id), eq(deviceTable.organizationId, orgId)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to update device" },
            { status: 500 }
        );
    }
}