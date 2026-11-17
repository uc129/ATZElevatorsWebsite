import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Log a complaint",
  description: "Report a lift fault or a problem with a service visit to ATZ Elevators.",
};

export default function ComplaintPage() {
  return (
    <PlaceholderPage
      eyebrow="Customer support"
      title="Log a complaint"
      lead="Report a fault, a breakdown or a problem with a service visit."
      trail={[{ label: "Support", href: "/support" }]}
      soonTitle="Online complaints"
    >
      <p>
        Soon you will be able to log a complaint here with your lift ID or address, the issue and a
        photo, and get a reference number to track it.
      </p>
      <p>
        Until then, call the 24×7 service line on {company.phones.service.display} or send the
        details and a photo on WhatsApp. Every complaint is logged by our service desk.
      </p>
    </PlaceholderPage>
  );
}
