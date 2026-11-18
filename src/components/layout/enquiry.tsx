"use client";

/**
 * Enquiry drawer: a native modal <dialog> (focus trap, Esc to close and an
 * inert page come from the browser) that slides in from the right.
 * EnquiryButton is a link to /quote; with JavaScript it opens the drawer
 * instead, so the quote form works everywhere.
 */
import { X } from "lucide-react";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@/components/ui/button";
import { quoteHrefWith, type EnquiryDefaults } from "@/lib/enquiry";
import { EnquiryForm } from "./enquiry-form";

type EnquiryContextValue = { open: (defaults?: EnquiryDefaults) => void; close: () => void };

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // A new key per opening gives a fresh, empty form each time.
  const [formKey, setFormKey] = useState(0);
  // Pre-filled answers for this opening only; the next opening starts clean.
  const [defaults, setDefaults] = useState<EnquiryDefaults>();

  const open = useCallback((next?: EnquiryDefaults) => {
    setDefaults(next);
    setFormKey((k) => k + 1);
    dialogRef.current?.showModal();
  }, []);
  const close = useCallback(() => dialogRef.current?.close(), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) close();
  }

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="enquiry-title"
        onClick={onBackdropClick}
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-dvh w-full max-w-lg overflow-y-auto bg-white p-0 text-ink shadow-xl backdrop:bg-overlay motion-safe:transition motion-safe:duration-250 motion-safe:ease-out motion-safe:starting:open:translate-x-full"
      >
        <div className="flex min-h-full flex-col gap-6 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 id="enquiry-title" className="text-h3 font-bold">
                Get a free quote
              </h2>
              <p className="text-muted">
                An ATZ engineer will call you back to book a site survey.
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-control border-2 border-line-strong bg-white text-brand-ink transition-colors hover:border-brand hover:bg-box"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <EnquiryForm key={formKey} onDone={close} defaults={defaults} />
        </div>
      </dialog>
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  return useContext(EnquiryContext);
}

/**
 * Opens the enquiry drawer; falls back to the /quote page. `defaults`
 * pre-fill the form in both, e.g. the lift type on a lift page.
 */
export function EnquiryButton({
  variant,
  size,
  className,
  onClick,
  defaults,
  ...props
}: { variant?: ButtonVariant; size?: ButtonSize; defaults?: EnquiryDefaults } & Omit<
  ComponentProps<typeof Link>,
  "href"
>) {
  const enquiry = useEnquiry();
  return (
    <Link
      href={quoteHrefWith(defaults)}
      className={buttonStyles({ variant, size, className })}
      onClick={(event) => {
        onClick?.(event);
        if (!enquiry || event.defaultPrevented) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        enquiry.open(defaults);
      }}
      {...props}
    />
  );
}
