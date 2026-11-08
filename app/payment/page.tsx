import LegalNav from "@/components/LegalNav";
import { paymentContent } from "@/lib/data/payment";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Methods | KROSSFORD Enterprises",
  description: "Retail 100% Secure Advance Payment | Wholesale 50% Advance - 50% Before Dispatch. VISA, Mastercard, Western Union, Bank Transfer.",
};

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#d4af37] tracking-wide">{paymentContent.title}</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Last Updated: {paymentContent.lastUpdated}</p>
        </div>
        <LegalNav currentSlug="payment" />
        <div className="space-y-10">
          {paymentContent.sections.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="text-lg sm:text-xl font-semibold text-white tracking-wide">{section.heading}</h2>
              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                {section.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}