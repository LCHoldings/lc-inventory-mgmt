import { NextResponse, NextRequest } from 'next/server'
import { currentUser, auth, clerkClient } from '@clerk/nextjs/server'
import db from "@/db";
import { Manufacturer as manufacturerTable } from "@/db/schema";
import statusSchema from "@/lib/schemas/StatusSchema";
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
            categories = await db.query.Manufacturer.findMany({
                with: {
                    models: true,
                    items: true,
                    devices: true,
                },
                where: eq(manufacturerTable.organizationId, orgId)
            });
        } catch (err) {
            categories = await db.query.Category.findMany({
                where: eq(manufacturerTable.organizationId, orgId)
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
    // if (!req.auth) {
    //     return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    // }
    // try {
    //     const { name, image, siteUrl, supportEmail, supportPhone, supportUrl } = await req.json()

    //     const status = await prisma.manufacturer.create({
    //         data: {
    //             id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
    //             name,
    //             image,
    //             siteUrl,
    //             supportEmail,
    //             supportPhone,
    //             supportUrl,
    //         },
    //     })
    //     return NextResponse.json(status)
    // } catch (error) {
    //     console.error(error)
    //     return NextResponse.json({ error: APIResponses["FailedToCreate"] }, { status: 500 })
    // }
}

export const DELETE = async function DELETE(req: NextRequest) {
//     if (!req.auth) {
//         return NextResponse.json({ error: APIResponses["NotAuthenticated"] }, { status: 401 })
//     }
//     try {
//         const { id } = await req.json()
//         await prisma.manufacturer.delete({
//             where: { id: id },
//         })
//         return NextResponse.json({ success: true })
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ error: APIResponses["FailedToDelete"] }, { status: 500 })
//     }
// })

// export const PUT = auth(async function PUT(req) {
//     if (!req.auth) {
//         return NextResponse.json({ error: APIResponses["NotAuthenticated"] }, { status: 401 })
//     }
//     try {
//         const { id, name, image, siteUrl, supportEmail, supportPhone, supportUrl } = await req.json()

//         const status = await prisma.manufacturer.update({
//             where: { id },
//             data: {
//                 name,
//                 image,
//                 siteUrl,
//                 supportEmail,
//                 supportPhone,
//                 supportUrl,
//             },
//         })
//         return NextResponse.json(status)
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ error: APIResponses["FailedToUpdate"] }, { status: 500 })
//     }
}