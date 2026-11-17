/**
 * Site header: skip link, desktop utility bar, sticky bar with logo, main
 * navigation, support and quote actions, and the phone menu.
 */
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { company, telHref } from "@/content/company";
import { mainNav, supportLink } from "@/content/navigation";
import { EnquiryButton } from "./enquiry";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { ProductsMenu } from "./products-menu";

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-control bg-white px-4 py-3 font-semibold shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to content
    </a>
  );
}

function UtilityBar() {
  return (
    <div className="hidden border-b border-line bg-box text-sm text-muted lg:block">
      <Container className="flex min-h-10 items-center justify-between gap-6">
        <span>
          Head office {company.regions[0]} · Branches in {company.regions.slice(1, -1).join(", ")}{" "}
          and {company.regions.at(-1)}
        </span>
        <a
          href={telHref(company.phones.service)}
          className="inline-flex items-center gap-2 font-semibold no-underline"
        >
          <span aria-hidden="true" className="size-2 rounded-full bg-success" />
          24×7 breakdown line: {company.phones.service.display}
        </a>
      </Container>
    </div>
  );
}

export function SiteHeader() {
  return (
    <>
      <SkipLink />
      <UtilityBar />
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
        <Container className="flex min-h-header items-center justify-between gap-6">
          <Logo eager />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <ProductsMenu />
            {mainNav.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <ButtonLink href={supportLink.href} variant="outline" className="hidden lg:inline-flex">
              {supportLink.label}
            </ButtonLink>
            <EnquiryButton className="hidden lg:inline-flex">Get a quote</EnquiryButton>
            <MobileMenu />
          </div>
        </Container>
      </header>
    </>
  );
}
