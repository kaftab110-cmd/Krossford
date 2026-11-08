import LegalNav from "@/components/LegalNav";
import { customerFaqs, buyerFaqs } from "./faqs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | KROSSFORD",
  description: "Answers for retail customers (1 Piece) and wholesale buyers (50+ Units).",
};

export default function FaqsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">FAQs</h1>
      <p className="mt-2 text-sm text-gray-600">
        For Retail Customers (1 Piece) & Wholesale Buyers (Bulk Order)
      </p>

      <h2 className="mt-10 text-xl font-bold text-amber-400">For Retail Customers - 1 Piece</h2>
      <div className="mt-4 space-y-4">
        {customerFaqs.map((f) => (
          <div key={f.question} className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/50">
            <h3 className="font-semibold">{f.question}</h3>
            <p className="mt-2 text-sm text-gray-400">{f.answer}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-bold text-amber-400">For Wholesale Buyers - Bulk Order</h2>
      <div className="mt-4 space-y-4">
        {buyerFaqs.map((f) => (
          <div key={f.question} className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/50">
            <h3 className="font-semibold">{f.question}</h3>
            <p className="mt-2 text-sm text-gray-400">{f.answer}</p>
          </div>
        ))}
      </div>

      <LegalNav currentSlug="faqs" />
    </main>
  );
}