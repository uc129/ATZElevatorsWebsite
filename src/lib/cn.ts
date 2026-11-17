import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins class names and resolves conflicting Tailwind utilities (last wins).
 * Required by the cuicui components: https://cuicui.day/getting-started
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
