import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/app/lib/getLocale";
import LoginForm from "./LoginForm";
import { Icon } from "@/app/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.login.metaTitle };
}

export default async function LoginPage() {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.login;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <Icon name="flower" className="h-16 w-16 mx-auto text-green-700" />
          <h1 className="mt-3 text-2xl font-bold text-green-900">גבעת הפרחים</h1>
          <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <LoginForm t={t} locale={locale} />
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          {t.noAccount}{" "}
          <Link href="/register" className="text-green-700 font-semibold hover:text-green-900 underline underline-offset-2">
            {t.registerLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
