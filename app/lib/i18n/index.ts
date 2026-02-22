export type Locale = "he" | "en";

export const locales: Locale[] = ["he", "en"];
export const defaultLocale: Locale = "he";

export function getDir(locale: Locale): "rtl" | "ltr" {
  return locale === "he" ? "rtl" : "ltr";
}

/** Prefix a path with the locale: lp("en", "/login") → "/en/login" */
export function lp(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

export function isValidLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}
