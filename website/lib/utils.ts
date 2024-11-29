import { SignInPageErrorParam } from './types';
import { prisma } from "@/prisma"
import { NextRequest, NextResponse } from 'next/server'
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Session } from "next-auth"

export const signinErrors: Record<SignInPageErrorParam | "default", string> = {
  default: "Unable to sign in. Please try again.",
  Signin: "Try signing in with a different account or contact your administrator.",
  OAuthSignin: "Try signing in with a different account or contact your administrator.",
  OAuthCallbackError: "Try signing in with a different account or contact your administrator.",
  OAuthCreateAccount: "Try signing in with a different account or contact your administrator.",
  EmailCreateAccount: "Try signing in with a different account or contact your administrator.",
  Callback: "Try signing in with a different account or contact your administrator.",
  OAuthAccountNotLinked:
    "An account with the same e-mail address already exists. Please verify your identity by signing in like normally or contact your administrator.",
  EmailSignin: "The e-mail could not be sent. Please try again or contact your administrator.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  MissingCSRF: "An error occurred. Please refresh the page try again. If it persists, contact your administrator.",
  AccessDenied: "Your account is currently suspended. Please contact your administrator.",
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocationURL(locationId: string) {
  return `dashboard/locations/${locationId}` 
}

export function getUserURL(userId: string) {
  return `dashboard/users/${userId}`
}

export async function getUserFromEmail(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  })

  return user
}

export async function checkUserType(userEmail: string, type: string, checkSuspended?: string) {
  const user = await getUserFromEmail(userEmail)

  if (checkSuspended && user?.suspended) {
    return false
  }

  return user?.accountType == type
}