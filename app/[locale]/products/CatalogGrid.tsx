"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

const HEBREW_LETTERS = "אבגדהוזחטיכלמנסעפצקרשת";
const FINAL_TO_REGULAR: Record<string, string> = {
  ך: "כ",
  ם: "מ",
  ן: "נ",
  ף: "פ",
  ץ: "צ",
};

function getFirstLetter(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) return null;
  const first = trimmed[0];
  return FINAL_TO_REGULAR[first] ?? first;
}

interface Product {
  name: string;
  c0: string;
  image: string;
  slug: string;
}

interface CatalogGridProps {
  products: Product[];
  contactHref: string;
  searchPlaceholder: string;
  allLabel: string;
  noResultsLabel: string;
}

export default function CatalogGrid({
  products,
  contactHref,
  searchPlaceholder,
  allLabel,
  noResultsLabel,
}: CatalogGridProps) {
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = products;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (letter) {
      result = result.filter((p) => {
        const first = getFirstLetter(p.name);
        return first === letter;
      });
    }

    return result;
  }, [products, search, letter]);

  const lettersWithProducts = useMemo(() => {
    const byLetter = new Map<string, number>();
    for (const p of products) {
      const first = getFirstLetter(p.name);
      if (first && HEBREW_LETTERS.includes(first)) {
        byLetter.set(first, (byLetter.get(first) ?? 0) + 1);
      }
    }
    return byLetter;
  }, [products]);

  return (
    <div className="mt-20">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
            aria-label={searchPlaceholder}
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter by letter">
          <button
            type="button"
            onClick={() => setLetter(null)}
            className={`min-w-[2rem] py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
              letter === null
                ? "bg-green-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {allLabel}
          </button>
          {HEBREW_LETTERS.split("").map((char) => {
            const count = lettersWithProducts.get(char) ?? 0;
            const isActive = letter === char;
            return (
              <button
                key={char}
                type="button"
                onClick={() => setLetter(char)}
                disabled={count === 0}
                className={`min-w-[2rem] py-1.5 px-2 rounded-md text-sm font-medium transition-colors ${
                  count === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : isActive
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title={count > 0 ? `${count} products` : undefined}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((item) => (
            <Link
              key={item.c0}
              href={contactHref}
              className="group border border-gray-200 rounded-xl overflow-hidden hover:border-green-400 hover:shadow-md transition-all bg-white"
            >
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-green-800">
                  {item.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">{noResultsLabel}</p>
      )}
    </div>
  );
}
