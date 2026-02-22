import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/app/lib/getLocale";
import RegisterForm from "./RegisterForm";
import { Icon } from "@/app/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.register.metaTitle, description: dict.register.metaDesc };
}

export default async function RegisterPage() {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.register;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="text-center mb-8">
          <Icon name="flower" className="h-16 w-16 mx-auto text-green-700" />
          <h1 className="mt-3 text-2xl font-bold text-green-900">גבעת הפרחים</h1>
          <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{t.title}</h2>
          <RegisterForm t={t} />
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          {t.alreadyHaveAccount}{" "}
          <Link href="/login" className="text-green-700 font-semibold hover:text-green-900">
            {t.loginLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
