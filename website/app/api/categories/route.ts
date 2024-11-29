import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    try {
        return NextResponse.json(await prisma.category.findMany())
    } catch {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
})

export const POST = auth(async function POST(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { name, type } = await req.json()
        const data = { id: `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`, name, type }
        
        return NextResponse.json(await prisma.category.create({ data }))
    } catch {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }
})

export const DELETE = auth(async function DELETE(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const { categoryid } = await req.json()
        await prisma.category.delete({
            where: { id: categoryid },
        })
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
    }
})