import LegalNav from "@/components/LegalNav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns and Refunds | KROSSFORD Enterprises",
  description: "Returns and refunds policy for KROSSFORD Enterprises - handcrafted to order, 12-17 working days. No cash refunds - settlement by replacement or adjustment only. Claims within 5 to 7 days with video and photos proof.",
};

export default function ReturnsAndRefundsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">Returns and Refunds</h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">Last Updated: November 25, 2026</p>

        <LegalNav currentSlug="returns-and-refunds" />

        <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Our Promise — We Will Satisfy Our Buyers</h2>
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
              We will satisfy our buyers — within KROSSFORD policy — by replacement or adjustment, not by cash refund. Return or refund shall arise only if KROSSFORD ships a wrong or damaged product. When the product is made on buyer demand and approved by the buyer before shipment, no return or refund shall arise.
            </p>
          </section>

          <section className="rounded-lg border border-red-400/40 bg-red-950/40 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. No Cash Refunds — Under Any Circumstances</h2>
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
              Cash payment shall not be refunded under any circumstances — not for damage, not for wrong product, not for defect, and not for change of mind. Approved claims shall be settled by replacement or adjustment only. No cash shall be sent back by Bank Transfer, Western Union, or Card.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Handcrafted To Order — Please Read First</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Every KROSSFORD bag is made only after your order. We do not keep ready-made stock. Because each piece is cut, stitched, and finished for you, we cannot resell a returned piece to another customer. Please check size, colour, design, and custom text carefully before you confirm your order on WhatsApp. We will share images and videos at each step — cutting, making, packing, shipment — so you can approve before shipment.
            </p>
          </section>

          <section className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. One Rule For All Claims — 5 to 7 Days + Video + Photos Proof</h2>
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
              The same rule applies to all claims — damage, wrong product, defect, customised product damage, and change of mind:<br /><br />
              → <b className="text-white">Time:</b> Within 5 to 7 days of delivery — 7 days is the final limit. No claim shall be accepted after 7 days.<br />
              → <b className="text-white">Proof — BOTH Required:</b> Unboxing VIDEO proof AND clear PHOTOS. A claim with only video or only photos shall not be accepted. If the parcel looks damaged from outside, open it in front of the courier and record video.<br />
              → <b className="text-white">Send On WhatsApp:</b> Video + Photos + Order details + Tracking number.<br />
              → <b className="text-white">Do Not Use:</b> Do not use, wash, or alter the item after you find the issue. Keep the original courier packaging until your case is closed.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. How We Manage Your Claim — Step By Step</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Step 1 — You: Send Video + Photos on WhatsApp within 5 to 7 days. Step 2 — KROSSFORD Check: We will check your video / photos within 24-48 hours and tell you whether the claim is approved. Step 3 — Return Only After Approval: Send the product back only if we ask you to, with our written confirmation on WhatsApp. Step 4 — Settlement: If approved, a new product shall be made FREE of product cost. Step 5 — New Product: The new product shall be made (7-10 Working Days crafting + delivery) and shipped. Tracking number shall be shared on WhatsApp.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Settlement — New Product FREE — Delivery Charges Borne By Customer</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              If your claim is approved for damage, wrong product, or defect caused by KROSSFORD, a new product shall be provided FREE of product cost. Both sides delivery / shipment charges — return delivery AND re-dispatch delivery from our location — shall be borne by you (Customer / Buyer). This is the luxury standard — product free, shipment borne by customer.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. Change Of Mind — Same Product FREE — Different Product By Adjustment — No Cash</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Same Product — Colour / Size change only: The product shall be replaced FREE of product cost. Next delivery charges shall be borne by you.<br /><br />
              Different Product: If you want a different product, the balance shall be adjusted — no cash shall be returned. If the new product is costlier, you shall pay the difference + next delivery charges. If the new product is cheaper, the remaining balance shall be adjusted towards another product — it shall NOT be returned as cash.<br /><br />
              Example: Duffle Bag $189 — You want Biker Suit $300 — You pay $111 difference + delivery. Duffle Bag $189 — You want Wallet $120 — Remaining $69 shall be adjusted — not returned as cash. Change of mind claims must also be made within 5 to 7 days, with video + photos proof, and the product must be new, unused, and in original packing.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Customised / Engraved / Personalised Items — Non-Refundable</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Customised design, engraved, initialled, or personalised items are non-refundable and non-exchangeable for change of mind. However, if such an item arrives damaged or defective due to KROSSFORD, you may claim within 5 to 7 days with video + photos proof. If approved, a new customised product shall be made FREE of product cost. Delivery charges shall be borne by you. No cash shall be returned.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">8. What Is Covered — What Is Not Covered</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              COVERED (within 5 to 7 days + proof): Open stitching / stitching defect, zipper / hardware defect, leather cut / cutting defect, wrong colour / size / design sent by KROSSFORD, courier damage with video proof.<br /><br />
              NOT COVERED: Damage after use, damage after wash / alteration, claim after 7 days, claim without both video and photos proof, non-payment of VAT / Tax / Customs in your country, change of mind after crafting has started for customised items.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">9. Delivery Delays Are Not a Return Reason</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Estimated total: 12-17 Working Days. Full tracking is provided. We always aim to deliver earlier than estimated. A small delay due to crafting, customs, or courier does not qualify for a return or refund. If your parcel is stuck, message us on WhatsApp with your tracking number and we will check with the courier.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">10. VAT / Tax / Customs Duty — Borne By Customer / Buyer</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              If any VAT / Tax / Customs Duty / Import Duty applies in your country, it shall be borne solely by you (Customer / Buyer). It is NOT included in our price. Non-receipt of parcel due to VAT / Tax / Customs shall NOT be a reason for return or refund. VAT / Tax / Customs paid to your country shall NOT be refunded by KROSSFORD.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">11. Wholesale / B2B Orders — Bulk Is Non-Returnable</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Wholesale orders (50+ units) are made on buyer demand and are non-returnable. Bulk orders cannot be returned for change of mind. If any pieces in bulk are defective or wrong due to KROSSFORD, report them with video + photos within 5 to 7 days of delivery. We will remake or adjust only the defective pieces — not the full bulk order. If damage was caused by the shipment company / courier, the claim shall be made to the shipment company — KROSSFORD shall not bear it. Before packing, we will share product video and proof for your approval — shipment shall be done only after your confirmation. Sample approval before bulk is strongly recommended — order a sample first, then decide for bulk.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">12. Return Address — Same Location From Where the Shipment Was Sent</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              The return address shall be the same location from where the shipment was sent. It may be in Pakistan or any other partnership location — it is not fixed to one country. The return address shall be mentioned on the shipment. If a return is approved, we will also send the correct return address on WhatsApp. Do not ship anything back to us without our written confirmation on WhatsApp.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">13. How To Start a Claim</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Contact us through the Contact Us page or on WhatsApp with your order details, video + photos proof, and tracking number. We will reply with the next step. Please do not ship anything back to us without our written confirmation on WhatsApp.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link href="/contact" className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition">Contact Us</Link>
          <Link href="/shipping" className="inline-block rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition">Shipping Policy</Link>
        </div>
      </section>
    </main>
  );
}