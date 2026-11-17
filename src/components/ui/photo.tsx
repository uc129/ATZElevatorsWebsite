/**
 * Photo: a next/image that fills its frame, with a frosted tag for the
 * photo credit (third-party photos) or an "ATZ installation" tag. The frame
 * sets the size and shape via `className`.
 */
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { creditLine } from "@/content/credits";
import { photos, type PhotoId } from "@/content/photos";
import { cn } from "@/lib/cn";

export function Photo({
  id,
  className,
  sizes,
  eager,
  tag = "bottom-left",
  hideTag,
  focus = "center",
}: {
  id: PhotoId;
  className?: string;
  /** next/image sizes, e.g. "(min-width: 1024px) 40vw, 100vw" */
  sizes: string;
  eager?: boolean;
  tag?: "bottom-left" | "bottom-right" | "top-left";
  hideTag?: boolean;
  /** Which part of the photo to keep when cropped */
  focus?: "center" | "left" | "right";
}) {
  const photo = photos[id];
  const label = "credit" in photo && photo.credit ? creditLine(photo.credit) : "ATZ installation";
  return (
    <figure className={cn("relative m-0 overflow-hidden bg-box", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        loading={eager ? "eager" : "lazy"}
        className={cn(
          "object-cover",
          focus === "left" && "object-left",
          focus === "right" && "object-right",
        )}
      />
      {hideTag ? null : (
        <figcaption
          className={cn(
            "absolute",
            tag === "top-left" && "top-3 left-3",
            tag === "bottom-left" && "bottom-3 left-3",
            tag === "bottom-right" && "right-3 bottom-3",
          )}
        >
          <Badge tone="onPhoto">{label}</Badge>
        </figcaption>
      )}
    </figure>
  );
}
