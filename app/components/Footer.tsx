import Link from "next/link";
import type { Locale } from "@/app/lib/i18n";
import type { Dict } from "@/app/lib/i18n/he";

interface Props {
  locale: Locale;
  t: Dict["footer"];
}

export default function Footer({ locale, t }: Props) {
  const year = new Date().getFullYear();
  const lp = (path: string) => path;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/logo.png"
                alt="Flower Hill - גבעת הפרחים"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{t.tagline}</p>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+972-0-0000000" className="hover:text-white transition-colors">TBD</a>
              </div>
              <div className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:info@flowerhill.co.il" className="hover:text-white transition-colors" dir="ltr">info@flowerhill.co.il</a>
              </div>
              <div className="flex items-center gap-2">
                <span>🕐</span>
                <span>{t.hours}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.products}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t.cutFlowers,   href: lp("/products") },
                { name: t.pottedPlants, href: lp("/products") },
                { name: t.bulbs,        href: lp("/products") },
                { name: t.accessories,  href: lp("/products") },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.services}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t.export,        href: lp("/services") },
                { name: t.import,        href: lp("/services") },
                { name: t.logistics,     href: lp("/services") },
                { name: t.suppliersLink, href: lp("/suppliers") },
              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.company}</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: t.aboutLink,   href: lp("/about") },
                { name: t.contactLink, href: lp("/contact") },
                { name: t.downloads,   href: lp("/resources") },
                { name: t.faq,         href: lp("/resources#faq") },
              ].map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-white transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {year} {t.rights}</p>
          <div className="flex gap-6">
            <Link href={lp("/privacy")} className="hover:text-gray-300">{t.privacy}</Link>
            <Link href={lp("/terms")} className="hover:text-gray-300">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
