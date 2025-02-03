import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from "@/db";
import { Item as itemsTable } from "@/db/schema";
import ItemSchema from "@/lib/schemas/ItemSchema";
import { eq, and } from 'drizzle-orm'

export const GET = async function GET() {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:item:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let items;
        try {
            items = await db.query.Item.findMany({
                with: {
                    Status: true,
                    Location: true,
                    Model: true,
                    Supplier: true,
                    Manufacturer: true,
                    category: true
                },
                where: eq(itemsTable.organizationId, orgId)
            });
        } catch {
            items = await db.query.Category.findMany({
                where: eq(itemsTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: items });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch items" },
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
        const perms = has({ permission: 'org:item:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const bodyRaw = await req.json()
        const response = ItemSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const {name, locationId, purchaseCost, purchaseDate, supplierId, purchaseOrderId, serialNumber, modelId, image, byod, notes, available, manufacturerId, categoryId, currentUserId, statusId } = response.data;
        await db.insert(itemsTable).values({ name, locationId, purchaseCost, purchaseDate, supplierId, purchaseOrderId, serialNumber, modelId, image, byod, notes, available, manufacturerId, currentUserId, categoryId, organizationId: orgId, statusId });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to create item" },
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

        const perms = has({ permission: 'org:item:delete' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        await db.delete(itemsTable).where(and(eq(itemsTable.id, id), eq(itemsTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to delete item" },
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

        const perms = has({ permission: 'org:model:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const bodyRaw = await req.json()
        const response = ItemSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const {name, locationId, purchaseCost, purchaseDate, supplierId, purchaseOrderId, serialNumber, modelId, image, byod, notes, available,manufacturerId,categoryId, currentUserId, statusId } = response.data;
        await db.update(itemsTable).set({ name, locationId, purchaseCost, purchaseDate, supplierId, purchaseOrderId, serialNumber, modelId, image, byod, notes, available,manufacturerId,categoryId,currentUserId,statusId }).where(and(eq(itemsTable.id, id), eq(itemsTable.organizationId, orgId)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to update manufactoruer" },
            { status: 500 }
        );
    }
}