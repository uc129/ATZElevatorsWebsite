"use client";

/**
 * Muted, looping background video with a pause control (WCAG 2.2.2).
 * - Autoplays only when the visitor allows motion; otherwise shows the poster
 *   and waits for Play.
 * - Pauses while off screen to save battery and data.
 */
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type VideoSource = { src: string; type?: string; media?: string };

export function VideoLoop({
  sources,
  poster,
  label,
  className,
}: {
  /** In order of preference; add `media` to pick by screen size */
  sources: VideoSource[];
  poster: string;
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
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-cover"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type ?? "video/mp4"} media={s.media} />
        ))}
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
