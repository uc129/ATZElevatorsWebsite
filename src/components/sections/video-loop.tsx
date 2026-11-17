"use client";

/**
 * Muted, looping background video with a pause control (WCAG 2.2.2).
 * - Autoplays only when the visitor allows motion; otherwise shows the poster
 *   and waits for Play.
 * - Pauses while off screen to save battery and data.
 * - 1080p source on wide screens, 720p elsewhere.
 */
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export function VideoLoop({
  label,
  className,
}: {
  /** Describes the video for screen readers */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // The visitor's choice wins over the automatic behaviour.
  const userChoice = useRef<"play" | "pause" | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const wantsPlay = userChoice.current ? userChoice.current === "play" : !reduce;
        if (entry.isIntersecting && wantsPlay) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userChoice.current = "play";
      void video.play().catch(() => undefined);
    } else {
      userChoice.current = "pause";
      video.pause();
    }
  }

  return (
    <div className={cn("relative overflow-hidden bg-navy", className)}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/atz-in-motion-poster.jpg"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-cover"
      >
        <source src="/media/atz-in-motion-1080.mp4" type="video/mp4" media="(min-width: 1280px)" />
        <source src="/media/atz-in-motion-720.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-4 bottom-4 inline-flex size-11 items-center justify-center rounded-full border border-white/60 bg-white/90 text-navy shadow-md backdrop-blur-sm transition-colors hover:bg-white"
      >
        {playing ? (
          <Pause aria-hidden="true" className="size-5" />
        ) : (
          <Play aria-hidden="true" className="size-5" />
        )}
      </button>
    </div>
  );
}
