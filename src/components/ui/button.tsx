/**
 * Button and ButtonLink.
 * Source: cuicui "Dynamic button hover effect" (before-effect-button),
 * https://cuicui.day/common-ui/buttons. MIT, see THIRD_PARTY_NOTICES.md.
 * Adapted: ATZ tokens and variants, 44px minimum target, visible focus,
 * disabled state not shown by opacity alone, link version via next/link.
 */
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "ghost" | "whatsapp";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold no-underline transition duration-150 ease-default [&_svg]:size-5 [&_svg]:shrink-0 motion-safe:active:scale-98 disabled:active:scale-100";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-control border-2 border-transparent bg-brand text-white hover:bg-brand-hover hover:text-white",
  outline:
    "rounded-control border-2 border-line-strong bg-white text-brand-ink hover:border-brand hover:bg-box hover:text-brand-ink",
  ghost: "rounded-control border-2 border-transparent text-ink hover:bg-box hover:text-brand-ink",
  whatsapp:
    "rounded-control border-2 border-transparent bg-whatsapp text-whatsapp-ink hover:bg-whatsapp-hover hover:text-whatsapp-ink",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-4 py-2 text-base",
  lg: "min-h-12 px-6 py-3 text-base",
};

/** Disabled: grey fill, grey text and a not-allowed cursor, never opacity alone. */
const disabled =
  "disabled:cursor-not-allowed disabled:border-line disabled:bg-tint disabled:text-subtle";

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], disabled, className);
}

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize };

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: StyleProps & ComponentProps<typeof Link>) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
