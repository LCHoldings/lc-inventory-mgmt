import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const statuses = await prisma.manufacturer.findMany()
        return NextResponse.json(statuses)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch manufacturers' }, { status: 500 })
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
        return NextResponse.json({ error: 'Failed to create manufacturer' }, { status: 500 })
    }
})

export const DELETE = auth(async function DELETE(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { manufacturerId } = await req.json()
        await prisma.manufacturer.delete({
            where: { id: manufacturerId },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to delete manufacturer' }, { status: 500 })
    }
})

export const PUT = auth(async function PUT(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { manufacturerId, name, image, siteUrl, supportEmail, supportPhone, supportUrl } = await req.json()

        const status = await prisma.manufacturer.update({
            where: { id: manufacturerId },
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
        return NextResponse.json({ error: 'Failed to update manufacturer' }, { status: 500 })
    }
})