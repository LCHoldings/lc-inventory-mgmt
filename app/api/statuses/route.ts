
import { NextResponse, NextRequest } from "next/server";
import db from "@/db";
import { Status as statusTable } from "@/db/schema";
import statusSchema from "@/lib/schemas/StatusSchema";
import { auth} from '@clerk/nextjs/server'
import { eq, and } from 'drizzle-orm'

export const GET = async function GET() {
    const { userId, orgId, has } = await auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const perms = has({ permission: 'org:status:read' })
    if (!perms || !orgId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        let Status;
        try {
            Status = await db.query.Status.findMany({
                with: {
                    items: true,
                    devices: true,
                },
                where: eq(statusTable.organizationId, orgId)
            });
        } catch {
            Status = await db.query.Status.findMany({
                where: eq(statusTable.organizationId, orgId)
            });
        }
        return NextResponse.json({ success: true, data: Status });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch Statuses" },
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

        const perms = has({ permission: 'org:status:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bodyRaw = await req.json()
        const response = statusSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { name, color, default: isDefault } = response.data;
        if (isDefault) {
            const defaultStatus = await db.query.Status.findMany({
                where: and(eq(statusTable.default, true), eq(statusTable.organizationId, orgId))
            });
            if (defaultStatus.length > 0) {
                await db.update(statusTable).set({ default: false }).where(and(eq(statusTable.default, true), eq(statusTable.organizationId, orgId)));
            }
        }
        await db.insert(statusTable).values({ default: isDefault, color: color, name: name, organizationId: orgId });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to create Statuses" },
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

        const perms = has({ permission: 'org:status:delete' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        await db.delete(statusTable).where(and(eq(statusTable.id, id), eq(statusTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to delete Statuses" },
            { status: 500 }
        );
    }
};
export const PUT = async function PUT(req: NextRequest) {
    try {
        const { userId, orgId, has } = await auth()

        if (!userId) {
            console.log('Unauthorized')
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const perms = has({ permission: 'org:status:write' })
        if (!perms || !orgId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const id = req.nextUrl.searchParams.get('id') as string;
        if (!id) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }
        const bodyRaw = await req.json()
        const response = statusSchema.safeParse(bodyRaw);
        if (!response.success) {
            return NextResponse.json({ error: response.error }, { status: 400 });
        }
        const { name, color, default: isDefault } = response.data;
        if (isDefault) {
            const defaultStatus = await db.query.Status.findMany({
                where: and(eq(statusTable.default, true), eq(statusTable.organizationId, orgId))
            });
            if (defaultStatus.length > 0) {
                await db.update(statusTable).set({ default: false }).where(and(eq(statusTable.default, true), eq(statusTable.organizationId, orgId)));
            }
        }
        await db.update(statusTable).set({ default: isDefault, color: color, name: name  }).where(and(eq(statusTable.id, id), eq(statusTable.organizationId, orgId)));

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to update Statuses" },
            { status: 500 }
        );
    }
}
