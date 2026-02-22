import type { Metadata } from "next";
import { getLocale } from "@/app/lib/getLocale";
import ResourcesClient from "./ResourcesClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.resources.metaTitle, description: dict.resources.metaDesc };
}

export default async function ResourcesPage() {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.resources;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-green-900 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t.heroTitle}</h1>
          <p className="text-xl text-green-100">{t.heroSub}</p>
        </div>
      </div>
      <ResourcesClient t={t} />
    </div>
  );
}
