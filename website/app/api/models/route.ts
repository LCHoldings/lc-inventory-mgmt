import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const models = await prisma.model.findMany()
        const serializedModels = models.map(models => ({
            ...models,
            id: models.id.toString(), // assuming 'id' is the BigInt field
        }))
        return NextResponse.json(serializedModels)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 })
    }
})

export const POST = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { name, image, model_number, manufacturerId, categoryId } = await req.json()
        const model = await prisma.model.create({
            data: {
                id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                name,
                image,
                model_number,
                manufacturerId,
                categoryId
            },
        })
        const serializedModel = {
            ...model,
            id: model.id.toString(), // assuming 'id' is the BigInt field
        }
        return NextResponse.json(serializedModel)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create model' }, { status: 500 })
    }
})

export const DELETE = auth(async function GET(req) {
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