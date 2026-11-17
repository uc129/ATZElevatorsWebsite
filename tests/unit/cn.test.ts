import { describe, expect, it } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("px-4", false, undefined, "py-2")).toBe("px-4 py-2");
  });

  it("lets the later Tailwind utility win", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("keeps a custom font size next to a token colour", () => {
    expect(cn("text-display", "text-navy")).toBe("text-display text-navy");
    expect(cn("text-caption", "text-brand-ink")).toBe("text-caption text-brand-ink");
  });

  it("resolves conflicts between custom font sizes", () => {
    expect(cn("text-h2", "text-h3")).toBe("text-h3");
  });

  it("keeps a custom shadow and radius", () => {
    expect(cn("rounded-control", "shadow-lift", "border-line")).toBe(
      "rounded-control shadow-lift border-line",
    );
    expect(cn("rounded-lg", "rounded-control")).toBe("rounded-control");
  });
});
