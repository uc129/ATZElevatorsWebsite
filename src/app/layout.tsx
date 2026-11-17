import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Manrope } from "next/font/google";
import { cn } from "@/lib/cn";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "ATZ Elevators · Keeping the world in motion.",
  description:
    "Lifts and escalators: new installations, modernisation, maintenance and 24x7 breakdown service across Bihar, Jharkhand, Odisha and Assam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={cn(inter.variable, manrope.variable, plexMono.variable, "h-full")}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
