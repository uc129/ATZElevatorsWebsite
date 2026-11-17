import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "Track a complaint",
  description: "Check the status of a lift complaint logged with ATZ Elevators.",
};

export default function TrackPage() {
  return (
    <PlaceholderPage
      eyebrow="Customer support"
      title="Track a complaint"
      lead="Check where your complaint has reached, using its reference number."
      trail={[{ label: "Support", href: "/support" }]}
      soonTitle="Online tracking"
    >
      <p>
        Online tracking is on its way. Until then, the service desk can tell you the status of any
        complaint: call the 24×7 line and quote your reference number or address.
      </p>
    </PlaceholderPage>
  );
}
