/**
 * "How we work": an isometric wireframe lift (building, shaft, car,
 * counterweight, machine) rides floor by floor while the matching stage card
 * lights up. Geometry from the design canvas, made with the generator in
 * ATZElevatorsERP/Learning/09_Isometric_Wireframe. Decorative: the stages
 * list carries the meaning.
 */
import { ButtonLink } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { company } from "@/content/company";
import { stages } from "@/content/home";
import { cn } from "@/lib/cn";
import styles from "./lift-journey.module.css";

const stageClass: Record<string, string | undefined> = {
  G: styles.stG,
  "1": styles.st1,
  "2": styles.st2,
  "3": styles.st3,
  "4": styles.st4,
};

/** Floor slabs, ground up: [y-offset of the slab, label, animation class]. */
const floors = [
  { y: 515, label: "G", cls: styles.flG },
  { y: 411, label: "1", cls: styles.fl1 },
  { y: 307, label: "2", cls: styles.fl2 },
  { y: 203, label: "3", cls: styles.fl3 },
  { y: 99, label: "4", cls: styles.fl4 },
];

const slab = (y: number) => `186,${y} 333.2,${y + 85} 212,${y + 155} 64.8,${y + 70}`;

function LiftWireframe() {
  return (
    <svg
      viewBox="-24 0 476 700"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full overflow-visible"
    >
      {/* site footprint and pit */}
      <polygon
        points="186,495 367.9,600 212,690 30.1,585"
        className="stroke-wire-faint"
        strokeWidth="1.5"
        strokeDasharray="2 6"
      />
      <polygon
        points="199,587.5 268.3,627.5 207.7,662.5 138.4,622.5"
        className="stroke-wire-light"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <line
        x1="268.3"
        y1="627.5"
        x2="268.3"
        y2="597.5"
        className="stroke-wire-light"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <line
        x1="207.7"
        y1="662.5"
        x2="207.7"
        y2="632.5"
        className="stroke-wire-light"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <line
        x1="138.4"
        y1="622.5"
        x2="138.4"
        y2="592.5"
        className="stroke-wire-light"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />

      {/* building columns */}
      <line
        x1="186"
        y1="515"
        x2="186"
        y2="9"
        className="stroke-wire-light"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <line
        x1="333.2"
        y1="600"
        x2="333.2"
        y2="94"
        className="stroke-wire-light"
        strokeWidth="1.5"
      />
      <line x1="64.8" y1="585" x2="64.8" y2="79" className="stroke-wire-light" strokeWidth="1.5" />

      {/* floors, lit in turn */}
      {floors.map((f) => (
        <g key={f.label}>
          <polygon
            points={slab(f.y)}
            className={cn(styles.floor, f.cls, "stroke-wire")}
            strokeWidth="1.5"
          />
          <text
            x="40"
            y={f.y + 75}
            className="fill-subtle font-heading"
            fontSize="15"
            fontWeight="700"
          >
            {f.label}
          </text>
        </g>
      ))}
      <polygon points={slab(9)} className="stroke-wire" strokeWidth="1.5" strokeDasharray="6 4" />

      {/* shaft and guide rails */}
      <line
        x1="199"
        y1="587.5"
        x2="199"
        y2="51.5"
        className="stroke-wire-light"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <line
        x1="233.6"
        y1="577.5"
        x2="233.6"
        y2="71.5"
        className="stroke-wire-mid"
        strokeWidth="1.5"
      />
      <line x1="168.7" y1="575" x2="168.7" y2="69" className="stroke-wire-mid" strokeWidth="1.5" />

      {/* counterweight */}
      <g className={styles.weight}>
        <polygon
          points="192.9,211 161.8,229 161.8,149 192.9,131"
          className="fill-wire-fill stroke-wire-weight"
          strokeWidth="1.5"
        />
        <polygon
          points="154.8,225 161.8,229 161.8,149 154.8,145"
          className="fill-wire-fill stroke-wire-weight"
          strokeWidth="1.5"
        />
        <polygon
          points="186,127 192.9,131 161.8,149 154.8,145"
          className="fill-wire-fill-top stroke-wire-weight"
          strokeWidth="1.5"
        />
      </g>

      {/* ropes, clipped below the machine room */}
      <clipPath id="atz-rope-clip">
        <rect x="0" y="59" width="460" height="700" />
      </clipPath>
      <g clipPath="url(#atz-rope-clip)">
        <g className={styles.car}>
          <line
            x1="199.9"
            y1="503"
            x2="199.9"
            y2="-117"
            className="stroke-wire-rope"
            strokeWidth="1"
          />
          <line
            x1="203.3"
            y1="505"
            x2="203.3"
            y2="-115"
            className="stroke-wire-rope"
            strokeWidth="1"
          />
          <line
            x1="206.8"
            y1="507"
            x2="206.8"
            y2="-113"
            className="stroke-wire-rope"
            strokeWidth="1"
          />
        </g>
        <g className={styles.weight}>
          <line
            x1="173.9"
            y1="138"
            x2="173.9"
            y2="-182"
            className="stroke-wire-weight"
            strokeWidth="1.25"
          />
        </g>
      </g>

      {/* car */}
      <g className={styles.car}>
        <polygon
          points="255.3,591 206.8,619 206.8,535 255.3,507"
          className="fill-white/95 stroke-brand-line"
          strokeWidth="1.75"
        />
        <polygon
          points="151.4,587 206.8,619 206.8,535 151.4,503"
          className="fill-white/95 stroke-brand-line"
          strokeWidth="1.75"
        />
        <polygon
          points="199.9,475 255.3,507 206.8,535 151.4,503"
          className="fill-wire-car-top stroke-brand-line"
          strokeWidth="1.75"
        />
        <polygon
          points="158.3,591 199.9,615 199.9,543 158.3,519"
          className="fill-brand-line/15 stroke-brand-line"
          strokeWidth="1.25"
        />
        <line
          x1="179.1"
          y1="603"
          x2="179.1"
          y2="531"
          className="stroke-brand-line"
          strokeWidth="1.25"
        />
        <line
          x1="227.6"
          y1="491"
          x2="179.1"
          y2="519"
          className="stroke-brand-line"
          strokeWidth="1.25"
        />
      </g>

      {/* front frame */}
      <line
        x1="268.3"
        y1="597.5"
        x2="268.3"
        y2="91.5"
        className="stroke-wire-strong"
        strokeWidth="1.75"
      />
      <line
        x1="207.7"
        y1="632.5"
        x2="207.7"
        y2="126.5"
        className="stroke-wire-strong"
        strokeWidth="1.75"
      />
      <line
        x1="138.4"
        y1="592.5"
        x2="138.4"
        y2="86.5"
        className="stroke-wire-strong"
        strokeWidth="1.75"
      />
      <line x1="173" y1="612.5" x2="173" y2="106.5" className="stroke-wire-mid" strokeWidth="1.5" />
      <line x1="212" y1="670" x2="212" y2="164" className="stroke-wire-light" strokeWidth="1.5" />

      {/* machine room with gearless machine */}
      <polygon
        points="155.7,86.5 207.7,116.5 207.7,90.5 155.7,60.5"
        className="fill-wire-fill stroke-wire-strong"
        strokeWidth="1.75"
      />
      <polygon
        points="250.9,91.5 207.7,116.5 207.7,90.5 250.9,65.5"
        className="fill-wire-fill stroke-wire-strong"
        strokeWidth="1.75"
      />
      <polygon
        points="199,35.5 250.9,65.5 207.7,90.5 155.7,60.5"
        className="fill-wire-fill-top stroke-wire-strong"
        strokeWidth="1.75"
      />
      <ellipse cx="203.3" cy="49" rx="16" ry="9" className="stroke-brand-line" strokeWidth="1.75" />

      {/* callouts */}
      <g className="fill-muted font-sans" fontSize="14" fontWeight="600">
        <circle cx="250.9" cy="65.5" r="3" className="fill-brand-line" />
        <line x1="250.9" y1="65.5" x2="314" y2="47.5" className="stroke-wire-mid" strokeWidth="1" />
        <text x="320" y="52">
          Gearless machine
        </text>
        <circle cx="173" cy="300" r="3" className="fill-brand-line" />
        <line x1="173" y1="300" x2="283" y2="300" className="stroke-wire-mid" strokeWidth="1" />
        <text x="289" y="305">
          Guide rail
        </text>
        <circle cx="154.8" cy="185" r="3" className="fill-brand-line" />
        <line x1="154.8" y1="185" x2="92" y2="140" className="stroke-wire-mid" strokeWidth="1" />
        <text x="86" y="138" textAnchor="end">
          Counterweight
        </text>
        <circle cx="138.4" cy="622.5" r="3" className="fill-brand-line" />
        <line
          x1="138.4"
          y1="622.5"
          x2="78.4"
          y2="652.5"
          className="stroke-wire-mid"
          strokeWidth="1"
        />
        <text x="72" y="658" textAnchor="end">
          Pit and buffer
        </text>
      </g>
    </svg>
  );
}

