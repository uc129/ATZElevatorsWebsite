import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import logo from "../../../public/brand/atz-logo.png";

/** ATZ logo (from the ERP: Documents/Assets/atz-logo.png), linking home. */
export function Logo({ className, eager }: { className?: string; eager?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="ATZ Elevators home"
      className={cn("inline-flex shrink-0", className)}
    >
      <Image
        src={logo}
        alt="ATZ Elevator"
        className="h-9.5 w-auto"
        loading={eager ? "eager" : "lazy"}
        sizes="150px"
      />
    </Link>
  );
}
