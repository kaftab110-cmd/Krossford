import LegalNav from "@/components/LegalNav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | KROSSFORD Enterprises",
  description: "Shipping policy for KROSSFORD Enterprises - handcrafted to order, DHL Express delivery, 12-17 working days worldwide.",
};

// SHIPPING - FINAL - ONE TIME ALL FIXES - app/shipping/page.tsx
// 1. Self-contained kar diya - Pehle content lib/data/shipping se aa raha tha, ab isi file me hai
//    Taake 18-24 / galat delivery time kahin aur chhupa hua na reh jaye
// 2. LegalNav slug fix - Pehle "shipping-policy" tha jo route se match nahi karta - Ab "shipping" kiya jo asal route /shipping hai
// 3. Delivery saaf likha - 12-17 Working Days - Crafting 7-10 + DHL 5-7 - Purana 18-24 kahin nahi hai
// 4. Payment saaf likha - Sirf VISA / MASTERCARD / WESTERN UNION / BANK TRANSFER
// 5. Retail 100% / Wholesale 50-50 saaf likha

export default function ShippingPolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">
          Shipping Policy
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">
          Last Updated: November 12, 2026
        </p>

        <LegalNav currentSlug="shipping" />

        <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Total Delivery Time - 12-17 Working Days</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Total delivery time is 12-17 Working Days - Crafting Time: 7-10 Working Days + DHL Express Delivery: 5-7 Working Days. Full DHL tracking is provided. We will try our best to deliver as soon as possible - our aim is to deliver earlier than estimated.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Why Crafting Takes Time</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Every KROSSFORD bag is made only after your order. We do not keep ready-made stock. Each piece is cut, stitched, and finished by hand for you. That is why crafting takes 7-10 Working Days. Working Days means Monday to Saturday - Sunday and public holidays are not counted.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. DHL Express - Worldwide Delivery</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We ship worldwide with DHL Express. After your order is dispatched, you will receive your DHL tracking number on WhatsApp. You can track your parcel directly on the DHL website. If your parcel is stuck, message us on WhatsApp with your tracking number and we will check with DHL.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Shipping Cost & Customs</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Shipping cost is shown before you confirm your order. Prices do not include any import duty, customs tax, or local delivery charges charged by your country - if your country charges any, you will pay it directly to your local courier / customs. We cannot control or predict customs charges.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Order Confirmation & Dispatch</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Your order is confirmed only after payment is received and we confirm it on WhatsApp. Retail orders: 100% advance payment before crafting starts. Wholesale orders: 50% advance to start production - 50% before dispatch. Your order will not be dispatched until full payment is received. We accept only VISA, MASTERCARD, WESTERN UNION, and BANK TRANSFER.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Address - Please Check Carefully</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Please send your full delivery address correctly on WhatsApp - full name, street, city, postcode, and country, plus your phone number. If the address is wrong or incomplete, DHL may delay or return your parcel. If DHL returns your parcel because of a wrong address, re-shipping cost will be charged.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Delays</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              A small delay due to crafting, customs, or DHL does not qualify for a return, refund, or cancellation. If your delivery is taking longer than 17 Working Days, message us on WhatsApp and we will check your tracking with DHL and update you.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">8. Damaged On Delivery</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              If your parcel arrives damaged, contact us on WhatsApp within 48 hours of delivery with clear photos and a short video plus your order details. Do not use, wash, or alter the item. Keep the original DHL packaging until your case is closed. Full details are on our Returns and Refunds page.
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