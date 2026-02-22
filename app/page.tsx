import Link from "next/link";
import { getLocale } from "@/app/lib/getLocale";
import { Icon } from "@/app/components/icons";
import type { IconName } from "@/app/components/icons";

export default async function HomePage() {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.home;
  const lp = (path: string) => path;

  const trustStats = [
    { value: "30+",   label: t.trustYears },
    { value: "500+",  label: t.trustClients },
    { value: "1,000+",label: t.trustVarieties },
    { value: "יומי" , label: t.trustDelivery },
  ];

  const categories: { icon: IconName; title: string; desc: string; href: string }[] = [
    { icon: "flower", title: t.cutFlowersTitle,    desc: t.cutFlowersDesc,    href: lp("/products") },
    { icon: "leaf",   title: t.pottedPlantsTitle,  desc: t.pottedPlantsDesc,  href: lp("/products") },
    { icon: "layers", title: t.bulbsTitle,         desc: t.bulbsDesc,         href: lp("/products") },
    { icon: "package", title: t.accessoriesTitle,  desc: t.accessoriesDesc,   href: lp("/products") },
  ];

  const audiences: { icon: IconName; title: string; desc: string; cta: string; href: string }[] = [
    { icon: "flower", title: t.floristsTitle, desc: t.floristsDesc, cta: t.floristsCta, href: lp("/products") },
    { icon: "party",  title: t.eventsTitle,   desc: t.eventsDesc,   cta: t.eventsCta,   href: lp("/products") },
    { icon: "building", title: t.hotelsTitle, desc: t.hotelsDesc,    cta: t.hotelsCta,   href: lp("/products") },
    { icon: "globe",  title: t.exportTitle,   desc: t.exportDesc,   cta: t.exportCta,   href: lp("/services") },
  ];

  const trustItems: { icon: IconName; title: string; desc: string }[] = [
    { icon: "snowflake", title: t.coldChainTitle, desc: t.coldChainDesc },
    { icon: "check",    title: t.qualityTitle,   desc: t.qualityDesc },
    { icon: "file",     title: t.docsTitle,       desc: t.docsDesc },
    { icon: "zap",      title: t.responseTitle,   desc: t.responseDesc },
  ];

  return (
    <div className="bg-white">

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 opacity-10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 opacity-10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="inline-block bg-white text-green-900 text-sm font-medium px-4 py-1.5 rounded-full mb-6 shadow-sm">
              {t.badge}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              {t.heroTitle1}{" "}
              <span className="text-amber-300">{t.heroTitle2}</span>
            </h1>
            <p className="text-xl text-green-100 leading-relaxed mb-10 max-w-xl">{t.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={lp("/contact")} className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-8 py-4 rounded-lg transition-colors text-lg shadow-lg">
                {t.cta1}
              </Link>
              <Link href={lp("/products")} className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-green-900 font-semibold px-8 py-4 rounded-lg transition-colors text-lg border border-white shadow-lg">
                {t.cta2}
              </Link>
            </div>
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative border-t border-white border-opacity-20 bg-black bg-opacity-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {trustStats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-amber-300">{s.value}</div>
                  <div className="text-green-200 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT CATEGORIES ─── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t.catalogTitle}</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">{t.catalogSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} className="group bg-white rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-md transition-all p-6">
                <div className="mb-4 text-green-700">
                  <Icon name={cat.icon} className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-800">{cat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{cat.desc}</p>
                <div className="mt-4 text-green-700 font-medium text-sm group-hover:text-green-900">
                  {t.learnMore} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AUDIENCE ─── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t.audienceTitle}</h2>
            <p className="text-lg text-gray-600">{t.audienceSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {audiences.map((a) => (
              <div key={a.href} className="bg-green-50 rounded-xl p-6 border border-green-100 hover:border-green-300 transition-colors">
                <div className="mb-4 text-green-700">
                  <Icon name={a.icon} className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{a.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{a.desc}</p>
                <Link href={a.href} className="text-green-700 font-semibold text-sm hover:text-green-900">
                  {a.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST SIGNALS ─── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t.whyTitle}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {trustItems.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mb-3 flex justify-center text-green-700">
                  <Icon name={item.icon} className="h-10 w-10" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.ctaBannerTitle}</h2>
          <p className="text-xl text-green-100 mb-10">{t.ctaBannerSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={lp("/contact")} className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-10 py-4 rounded-lg transition-colors text-lg">
              {t.cta1}
            </Link>
            <a href="https://wa.me/9720000000000" className="inline-flex items-center justify-center bg-green-600 hover:bg-green-500 text-white font-semibold px-10 py-4 rounded-lg transition-colors text-lg" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
