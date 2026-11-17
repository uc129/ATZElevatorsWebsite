"use client";

/**
 * Header navigation link: marks the current section with aria-current and a
 * cyan underline. Hover style after cuicui "Vercel navigation"
 * (https://cuicui.day/common-ui/navigation), CSS only.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function navLinkStyles(active: boolean) {
  return cn(
    "relative inline-flex min-h-11 items-center rounded-sm px-3.5 py-2.5 text-base font-medium text-ink no-underline transition-colors duration-150 hover:bg-box hover:text-brand-ink",
    "after:absolute after:inset-x-3.5 after:bottom-1.5 after:h-0.5 after:rounded-full after:bg-brand-line after:transition-transform after:duration-250 after:ease-mechanical",
    active ? "text-brand-ink after:scale-x-100" : "after:scale-x-0",
  );
}

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isActive(pathname, href);
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={navLinkStyles(active)}>
      {label}
    </Link>
  );
}
