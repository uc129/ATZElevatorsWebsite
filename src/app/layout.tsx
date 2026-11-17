import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Manrope } from "next/font/google";
import { EnquiryProvider } from "@/components/layout/enquiry";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { company } from "@/content/company";
import { cn } from "@/lib/cn";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: "500",
});

const description =
  "Lifts and escalators: new installations, modernisation, maintenance and 24x7 breakdown service across Bihar, Jharkhand, Odisha and Assam.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.brand} · ${company.tagline}`,
    template: `%s · ${company.brand}`,
  },
  description,
  applicationName: company.brand,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: company.brand,
    title: `${company.brand} · ${company.tagline}`,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={cn(inter.variable, manrope.variable, plexMono.variable, "h-full scroll-pt-header")}
    >
      <body className="flex min-h-full flex-col">
        <EnquiryProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <SiteFooter />
          <MobileActionBar />
        </EnquiryProvider>
      </body>
    </html>
  );
}
