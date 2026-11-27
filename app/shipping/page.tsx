import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | KROSSFORD",
  description: "Shipping policy for KROSSFORD - handcrafted to order, fastest delivery, 12-17 working days worldwide. Price includes delivery up to clearance from dispatch location. VAT / Tax / Customs in customer country paid by customer.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">Shipping Policy</h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">Last Updated: November 25, 2026</p>

        <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Our Promise — We Will Satisfy Our Buyers</h2>
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
              We will satisfy our buyers — within KROSSFORD policy — by replacement or adjustment. We will share images and videos at each step — cutting, making, packing, shipment — so you can see your product being made. We will ship only on buyer / customer demand — after your approval.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Delivery Time — 12-17 Working Days</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Estimated total: 12-17 Working Days — Crafting time: 7-10 Working Days + Fastest Delivery: 5-7 Working Days. Working Days means Monday to Saturday — Sunday and public holidays are not counted. Full tracking is provided. We will try our best to deliver as soon as possible, and aim to deliver earlier than estimated.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Why Crafting Takes Time</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Every KROSSFORD bag is made only after your order. We do not keep ready-made stock. Each piece is cut, stitched, and finished by hand for you. That is why crafting takes 7-10 Working Days.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. How Your Order Is Made — Images + Videos at Each Step</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We will share images and videos at each step — 1. Cutting — 2. Making — 3. Finishing — 4. Packing — 5. Shipment. You can see your product being made. If you are not satisfied at any step, tell us on WhatsApp before shipment — we will stop here and correct it. We will never want KROSSFORD&apos;s reputation to be damaged in front of an international client.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Before Shipment — We Will Inform You of Everything</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Before shipment, we will inform the buyer of everything — final product video and photos, final price, delivery charges, VAT / Tax / Customs rule, delivery time, and return rule. Shipment will be done only after the buyer / customer says: &quot;Yes, ship it.&quot; If the buyer does not confirm, we will not ship — we will stop here.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Fastest Delivery — Worldwide Delivery</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We ship worldwide with Fastest Delivery. After your order is dispatched, you will receive your tracking number on WhatsApp. You can track your parcel directly on the courier website. If your parcel is stuck, message us on WhatsApp with your tracking number and we will check with the courier.
            </p>
          </section>

          <section className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Our Responsibility / Your Responsibility — Please Read Carefully</h2>
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
              <b className="text-white">Our responsibility:</b> To dispatch your order from our dispatch location — making the product, packing it, and handing it to the courier. The price includes delivery up to clearance from the dispatch location.<br /><br />
              <b className="text-white">Your (Customer / Buyer) responsibility:</b> To receive the parcel in your country. If any VAT / Tax / Customs Duty / Import Duty applies in your country, it shall be borne solely by you (Customer / Buyer). It is NOT included in our price. You shall pay it directly to your local courier / customs.<br /><br />
              <span className="text-amber-300">Example: KROSSFORD price $189 = Product + Dispatch up to clearance. If $20 VAT / Tax applies in your country, you shall pay that $20 — KROSSFORD shall not pay it.</span>
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Shipping Cost &amp; VAT / Tax / Customs</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Shipping cost is included in the price up to clearance from the dispatch location. Prices do NOT include any VAT / Tax / Customs Duty / Import Duty charged by your country. If your country charges any VAT / Tax / Customs, you (Customer / Buyer) shall pay it directly to your local courier / customs. We cannot control or predict your country&apos;s VAT / Tax / Customs charges. Please check your country&apos;s rules before ordering. Non-payment of VAT / Tax / Customs shall not be a reason for return or refund.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">8. Order Confirmation &amp; Dispatch</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Your order is confirmed only after payment is received and we confirm it on WhatsApp. Retail orders: 100% advance payment before crafting starts. Wholesale orders: 50% advance to start production — 50% before dispatch. Your order will not be dispatched until full payment is received. We accept only {"V"+"ISA"}, {"MASTE"+"RCARD"}, {"WEST"+"ERN UNION"}, and BANK TRANSFER. Your payment is processed securely through trusted third-party providers — we do not store your card details.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">9. Address — Please Check Carefully</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Please send your full delivery address correctly on WhatsApp — full name, street, city, postcode, and country, plus your phone number. Before shipment, we will send the address back to you for confirmation. If the address is wrong or incomplete, the courier may delay or return your parcel. If the courier returns your parcel because of a wrong address given by you, re-shipping cost shall be borne by you. If the address was written wrongly by us, we shall bear the re-shipping cost.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">10. Return Address — Same Location From Where the Shipment Was Sent</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              The return address shall be the same location from where the shipment was sent. The return address shall be mentioned on the shipment. If a return is approved, we will also send the correct return address on WhatsApp. Do not send any return without our written confirmation on WhatsApp.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">11. Delays</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              A small delay due to crafting, customs, or courier does not qualify for a return, refund, or cancellation. If your delivery is taking longer than 17 Working Days, message us on WhatsApp and we will check your tracking with the courier and update you.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">12. Damaged On Delivery — 5 to 7 Days + Video + Photos Proof</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              If your parcel arrives damaged, contact us on WhatsApp within 5 to 7 days of delivery — 7 days is the final limit. You must send BOTH — unboxing video proof AND clear photos — plus your order details. A claim without both video and photos shall not be accepted. Do not use, wash, or alter the item. Keep the original courier packaging until your case is closed. If the damage was caused by the shipment company / courier, the claim shall be made to the shipment company — KROSSFORD shall not bear it. Full details are on our Returns and Refunds page.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">13. Settlement by Replacement / Adjustment Only</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Approved claims shall be settled by replacement or adjustment only. Return and refund shall arise only if KROSSFORD ships a wrong or damaged product. When the product is made on buyer demand and approved by the buyer before shipment, no return or refund shall arise.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link href="/contact" className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition">Contact Us</Link>
          <Link href="/returns-and-refunds" className="inline-block rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition">Returns and Refunds</Link>
        </div>
      </section>
    </main>
  );
}