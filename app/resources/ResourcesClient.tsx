"use client";

import { useState } from "react";
import Link from "next/link";
import type { Dict } from "@/app/lib/i18n/he";

interface Props {
  t: Dict["resources"];
}

export default function ResourcesClient({ t }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const lp = (path: string) => path;

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
    { q: t.faq5q, a: t.faq5a },
    { q: t.faq6q, a: t.faq6a },
    { q: t.faq7q, a: t.faq7a },
    { q: t.faq8q, a: t.faq8a },
  ];

  const docs = [
    { icon: "📄", name: t.doc1Name, desc: t.doc1Desc },
    { icon: "📋", name: t.doc2Name, desc: t.doc2Desc },
    { icon: "📑", name: t.doc3Name, desc: t.doc3Desc },
    { icon: "📃", name: t.doc4Name, desc: t.doc4Desc },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Downloads */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.downloadsTitle}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {docs.map((doc) => (
            <div key={doc.name} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-green-400 hover:shadow-sm transition-all cursor-pointer group">
              <span className="text-3xl flex-shrink-0">{doc.icon}</span>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-green-800">{doc.name}</div>
                <div className="text-gray-600 text-sm mt-0.5">{doc.desc}</div>
                <div className="text-green-700 text-xs font-medium mt-2">{t.download}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-4">
          {t.docNote}{" "}
          <Link href={lp("/contact")} className="text-green-700 underline">{t.docNoteLink}</Link>.
        </p>
      </section>

      {/* FAQ */}
      <section id="faq">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.faqTitle}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-right bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.q}</span>
                <svg className={`w-5 h-5 text-green-700 flex-shrink-0 mx-2 transition-transform ${openIdx === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIdx === i && (
                <div className="px-6 pb-5 pt-1 bg-white text-gray-700 leading-relaxed text-sm border-t border-gray-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 bg-green-50 rounded-2xl p-8 border border-green-100 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t.notFoundTitle}</h3>
        <p className="text-gray-600 mb-6">{t.notFoundDesc}</p>
        <Link href={lp("/contact")} className="inline-block bg-green-800 hover:bg-green-900 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
          {t.notFoundBtn}
        </Link>
      </div>
    </div>
  );
}
