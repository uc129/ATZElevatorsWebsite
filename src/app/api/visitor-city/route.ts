import { visitorCityFrom } from "@/lib/enquiry";

/**
 * The visitor's approximate city for the quote form, from the header Vercel
 * adds (worked out from the internet address). Reading the request keeps
 * this per request (Next 16 Route Handlers). Never cached or stored.
 */
export function GET(request: Request) {
  return Response.json(
    { city: visitorCityFrom(request.headers) ?? null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
