import { SignInPageErrorParam } from './types';
import { prisma } from "@/prisma"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const signinErrors: Record<SignInPageErrorParam | "default", string> = {
  default: "Unable to sign in.",
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallbackError: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  MissingCSRF: "An error occurred. Please try again.",
  UserSuspended: "Your account is currently suspended. Please contact your administrator.",
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