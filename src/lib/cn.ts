import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default scales. Our custom token names
 * (src/styles/tokens.css) must be registered, or merge treats e.g. `text-display`
 * as a colour and drops it next to `text-navy`. Keep in step with tokens.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display", "h1", "h2", "h3", "h4", "lg", "base", "sm", "caption", "xs"],
      radius: ["xs", "sm", "control", "md", "lg", "full"],
      shadow: ["xs", "sm", "md", "lg", "xl", "lift", "active", "bar", "diffuse"],
      ease: ["default", "in", "out", "mechanical"],
    },
  },
});

/**
 * Joins class names and resolves conflicting Tailwind utilities (last wins).
 * Required by the cuicui components: https://cuicui.day/getting-started
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
