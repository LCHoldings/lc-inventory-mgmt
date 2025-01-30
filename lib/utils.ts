import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from 'next/server'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Session } from "next-auth"

// Uncertain
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Gets the URL for a specific location using the location ID.
export function getLocationURL(locationId: string) {
  return `dashboard/locations/${locationId}`
}

// Gets the URL for a specific user using the user ID.
export function getUserURL(userId: string) {
  return `dashboard/users/${userId}`
}

// Gets the data for a specific user using their email.
export async function getUserFromEmail(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  return user
}

// Checks permissions for a specific user.
// userEmail: The email of the user.
// type: The type of permission required to return true.
// checkSuspended: If the user is suspended, return false.
// Returns true if the user has the required permission.
// Ex: checkPermission("me@lazyllama.xyz", "admin", false) -> true (if user is admin and might be suspended)
// Ex: checkPermission("me@lazyllama.xyz", "viewer", true) -> false (if user is suspended)
export const checkPermission = async (userEmail: string, type: string, checkSuspended?: boolean) => {
  const user = await getUserFromEmail(userEmail);

  const userRole = user?.accountType;

  if (checkSuspended && user?.suspended) {
    return false;
  }

  // Explanation:
  // 1. If user is admin or user role is the same as the type.
  // 2. If user is editor and type is viewer.
  // Admin - Can do everything. Highest permission.
  // Editor - Can edit general stuff. Mid permission.
  // Viewer - Can view stuff. Lowest permission.
  // TODO: Remake this entirely.

  if ((userRole === "admin" || userRole === type) || (userRole === "editor" && type === "viewer")) {
    return true
  }

  return false;
};