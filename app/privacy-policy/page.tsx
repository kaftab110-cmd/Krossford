import LegalNav from "@/components/LegalNav";
import { privacyContent } from "@/lib/data/privacy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KROSSFORD",
  description: "How KROSSFORD collects and protects your data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <LegalNav currentSlug="privacy-policy" />
      <h1 className="mt-6 text-3xl font-bold">{privacyContent.title}</h1>
      <div className="mt-8 space-y-8">
        {privacyContent.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            {section.paragraphs.map((p: string, i: number) => (
              <p key={i} className="mt-2 text-gray-700">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}