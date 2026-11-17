/**
 * Form fields: Input, Textarea and Select, each wrapped with a label, an
 * optional hint and an error message.
 * Source: cuicui "Modern simple input", https://cuicui.day/common-ui/inputs.
 * MIT, see THIRD_PARTY_NOTICES.md.
 * Adapted: ATZ tokens, 44px height, 16px text (no iOS zoom), visible focus,
 * label always shown, hint and error wired with aria-describedby and
 * aria-invalid, required marked in text, disabled not shown by opacity alone.
 */
import { ChevronDown } from "lucide-react";
import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full min-h-11 rounded-control border-2 border-line-strong bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-subtle transition-colors duration-150 hover:border-subtle focus-visible:border-brand-line focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-line/25 aria-invalid:border-danger disabled:cursor-not-allowed disabled:border-line disabled:bg-tint disabled:text-subtle";

type FieldFrameProps = {
  label: string;
  hint?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
};

function useFieldIds(id?: string) {
  const auto = useId();
  const fieldId = id ?? auto;
  return { fieldId, hintId: `${fieldId}-hint`, errorId: `${fieldId}-error` };
}

function describedBy(hint: unknown, error: unknown, hintId: string, errorId: string) {
  return [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
}

function FieldFrame({
  label,
  hint,
  error,
  required,
  className,
  fieldId,
  hintId,
  errorId,
  children,
}: FieldFrameProps & { fieldId: string; hintId: string; errorId: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={fieldId} className="text-sm font-semibold text-ink">
        {label}
        {required ? <span className="font-normal text-subtle"> (required)</span> : null}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Input({
  label,
  hint,
  error,
  required,
  className,
  id,
  ...props
}: FieldFrameProps & Omit<InputHTMLAttributes<HTMLInputElement>, "className">) {
  const ids = useFieldIds(id);
  return (
    <FieldFrame {...{ label, hint, error, required, className }} {...ids}>
      <input
        id={ids.fieldId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, ids.hintId, ids.errorId)}
        className={control}
        {...props}
      />
    </FieldFrame>
  );
}

export function Textarea({
  label,
  hint,
  error,
  required,
  className,
  id,
  rows = 4,
  ...props
}: FieldFrameProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">) {
  const ids = useFieldIds(id);
  return (
    <FieldFrame {...{ label, hint, error, required, className }} {...ids}>
      <textarea
        id={ids.fieldId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, ids.hintId, ids.errorId)}
        className={cn(control, "resize-y")}
        {...props}
      />
    </FieldFrame>
  );
}

export function Select({
  label,
  hint,
  error,
  required,
  className,
  id,
  options,
  placeholder,
  ...props
}: FieldFrameProps & {
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className">) {
  const ids = useFieldIds(id);
  return (
    <FieldFrame {...{ label, hint, error, required, className }} {...ids}>
      <span className="relative">
        <select
          id={ids.fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint, error, ids.hintId, ids.errorId)}
          className={cn(control, "appearance-none pr-10")}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-subtle"
        />
      </span>
    </FieldFrame>
  );
}
