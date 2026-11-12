import LegalNav from "@/components/LegalNav";
import { privacyContent } from "@/lib/data/privacy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KROSSFORD Enterprises",
  description: "Review the privacy practices, data collection categories, and customer rights for KROSSFORD Enterprises, operating from Punjab, Pakistan.",
};

// PRIVACY POLICY - FINAL - ONE TIME ALL FIXES - app/privacy-policy/page.tsx
// 1. Ye sahi Privacy wali file hai - Returns wali nahi hai - Isko Returns se mix nahi karna
// 2. Data lib/data/privacy se aata hai - Data yahan duplicate nahi kiya, taake 2 jagah alag alag policy na ho jaye
// 3. Style fix - Pehle bg-black nahi tha, text-gray-700 tha jo dark site pe sahi nahi lagta tha - Ab site jaisa dark theme: bg-black + text-gray-300 + gold heading
// 4. Bullets fix - Pehle bullets dikhte hi nahi the, sirf paragraphs the - Ab bullets bhi dikhenge
// 5. Last Updated + Header border add kiya - Baaki Privacy pages jaisa
// NOTE: Asal policy ka text lib/data/privacy.ts me hai - Wo file alag se check karenge, is file me text duplicate nahi karna

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#d4af37] tracking-wide">
            {privacyContent.title}
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Last Updated: November 12, 2026
          </p>
        </div>

        <LegalNav currentSlug="privacy-policy" />

        <div className="space-y-10">
          {privacyContent.sections.map((section: any) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">{section.heading}</h2>
              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                {section.paragraphs.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc list-inside space-y-1.5 pl-2 pt-1">
                    {section.bullets.map((bullet: string, bIndex: number) => (
                      <li key={bIndex}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
