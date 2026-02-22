"use client";

import { useActionState } from "react";
import { registerAction, type RegisterResult } from "@/app/actions/auth";
import type { Dict } from "@/app/lib/i18n/he";

const initialState: RegisterResult = {};

interface Props {
  t: Dict["register"];
  locale: string;
}

function Field({ label, name, type = "text", required = false, dir, placeholder, disabled, autoComplete }: {
  label: string; name: string; type?: string; required?: boolean;
  dir?: "ltr" | "rtl"; placeholder?: string; disabled: boolean; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1 text-right">
        {label}{required && <span className="text-red-500 mx-1">*</span>}
      </label>
      <input type={type} id={name} name={name} required={required} dir={dir} disabled={disabled}
        autoComplete={autoComplete} placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent disabled:bg-gray-50 disabled:opacity-60 transition-colors text-sm" />
    </div>
  );
}

export default function RegisterForm({ t, locale }: Props) {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

  if (state.success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-5xl">✅</div>
        <h2 className="text-xl font-bold text-green-900">{t.successTitle}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{t.successDesc}</p>
        <a href={`/${locale}/login`} className="inline-block mt-4 text-green-700 font-semibold hover:text-green-900 text-sm">
          {t.backToLogin}
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-4">
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-2">{t.sectionBusiness}</h2>
        <Field label={t.businessName} name="businessName" required disabled={isPending} />
        <Field label={t.businessId} name="businessId" required disabled={isPending} dir="ltr" placeholder="123456789" />
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-2">{t.sectionPersonal}</h2>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.firstName} name="firstName" required disabled={isPending} />
          <Field label={t.lastName}  name="lastName"  required disabled={isPending} />
        </div>
        <Field label={t.email}  name="email"  type="email" required disabled={isPending} dir="ltr" placeholder="you@company.co.il" autoComplete="email" />
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.mobile} name="mobile" type="tel" required disabled={isPending} dir="ltr" placeholder="05X-XXXXXXX" autoComplete="tel" />
          <Field label={t.phone}  name="phone"  type="tel" disabled={isPending} dir="ltr" placeholder="0X-XXXXXXX" />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 pb-2">{t.sectionAddress}</h2>
        <Field label={t.city} name="city" disabled={isPending} />
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2"><Field label={t.street} name="street" disabled={isPending} /></div>
          <Field label={t.streetNumber} name="streetNumber" disabled={isPending} dir="ltr" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t.apartment} name="apartment" disabled={isPending} dir="ltr" />
          <Field label={t.zipCode}   name="zipCode"   disabled={isPending} dir="ltr" placeholder="1234567" />
        </div>
      </div>

      <div className="flex items-start gap-3 pt-2">
        <input type="checkbox" id="newsletter" name="newsletter" disabled={isPending}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-green-700 focus:ring-green-600 cursor-pointer" />
        <label htmlFor="newsletter" className="text-sm text-gray-600 cursor-pointer leading-snug">{t.newsletter}</label>
      </div>

      <p className="text-xs text-gray-400"><span className="text-red-500">*</span> {t.required}</p>

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
    </form>
  );
}
