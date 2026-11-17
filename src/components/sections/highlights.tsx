import { Clock, Map, MapPin, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { highlights } from "@/content/home";

const icons = [MapPin, Map, Wrench, Clock];

/** "ATZ at a glance": short promises, no statistics (user rule). */
export function Highlights() {
  return (
    <section aria-label="ATZ at a glance" className="border-b border-line bg-white">
      <Container>
        <ul className="grid gap-6 py-9 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => {
            const Icon = icons[i] ?? MapPin;
            return (
              <li key={h.title} className="flex items-start gap-3.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-control border border-tint-line bg-tint text-brand">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-heading text-h4 font-extrabold text-navy">{h.title}</span>
                  <span className="text-muted">{h.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
