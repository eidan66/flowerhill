import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "fh_session";
const LOCALE_COOKIE = "NEXT_LOCALE";

// Routes that require an active session
const PROTECTED = ["/account"];

// Routes that logged-in users should not see
const AUTH_ONLY = ["/login"];

function getLocaleFromCookie(request: NextRequest): string {
  const v = request.cookies.get(LOCALE_COOKIE)?.value;
  return v === "en" ? "en" : "he";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Auth guard (no locale redirects; locale is cookie-based) ────────────
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const isLoggedIn = Boolean(session);

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  const isAuthOnly = AUTH_ONLY.some((p) => pathname.startsWith(p));

  if (isProtected && !isLoggedIn) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthOnly && isLoggedIn) {
    const accountUrl = request.nextUrl.clone();
    accountUrl.pathname = "/account";
    return NextResponse.redirect(accountUrl);
  }

  // ── Pass locale to root layout via response header ───────────────────────
  const locale = getLocaleFromCookie(request);
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
