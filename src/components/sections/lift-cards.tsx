import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cardStyles } from "@/components/ui/card";
import { Photo } from "@/components/ui/photo";
import { Spotlight } from "@/components/ui/spotlight";
import { liftCategories, liftHref, type LiftCategory } from "@/content/lifts";
import { IconPanel } from "./lift-showcase";

/** Grid of lift types, each linking to its page. */
export function LiftCards({ lifts = liftCategories }: { lifts?: readonly LiftCategory[] }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {lifts.map((lift) => (
        <Spotlight
          as="li"
          key={lift.slug}
          className={cardStyles({ interactive: true, className: "flex flex-col overflow-hidden" })}
        >
          <div className="aspect-video overflow-hidden">
            {lift.photo ? (
              <Photo
                id={lift.photo}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="size-full"
              />
            ) : (
              <IconPanel lift={lift} compact />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2 p-6">
            <h3 className="text-h4 font-bold">{lift.name}</h3>
            <p className="text-sm text-subtle">{lift.short}</p>
            <p className="text-muted">{lift.blurb}</p>
            <Link
              href={liftHref(lift.slug)}
              className="mt-auto inline-flex min-h-11 items-center gap-1.5 font-semibold no-underline after:absolute after:inset-0"
            >
              {lift.name} <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </Spotlight>
      ))}
    </ul>
  );
}
