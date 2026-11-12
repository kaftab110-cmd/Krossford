import LegalNav from "@/components/LegalNav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | KROSSFORD Enterprises",
  description: "Terms and Conditions for KROSSFORD Enterprises - handcrafted to order leather goods, DHL Express delivery,Estimated Total: 12-17 Working Days.",
};

// TERMS AND CONDITIONS - FINAL - ONE TIME ALL FIXES - app/terms/page.tsx
// 1. Delivery saaf likha -Estimated Total: 12-17 Working Days - Crafting 7-10 + DHL 5-7 - Purana 18-24 kahin nahi hai
// 2. Payment saaf likha - Sirf VISA / MASTERCARD / WESTERN UNION / BANK TRANSFER - PayPal / Stripe / Apple Pay / Klarna nahi hai
// 3. Retail 100% Advance / Wholesale 50% Advance - 50% Before Dispatch - Saaf likha
// 4. Handcrafted To Order - Change of Mind No Return / No Cancel After Crafting Started - Saaf likha
// 5. Defect - 48 hours ke andar WhatsApp pe photo / video - Saaf likha
// 6. LegalNav + Metadata add kiya - Baaki Legal pages jaisa hi lagega

export default function TermsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">
          Terms and Conditions
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">
          Last Updated: November 12, 2026
        </p>

        <LegalNav currentSlug="terms" />

        <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Who We Are</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              KROSSFORD Enterprises is a Pakistan-based handcrafted leather goods brand. By ordering from krossford.com or confirming an order on WhatsApp, you agree to these Terms. If you do not agree, please do not place an order. These Terms apply to retail orders and wholesale / B2B orders.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Handcrafted To Order</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Every KROSSFORD bag is made only after your order. We do not keep ready-made stock. Each piece is cut, stitched, and finished for you. Because of this, your order cannot be resold to another customer once crafting has started. Please check size, colour, design, logo, and custom text carefully before you confirm your order on WhatsApp. Your custom logo designs and personal engravings are 100% yours.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. How To Order</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              You can order through this website or directly on WhatsApp. Your order is confirmed only after your payment is received and we confirm it on WhatsApp. Until payment is confirmed, your order is not started. If any design, size, or custom detail is unclear, we will confirm it with you on WhatsApp before crafting starts.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Pricing</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Prices on this website are shown in USD unless stated otherwise. Prices include crafting and standard packaging. Prices do not include any import duty, customs tax, or local delivery charges charged by your country - if your country charges any, you will pay it directly to your local courier / customs. If a price is shown wrong by mistake, we will contact you on WhatsApp before crafting starts.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Payment Methods</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We accept only these payment methods - VISA, MASTERCARD, WESTERN UNION, and BANK TRANSFER. We do not accept PayPal, Stripe, Apple Pay, Klarna, or Bancontact. Retail orders: 100% advance payment before crafting starts. Wholesale orders: 50% advance to start production - 50% before dispatch. Your order will not be dispatched until full payment is received. Bank / transfer charges charged by your provider are paid by you, not by us.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Delivery Time -Estimated Total: 12-17 Working Days</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Total delivery time isEstimated Total: 12-17 Working Days - Crafting Time: 7-10 Working Days + DHL Express Delivery: 5-7 Working Days. Full DHL tracking is provided. We will try our best to deliver as soon as possible - our aim is to deliver earlier than estimated. A small delay due to crafting, customs, or DHL does not qualify for a return, refund, or cancellation. If your parcel is stuck, message us on WhatsApp with your tracking number and we will check with DHL.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Cancellation</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Once crafting has started, your order cannot be cancelled. If crafting has not started yet, contact us on WhatsApp as soon as possible - we will try our best to help, but we cannot promise cancellation. Custom-engraved, initialed, or specially manufactured wholesale orders are non-refundable once production approval is given, unless there is a confirmed material defect.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">8. Returns, Defects & Refunds</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We do not accept returns or exchanges for change of mind - including colour change, size change, design change, or you no longer want the order. If your order arrives with a manufacturing defect or structural flaw, contact us on WhatsApp within 48 hours of delivery with clear photos and a short video plus your order details. Do not use, wash, or alter the item after you find the defect. Keep the original DHL packaging until your case is closed. If a refund is approved, it will be sent by the same method you paid with wherever possible. Full details are on our Returns and Refunds page.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">9. Wholesale / B2B Orders</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Wholesale orders (50+ units) are custom production. Bulk orders cannot be returned for change of mind. If any pieces in bulk are defective, report them with photos within 7 days of delivery. We will remake or adjust only the defective pieces - not the full bulk order. Sample approval before bulk is strongly recommended - order a sample first, then decide for bulk.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">10. Intellectual Property</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              All designs, photos, logos, and content on krossford.com belong to KROSSFORD Enterprises. You may not copy, reuse, or resell our photos or designs without our written permission. If you send us your own logo for custom work, you confirm that you have the right to use that logo.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">11. Fair Use & Contact</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Please use this website fairly. Do not try to break, hack, or misuse the website. If you have any question about these Terms, contact us through our Contact page or WhatsApp. We will try our best to resolve any issue directly with you.
            </p>
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