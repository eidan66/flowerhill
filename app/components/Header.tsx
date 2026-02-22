"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/app/lib/i18n";
import type { Dict } from "@/app/lib/i18n/he";

interface HeaderProps {
  locale: Locale;
  t: Dict["nav"] & Dict["header"];
  isLoggedIn?: boolean;
  userName?: string;
}

export default function Header({ locale, t, isLoggedIn = false, userName }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const lp = (path: string) => path;

  // Locale switcher: set cookie and refresh current path
  const otherLocale: Locale = locale === "he" ? "en" : "he";
  const switchLocaleHref = `/api/locale?locale=${otherLocale}&next=${encodeURIComponent(pathname || "/")}`;

  const navigation = [
    { name: t.home,      href: lp("/") },
    { name: t.products,  href: lp("/products") },
    { name: t.services,  href: lp("/services") },
    { name: t.suppliers, href: lp("/suppliers") },
    { name: t.about,     href: lp("/about") },
    { name: t.contact,   href: lp("/contact") },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={lp("/")} className="flex items-center flex-shrink-0">
            <img
              src="/logo.png"
              alt="Flower Hill - גבעת הפרחים"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-800 hover:bg-green-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <Link
              href={switchLocaleHref}
              className="text-xs font-semibold text-gray-500 hover:text-green-800 border border-gray-200 hover:border-green-400 px-2.5 py-1.5 rounded-md transition-colors"
              title={otherLocale === "en" ? "Switch to English" : "עבור לעברית"}
            >
              {otherLocale === "en" ? "EN" : "עב"}
            </Link>

            <a
              href="https://wa.me/9720000000000"
              className="flex items-center gap-1.5 text-sm text-green-700 hover:text-green-900 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>

            <Link
              href={lp("/contact")}
              className="bg-green-800 text-white text-sm px-4 py-2 rounded-md hover:bg-green-900 transition-colors font-medium"
            >
              {t.quote}
            </Link>

            {isLoggedIn ? (
              <Link
                href={lp("/account")}
                className="text-sm text-green-800 border border-green-300 px-3 py-2 rounded-md hover:bg-green-50 transition-colors font-medium flex items-center gap-1.5"
              >
                <span className="text-base">👤</span>
                {userName ?? t.account}
              </Link>
            ) : (
              <Link
                href={lp("/login")}
                className="text-sm text-gray-600 hover:text-green-800 border border-gray-300 px-3 py-2 rounded-md hover:border-green-400 transition-colors"
              >
                {t.login}
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="תפריט"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-800 hover:bg-green-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Link
                href={lp("/contact")}
                className="block w-full text-center bg-green-800 text-white py-2 rounded-md hover:bg-green-900 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {t.quote}
              </Link>
              {isLoggedIn ? (
                <Link
                  href={lp("/account")}
                  className="block w-full text-center border border-green-400 text-green-800 py-2 rounded-md hover:bg-green-50"
                  onClick={() => setMobileOpen(false)}
                >
                  👤 {userName ?? t.account}
                </Link>
              ) : (
                <Link
                  href={lp("/login")}
                  className="block w-full text-center border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.login}
                </Link>
              )}
              {/* Language switcher in mobile menu */}
              <Link
                href={switchLocaleHref}
                className="block w-full text-center border border-gray-200 text-gray-500 py-2 rounded-md hover:bg-gray-50 text-sm font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {otherLocale === "en" ? "🇬🇧 English" : "🇮🇱 עברית"}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky WhatsApp FAB - inset-inline-start for RTL support */}
      <a
        href="https://wa.me/9720000000000"
        className="whatsapp-fab md:hidden fixed left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors touch-manipulation"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </header>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.24-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.133.558 4.133 1.534 5.867L0 24l6.334-1.514A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.85 0-3.59-.487-5.1-1.34l-.366-.214-3.76.898.939-3.658-.237-.377A9.95 9.95 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
