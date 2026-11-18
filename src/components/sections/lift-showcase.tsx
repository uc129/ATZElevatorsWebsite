import {
  ArrowRight,
  Building2,
  Cog,
  Hospital,
  House,
  Package,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { EnquiryButton } from "@/components/layout/enquiry";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs } from "@/components/ui/tabs";
import { liftCategories, liftHref, type LiftCategory, type LiftIcon } from "@/content/lifts";
import { cn } from "@/lib/cn";

export const liftIcons: Record<LiftIcon, LucideIcon> = {
  users: Users,
  home: House,
  cog: Cog,
  panorama: Building2,
  hospital: Hospital,
  package: Package,
  utensils: UtensilsCrossed,
};

/** Shown until ATZ supplies a photo for this lift type. */
export function IconPanel({ lift, compact }: { lift: LiftCategory; compact?: boolean }) {
  const Icon = liftIcons[lift.icon];
  return (
    <div
      className={cn(
        "relative flex h-full flex-col items-center justify-center gap-4 bg-tint glow-diffuse",
        !compact && "min-h-80",
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-grid" />
      <span className="relative inline-flex size-24 items-center justify-center rounded-lg border border-tint-line bg-white text-brand shadow-diffuse">
        <Icon aria-hidden="true" className="size-12" strokeWidth={1.5} />
      </span>
      <Badge tone="onPhoto" className="relative">
        ATZ photo to follow
      </Badge>
    </div>
  );
}

function LiftPanel({ lift }: { lift: LiftCategory }) {
  return (
    <Card className="grid overflow-hidden md:grid-cols-2">
      {lift.photo ? (
        <Photo id={lift.photo} sizes="(min-width: 1024px) 30vw, 100vw" className="min-h-80" />
      ) : (
        <IconPanel lift={lift} />
      )}
      <div className="flex flex-col gap-5 p-6 md:p-9">
        <h3 className="text-h3 font-bold">{lift.name}</h3>
        <p className="text-lg text-muted">{lift.blurb}</p>
        <div className="flex flex-col gap-2.5">
          <Eyebrow className="text-subtle">Available as</Eyebrow>
          <ul className="flex flex-wrap gap-2">
            {lift.variants.map((v) => (
              <li key={v}>
                <Badge tone="brand" className="min-h-8 px-3 text-sm font-medium">
                  {v}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <EnquiryButton>Get a quote for this lift</EnquiryButton>
          <ButtonLink href={liftHref(lift.slug)} variant="outline">
            Specs and options
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}

export function LiftShowcase() {
  return (
    <Section id="lifts" aria-labelledby="lifts-title" className="border-y border-line bg-box">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          id="lifts-title"
          eyebrow="Lifts"
          title="A lift for every building, from homes to hospitals."
          actions={
            <Link
              href="/lifts"
              className="inline-flex min-h-11 items-center gap-2 font-semibold no-underline"
            >
              Compare all lifts <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />
        <Tabs
          label="Lift types"
          orientation="vertical"
          autoAdvance
          listClassName="rounded-lg border border-box-line bg-white p-2 lg:w-72 lg:shrink-0"
          items={liftCategories.map((lift) => ({
            id: lift.slug,
            label: (
              <>
                {lift.name}
                {lift.variants.length > 1 ? (
                  <span className="text-caption font-medium text-subtle">
                    {lift.variants.length} types
                  </span>
                ) : null}
              </>
            ),
            content: <LiftPanel lift={lift} />,
          }))}
        />
      </Container>
    </Section>
  );
}
