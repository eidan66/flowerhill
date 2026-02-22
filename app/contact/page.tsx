import type { Metadata } from "next";
import { getLocale } from "@/app/lib/getLocale";
import { Icon } from "@/app/components/icons";
import type { IconName } from "@/app/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  return { title: dict.contact.metaTitle, description: dict.contact.metaDesc };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const { default: dict } = await import(`@/app/lib/i18n/${locale}`);
  const t = dict.contact;

  const contactMethods: { icon: IconName; title: string; value: string; sub: string; href: string }[] = [
    { icon: "phone",    title: t.phone,    value: t.phoneValue,     sub: t.phoneHours, href: "tel:+97297487153" },
    { icon: "phone",    title: t.fax,      value: t.faxValue,      sub: "",          href: "tel:+97297416007" },
    { icon: "mail",     title: t.email,    value: t.emailValue,     sub: t.emailSub,   href: `mailto:${t.emailValue}` },
    { icon: "message",  title: t.whatsapp, value: t.whatsappValue,  sub: t.whatsappSub, href: "https://wa.me/97297487153" },
    { icon: "mapPin",   title: t.address,  value: t.addressValue,   sub: t.addressSub, href: "https://www.google.com/maps/search/%D7%92%D7%91%D7%A2%D7%AA+%D7%94%D7%A4%D7%A8%D7%97%D7%99%D7%9D+Givat+Hen" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{t.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-10">
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((m) => (
              <a key={m.title} href={m.href} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-gray-200 hover:border-green-400 hover:shadow-sm transition-all group"
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <div className="flex-shrink-0 text-green-700">
                  <Icon name={m.icon} className="h-8 w-8" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-green-800">{m.title}</div>
                  <div className="text-green-700 font-medium text-sm">{m.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{m.sub}</div>
                </div>
              </a>
            ))}
            <div className="bg-green-800 text-white rounded-xl p-5 flex items-start gap-3">
              <Icon name="zap" className="h-6 w-6 flex-shrink-0 text-amber-300" />
              <div>
                <div className="font-bold mb-1">{t.fastResponse}</div>
                <p className="text-green-100 text-sm">{t.fastResponseDesc}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {t.officeEmailLabel}: <a href={`mailto:${t.officeEmail}`} className="text-green-700 hover:text-green-800 font-medium" dir="ltr">{t.officeEmail}</a>
            </p>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{t.directionsTitle}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.directionsText}</p>
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  title="גבעת הפרחים - Flower Hill on map"
                  src="https://maps.google.com/maps?output=embed&q=32.1675,34.876111&z=15"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[250px]"
                />
              </div>
              <div className="mt-3 flex gap-3">
                <a
                  href="https://www.google.com/maps/search/%D7%92%D7%91%D7%A2%D7%AA+%D7%94%D7%A4%D7%A8%D7%97%D7%99%D7%9D+Givat+Hen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 hover:text-green-800 font-medium"
                >
                  {locale === "he" ? "פתח ב-Google Maps" : "Open in Google Maps"}
                </a>
                <a
                  href="https://waze.com/ul?q=%D7%92%D7%91%D7%A2%D7%AA%20%D7%94%D7%A4%D7%A8%D7%97%D7%99%D7%9D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 hover:text-green-800 font-medium"
                >
                  Waze
                </a>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t.formTitle}</h2>
              <form className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.firstName} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="firstName" name="firstName" required autoComplete="given-name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.lastName} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" id="lastName" name="lastName" required autoComplete="family-name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.businessName} <span className="text-red-500">*</span>
                </label>
                <input type="text" id="businessName" name="businessName" required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.phoneFld} <span className="text-red-500">*</span>
                  </label>
                  <input type="tel" id="phone" name="phone" required autoComplete="tel" dir="ltr"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="050-0000000" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t.emailFld}</label>
                  <input type="email" id="email" name="email" autoComplete="email" dir="ltr"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="you@company.co.il" />
                </div>
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">{t.businessType}</label>
                <select id="businessType" name="businessType" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white">
                  <option value="">{t.selectType}</option>
                  <option value="florist">{t.typeFlorist}</option>
                  <option value="events">{t.typeEvents}</option>
                  <option value="hotel">{t.typeHotel}</option>
                  <option value="wholesale">{t.typeWholesale}</option>
                  <option value="grower">{t.typeGrower}</option>
                  <option value="export">{t.typeExport}</option>
                  <option value="other">{t.typeOther}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.message} <span className="text-red-500">*</span>
                </label>
                <textarea id="message" name="message" required rows={5} placeholder={t.messagePlaceholder}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent resize-none" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="urgent" name="urgent" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <label htmlFor="urgent" className="text-sm text-gray-700">{t.urgent}</label>
              </div>

              <button type="submit" className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-4 rounded-lg transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                {t.submit}
              </button>

              <p className="text-xs text-gray-500 text-center">{t.privacy}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
