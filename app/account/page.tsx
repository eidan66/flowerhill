import type { Metadata } from "next";
import { getSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { getLocale } from "@/app/lib/getLocale";
import LogoutButton from "./LogoutButton";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.account.metaTitle };
}

export default async function AccountPage() {
  const locale = await getLocale();
  const [session, { default: dict }] = await Promise.all([
    getSession(),
    import(`@/app/lib/i18n/${locale}`),
  ]);

  if (!session) redirect("/login");

  const t = dict.account;
  const lp = (path: string) => path;

  const actions = [
    { icon: "📋", title: t.catalogTitle, desc: t.catalogDesc, href: lp("/products") },
    { icon: "💬", title: t.quoteTitle,   desc: t.quoteDesc,   href: lp("/contact") },
    { icon: "📄", title: t.formsTitle,   desc: t.formsDesc,   href: lp("/resources") },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {t.greeting} {session.name} 👋
            </h1>
            <p className="text-gray-500 mt-1">{session.businessName}</p>
          </div>
          <LogoutButton labels={{ logout: t.logout, loggingOut: t.loggingOut }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {actions.map((a) => (
            <a key={a.title} href={a.href}
              className="bg-white rounded-xl border border-gray-200 hover:border-green-400 hover:shadow-sm transition-all p-5 flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{a.icon}</span>
              <div>
                <div className="font-semibold text-gray-900">{a.title}</div>
                <div className="text-gray-500 text-sm">{a.desc}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.infoTitle}</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-gray-500">{t.name}</dt>
              <dd className="font-medium text-gray-900 mt-0.5">{session.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">{t.businessName}</dt>
              <dd className="font-medium text-gray-900 mt-0.5">{session.businessName}</dd>
            </div>
            <div>
              <dt className="text-gray-500">{t.email}</dt>
              <dd className="font-medium text-gray-900 mt-0.5" dir="ltr">{session.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">{t.accountType}</dt>
              <dd className="font-medium text-gray-900 mt-0.5">
                {session.role === "admin" ? t.roleAdmin : t.roleCustomer}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm text-amber-800">
          {t.phase2}
        </div>
      </div>
    </div>
  );
}
