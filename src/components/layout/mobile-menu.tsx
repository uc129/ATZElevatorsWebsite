"use client";

/**
 * Phone and tablet menu: a disclosure below the header with large tap
 * targets. Closes on Esc, outside click, link click and route change.
 */
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { liftCategories, liftHref } from "@/content/lifts";
import { mainNav, supportLink } from "@/content/navigation";
import { EnquiryButton } from "./enquiry";
import { isActive } from "./nav-link";
import { useDismiss } from "./use-dismiss";

const itemClass =
  "flex min-h-13 items-center rounded-control px-3 text-lg font-medium text-ink no-underline hover:bg-box hover:text-brand-ink current:text-brand-ink";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);
  useDismiss({ open, onClose: close, rootRef, triggerRef });

  const links = [{ label: "Lifts", href: "/lifts" }, ...mainNav, supportLink];

  return (
    <div ref={rootRef} className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-control border-2 border-line-strong bg-white text-brand-ink transition-colors hover:border-brand hover:bg-box"
      >
        {open ? (
          <X aria-hidden="true" className="size-6" />
        ) : (
          <Menu aria-hidden="true" className="size-6" />
        )}
      </button>

      <nav
        id={panelId}
        aria-label="Mobile"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-below-header overflow-y-auto border-y border-line bg-white px-4 pt-2 pb-6 shadow-diffuse"
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={close}
                aria-current={isActive(pathname, link.href) ? "page" : undefined}
                className={itemClass}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className="mt-2 grid grid-cols-2 gap-1 border-t border-line pt-3"
          aria-label="Lift types"
        >
          {liftCategories.map((c) => (
            <li key={c.slug}>
              <Link
                href={liftHref(c.slug)}
                onClick={close}
                className={cn(itemClass, "min-h-11 text-base text-muted")}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
        <EnquiryButton size="lg" className="mt-4 w-full" onClick={close}>
          Get a quote
        </EnquiryButton>
      </nav>
    </div>
  );
}
