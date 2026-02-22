import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/app/lib/i18n";

interface Props { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.suppliers.metaTitle, description: dict.suppliers.metaDesc };
}

export default async function SuppliersPage({ params }: Props) {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.suppliers;
  const lp = (path: string) => `/${locale}${path}`;

  const benefits = [
    { icon: "🌍", title: t.benefit1Title, desc: t.benefit1Desc },
    { icon: "💰", title: t.benefit2Title, desc: t.benefit2Desc },
    { icon: "📈", title: t.benefit3Title, desc: t.benefit3Desc },
    { icon: "🤝", title: t.benefit4Title, desc: t.benefit4Desc },
  ];

  const steps = [
    { n: "1", title: t.step1Title, desc: t.step1Desc },
    { n: "2", title: t.step2Title, desc: t.step2Desc },
    { n: "3", title: t.step3Title, desc: t.step3Desc },
    { n: "4", title: t.step4Title, desc: t.step4Desc },
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

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.whyTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-green-400 hover:shadow-sm transition-all text-center">
                <div className="text-4xl mb-3">{b.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-600 text-sm">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.requirementsTitle}</h2>
              <p className="text-gray-600 mb-6">{t.requirementsDesc}</p>
              <ul className="space-y-3">
                {[t.req1, t.req2, t.req3, t.req4, t.req5].map((r) => (
                  <li key={r} className="flex items-center gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.processTitle}</h2>
              <div className="space-y-6">
                {steps.map((s) => (
                  <div key={s.n} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-800 text-white rounded-full flex items-center justify-center font-bold">
                      {s.n}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{s.title}</div>
                      <div className="text-gray-600 text-sm mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-800 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.ctaTitle}</h2>
          <p className="text-green-100 mb-8 text-lg">{t.ctaSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={lp("/contact")} className="bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-10 py-4 rounded-lg transition-colors">
              {t.ctaBtn}
            </Link>
            <a href="https://wa.me/9720000000000" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-10 py-4 rounded-lg transition-colors" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
