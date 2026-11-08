import LegalNav from "@/components/LegalNav";
import { shippingContent } from "@/lib/data/shipping";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | KROSSFORD Enterprises",
  description: "Review shipping methods, delivery estimates, costs, and destination policies for KROSSFORD Enterprises, operating from Punjab, Pakistan.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#d4af37] tracking-wide">
            {shippingContent.title}
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Last Updated: {shippingContent.lastUpdated}
          </p>
        </div>

        {/* Legal Navigation Bar */}
        <LegalNav currentSlug="shipping-policy" />

        {/* Policy Content Sections */}
        <div className="space-y-10">
          {shippingContent.sections.map((section) => {
            // Helper function to render paragraphs and consecutive bullet lists cleanly
            const renderParagraphs = () => {
              const elements = [];
              let i = 0;

              while (i < section.paragraphs.length) {
                const p = section.paragraphs[i];

                if (p.startsWith("• ")) {
                  const bulletGroup: string[] = [];
                  while (i < section.paragraphs.length && section.paragraphs[i].startsWith("• ")) {
                    bulletGroup.push(section.paragraphs[i].replace("• ", ""));
                    i++;
                  }

                  elements.push(
                    <ul key={`${section.heading}-bullets-${i}`} className="list-disc list-inside space-y-1.5 pl-2">
                      {bulletGroup.map((bullet, bIdx) => (
                        <li key={`${section.heading}-bullet-${bIdx}-${bullet}`}>{bullet}</li>
                      ))}
                    </ul>
                  );
                } else {
                  elements.push(
                    <p key={`${section.heading}-p-${i}-${p}`}>{p}</p>
                  );
                  i++;
                }
              }

              return elements;
            };

            return (
              <div key={section.heading} className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                  {renderParagraphs()}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}