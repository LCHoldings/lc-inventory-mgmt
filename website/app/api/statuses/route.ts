import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const statuses = await prisma.status.findMany()
        return NextResponse.json(statuses)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch statuses' }, { status: 500 })
    }
})

export const POST = auth(async function POST(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { name, color, default: isDefault } = await req.json()

        if (isDefault === true) {
            const checkIfDefaultExists = await prisma.status.findFirst({
                where: {
                    default: true,
                },
            })
            if (checkIfDefaultExists) {
                return NextResponse.json({ error: 'Default status already exists' }, { status: 400 })
            }
        }

        const status = await prisma.status.create({
            data: {
                id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                name,
                color,
                default: isDefault,
            },
        })
        return NextResponse.json(status)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create status' }, { status: 500 })
    }
})

export const DELETE = auth(async function DELETE(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { statusid } = await req.json()
        await prisma.status.delete({
            where: { id: statusid },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to delete status' }, { status: 500 })
    }
})

export const PUT = auth(async function PUT(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { statusid, name, color, default: isDefault } = await req.json()

        console.log("name", name, "color", color, "default", isDefault, "statusid", statusid)

        const checkDefault = await prisma.status.findFirst({
            where: {
                default: true,
            },
        })
        console.log("statusid", statusid, "checkDefault", checkDefault?.id)
        if (isDefault === true && checkDefault?.id !== statusid) {
            return NextResponse.json({ error: 'Default status already exists' }, { status: 400 })
        }

        const status = await prisma.status.update({
            where: { id: statusid },
            data: {
                name,
                color,
                default: isDefault,
            },
        })
        return NextResponse.json(status)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
    }
})