function FloorIndicator() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-0 bottom-2 flex w-21 flex-col items-center gap-1.5 rounded-md border border-line-strong bg-white p-3 shadow-md"
    >
      <span className="text-xs font-semibold tracking-wide text-subtle">FLOOR</span>
      <div className="h-11 w-full overflow-hidden">
        <div
          className={cn(
            styles.indicator,
            "flex flex-col text-center font-heading text-h2 leading-11 font-extrabold text-brand",
          )}
        >
          {["4", "3", "2", "1", "G"].map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LiftJourney() {
  return (
    <Section id="how-we-work" aria-labelledby="how-we-work-title">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="how-we-work-title"
          eyebrow="How we work"
          title="From first survey to lifelong service, one floor at a time."
          lead={`Amba Tirupati Zetetic Engineering was incorporated in Patna in ${company.founded}. We build sturdy, honestly priced lifts for the region's growing buildings, and our own engineers survey, build and care for every one.`}
          actions={
            <ButtonLink href="/about" variant="outline">
              About ATZ
            </ButtonLink>
          }
        />

        <div className="relative grid items-center gap-10 overflow-hidden rounded-lg border border-box-line bg-box p-6 md:p-14 lg:grid-cols-12 lg:gap-14">
          <div aria-hidden="true" className="absolute inset-0 bg-grid" />
          <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <LiftWireframe />
            <FloorIndicator />
          </div>

          {/* DOM order G→4 for reading; shown top floor first. */}
          <ol className="relative flex flex-col-reverse gap-2.5 lg:col-span-7">
            {stages.map((s) => (
              <li
                key={s.floor}
                className={cn(
                  styles.stage,
                  stageClass[s.floor],
                  "flex items-center gap-5 rounded-md border-2 bg-white px-5.5 py-3.5",
                )}
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-control border-2 border-line-strong bg-white font-heading text-h3 font-extrabold text-brand">
                  <span className="sr-only">Floor </span>
                  {s.floor}
                </span>
                <div className="flex flex-1 flex-col gap-0.5">
                  <h3 className="text-h4 font-bold">{s.title}</h3>
                  <p className="text-muted">{s.text}</p>
                </div>
                <span className="hidden text-xs font-semibold tracking-wide whitespace-nowrap text-subtle uppercase md:block">
                  {s.tag}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
