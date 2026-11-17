/**
 * What the /styleguide page shows. Class names are written out in full so
 * Tailwind can find them. Keep in step with src/styles/tokens.css.
 */

export type Swatch = { name: string; hex: string; className: string; use: string };

export const colourGroups: { title: string; note: string; swatches: Swatch[] }[] = [
  {
    title: "Text and headings",
    note: "Navy for headings, ink for body copy. Subtle is for captions only.",
    swatches: [
      { name: "navy", hex: "#0B1F33", className: "bg-navy", use: "Headings" },
      { name: "ink", hex: "#10243A", className: "bg-ink", use: "Body text" },
      { name: "muted", hex: "#3F5468", className: "bg-muted", use: "Secondary text" },
      { name: "subtle", hex: "#5A6E80", className: "bg-subtle", use: "Captions, meta" },
    ],
  },
  {
    title: "Brand cyan",
    note: "Interactive accent only: links, buttons, focus, small highlights. Never large fills.",
    swatches: [
      { name: "brand", hex: "#0E7A99", className: "bg-brand", use: "Primary button fill" },
      { name: "brand-hover", hex: "#0B617A", className: "bg-brand-hover", use: "Hover, cyan text" },
      {
        name: "brand-line",
        hex: "#1FA3C4",
        className: "bg-brand-line",
        use: "Focus ring, strokes",
      },
      { name: "brand-ice", hex: "#8FE7FF", className: "bg-brand-ice", use: "Illustration tint" },
    ],
  },
  {
    title: "Surfaces",
    note: "White page background. Soft grey for containers, only when needed.",
    swatches: [
      { name: "white", hex: "#FFFFFF", className: "bg-white", use: "Page" },
      { name: "box", hex: "#F5F6F7", className: "bg-box", use: "Cards" },
      { name: "tint", hex: "#F2F3F5", className: "bg-tint", use: "Chips, bands" },
      { name: "line", hex: "#E6E8EB", className: "bg-line", use: "Dividers" },
      { name: "line-strong", hex: "#D5D9DE", className: "bg-line-strong", use: "Control borders" },
    ],
  },
  {
    title: "Status",
    note: "Always paired with a text label. Info is blue so cyan stays interactive.",
    swatches: [
      { name: "success", hex: "#1E7F3C", className: "bg-success", use: "Done, active" },
      { name: "warning", hex: "#B45309", className: "bg-warning", use: "Attention" },
      { name: "danger", hex: "#BC2F2F", className: "bg-danger", use: "Errors" },
      { name: "info", hex: "#2F5FBF", className: "bg-info", use: "Information" },
      { name: "neutral", hex: "#66737F", className: "bg-neutral", use: "Pending, inactive" },
    ],
  },
  {
    title: "WhatsApp",
    note: "Only for WhatsApp actions, with dark text and a thin dark border.",
    swatches: [
      { name: "whatsapp", hex: "#25D366", className: "bg-whatsapp", use: "Button fill" },
      { name: "whatsapp-ink", hex: "#111B21", className: "bg-whatsapp-ink", use: "Text, border" },
    ],
  },
];

export const typeScale: { name: string; className: string; spec: string; sample: string }[] = [
  {
    name: "display",
    className: "font-heading text-display font-extrabold tracking-tight text-navy",
    spec: "Manrope 800 · 38→60px",
    sample: "Keeping the world in motion.",
  },
  {
    name: "h1",
    className: "font-heading text-h1 font-bold tracking-tight text-navy",
    spec: "Manrope 700 · 32→44px",
    sample: "Lifts for every building",
  },
  {
    name: "h2",
    className: "font-heading text-h2 font-bold tracking-tight text-navy",
    spec: "Manrope 700 · 32→40px",
    sample: "How we work",
  },
  {
    name: "h3",
    className: "font-heading text-h3 font-bold tracking-tight text-navy",
    spec: "Manrope 700 · 22px",
    sample: "Annual maintenance",
  },
  {
    name: "h4",
    className: "font-heading text-h4 font-semibold tracking-tight text-navy",
    spec: "Manrope 600 · 18px",
    sample: "Patna head office",
  },
  {
    name: "lg",
    className: "text-lg text-muted",
    spec: "Inter 400 · 18px / 1.65",
    sample: "Installation, modernisation and 24x7 service across eastern India.",
  },
  {
    name: "base",
    className: "text-base text-ink",
    spec: "Inter 400 · 16px / 1.5",
    sample: "Body copy never goes below 16px.",
  },
  {
    name: "sm",
    className: "text-sm text-muted",
    spec: "Inter 400 · 14px",
    sample: "Supporting text in cards and footers.",
  },
  {
    name: "caption",
    className: "text-caption font-semibold tracking-wide text-brand-ink uppercase",
    spec: "Inter 600 · 13px · +0.08em",
    sample: "Eyebrow label",
  },
  {
    name: "mono",
    className: "font-mono text-base text-ink",
    spec: "IBM Plex Mono 500 · figures",
    sample: "₹ 12,45,000 · 72570 01413",
  },
];

export const radii = [
  { name: "xs", className: "rounded-xs", px: "4px", use: "WhatsApp button, tags" },
  { name: "sm", className: "rounded-sm", px: "8px", use: "Nav links" },
  { name: "control", className: "rounded-control", px: "10px", use: "Buttons, inputs, tabs" },
  { name: "md", className: "rounded-md", px: "12px", use: "Stage cards" },
  { name: "lg", className: "rounded-lg", px: "16px", use: "Cards, photos" },
  { name: "full", className: "rounded-full", px: "9999px", use: "Chips, badges" },
];

export const shadows = [
  { name: "xs", className: "shadow-xs" },
  { name: "sm", className: "shadow-sm" },
  { name: "md", className: "shadow-md" },
  { name: "lg", className: "shadow-lg" },
  { name: "lift", className: "shadow-lift" },
  { name: "active", className: "shadow-active" },
];
