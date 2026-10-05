import { NextResponse, type NextRequest } from "next/server";
import { HUB_PATHS, HUB_URL, isApexHost } from "@/lib/hosts";

/** One deployment, two faces.
 *
 *  On the apex (kaushiksaha.com) the root path serves the landing page, and
 *  anything belonging to the hub is permanently redirected to the hub
 *  subdomain — so every link published before the split still resolves, and
 *  search engines learn the new home rather than seeing duplicates.
 *
 *  On any other host (hub.kaushiksaha.com, the Railway domain, localhost) the
 *  app behaves exactly as it did before this file existed.
 */
export function middleware(request: NextRequest) {
  if (!isApexHost(request.headers.get("host"))) return NextResponse.next();

  const { pathname, search } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/landing";
    return NextResponse.rewrite(url);
  }

  if (HUB_PATHS.some((base) => pathname === base || pathname.startsWith(`${base}/`))) {
    return NextResponse.redirect(`${HUB_URL}${pathname}${search}`, 308);
  }

  return NextResponse.next();
}

export const config = {
  /** Skip framework internals, generated images and operational endpoints. */
  matcher: ["/((?!_next/|og/|health|favicon|icon|sitemap.xml|robots.txt).*)"],
};
