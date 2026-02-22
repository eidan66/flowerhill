import type { Metadata } from "next";
import type { Locale } from "@/app/lib/i18n";
import ResourcesClient from "./ResourcesClient";

interface Props { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.resources.metaTitle, description: dict.resources.metaDesc };
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.resources;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-xl text-green-100">{t.heroSub}</p>
        </div>
      </div>
      <ResourcesClient t={t} locale={locale} />
    </div>
  );
}
