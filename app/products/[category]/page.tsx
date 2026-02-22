import type { Metadata } from "next";
import Link from "next/link";
import CatalogGrid from "../CatalogGrid";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getLocale } from "@/app/lib/getLocale";
import { Icon } from "@/app/components/icons";

const VALID_CATEGORIES = [
  "flowers-and-fillers",
  "special-and-branches",
  "greens",
  "roses",
  "nursery",
  "accessories",
] as const;

type CategorySlug = (typeof VALID_CATEGORIES)[number];

interface CatalogProduct {
  name: string;
  nameEn?: string;
  c0: string;
  image: string;
  slug: string;
  category?: string;
}

function getCatalog(): CatalogProduct[] {
  try {
    const dataPath = path.join(process.cwd(), "app", "data", "catalog.json");
    const catalogDir = path.join(process.cwd(), "public", "catalog");
    const translationsPath = path.join(process.cwd(), "app", "data", "translations.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const { products } = JSON.parse(raw) as { products: CatalogProduct[] };
    const translations: Record<string, string> = fs.existsSync(translationsPath)
      ? JSON.parse(fs.readFileSync(translationsPath, "utf-8"))
      : {};
    const files = fs.readdirSync(catalogDir);
    const existingLower = new Set(files.map((f) => f.toLowerCase()));
    const fileByLower = Object.fromEntries(files.map((f) => [f.toLowerCase(), f]));
    return products
      .filter((p) => existingLower.has(path.basename(p.image).toLowerCase()))
      .map((p) => {
        const key = path.basename(p.image).toLowerCase();
        const actualFile = fileByLower[key];
        const nameEn =
          p.nameEn && p.nameEn !== p.name
            ? p.nameEn
            : translations[p.name] ?? p.nameEn ?? p.name;
        return { ...p, image: `/catalog/${actualFile}`, nameEn };
      });
  } catch {
    return [];
  }
}

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as CategorySlug)) return {};
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const cat = dict.categories[category as CategorySlug];
  return {
    title: `${cat.name} | גבעת הפרחים`,
    description: cat.desc,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID_CATEGORIES.includes(category as CategorySlug)) notFound();

  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.products;
  const cat = dict.categories[category as CategorySlug];

  const allProducts = getCatalog();
  const products = allProducts.filter((p) => p.category === category);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-green-900 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-green-300 text-sm mb-4">
            <Link href="/products" className="hover:text-white transition-colors">
              {dict.nav.products}
            </Link>
            <span>/</span>
            <span className="text-white">{cat.name}</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <Icon name={cat.icon as import("@/app/components/icons").IconName} className="h-10 w-10 text-white" />
            <h1 className="text-3xl sm:text-4xl font-bold">{cat.name}</h1>
          </div>
          <p className="text-base sm:text-xl text-green-100 max-w-2xl">{cat.desc}</p>
          <p className="text-green-300 text-sm mt-2">{products.length} מוצרים</p>
        </div>
      </div>

      {/* Pricing note */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <Icon name="info" className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-amber-600" />
          <p className="text-amber-800 text-xs sm:text-sm">
            <strong>{t.pricingNote1}</strong> {t.pricingNote2}{" "}
            <Link href="/contact" className="underline hover:no-underline font-semibold">
              {t.pricingNote3}
            </Link>{" "}
            {t.pricingNote4}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {products.length > 0 ? (
          <CatalogGrid
            products={products}
            locale={locale}
            contactHref="/contact"
            searchPlaceholder={t.searchPlaceholder}
            allLabel={t.filterAll}
            noResultsLabel={t.noResults}
          />
        ) : (
          <p className="text-gray-500 text-center py-16">{t.noResults}</p>
        )}

        {/* CTA */}
        <div className="mt-10 sm:mt-16 bg-green-800 text-white rounded-2xl p-6 sm:p-10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">{t.notFoundTitle}</h2>
          <p className="text-green-100 mb-6">{t.notFoundDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-amber-400 hover:bg-amber-300 text-green-900 font-bold px-8 py-3 rounded-lg transition-colors"
            >
              {t.quoteBtn}
            </Link>
            <a
              href="https://wa.me/9720000000000"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
