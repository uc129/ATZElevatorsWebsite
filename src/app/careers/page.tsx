import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/sections/placeholder-page";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work with ATZ Elevators: lift engineers, technicians and office roles in Patna and across the east.",
};

export default function CareersPage() {
  return (
    <PlaceholderPage
      eyebrow="Careers"
      title="Work with ATZ"
      lead="Engineers, technicians and office teams in Patna and across the east."
      soonTitle="Open roles"
    >
      <p>
        Open roles by office, with an application form, will be listed here. If you are a lift
        technician or engineer looking for work, call us or send your details on WhatsApp.
      </p>
    </PlaceholderPage>
  );
}
