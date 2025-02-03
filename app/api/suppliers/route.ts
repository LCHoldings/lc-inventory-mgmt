
import { NextResponse, NextRequest } from "next/server";
import db from "@/db";
import { Supplier as supplierTable } from "@/db/schema";
import SupplierSchema from "@/lib/schemas/SupplierSchema";
import { auth } from '@clerk/nextjs/server'
import { eq, and } from 'drizzle-orm'


export const GET = async function GET() {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:supplier:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let categories;
        try {
            categories = await db.query.Supplier.findMany({
                with: {
                    items: true,
                    devices: true,
                },
                where: eq(supplierTable.organizationId, orgId)
            });
        } catch {
            categories = await db.query.Supplier.findMany({
                where: eq(supplierTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch suppliers" },
            { status: 500 }
        );
    }
}

export const POST = async function POST(req: NextRequest) {
    try {
        const { userId, orgId, has } = await auth()

        if (!userId) {
            console.log('Unauthorized')
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const perms = has({ permission: 'org:supplier:read' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bodyRaw = await req.json()
        const response = SupplierSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { website, phoneNumber,contactPerson, postAdress, emailAdress,name } = response.data;

        await db.insert(supplierTable).values({ website, phoneNumber, contactPerson, postAdress, emailAdress,name, organizationId: orgId });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to create supplier" },
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

        const perms = has({ permission: 'org:supplier:delete' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        await db.delete(supplierTable).where(and(eq(supplierTable.id, id), eq(supplierTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to delete supplier" },
            { status: 500 }
        );
    }
};
export const PUT = async function PUT(req: NextRequest) {
    try {
        const { userId, orgId, has } = await auth()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const perms = has({ permission: 'org:category:write' })
        if (!perms || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const id = req.nextUrl.searchParams.get('id') as string;

        const response = SupplierSchema.safeParse(req.body);
        if (!response.success) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const { website, phoneNumber,contactPerson, postAdress, emailAdress,name } = response.data;

        await db.update(supplierTable).set({ website, phoneNumber, contactPerson, postAdress, emailAdress,name  }).where(and(eq(supplierTable.id, id), eq(supplierTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}
