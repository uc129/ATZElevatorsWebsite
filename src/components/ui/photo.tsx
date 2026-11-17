/**
 * Photo: a next/image that fills its frame. The frame sets size and shape via
 * `className`. Credits are not shown on the page; they live on /credits
 * (user, 18-Nov-2026).
 */
import Image from "next/image";
import { photos, type PhotoId } from "@/content/photos";
import { cn } from "@/lib/cn";

export function Photo({
  id,
  className,
  sizes,
  eager,
  focus = "center",
}: {
  id: PhotoId;
  className?: string;
  /** next/image sizes, e.g. "(min-width: 1024px) 40vw, 100vw" */
  sizes: string;
  eager?: boolean;
  /** Which part of the photo to keep when cropped */
  focus?: "center" | "left" | "right";
}) {
  const photo = photos[id];
  return (
    <div className={cn("relative overflow-hidden bg-box", className)}>
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
    </div>
  );
}
