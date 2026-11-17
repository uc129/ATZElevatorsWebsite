/**
 * Greyed "Verification pending" badge for sample testimonials and photos.
 * Swap to verified once real, checked client quotes arrive.
 * Built on Badge (cuicui "Modern simple badges").
 */
import { BadgeCheck } from "lucide-react";
import { Badge } from "./badge";

export function VerifiedBadge({ verified = false }: { verified?: boolean }) {
  return verified ? (
    <Badge tone="success">
      <BadgeCheck aria-hidden="true" />
      Verified client
    </Badge>
  ) : (
    <Badge tone="pending" title="Sample content. Verification pending.">
      <BadgeCheck aria-hidden="true" />
      Verification pending
    </Badge>
  );
}
