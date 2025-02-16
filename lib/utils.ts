import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert prisma object to regular js object
// Prisma converts its objects to plain JavaScript objects to ensure compatibility with various JavaScript operations and libraries.
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}