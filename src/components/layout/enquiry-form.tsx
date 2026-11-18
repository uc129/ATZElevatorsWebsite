"use client";

/**
 * Enquiry form, used in the drawer and on /quote. Validates on the server
 * (Server Action) and keeps what the visitor typed when there are errors.
 * Works without JavaScript as a normal form post.
 */
import { CircleCheck, MessageCircle, Phone } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { sendEnquiry } from "@/app/actions/enquiry";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/field";
import { company, telHref } from "@/content/company";
import {
  liftTypeOptions,
  needOptions,
  type EnquiryDefaults,
  type EnquiryField,
  type EnquiryState,
} from "@/lib/enquiry";

const initialState: EnquiryState = { status: "idle" };

export function EnquiryForm({
  onDone,
  defaults,
}: {
  onDone?: () => void;
  /** Pre-filled answers, e.g. from the Find your lift guide. Never name or mobile. */
  defaults?: EnquiryDefaults;
}) {
  const [state, formAction, pending] = useActionState(sendEnquiry, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const attempt = state.status === "invalid" ? state.attempt : "idle";

  // After a failed attempt, take the visitor to the first field to fix.
  useEffect(() => {
    if (attempt === "idle") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [attempt]);

  if (state.status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 py-2" role="status">
        <span className="inline-flex size-14 items-center justify-center rounded-full border border-success-line bg-success-light text-success">
          <CircleCheck aria-hidden="true" className="size-7" />
        </span>
        {state.delivered ? (
          <>
            <h3 className="text-h3 font-bold">Thanks, {state.name}. We have your enquiry.</h3>
            <p className="text-muted">
              An engineer from your nearest office will call you back to book a site survey.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-h3 font-bold">Thanks, {state.name}. One last step.</h3>
            <p className="text-muted">
              Send your details to our sales team on WhatsApp, already written for you. An engineer
              will call you back to book a site survey.
            </p>
            <ButtonLink
              href={state.whatsappUrl}
              variant="whatsapp"
              size="lg"
              className="w-full"
              target="_blank"
              rel="noopener"
            >
              <MessageCircle aria-hidden="true" /> Send on WhatsApp
            </ButtonLink>
          </>
        )}
        <div className="flex w-full flex-wrap gap-3">
          <ButtonLink href={telHref(company.phones.marketing)} variant="outline">
            <Phone aria-hidden="true" /> Call {company.phones.marketing.display}
          </ButtonLink>
          {onDone ? (
            <Button variant="ghost" onClick={onDone}>
              Back to site
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  const errors = state.status === "invalid" ? state.errors : {};
  const values: Partial<Record<EnquiryField, string>> =
    state.status === "invalid" ? state.values : (defaults ?? {});
  const errorCount = Object.keys(errors).length;

  return (
    <form
      key={attempt}
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-4"
      noValidate
    >
      {errorCount > 0 ? (
        <p
          role="alert"
          className="rounded-control border border-danger-line bg-danger-light px-4 py-3 text-sm font-medium text-danger-text"
        >
          Check {errorCount === 1 ? "the field" : `the ${errorCount} fields`} marked below.
        </p>
      ) : null}

      <Select
        label="What do you need?"
        name="need"
        required
        placeholder="Choose one"
        options={[...needOptions]}
        defaultValue={values.need ?? ""}
        error={errors.need}
      />
      <Select
        label="Lift type"
        name="liftType"
        options={[...liftTypeOptions]}
        defaultValue={values.liftType ?? "unsure"}
        error={errors.liftType}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Floors (incl. ground)"
          name="floors"
          type="number"
          inputMode="numeric"
          min={2}
          max={60}
          placeholder="e.g. 5"
          defaultValue={values.floors}
          error={errors.floors}
        />
        <Input
          label="City"
          name="city"
          autoComplete="address-level2"
          placeholder="e.g. Patna"
          defaultValue={values.city}
          error={errors.city}
        />
      </div>
      <Input
        label="Your name"
        name="name"
        autoComplete="name"
        required
        defaultValue={values.name}
        error={errors.name}
      />
      <Input
        label="Mobile number"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        placeholder="98765 43210"
        defaultValue={values.phone}
        error={errors.phone}
      />
      <Textarea
        label="Anything else?"
        name="message"
        rows={3}
        defaultValue={values.message}
        error={errors.message}
      />

      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Company <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
      </Button>
      <p className="text-sm text-subtle">
        We use these details only to reply to your enquiry. Prefer to talk?{" "}
        <a href={telHref(company.phones.marketing)} className="font-semibold">
          Call {company.phones.marketing.display}
        </a>
        .
      </p>
    </form>
  );
}
