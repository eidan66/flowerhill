import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "fh_session";
const LOCALES = ["he", "en"] as const;
const DEFAULT_LOCALE = "he";

// Routes that require an active session (locale-prefixed)
const PROTECTED = ["/account"];

// Routes that logged-in users should not see
const AUTH_ONLY = ["/login"];

function getLocaleFromPath(pathname: string): string {
  const segment = pathname.split("/")[1];
  return (LOCALES as readonly string[]).includes(segment) ? segment : DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Locale redirect ──────────────────────────────────────────────────────
  // Redirect bare paths (no locale prefix) to /he/...
  const firstSegment = pathname.split("/")[1];
  const hasLocale = (LOCALES as readonly string[]).includes(firstSegment);

  if (!hasLocale && pathname !== "/") {
    // e.g. /login → /he/login
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // ── Auth guard ───────────────────────────────────────────────────────────
  const locale = getLocaleFromPath(pathname);
  // Strip locale prefix for matching: /he/account → /account
  const strippedPath = pathname.replace(`/${locale}`, "") || "/";

  const session = request.cookies.get(COOKIE_NAME)?.value;
  const isLoggedIn = Boolean(session);

  const isProtected = PROTECTED.some((p) => strippedPath.startsWith(p));
  const isAuthOnly = AUTH_ONLY.some((p) => strippedPath.startsWith(p));

  if (isProtected && !isLoggedIn) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = `/${locale}/login`;
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthOnly && isLoggedIn) {
    const accountUrl = request.nextUrl.clone();
    accountUrl.pathname = `/${locale}/account`;
    return NextResponse.redirect(accountUrl);
  }

  // ── Pass locale to root layout via response header ───────────────────────
  const response = NextResponse.next();
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: [
    // Match everything except Next.js internals, static files, and public assets
    "/((?!_next/static|_next/image|favicon.ico|catalog/).*)",
  ],
};
