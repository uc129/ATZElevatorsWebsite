import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, ButtonLink } from "@/components/ui/button";
import { ChoiceCard, ChoiceGroup } from "@/components/ui/choice";
import { Input } from "@/components/ui/field";
import { Tabs } from "@/components/ui/tabs";
import { VerifiedBadge } from "@/components/ui/verified-badge";

describe("Button", () => {
  it("defaults to type=button so it never submits a form by accident", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("type", "button");
  });

  it("renders the WhatsApp style with the same shape as other buttons", () => {
    render(
      <ButtonLink href="https://wa.me/917257001413" variant="whatsapp">
        Chat on WhatsApp
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Chat on WhatsApp" });
    expect(link).toHaveAttribute("href", "https://wa.me/917257001413");
    expect(link.className).toContain("bg-whatsapp");
    expect(link.className).toContain("rounded-control");
  });
});

describe("Input", () => {
  it("links the label, hint and error, and marks the field invalid", () => {
    render(<Input label="Email" hint="We reply by email." error="Enter a valid email." required />);
    const input = screen.getByRole("textbox", { name: /email/i });
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("We reply by email. Enter a valid email.");
  });

  it("has no aria-invalid or description when clean", () => {
    render(<Input label="Name" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).not.toHaveAttribute("aria-invalid");
    expect(input).not.toHaveAttribute("aria-describedby");
  });
});

describe("Tabs", () => {
  const items = [
    { id: "a", label: "Passenger", content: "Passenger panel" },
    { id: "b", label: "Hospital", content: "Hospital panel" },
    { id: "c", label: "Freight", content: "Freight panel" },
  ];

  it("shows the first panel and moves with arrow keys, wrapping at the ends", async () => {
    const user = userEvent.setup();
    render(<Tabs label="Lift types" orientation="vertical" items={items} />);

    expect(screen.getByRole("tab", { name: "Passenger" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Passenger panel");

    await user.click(screen.getByRole("tab", { name: "Passenger" }));
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Hospital" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Hospital panel");

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Freight" })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Passenger" })).toHaveFocus();
  });

  it("keeps only the active tab in the tab order", () => {
    render(<Tabs label="Lift types" items={items} />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((t) => t.getAttribute("tabindex"))).toEqual(["0", "-1", "-1"]);
  });
});

describe("VerifiedBadge", () => {
  it("says verification is pending by default, in text", () => {
    render(<VerifiedBadge />);
    expect(screen.getByText("Verification pending")).toBeInTheDocument();
  });

  it("says verified client when verified", () => {
    render(<VerifiedBadge verified />);
    expect(screen.getByText("Verified client")).toBeInTheDocument();
  });
});

describe("ChoiceCard", () => {
  function Roof({ error }: { error?: string }) {
    return (
      <form aria-label="Roof">
        <ChoiceGroup legend="Room on the roof?" hint="For the machine room." error={error}>
          <ChoiceCard name="roof" value="yes" label="Yes" hint="There is space" />
          <ChoiceCard name="roof" value="no" label="No" />
          <ChoiceCard name="roof" value="unsure" label="Not sure" disabled />
        </ChoiceGroup>
      </form>
    );
  }

  it("is a real radio group named by its legend", () => {
    render(<Roof error="Choose an answer." />);
    const group = screen.getByRole("group", { name: "Room on the roof?" });
    expect(group).toHaveAccessibleDescription("For the machine room. Choose an answer.");
    expect(screen.getByRole("radio", { name: "Yes" })).toHaveAccessibleDescription(
      "There is space",
    );
    expect(screen.getByRole("radio", { name: "Not sure" })).toBeDisabled();
  });

  it("selects by clicking the card and moves with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Roof />);
    await user.click(screen.getByText("Yes"));
    expect(screen.getByRole("radio", { name: "Yes" })).toBeChecked();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "No" })).toBeChecked();
    const data = new FormData(screen.getByRole("form", { name: "Roof" }) as HTMLFormElement);
    expect(data.get("roof")).toBe("no");
  });
});
