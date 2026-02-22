import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/app/lib/getLocale";
import { Icon } from "@/app/components/icons";
import type { IconName } from "@/app/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.services.metaTitle, description: dict.services.metaDesc };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.services;
  const lp = (path: string) => path;

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-green-900 text-white py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t.heroTitle}</h1>
          <p className="text-xl text-green-100 max-w-2xl">{t.heroSub}</p>
        </div>
      </div>

      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="plane" className="h-10 w-10 text-green-700" />
                <h2 className="text-2xl font-bold text-gray-900">{t.exportTitle}</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{t.exportDesc}</p>
              <ul className="space-y-3 mb-8">
                {[t.export1, t.export2, t.export3, t.export4, t.export5].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={lp("/contact")} className="inline-block bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                {t.exportBtn}
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="package" className="h-10 w-10 text-green-700" />
                <h2 className="text-2xl font-bold text-gray-900">{t.importTitle}</h2>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{t.importDesc}</p>
              <ul className="space-y-3 mb-8">
                {[t.import1, t.import2, t.import3, t.import4, t.import5].map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={lp("/contact")} className="inline-block bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                {t.importBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.logisticsTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.logisticsSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: "snowflake" as IconName, title: t.cold,   desc: t.coldDesc },
              { icon: "file" as IconName,      title: t.docs,   desc: t.docsDesc },
              { icon: "timer" as IconName,     title: t.timing, desc: t.timingDesc },
            ].map((item) => (
              <div key={item.title} className="text-center bg-green-50 rounded-xl p-8 border border-green-100">
                <div className="mb-4 flex justify-center text-green-700">
                  <Icon name={item.icon} className="h-12 w-12" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-16 bg-green-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-green-100 mb-8">{t.ctaSub}</p>
          <Link href={lp("/contact")} className="inline-block bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-10 py-4 rounded-lg transition-colors">
            {t.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
