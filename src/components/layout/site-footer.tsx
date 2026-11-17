/**
 * Site footer: company, phones, navigation groups, head office, legal line
 * and photo credits (from content/credits.ts).
 */
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { company, telHref } from "@/content/company";
import { photoCredits } from "@/content/credits";
import { footerNav, legalNav } from "@/content/navigation";
import { Logo } from "./logo";

const footLink =
  "inline-flex min-h-8 items-center text-muted no-underline transition-colors duration-150 hover:text-brand-ink";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-box pt-18 pb-8 text-muted">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-3.5 lg:col-span-3">
            <Logo className="self-start" />
            <p>
              {company.legalName}. Manufacturing, installing and maintaining lifts across eastern
              India since {company.founded}.
            </p>
            <dl className="flex flex-col gap-1 text-sm">
              <div className="flex gap-3">
                <dt className="w-28 text-subtle">Sales</dt>
                <dd>
                  <a
                    href={telHref(company.phones.marketing)}
                    className="font-semibold no-underline"
                  >
                    {company.phones.marketing.display}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-28 text-subtle">Service, 24×7</dt>
                <dd>
                  <a href={telHref(company.phones.service)} className="font-semibold no-underline">
                    {company.phones.service.display}
                  </a>
                </dd>
              </div>
              {company.email ? (
                <div className="flex gap-3">
                  <dt className="w-28 text-subtle">Email</dt>
                  <dd>
                    <a href={`mailto:${company.email}`} className="font-semibold no-underline">
                      {company.email}
                    </a>
                  </dd>
                </div>
              ) : null}
            </dl>
          </div>

          {footerNav.map((group) => (
            <nav
              key={group.title}
              aria-label={group.title}
              className="flex flex-col gap-1 lg:col-span-2"
            >
              <Eyebrow className="mb-2 text-subtle">{group.title}</Eyebrow>
              {group.links.map((link) => (
                <Link key={link.href} href={link.href} className={footLink}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}

          <div className="flex flex-col gap-2.5 lg:col-span-3">
            <Eyebrow className="text-subtle">{company.headOffice.label}</Eyebrow>
            <address className="not-italic">
              {company.headOffice.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a href={company.headOffice.mapsUrl} className="text-sm font-semibold" rel="noopener">
              Open in Maps
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-sm text-subtle">
          <p>
            © {company.copyrightYear} {company.legalName} · GSTIN {company.gstin} · CIN{" "}
            {company.cin}
          </p>
          <nav aria-label="Legal" className="flex gap-5">
            {legalNav.map((link) => (
              <Link key={link.href} href={link.href} className={footLink}>
                {link.label}
              </Link>
            ))}
          </nav>
          {photoCredits.length > 0 ? (
            <p className="basis-full text-xs">
              Photo credits:{" "}
              {photoCredits.map((c, i) => (
                <span key={c.subject}>
                  {i > 0 ? "; " : null}
                  {c.subject} by {c.author} (
                  <a href={c.licenseUrl} rel="noopener license">
                    {c.license}
                  </a>
                  )
                </span>
              ))}
              . Photos are resized or cropped.
            </p>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
