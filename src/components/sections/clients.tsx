import { Landmark } from "lucide-react";
import Image from "next/image";
import { Container, Section } from "@/components/ui/container";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { clients } from "@/content/clients";
import { clientBuildings } from "@/content/home";

/**
 * Client wall. Logos sit greyed and soft until hover or focus, so no brand
 * shouts over another (micro-interaction after cuicui.day). Names stay
 * readable in text for everyone.
 */
export function Clients() {
  return (
    <Section id="clients" aria-labelledby="clients-title">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="clients-title"
          eyebrow="Trusted by"
          title="Chosen where reliability is not optional."
          lead="Hospitals, government buildings, schools, hotels and homes across the east rely on ATZ to keep people moving."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {clientBuildings.map((b) => (
            <li key={b.photo} className="flex flex-col gap-2">
              <Photo
                id={b.photo}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-video rounded-lg"
              />
              <span className="text-sm font-semibold text-ink">{b.caption}</span>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {clients.map((c) => (
            <li
              key={c.name}
              className="group flex flex-col gap-3 rounded-lg border border-box-line bg-white p-4 transition duration-250 hover:shadow-lift"
            >
              <div className="flex h-20 items-center justify-center">
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt=""
                    sizes="200px"
                    className="max-h-20 w-auto object-contain opacity-70 grayscale transition duration-250 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                ) : (
                  <span className="inline-flex items-center gap-2 font-heading text-h4 font-extrabold text-navy">
                    <Landmark aria-hidden="true" className="size-6 text-subtle" />
                    {c.name}
                  </span>
                )}
              </div>
              <div className="flex flex-col border-t border-line pt-3">
                <span className="text-sm font-semibold text-ink">{c.name}</span>
                <span className="text-caption text-subtle">{c.about}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
