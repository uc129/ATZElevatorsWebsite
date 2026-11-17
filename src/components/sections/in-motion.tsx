import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { credits } from "@/content/credits";
import { inMotion } from "@/content/home";
import { VideoLoop } from "./video-loop";

/** Film: escalators in a busy Pune mall (Pexels, Amit Patekar). Credited in the footer. */
export function InMotion() {
  return (
    <Section aria-labelledby="in-motion-title" className="lg:pb-16">
      <Container className="grid items-center gap-10 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Eyebrow>{inMotion.eyebrow}</Eyebrow>
          <h2 id="in-motion-title" className="text-h2 font-bold">
            {inMotion.title}
          </h2>
          <p className="text-lg text-muted">{inMotion.text}</p>
        </div>
        <div className="rounded-lg border border-box-line bg-box p-1.5 shadow-diffuse lg:col-span-8">
          <VideoLoop
            label="Shoppers riding escalators across the floors of a busy Indian shopping mall"
            className="aspect-video rounded-md"
          />
          <p className="px-2 pt-2 pb-1 text-xs text-subtle">
            Film: {credits.cityInMotion.author}, {credits.cityInMotion.license}
          </p>
        </div>
      </Container>
    </Section>
  );
}
