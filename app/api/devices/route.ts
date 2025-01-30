import { auth } from "@/auth"
import { NextResponse } from 'next/server'
import { prisma } from '@/prisma'
import { checkPermission } from '@/lib/utils'

export const GET = auth(async function GET(req) {
    if (!req.auth) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    if (!checkPermission(req.auth.user.email || "", "viewer", true)) {
        return NextResponse.json({ message: "Not authorized" }, { status: 403 });
    }

    try {
        return NextResponse.json(await prisma.device.findMany())
    } catch {
        return NextResponse.json({ error: 'Failed to fetch devices' }, { status: 500 })
    }
})