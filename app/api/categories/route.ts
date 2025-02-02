
import { NextResponse, NextRequest } from "next/server";
import db from "@/db";
import { Category as categoryTable } from "@/db/schema";
import CategorySchema from "@/lib/schemas/CategorySchema";
import { auth } from '@clerk/nextjs/server'
import { eq, and } from 'drizzle-orm'



export const GET = async function GET(req: NextRequest) {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:category:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let categories;
        try {
            categories = await db.query.Category.findMany({
                with: {
                    models: true,
                    items: true,
                    devices: true,
                },
                where: eq(categoryTable.organizationId, orgId)
            });
        } catch (error) 
        {
            console.log(error)
            categories = await db.query.Category.findMany({
                where: eq(categoryTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: categories });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch categories" },
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

        const perms = has({ permission: 'org:category:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bodyRaw = await req.json()
        const response = CategorySchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { type, name } = response.data;

        await db.insert(categoryTable).values({ type: type, name: name, organizationId: orgId });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to create category" },
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

        await db.delete(categoryTable).where(and(eq(categoryTable.id, id), eq(categoryTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to delete category" },
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

        const response = CategorySchema.safeParse(req.body);
        if (!response.success) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const { type, name } = response.data;

        await db.update(categoryTable).set({ type: type, name: name }).where(and(eq(categoryTable.id, id), eq(categoryTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}
