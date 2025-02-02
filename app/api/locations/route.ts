import { NextResponse, NextRequest } from 'next/server'
import { currentUser, auth, clerkClient } from '@clerk/nextjs/server'
import db from "@/db";
import { Location as locationTable } from "@/db/schema";
import LocationSchema from "@/lib/schemas/LocationSchema";
import { eq, and } from 'drizzle-orm'

export const GET = async function GET(req: NextRequest) {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:location:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let locations;
        try {
            locations = await db.query.Location.findMany({
                with: {
                    items: true,
                    devices: true,
                },
                where: eq(locationTable.organizationId, orgId)
            });
        } catch (err) {
            locations = await db.query.Location.findMany({
                where: eq(locationTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: locations });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch location" },
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
        const perms = has({ permission: 'org:location:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const bodyRaw = await req.json()
        const response = LocationSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { name } = response.data;
        await db.insert(locationTable).values({ name,  organizationId: orgId });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to create location" },
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

        const perms = has({ permission: 'org:location:delete' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        await db.delete(locationTable).where(and(eq(locationTable.id, id), eq(locationTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to delete location" },
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

        const perms = has({ permission: 'org:location:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const bodyRaw = await req.json()
        const response = LocationSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { name, } = response.data;
        await db.update(locationTable).set({   name, }).where(and(eq(locationTable.id, id), eq(locationTable.organizationId, orgId)));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to update location" },
            { status: 500 }
        );
    }
}