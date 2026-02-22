"use server";

import { redirect } from "next/navigation";
import { setSession, clearSession, type Session } from "@/app/lib/session";

export interface LoginResult {
  error?: string;
}

/**
 * LOGIN ACTION
 *
 * Integration point: replace the block marked "── BACKEND CALL ──" with a
 * real fetch to the existing Flower Hill API, e.g.:
 *
 *   const res = await fetch(process.env.AUTH_API_URL + "/login", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ username, password }),
 *   });
 *   if (!res.ok) return { error: "שם משתמש או סיסמה שגויים" };
 *   const user: Session = await res.json();
 *   await setSession(user);
 *   redirect("/account");
 */
export async function loginAction(
  _prev: LoginResult,
  formData: FormData
): Promise<LoginResult> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!username || !password) {
    return { error: "יש למלא שם משתמש וסיסמה" };
  }

  // ── BACKEND CALL ────────────────────────────────────────────────────────
  // Stub: accepts any non-empty credentials in development.
  // Replace this entire block once AUTH_API_URL is configured in .env.local
  const apiUrl = process.env.AUTH_API_URL;

  if (apiUrl) {
    // Real backend integration
    let res: Response;
    try {
      res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        cache: "no-store",
      });
    } catch {
      return { error: "שגיאת חיבור לשרת. נסו שוב." };
    }

    if (!res.ok) {
      return { error: "שם משתמש או סיסמה שגויים" };
    }

    const user = (await res.json()) as Session;
    await setSession(user);
  } else {
    // ── DEV STUB (remove / replace for production) ──
    if (process.env.NODE_ENV === "production") {
      return { error: "מערכת ההתחברות טרם הוגדרה. פנו למנהל." };
    }
    // Mock session for local development
    const mockSession: Session = {
      userId: "dev-001",
      name: "משתמש פיתוח",
      businessName: "גבעת הפרחים — פיתוח",
      email: username,
      role: "customer",
    };
    await setSession(mockSession);
  }
  // ────────────────────────────────────────────────────────────────────────

  redirect("/account");
}

/**
 * LOGOUT ACTION
 */
export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/login");
}

export interface ForgotPasswordResult {
  error?: string;
  success?: boolean;
}

/**
 * FORGOT PASSWORD ACTION
 *
 * Integration point: POST to {AUTH_API_URL}/auth/forgot-password with { email }.
 * Always returns success on the client side to avoid email enumeration.
 */
export async function forgotPasswordAction(
  _prev: ForgotPasswordResult,
  formData: FormData
): Promise<ForgotPasswordResult> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "יש להזין כתובת דוא\"ל" };
  }

  const apiUrl = process.env.AUTH_API_URL;

  if (apiUrl) {
    try {
      await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        cache: "no-store",
      });
    } catch {
      return { error: "שגיאת חיבור לשרת. נסו שוב." };
    }
  } else if (process.env.NODE_ENV === "production") {
    return { error: "המערכת טרם הוגדרה. פנו למנהל." };
  }

  // Always show success to avoid email enumeration
  return { success: true };
}

export interface RegisterResult {
  error?: string;
  success?: boolean;
}

/**
 * REGISTER ACTION
 *
 * Integration point: replace the block marked "── BACKEND CALL ──" with a
 * real fetch to the existing Flower Hill API, e.g.:
 *
 *   const res = await fetch(process.env.AUTH_API_URL + "/auth/register", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) return { error: "ארעה שגיאה. נסו שוב." };
 *   return { success: true };
 */
export async function registerAction(
  _prev: RegisterResult,
  formData: FormData
): Promise<RegisterResult> {
  const required = ["businessName", "businessId", "firstName", "lastName", "email", "mobile"];
  for (const field of required) {
    if (!String(formData.get(field) ?? "").trim()) {
      return { error: "יש למלא את כל שדות החובה המסומנים ב-*" };
    }
  }

  const data = {
    businessName: String(formData.get("businessName")).trim(),
    businessId: String(formData.get("businessId")).trim(),
    firstName: String(formData.get("firstName")).trim(),
    lastName: String(formData.get("lastName")).trim(),
    email: String(formData.get("email")).trim(),
    phone: String(formData.get("phone")).trim(),
    mobile: String(formData.get("mobile")).trim(),
    city: String(formData.get("city")).trim(),
    street: String(formData.get("street")).trim(),
    streetNumber: String(formData.get("streetNumber")).trim(),
    apartment: String(formData.get("apartment")).trim(),
    zipCode: String(formData.get("zipCode")).trim(),
    newsletter: formData.get("newsletter") === "on",
  };

  // ── BACKEND CALL ────────────────────────────────────────────────────────
  const apiUrl = process.env.AUTH_API_URL;

  if (apiUrl) {
    let res: Response;
    try {
      res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store",
      });
    } catch {
      return { error: "שגיאת חיבור לשרת. נסו שוב." };
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { error: (body as { message?: string }).message ?? "ארעה שגיאה. נסו שוב." };
    }
  } else if (process.env.NODE_ENV === "production") {
    return { error: "מערכת ההרשמה טרם הוגדרה. פנו למנהל." };
  }
  // ── DEV: fall through to success ─────────────────────────────────────────

  return { success: true };
}
