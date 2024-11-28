import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const suspended = await prisma.user.findUnique({
            where: { email: req.auth.user.email },
            select: { suspended: true },
        })
        return NextResponse.json(suspended)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch statuses' }, { status: 500 })
    }
})