import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const statuses = await prisma.status.findMany()
        const serializedStatuses = statuses.map(status => ({
            ...status,
            id: status.id.toString(),
        }))
        return NextResponse.json(serializedStatuses)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch statuses' }, { status: 500 })
    }
})

export const POST = auth(async function GET(req) {
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
                statusid: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                name,
                color,
                default: isDefault,
            },
        })
        const serializedStatus = {
            ...status,
            id: status.id.toString(),
        }
        return NextResponse.json(serializedStatus)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create status' }, { status: 500 })
    }
})

export const DELETE = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { statusid } = await req.json()
        await prisma.status.delete({
            where: { statusid },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete status' }, { status: 500 })
    }
})

export const PUT = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { statusid, name, color, default: isDefault } = await req.json()

        const checkDefault = await prisma.status.findFirst({
            where: {
                default: true,
            },
        })

        if (isDefault === true && checkDefault?.statusid !== statusid) {
            return NextResponse.json({ error: 'Default status already exists' }, { status: 400 })
        }

        const status = await prisma.status.update({
            where: { statusid },
            data: {
                name,
                color,
                default: isDefault,
            },
        })
        const serializedStatus = {
            ...status,
            id: status.id.toString(),
        }
        return NextResponse.json(serializedStatus)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
    }
})