import { getSession } from "@/app/lib/session";
import { type Locale } from "@/app/lib/i18n";
import HeaderClient from "./Header";

interface Props {
  locale: Locale;
}

export default async function HeaderServer({ locale }: Props) {
  const [session, { default: dict }] = await Promise.all([
    getSession(),
    import(`@/app/lib/i18n/${locale}`),
  ]);

  const t = { ...dict.nav, ...dict.header };

  return (
    <HeaderClient
      locale={locale}
      t={t}
      isLoggedIn={Boolean(session)}
      userName={session?.name}
    />
  );
}
