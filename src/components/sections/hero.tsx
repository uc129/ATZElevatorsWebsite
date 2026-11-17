import { ArrowRight, Check } from "lucide-react";
import { EnquiryButton } from "@/components/layout/enquiry";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { company } from "@/content/company";
import { hero } from "@/content/home";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line glow-diffuse">
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-26">
        <div className="flex flex-col gap-7 lg:col-span-6">
          <Eyebrow>
            <span aria-hidden="true" className="h-0.75 w-7 rounded-full bg-brand" />
            {hero.eyebrow}
          </Eyebrow>
          <h1 className="text-display font-extrabold">{company.tagline}</h1>
          <p className="max-w-xl text-lg text-muted">{hero.lead}</p>
          <div className="flex flex-wrap gap-3">
            <EnquiryButton size="lg">
              Get a free quote <ArrowRight aria-hidden="true" />
            </EnquiryButton>
            <ButtonLink href="/support" variant="outline" size="lg">
              Report a breakdown
            </ButtonLink>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-2 text-muted">
            {hero.assurances.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="size-4.5 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-80 sm:h-112 lg:col-span-6 lg:h-130">
          <Photo
            id={hero.photos.main}
            eager
            sizes="(min-width: 1024px) 38vw, 76vw"
            tag="bottom-right"
            className="absolute top-0 right-0 bottom-10 w-3/4 rounded-lg shadow-lg"
          />
          <Photo
            id={hero.photos.inset}
            sizes="(min-width: 1024px) 24vw, 48vw"
            hideTag
            className="absolute bottom-0 left-0 h-2/5 w-1/2 rounded-lg border-6 border-white shadow-lift"
          />
          <div className="absolute top-12 left-6 hidden flex-col gap-0.5 rounded-md border border-line bg-white/95 px-4.5 py-3.5 shadow-diffuse backdrop-blur-sm sm:flex lg:left-10">
            <span className="text-xs font-semibold tracking-wide text-subtle uppercase">
              Head office
            </span>
            <span className="font-heading text-h4 font-extrabold text-navy">Patna, Bihar</span>
            <span className="text-caption text-muted">West Boring Canal Road</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
