import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/app/lib/getLocale";

export function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale");
  const next = request.nextUrl.searchParams.get("next") ?? "/";

  const value = locale === "en" ? "en" : "he";
  const response = NextResponse.redirect(new URL(next, request.url));
  response.cookies.set(COOKIE_NAME, value, { path: "/", maxAge: 60 * 60 * 24 * 365 });
  return response;
}
