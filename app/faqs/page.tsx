import LegalNav from "@/components/LegalNav";
import { customerFaqs, buyerFaqs } from "./faqs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | KROSSFORD",
  description: "Answers for retail customers (1 Piece) and wholesale buyers (Bulk Order). Delivery, payments, custom orders, and returns.",
};

export default function FaqsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">FAQs</h1>
      <p className="mt-2 text-sm text-zinc-400">
        For Retail Customers (1 Piece) &amp; Wholesale Buyers (Bulk Order)
      </p>

      <section aria-labelledby="retail-faqs">
        <h2 id="retail-faqs" className="mt-10 text-xl font-bold text-amber-400">For Retail Customers - 1 Piece</h2>
        <div className="mt-4 space-y-4">
          {customerFaqs.map((f) => (
            <article key={f.question} className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/50">
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="wholesale-faqs">
        <h2 id="wholesale-faqs" className="mt-10 text-xl font-bold text-amber-400">For Wholesale Buyers - Bulk Order</h2>
        <div className="mt-4 space-y-4">
          {buyerFaqs.map((f) => (
            <article key={f.question} className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/50">
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{f.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 border border-zinc-800 rounded-lg p-5 bg-zinc-900/50 text-center">
        <h2 className="font-semibold">Still have a question?</h2>
        <p className="mt-2 text-sm text-zinc-400">
          Message us on WhatsApp or visit our Contact page. We reply as soon as possible.
        </p>
        <a
          href="/contact"
          className="mt-4 inline-block bg-amber-400 text-black font-bold text-sm px-6 py-2.5 rounded-full hover:bg-amber-300 transition-colors"
        >
          Contact Us →
        </a>
      </section>

      <LegalNav currentSlug="faqs" />
    </main>
  );
}
