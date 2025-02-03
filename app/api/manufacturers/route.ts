import { NextResponse, NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import db from "@/db";
import { Manufacturer as manufacturerTable } from "@/db/schema";
import ManufacturerSchema from "@/lib/schemas/ManufacturerSchema";
import { eq, and } from 'drizzle-orm'

export const GET = async function GET() {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:manufacturer:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let manufactorues;
        try {
            manufactorues = await db.query.Manufacturer.findMany({
                with: {
                    models: true,
                    items: true,
                    devices: true,
                },
                where: eq(manufacturerTable.organizationId, orgId)
            });
        } catch (error) {
            console.log(error)
            manufactorues = await db.query.Category.findMany({
                where: eq(manufacturerTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: manufactorues });
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
        const perms = has({ permission: 'org:manufacturer:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const bodyRaw = await req.json()
        const response = ManufacturerSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { siteUrl, supportUrl, supportEmail, supportPhone, name, image } = response.data;
        await db.insert(manufacturerTable).values({ siteUrl, supportUrl, supportEmail, supportPhone, name, image, organizationId: orgId });
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

        const perms = has({ permission: 'org:manufacturer:delete' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        await db.delete(manufacturerTable).where(and(eq(manufacturerTable.id, id), eq(manufacturerTable.organizationId, orgId)));

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

        const perms = has({ permission: 'org:manufacturer:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const bodyRaw = await req.json()
        const response = ManufacturerSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { siteUrl, supportUrl, supportEmail, supportPhone, name, image } = response.data;
        await db.update(manufacturerTable).set({ siteUrl, supportUrl, supportEmail, supportPhone, name, image }).where(and(eq(manufacturerTable.id, id), eq(manufacturerTable.organizationId, orgId)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to update manufactoruer" },
            { status: 500 }
        );
    }
}