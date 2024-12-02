import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { checkPermission } from "@/lib/utils"
import { APIResponses } from "@/lib/responses"

export const GET = auth(async function GET(req) {
    const action = req.nextUrl.searchParams.get('action')
    const manufacturerId = req.nextUrl.searchParams.get('manufacturerId')

    if (!action) { return NextResponse.json({ error: APIResponses["NoParams"] }, { status: 400 }) }

    // if (!req.auth) {
    //     return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    // }

    // if (!checkPermission(req.auth.user.email || "", "viewer", true)) {
    //     return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    // }

    if (!action) { return NextResponse.json({ error: APIResponses["InvalidAction"] }, { status: 400 }) }

    if (action === 'getManufacturers') {
        try {
            return NextResponse.json(await prisma.manufacturer.findMany())
        } catch {
            return NextResponse.json({ error: APIResponses["FailedToFetch"] }, { status: 500 })
        }
    } else if (action === 'getManufacturerItems') {
        try {
            const items = await prisma.item.findMany({ where: { manufacturerId: (manufacturerId || "") } })
            console.log(items.length)
            return NextResponse.json({ itemCount: items.length })
        } catch {
            return NextResponse.json({ error: APIResponses["FailedToFetch"] }, { status: 500 })
        }
    } else if (action === 'getManufacturerDevices') {
        try {
            const devices = await prisma.device.findMany({ where: { manufacturerId: (manufacturerId || "") } })
            console.log(devices.length)
            return NextResponse.json({ deviceCount: devices.length })
        } catch (error) {
            console.error(error)
            return NextResponse.json({ error: APIResponses["FailedToFetch"] }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: APIResponses["InvalidAction"] }, { status: 400 })
    }

})

export const POST = auth(async function POST(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { name, image, siteUrl, supportEmail, supportPhone, supportUrl } = await req.json()

        const status = await prisma.manufacturer.create({
            data: {
                id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                name,
                image,
                siteUrl,
                supportEmail,
                supportPhone,
                supportUrl,
            },
        })
        return NextResponse.json(status)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: APIResponses["FailedToCreate"] }, { status: 500 })
    }
})

export const DELETE = auth(async function DELETE(req) {
    if (!req.auth) {
        return NextResponse.json({ error: APIResponses["NotAuthenticated"] }, { status: 401 })
    }
    try {
        const { id } = await req.json()
        await prisma.manufacturer.delete({
            where: { id: id },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: APIResponses["FailedToDelete"] }, { status: 500 })
    }
})

export const PUT = auth(async function PUT(req) {
    if (!req.auth) {
        return NextResponse.json({ error: APIResponses["NotAuthenticated"] }, { status: 401 })
    }
    try {
        const { id, name, image, siteUrl, supportEmail, supportPhone, supportUrl } = await req.json()

        const status = await prisma.manufacturer.update({
            where: { id },
            data: {
                name,
                image,
                siteUrl,
                supportEmail,
                supportPhone,
                supportUrl,
            },
        })
        return NextResponse.json(status)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: APIResponses["FailedToUpdate"] }, { status: 500 })
    }
})