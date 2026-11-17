import type { Metadata } from "next";
import { cn } from "@/lib/cn";
import { colourGroups, radii, shadows, typeScale } from "./tokens";

export const metadata: Metadata = {
  title: "Style guide · ATZ Elevators",
  robots: { index: false, follow: false },
};

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-line py-12">
      <div className="flex flex-col gap-1">
        <h2 className="text-h3 font-bold">{title}</h2>
        {note ? <p className="text-sm text-muted">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto w-full max-w-content px-4 py-16 md:px-8">
      <header className="flex flex-col gap-3 pb-8">
        <p className="text-caption font-semibold tracking-wide text-brand-ink uppercase">
          Internal · not indexed
        </p>
        <h1 className="text-h1 font-bold">Style guide</h1>
        <p className="max-w-2xl text-lg text-muted">
          Design tokens for the ATZ website, from{" "}
          <code className="font-mono text-sm">src/styles/tokens.css</code>. Use these through
          Tailwind classes; never hard-code a value.
        </p>
      </header>

      {colourGroups.map((group) => (
        <Section key={group.title} title={group.title} note={group.note}>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {group.swatches.map((s) => (
              <li
                key={s.name}
                className="flex flex-col overflow-hidden rounded-lg border border-box-line"
              >
                <span
                  className={cn("h-20 border-b border-box-line", s.className)}
                  aria-hidden="true"
                />
                <span className="flex flex-col gap-0.5 p-3">
                  <span className="text-sm font-semibold text-ink">{s.name}</span>
                  <span className="font-mono text-xs text-subtle">{s.hex}</span>
                  <span className="text-xs text-muted">{s.use}</span>
                </span>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <Section title="Type" note="Manrope for headings, Inter for text, IBM Plex Mono for figures.">
        <ul className="flex flex-col gap-6">
          {typeScale.map((t) => (
            <li key={t.name} className="grid gap-2 md:grid-cols-4 md:items-baseline">
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-ink">{t.name}</span>
                <span className="text-xs text-subtle">{t.spec}</span>
              </span>
              <span className={cn("md:col-span-3", t.className)}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Radius">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {radii.map((r) => (
            <li key={r.name} className="flex flex-col gap-2">
              <span
                className={cn("h-20 border-2 border-line-strong bg-box", r.className)}
                aria-hidden="true"
              />
              <span className="text-sm font-semibold text-ink">
                {r.name} <span className="font-mono text-xs font-normal text-subtle">{r.px}</span>
              </span>
              <span className="text-xs text-muted">{r.use}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Elevation"
        note="Navy-tinted shadows; brand-tinted lift for hover and the active stage."
      >
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {shadows.map((s) => (
            <li
              key={s.name}
              className={cn(
                "flex h-24 items-end rounded-lg border border-box-line bg-white p-3",
                s.className,
              )}
            >
              <span className="text-sm font-semibold text-ink">{s.name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Motion"
        note="Mechanical easing (constant-feeling lift travel). No bounce, no parallax. Stops for reduced motion."
      >
        <div className="relative h-14 rounded-control border border-line bg-box">
          <span
            className="absolute top-2 left-2 size-10 rounded-sm bg-brand motion-safe:animate-travel"
            aria-hidden="true"
          />
        </div>
      </Section>

      <Section title="Focus" note="Tab to the link: the focus ring is always visible.">
        <a href="#top" className="w-fit rounded-sm px-1 font-semibold">
          A focusable link
        </a>
      </Section>
    </main>
  );
}
