/**
 * Public site URL for metadata, sitemap and robots. Set NEXT_PUBLIC_SITE_URL
 * on Vercel once the domain is live; Vercel's own URL is the fallback.
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
