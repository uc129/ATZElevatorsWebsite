import { Film } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { credits, type CreditId } from "@/content/credits";
import { photos, type Photo } from "@/content/photos";

export const metadata: Metadata = {
  title: "Credits",
  description:
    "Photographs and film used on the ATZ Elevators website, with their authors and licences.",
};

/** Photo for each credit, for the thumbnail. */
const photoByCredit = new Map<CreditId, Photo>(
  Object.values(photos).flatMap((p): [CreditId, Photo][] =>
    "credit" in p && p.credit ? [[p.credit, p]] : [],
  ),
);

export default function CreditsPage() {
  const entries = Object.entries(credits) as [CreditId, (typeof credits)[CreditId]][];
  return (
    <Section>
      <Container className="flex flex-col gap-10">
        <div className="flex max-w-3xl flex-col gap-4">
          <Eyebrow>Credits</Eyebrow>
          <h1 className="text-h1 font-bold">Photographs and film</h1>
          <p className="text-lg text-muted">
            We are grateful to the photographers and filmmakers whose work appears on this site.
            Photos may be resized or cropped, and film trimmed. Each licence is linked below.
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {entries.map(([id, c]) => {
            const photo = photoByCredit.get(id);
            return (
              <li key={id} className="flex gap-4 rounded-lg border border-box-line bg-box p-4">
                <div className="relative size-24 shrink-0 overflow-hidden rounded-md bg-tint">
                  {photo ? (
                    <Image src={photo.src} alt="" fill sizes="96px" className="object-cover" />
                  ) : (
                    <span className="flex size-full items-center justify-center text-brand">
                      <Film aria-hidden="true" className="size-8" />
                    </span>
                  )}
                </div>
                <dl className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
                  <dt className="sr-only">Asset</dt>
                  <dd className="font-semibold text-ink">{c.subject}</dd>
                  <dt className="sr-only">File</dt>
                  <dd className="font-mono text-xs break-all text-subtle">{c.asset}</dd>
                  <dt className="sr-only">Credit</dt>
                  <dd className="text-muted">
                    By {c.author} ·{" "}
                    <a href={c.licenseUrl} rel="license noopener">
                      {c.license}
                    </a>{" "}
                    ·{" "}
                    <a href={c.sourceUrl} rel="noopener">
                      Source
                    </a>
                  </dd>
                </dl>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
