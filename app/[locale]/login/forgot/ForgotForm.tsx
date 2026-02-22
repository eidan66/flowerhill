"use client";

import { useActionState } from "react";
import { forgotPasswordAction, type ForgotPasswordResult } from "@/app/actions/auth";
import type { Dict } from "@/app/lib/i18n/he";

const initialState: ForgotPasswordResult = {};

interface Props {
  t: Dict["forgotPassword"];
  locale: string;
}

export default function ForgotForm({ t, locale }: Props) {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);

  if (state.success) {
    return (
      <div className="text-center py-6 space-y-4">
        <div className="text-5xl">📧</div>
        <h2 className="text-lg font-bold text-green-900">{t.successTitle}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{t.successDesc}</p>
        <a href={`/${locale}/login`} className="inline-block mt-2 text-green-700 font-semibold hover:text-green-900 text-sm">
          {t.backToLoginAfter}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      <p className="text-sm text-gray-600 leading-relaxed">{t.desc}</p>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
        <input type="email" id="email" name="email" required dir="ltr" disabled={isPending} autoComplete="email"
          placeholder="you@company.co.il"
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:bg-gray-50 disabled:opacity-60 transition-colors" />
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

      <p className="text-center text-sm text-gray-500">
        <a href={`/${locale}/login`} className="text-green-700 hover:text-green-900">{t.backToLogin}</a>
      </p>
    </form>
  );
}
