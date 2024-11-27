import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
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
})

export const POST = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { name, type } = await req.json()
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
})

export const DELETE = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { categoryid } = await req.json()
        await prisma.category.delete({
            where: { categoryid },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }
})