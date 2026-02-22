import { notFound } from "next/navigation";
import { isValidLocale } from "@/app/lib/i18n";
import HeaderServer from "@/app/components/HeaderServer";
import Footer from "@/app/components/Footer";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;

  if (!isValidLocale(rawLocale)) notFound();
  const locale = rawLocale;

  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);

  return (
    <>
      <HeaderServer locale={locale} />
      <main className="flex-grow">{children}</main>
      <Footer locale={locale} t={dict.footer} />
    </>
  );
}
