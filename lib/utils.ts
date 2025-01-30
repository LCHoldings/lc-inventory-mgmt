import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Uncertain
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}