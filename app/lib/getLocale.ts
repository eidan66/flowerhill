import { cookies } from "next/headers";
import type { Locale } from "@/app/lib/i18n";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getLocale(): Promise<Locale> {
  const c = await cookies();
  const v = c.get(COOKIE_NAME)?.value;
  return v === "en" ? "en" : "he";
}

export { COOKIE_NAME };
