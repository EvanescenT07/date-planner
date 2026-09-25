import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names and resolves Tailwind CSS class conflicts.
 *
 * @param inputs - List of class names, conditionals, or class value arrays.
 * @returns Optimized combined class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
