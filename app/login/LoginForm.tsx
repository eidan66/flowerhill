"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type LoginResult } from "@/app/actions/auth";
import type { Dict } from "@/app/lib/i18n/he";

const initialState: LoginResult = {};

interface Props {
  t: Dict["login"];
  locale: string;
}

export default function LoginForm({ t, locale }: Props) {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} noValidate className="space-y-5">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          {t.username}
        </label>
        <input type="text" id="username" name="username" required autoComplete="username" dir="ltr" disabled={isPending}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:bg-gray-50 disabled:opacity-60 transition-colors"
          placeholder="user@company.co.il" />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t.password}</label>
          <Link href="/login/forgot" className="text-xs text-green-700 hover:text-green-900">{t.forgotPassword}</Link>
        </div>
        <input type="password" id="password" name="password" required autoComplete="current-password" dir="ltr" disabled={isPending}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:bg-gray-50 disabled:opacity-60 transition-colors"
          placeholder="••••••••" />
      </div>

      {state.error && (
        <div role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          <span>⚠️</span>{state.error}
        </div>
      )}

      <button type="submit" disabled={isPending}
        className="w-full bg-green-800 hover:bg-green-900 disabled:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 flex items-center justify-center gap-2">
        {isPending ? (
          <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>{t.submitting}</>
        ) : t.submit}
      </button>

      {process.env.NODE_ENV !== "production" && (
        <p className="text-xs text-center text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <strong>{locale === "he" ? "מצב פיתוח:" : "Dev mode:"}</strong> {t.devNotice}
        </p>
      )}
    </form>
  );
}
