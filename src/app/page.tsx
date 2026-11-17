import { Clients } from "@/components/sections/clients";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import { Highlights } from "@/components/sections/highlights";
import { InMotion } from "@/components/sections/in-motion";
import { LiftJourney } from "@/components/sections/lift-journey";
import { LiftShowcase } from "@/components/sections/lift-showcase";
import { Offices } from "@/components/sections/offices";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <InMotion />
      <LiftJourney />
      <LiftShowcase />
      <Services />
      <Clients />
      <Testimonials />
      <Offices />
      <CtaBand />
    </>
  );
}
