import { NextResponse, NextRequest } from 'next/server'
import { currentUser, auth, clerkClient } from '@clerk/nextjs/server'
import db from "@/db";
import { Model as modelsTable } from "@/db/schema";
import ModelSchema from "@/lib/schemas/ModelSchema";
import { eq, and } from 'drizzle-orm'

export const GET = async function GET(req: NextRequest) {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:model:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let models;
        try {
            models = await db.query.Model.findMany({
                with: {
                    items: true,
                    devices: true,
                },
                where: eq(modelsTable.organizationId, orgId)
            });
        } catch (err) {
            models = await db.query.Category.findMany({
                where: eq(modelsTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: models });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch manufactorues" },
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
        const perms = has({ permission: 'org:model:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const bodyRaw = await req.json()
        const response = ModelSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { modelNumber, manufacturerId,categoryId, name, image } = response.data;
        await db.insert(modelsTable).values({ name,image, modelNumber, manufacturerId, categoryId, organizationId: orgId });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to create manufactoruer" },
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

        const perms = has({ permission: 'org:model:delete' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        await db.delete(modelsTable).where(and(eq(modelsTable.id, id), eq(modelsTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to delete manufactoruer" },
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
        const response = ModelSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { modelNumber, manufacturerId,categoryId, name, image } = response.data;
        await db.update(modelsTable).set({ modelNumber, manufacturerId, categoryId,  name, image }).where(and(eq(modelsTable.id, id), eq(modelsTable.organizationId, orgId)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to update manufactoruer" },
            { status: 500 }
        );
    }
}