import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }
    try {
        const devices = await prisma.device.findMany()
        return NextResponse.json(devices)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch devices' }, { status: 500 })
    }
})