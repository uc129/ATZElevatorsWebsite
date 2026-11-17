import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "AMC renewal",
  description: "See your next maintenance visit and renew your ATZ annual maintenance contract.",
};

export default function AmcRenewalPage() {
  return (
    <PlaceholderPage
      eyebrow="Customer support"
      title="AMC renewal"
      lead="See your next maintenance visit and renew your annual maintenance contract."
      trail={[{ label: "Support", href: "/support" }]}
      soonTitle="Online AMC renewal"
    >
      <p>
        Soon you will see your next visit date here and request a renewal in a few clicks. Until
        then, call the service desk or message us on WhatsApp and we will send your renewal
        quotation.
      </p>
    </PlaceholderPage>
  );
}
