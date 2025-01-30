import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const models = await prisma.model.findMany()
        return NextResponse.json(models)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 })
    }
})

export const POST = auth(async function POST(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { name, image, modelNumber, manufacturerId, categoryId } = await req.json()
        const model = await prisma.model.create({
            data: {
                id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                name,
                image,
                modelNumber,
                manufacturerId,
                categoryId
            },
        })
        return NextResponse.json(model)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create model' }, { status: 500 })
    }
})

export const DELETE = auth(async function DELETE(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { modelid } = await req.json()
        await prisma.model.delete({
            where: { id: modelid },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to delete model' }, { status: 500 })
    }
})