import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export async function GET() {
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
}

export async function POST(request: Request) {
    try {
        const { name, color, default: isDefault } = await request.json()
        console.log(name, color, isDefault)
        
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
}

export async function DELETE(request: Request) {
    try {
        const { statusid } = await request.json()
        await prisma.status.delete({
            where: { statusid },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete status' }, { status: 500 })
    }
}
