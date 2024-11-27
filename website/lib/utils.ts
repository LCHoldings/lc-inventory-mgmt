import { prisma } from "@/prisma"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocationURL(locationId: string) {
  return `dashboard/locations/${locationId}` 
}

export function getUserURL(userId: string) {
  return `dashboard/users/${userId}`
}

export function getUserFromId(userId: string) {
  const user = prisma.user.findUnique({
    where: { id: userId },
  })

  return user
}