import type { Metadata } from "next";
import Link from "next/link";
import CatalogGrid from "./CatalogGrid";
import fs from "fs";
import path from "path";
import type { Locale } from "@/app/lib/i18n";

interface Props { params: Promise<{ locale: Locale }> }

function getCatalog() {
  try {
    const dataPath = path.join(process.cwd(), "app", "data", "catalog.json");
    const catalogDir = path.join(process.cwd(), "public", "catalog");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const { products } = JSON.parse(raw) as { products: Array<{ name: string; c0: string; image: string; slug: string }> };
    const files = fs.readdirSync(catalogDir);
    const existingLower = new Set(files.map((f) => f.toLowerCase()));
    const fileByLower = Object.fromEntries(files.map((f) => [f.toLowerCase(), f]));
    return products
      .filter((p) => existingLower.has(path.basename(p.image).toLowerCase()))
      .map((p) => {
        const key = path.basename(p.image).toLowerCase();
        const actualFile = fileByLower[key];
        return { ...p, image: `/catalog/${actualFile}` };
      });
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.products.metaTitle, description: dict.products.metaDesc };
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.products;
  const lp = (p: string) => `/${locale}${p}`;
  const catalog = getCatalog();

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl text-green-100 max-w-2xl">{t.subtitle}</p>
        </div>
      </div>

      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <span className="text-amber-600 text-xl">ℹ️</span>
          <p className="text-amber-800 text-sm">
            <strong>{t.pricingNote1}</strong> {t.pricingNote2}{" "}
            <Link href={lp("/contact")} className="underline hover:no-underline font-semibold">{t.pricingNote3}</Link>{" "}
            {t.pricingNote4}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {catalog.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.allProductsTitle}</h2>
            <p className="text-gray-600 mb-4">{t.allProductsSub}</p>
            <CatalogGrid
              products={catalog}
              contactHref={lp("/contact")}
              searchPlaceholder={t.searchPlaceholder}
              allLabel={t.filterAll}
              noResultsLabel={t.noResults}
            />
          </>
        )}

        <div className="mt-16 bg-green-800 text-white rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">{t.notFoundTitle}</h2>
          <p className="text-green-100 mb-6">{t.notFoundDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={lp("/contact")} className="bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-8 py-3 rounded-lg transition-colors">
              {t.quoteBtn}
            </Link>
            <a href="https://wa.me/9720000000000" className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
