import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/app/lib/i18n";

interface Props { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.about.metaTitle, description: dict.about.metaDesc };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.about;
  const lp = (path: string) => `/${locale}${path}`;

  const values = [
    { icon: "🏆", title: t.value1Title, desc: t.value1Desc },
    { icon: "🤝", title: t.value2Title, desc: t.value2Desc },
    { icon: "🌿", title: t.value3Title, desc: t.value3Desc },
    { icon: "👥", title: t.value4Title, desc: t.value4Desc },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-6">{t.heroTitle}</h1>
            <p className="text-xl text-green-100 leading-relaxed">{t.heroSub}</p>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.storyTitle}</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>{t.storyP1}</p>
                <p>{t.storyP2}</p>
                <p>{t.storyP3}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-2xl p-12 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🌸</div>
                <div className="text-2xl font-bold text-green-800">גבעת הפרחים</div>
                <div className="text-gray-600 mt-1">Flower Hill</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { v: "30+",   l: t.statsYears },
              { v: "500+",  l: t.statsClients },
              { v: "1,000+",l: t.statsVarieties },
              { v: "יומי",  l: t.statsDelivery },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-4xl font-bold text-amber-300 mb-1">{s.v}</div>
                <div className="text-green-200">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.qualityTitle}</h3>
              <ul className="space-y-4">
                {[t.quality1, t.quality2, t.quality3, t.quality4].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.logisticsTitle}</h3>
              <ul className="space-y-4">
                {[t.logistics1, t.logistics2, t.logistics3, t.logistics4].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-green-600 mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-800 text-white text-center">
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
