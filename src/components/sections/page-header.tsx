/**
 * Inner-page header: breadcrumbs, eyebrow, one H1, lead text and optional
 * actions, on the same diffused-light grid as the homepage hero.
 */
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";

export type Crumb = { label: string; href: string };

export function PageHeader({
  eyebrow,
  title,
  lead,
  trail = [],
  actions,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  /** Parent pages, home first is added automatically */
  trail?: Crumb[];
  actions?: ReactNode;
  /** Optional right-hand content, e.g. a photo */
  aside?: ReactNode;
}) {
  const crumbs = [{ label: "Home", href: "/" }, ...trail];
  return (
    <section className="relative overflow-hidden border-b border-line glow-diffuse">
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />
      <Container className="relative grid items-center gap-10 py-12 lg:grid-cols-12 lg:py-20">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
              {crumbs.map((c) => (
                <li key={c.href} className="inline-flex items-center gap-1.5">
                  <Link href={c.href} className="text-muted no-underline hover:text-brand-ink">
                    {c.label}
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3.5" />
                </li>
              ))}
              <li aria-current="page" className="font-medium text-ink">
                {title}
              </li>
            </ol>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-h1 font-bold">{title}</h1>
          {lead ? <p className="max-w-2xl text-lg text-muted">{lead}</p> : null}
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-5">{aside}</div> : null}
      </Container>
    </section>
  );
}
