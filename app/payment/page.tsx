import LegalNav from "@/components/LegalNav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Methods | KROSSFORD Enterprises",
  description: "Retail 100% Secure Advance Payment | Wholesale 50% Advance - 50% Before Dispatch. VISA, Mastercard, Western Union, Bank Transfer.",
};

// PAYMENT - FINAL - ONE TIME ALL FIXES - ENGLISH ONLY - app/payment/page.tsx
// 1. Self-contained kar diya - Pehle content lib/data/payment se aa raha tha, ab isi file me hai
//    Taake galat payment method kahin aur chhupa hua na reh jaye
// 2. Payment methods - Only VISA / MASTERCARD / WESTERN UNION / BANK TRANSFER - No PayPal / Stripe / Apple Pay / Klarna
// 3. Retail 100% Advance / Wholesale 50% Advance - 50% Before Dispatch - Clear likha
// 4. All text English only - No Roman Urdu
// 5. Display the estimated total delivery time without a breakdown.

export default function PaymentPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">
          Payment Methods
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">
          Last Updated: November 12, 2026
        </p>

        <LegalNav currentSlug="payment" />

        <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. We Accept Only These Methods</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We accept only VISA, MASTERCARD, WESTERN UNION, and BANK TRANSFER. We do not accept PayPal, Stripe, Apple Pay, Klarna, or Bancontact. If anyone asks you to pay by any other method using our name, please do not pay and contact us on WhatsApp immediately.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Retail Orders - 100% Advance Payment</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Retail orders require 100% advance payment before crafting starts. Your order is confirmed only after your payment is received and we confirm it on WhatsApp. Until payment is confirmed, your order is not started.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. Wholesale / B2B Orders - 50% Advance - 50% Before Dispatch</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Wholesale orders require 50% advance payment to start production and 50% before dispatch. Your order will not be dispatched until full payment is received. Sample approval before bulk is strongly recommended - order a sample first, then decide for bulk.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. How Payment Works</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              After you confirm your order on WhatsApp, we will share the payment details for your selected method. Please send your payment and share the payment receipt / screenshot on WhatsApp. We will confirm your payment and start crafting. Please do not share your full card number, CVV, or OTP with anyone - we will never ask for them.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Bank / Transfer Charges</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Any bank charges, transfer charges, or currency conversion charges charged by your bank or provider are paid by you, not by us. Please check with your bank before payment. If a refund is approved, it will be sent by the same method you paid with wherever possible, for the amount actually paid to us, not for any bank / transfer charges.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Delivery Time</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Estimated Total: 12-17 Working Days.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Secure & Protected Payments</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Your payment details are handled securely. We do not store your full card details on this website. If you have any question about payment, contact us through our Contact page or WhatsApp before you pay.
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
            href="/shipping"
            className="inline-block rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition"
          >
            Shipping Policy
          </Link>
        </div>
      </section>
    </main>
  );
}