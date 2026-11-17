import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { inMotion } from "@/content/home";
import { VideoLoop } from "./video-loop";

/** Film: escalators in a busy Pune mall (Pexels, Amit Patekar). Credited on /credits. */
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
            sources={[
              { src: "/media/city-in-motion-1080.mp4", media: "(min-width: 1280px)" },
              { src: "/media/city-in-motion-720.mp4" },
            ]}
            poster="/media/city-in-motion-poster.jpg"
            label="Shoppers riding escalators across the floors of a busy Indian shopping mall"
            className="aspect-video rounded-md"
          />
        </div>
      </Container>
    </Section>
  );
}
