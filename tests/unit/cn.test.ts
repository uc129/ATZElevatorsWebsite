import { describe, expect, it } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins truthy class names", () => {
    expect(cn("px-4", false, undefined, "py-2")).toBe("px-4 py-2");
  });

  it("lets the later Tailwind utility win", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});
