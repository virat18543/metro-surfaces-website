import { NextResponse, type NextRequest } from "next/server";

/**
 * Alternate spellings of a page's URL, mapped to the real route.
 *
 * The catalogue is branded "Acrycore" with a capital A and gets said aloud as
 * "crycore", but Next serves routes case sensitively and only at the exact
 * path, so /Acrycore and /crycore both 404. Keys are lowercase; the lookup
 * lowercases the incoming path, so every casing of a key is covered by one
 * entry. Add a line here to alias another page.
 */
const aliases = new Map([
  ["/acrycore", "/acrycore"],
  ["/crycore", "/acrycore"],
  ["/woodveneer", "/woodveneer"],
  ["/wood-veneer", "/woodveneer"],
]);

/**
 * Redirects rather than serving the page at every spelling: one canonical URL
 * keeps the catalogue's search ranking on /acrycore instead of splitting it
 * across near-duplicate copies.
 */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const canonical = aliases.get(pathname.toLowerCase());

  // Comparing against the exact path is what stops /acrycore, which is a key in
  // its own right, from redirecting to itself in a loop.
  if (canonical && canonical !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = canonical;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Only the aliased paths run the proxy; every other route skips it.
   *
   * Spelled out as character classes because this matcher, unlike the one
   * behind `redirects()` in next.config.ts, is case sensitive: a plain
   * "/acrycore" here would never see /Acrycore and the page would stay a 404.
   * The optional leading A covers both /acrycore and /crycore in one pattern,
   * and the optional hyphen covers /woodveneer and /wood-veneer in the other.
   */
  matcher: [
    "/:variant([Aa]?[Cc][Rr][Yy][Cc][Oo][Rr][Ee])",
    "/:variant([Ww][Oo][Oo][Dd]-?[Vv][Ee][Nn][Ee][Ee][Rr])",
  ],
};
