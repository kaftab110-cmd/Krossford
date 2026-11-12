import LegalNav from "@/components/LegalNav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store Policy | KROSSFORD Enterprises",
  description: "Store Policy for KROSSFORD Enterprises - handcrafted to order leather goods, delivery 12-17 Working Days.",
};

// STORE POLICY - FINAL - ONE TIME ALL FIXES - ENGLISH ONLY - app/store-policy/page.tsx
// 1. Self-contained kar diya - Pehle content lib/data/storePolicy se aa raha tha, ab isi file me hai
// 2. Delivery simple rakha - Sirf 12-17 Working Days likha, zyada detail nahi likhi - Jaisa user ne bola
// 3. Payment - Only VISA / MASTERCARD / WESTERN UNION / BANK TRANSFER
// 4. Retail 100% / Wholesale 50-50 - Simple likha
// 5. All text English only - No Roman Urdu

export default function StorePolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden pb-[100px]">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-20">
        <h1 className="text-[28px] sm:text-3xl md:text-4xl font-bold text-yellow-500 uppercase tracking-tight break-words px-2 text-center md:text-left">
          Store Policy
        </h1>
        <p className="mt-2 mb-10 text-[12px] sm:text-sm text-zinc-500 px-2 text-center md:text-left font-mono">
          Last updated: November 12, 2026
        </p>

        <LegalNav currentSlug="store-policy" />

        <div className="mt-8 space-y-10 px-2 sm:px-0">
          <section className="space-y-3">
            <h2 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-yellow-500 break-words">
              1. Handcrafted To Order
            </h2>
            <div className="space-y-4 leading-[1.7] text-[14px] sm:text-[15px] text-zinc-300">
              <p className="break-words">Every KROSSFORD bag is made only after your order. We do not keep ready-made stock. Please check size, colour, design, and custom text carefully before you confirm your order on WhatsApp.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-yellow-500 break-words">
              2. Payment
            </h2>
            <div className="space-y-4 leading-[1.7] text-[14px] sm:text-[15px] text-zinc-300">
              <p className="break-words">We accept only VISA, MASTERCARD, WESTERN UNION, and BANK TRANSFER. Retail orders: 100% advance payment. Wholesale orders: 50% advance - 50% before dispatch.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-yellow-500 break-words">
              3. Delivery
            </h2>
            <div className="space-y-4 leading-[1.7] text-[14px] sm:text-[15px] text-zinc-300">
              <p className="break-words">Total delivery time is 12-17 Working Days.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-yellow-500 break-words">
              4. Returns
            </h2>
            <div className="space-y-4 leading-[1.7] text-[14px] sm:text-[15px] text-zinc-300">
              <p className="break-words">We do not accept returns for change of mind. If your order arrives with a manufacturing defect, contact us on WhatsApp within 48 hours of delivery with clear photos and a short video. Full details are on our Returns and Refunds page.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-yellow-500 break-words">
              5. Wholesale / B2B
            </h2>
            <div className="space-y-4 leading-[1.7] text-[14px] sm:text-[15px] text-zinc-300">
              <p className="break-words">Wholesale orders (50+ units) are custom production. Bulk orders cannot be returned for change of mind. Sample approval before bulk is strongly recommended.</p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-yellow-500 break-words">
              6. Contact
            </h2>
            <div className="space-y-4 leading-[1.7] text-[14px] sm:text-[15px] text-zinc-300">
              <p className="break-words">If you have any question about this policy, contact us through our Contact page or WhatsApp.</p>
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
          >
            Contact Us
          </Link>
          <Link
            href="/returns-and-refunds"
            className="inline-block rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition"
          >
            Returns and Refunds
          </Link>
        </div>
      </section>
    </main>
  );
}