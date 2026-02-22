import { cookies } from "next/headers";

export interface Session {
  userId: string;
  name: string;
  businessName: string;
  email: string;
  role: "customer" | "admin";
}

const COOKIE_NAME = "fh_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Encode session data as a base64 JSON string.
 * NOTE: This is NOT cryptographically signed.
 * Once the real backend is integrated, replace this with a signed JWT
 * returned by the backend and stored as-is in the cookie.
 */
function encode(data: Session): string {
  return Buffer.from(JSON.stringify(data)).toString("base64");
}

function decode(raw: string): Session | null {
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf-8")) as Session;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return null;
  return decode(raw);
}

export async function setSession(data: Session): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, encode(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
