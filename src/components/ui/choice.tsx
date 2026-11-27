/**
 * ChoiceGroup and ChoiceCard: a question with large, tappable answers.
 * Styled after the cuicui inputs and cards already in this folder
 * (https://cuicui.day/common-ui/inputs, https://cuicui.day/common-ui/cards).
 * MIT, see THIRD_PARTY_NOTICES.md. Built on real radio inputs inside a fieldset, so the arrow keys,
 * form posts and screen readers work without JavaScript. The selected card
 * shows a filled dot as well as the brand border (not colour alone); the
 * focus ring is on the whole card; disabled cards use a tint, not opacity.
 * The radio is named by the label text only; the hint is its description.
 * Used by the Find your lift guide; reusable for any one-of-many question.
 */
import { useId, type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChoiceGroupProps = {
  legend: ReactNode;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  /** Visually larger legend, for one question per screen. */
  size?: "md" | "lg";
  className?: string;
  /** Classes for the list of cards, e.g. a grid. */
  listClassName?: string;
  /** Props for the <legend>, e.g. an id or tabIndex for moving focus. */
  legendProps?: Omit<HTMLAttributes<HTMLLegendElement>, "className" | "children">;
  children: ReactNode;
};

export function ChoiceGroup({
  legend,
  hint,
  error,
  required,
  size = "md",
  className,
  listClassName,
  legendProps,
  children,
}: ChoiceGroupProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      aria-describedby={describedBy}
      className={cn("flex min-w-0 flex-col gap-3", className)}
    >
      <legend
        {...legendProps}
        className={cn(
          "mb-1 font-bold text-ink focus-visible:outline-none",
          size === "lg" ? "text-h3" : "text-base",
        )}
      >
        {legend}
        {required ? <span className="font-normal text-subtle"> (required)</span> : null}
      </legend>
      {hint ? (
        <p id={hintId} className="-mt-2 text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger-text">
          {error}
        </p>
      ) : null}
      <div className={cn("grid gap-3", listClassName)}>{children}</div>
    </fieldset>
  );
}

type ChoiceCardProps = {
  label: ReactNode;
  hint?: ReactNode;
  /** A lucide icon element, marked aria-hidden by the caller. */
  icon?: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className" | "children">;

export function ChoiceCard({ label, hint, icon, className, id, ...props }: ChoiceCardProps) {
  const auto = useId();
  const inputId = id ?? auto;
  const labelId = `${inputId}-label`;
  const hintId = `${inputId}-hint`;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group relative flex min-h-11 cursor-pointer items-center gap-3 rounded-md border-2 border-control-line bg-white px-4 py-3 text-ink transition duration-150 ease-default",
        "hover:border-subtle hover:bg-box",
        "has-checked:border-brand has-checked:bg-white has-checked:shadow-active",
        "has-focus-visible:ring-4 has-focus-visible:ring-focus/25",
        "has-disabled:cursor-not-allowed has-disabled:border-line has-disabled:bg-tint has-disabled:text-subtle",
        className,
      )}
    >
      <input
        id={inputId}
        type="radio"
        aria-labelledby={labelId}
        aria-describedby={hint ? hintId : undefined}
        className="sr-only"
        {...props}
      />
      {icon ? (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-box text-brand-ink transition-colors group-has-checked:bg-brand group-has-checked:text-white group-has-disabled:bg-tint group-has-disabled:text-subtle [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span id={labelId} className="font-semibold">
          {label}
        </span>
        {hint ? (
          <span id={hintId} className="text-sm text-muted group-has-disabled:text-subtle">
            {hint}
          </span>
        ) : null}
      </span>
      {/* The dot: selection is shown by shape, not by colour alone. */}
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-control-line bg-white transition-colors group-has-checked:border-brand"
      >
        <span className="size-2.5 scale-0 rounded-full bg-brand transition-transform duration-150 group-has-checked:scale-100" />
      </span>
    </label>
  );
}
