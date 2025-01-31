
import { NextResponse, NextRequest } from "next/server";
import db from "@/db";
import { Category as categoryTable } from "@/db/schema";
import CategorySchema from "@/lib/schemas/CategorySchema";
import { currentUser, auth, clerkClient } from '@clerk/nextjs/server'
import { eq, and } from 'drizzle-orm'
//import { checkPermission } from "@/lib/utils";

export const GET = async function GET(req: NextRequest) {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    const perms = has({ permission: 'org:category:read' })
    if (!perms || !orgId) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    try {
        const categories = await db.query.Category.findMany(
            {
                with: {
                    models: true,
                    items: true,
                    devices: true,
                },
                where: eq(categoryTable.organizationId, orgId)
            }
        )
        return NextResponse.json({ success: true, data: categories });
    } catch {
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
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const perms = has({ permission: 'org:category:write' })
        if (!perms || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const response = CategorySchema.safeParse(req.body);
        if (!response.success) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const { type, name } = response.data;

        await db.insert(categoryTable).values({ type: type, name: name, organizationId: orgId });

        return NextResponse.json({ success: true });
    } catch (error) {
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
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const perms = has({ permission: 'org:device:destructive' })
        if (!perms || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const id = req.nextUrl.searchParams.get('id') as string;

        await db.delete(categoryTable).where(and(eq(categoryTable.id, id), eq(categoryTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to delete category" },
            { status: 500 }
        );
    }
};
export const PUT = async function PUT(req: NextRequest) {
    try 
        {
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
