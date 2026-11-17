import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { inMotion } from "@/content/home";
import { VideoLoop } from "./video-loop";

/** Promo film from the earlier ATZ site, trimmed before its old end card. */
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
            label="ATZ film: glass panoramic lifts and escalators moving through a bright shopping atrium"
            className="aspect-video rounded-md"
          />
        </div>
      </Container>
    </Section>
  );
}
