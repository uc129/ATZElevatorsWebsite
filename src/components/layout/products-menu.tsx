"use client";

/**
 * Desktop "Lifts" menu: a disclosure button that opens a full-width panel of
 * lift categories plus a site-survey prompt. Closes on Esc, outside click,
 * link click and route change.
 * Navigation hover style after cuicui "Vercel navigation"
 * (https://cuicui.day/common-ui/navigation), rebuilt with CSS (no motion lib).
 */
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useId, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { liftCategories, liftHref } from "@/content/lifts";
import { EnquiryButton } from "./enquiry";
import { navLinkStyles } from "./nav-link";
import { useDismiss } from "./use-dismiss";

export function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);
  useDismiss({ open, onClose: close, rootRef, triggerRef });

  const inLifts = pathname === "/lifts" || pathname.startsWith("/lifts/");

  return (
    <div ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(navLinkStyles(inLifts || open), "gap-1.5")}
      >
        Lifts
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-150", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-diffuse"
      >
        <Container className="grid grid-cols-4 gap-8 py-8">
          <ul className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-1">
            {liftCategories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={liftHref(c.slug)}
                  onClick={close}
                  className="flex flex-col gap-0.5 rounded-control px-3.5 py-3 text-ink no-underline transition-colors duration-150 hover:bg-box hover:text-brand-ink"
                >
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-sm text-subtle">{c.short}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/lifts"
                onClick={close}
                className="flex flex-col gap-0.5 rounded-control px-3.5 py-3 font-semibold text-brand-ink no-underline transition-colors duration-150 hover:bg-box"
              >
                Compare all lifts
                <span className="text-sm font-normal text-subtle">Sizes, drives and doors</span>
              </Link>
            </li>
          </ul>
          <div className="flex flex-col justify-between gap-3 rounded-lg border border-box-line bg-box glow-diffuse p-6">
            <p className="font-heading text-h4 font-bold text-navy">Not sure which lift fits?</p>
            <p className="text-sm text-muted">
              Book a free site survey. An engineer checks your shaft, load and power supply, then
              recommends a lift.
            </p>
            <EnquiryButton onClick={close}>Book a site survey</EnquiryButton>
          </div>
        </Container>
      </div>
    </div>
  );
}
