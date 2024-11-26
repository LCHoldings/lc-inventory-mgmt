import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export async function GET() {
    try {
        const categories = await prisma.category.findMany()
        const serializedCategories = categories.map(category => ({
            ...category,
            id: category.id.toString(), // assuming 'id' is the BigInt field
        }))
        return NextResponse.json(serializedCategories)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name, type } = await request.json()
        const category = await prisma.category.create({
            data: {
                categoryid: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
                name,
                type,
            },
        })
        const serializedCategory = {
            ...category,
            id: category.id.toString(), // assuming 'id' is the BigInt field
        }
        return NextResponse.json(serializedCategory)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { categoryid } = await request.json()
        await prisma.category.delete({
            where: { categoryid },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }
}