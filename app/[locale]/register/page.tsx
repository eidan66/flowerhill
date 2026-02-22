import type { Metadata } from "next";
import type { Locale } from "@/app/lib/i18n";
import RegisterForm from "./RegisterForm";

interface Props { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.register.metaTitle, description: dict.register.metaDesc };
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.register;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="text-center mb-8">
          <span className="text-5xl">🌸</span>
          <h1 className="mt-3 text-2xl font-bold text-green-900">גבעת הפרחים</h1>
          <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{t.title}</h2>
          <RegisterForm t={t} locale={locale} />
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          {t.alreadyHaveAccount}{" "}
          <a href={`/${locale}/login`} className="text-green-700 font-semibold hover:text-green-900">
            {t.loginLink}
          </a>
        </p>
      </div>
    </div>
  );
}
