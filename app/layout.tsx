import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "@/app/lib/getLocale";
import HeaderServer from "@/app/components/HeaderServer";
import Footer from "@/app/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flower Hill | סיטונאות פרחים ואביזרים",
  description: "גבעת הפרחים – סיטונאות פרחים, צמחים וציוד לפרחנים, מעצבי אירועים ומלונות.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const dir = locale === "en" ? "ltr" : "rtl";
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);

  return (
    <html lang={locale} dir={dir}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <HeaderServer locale={locale} />
        <main className="flex-grow">{children}</main>
        <Footer locale={locale} t={dict.footer} />
      </body>
    </html>
  );
}
