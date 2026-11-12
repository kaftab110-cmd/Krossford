import LegalNav from "@/components/LegalNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns and Refunds | KROSSFORD Enterprises",
  description: "Returns and refunds policy for KROSSFORD Enterprises - handcrafted to order leather goods, DHL Express delivery,Estimated Total: 12-17 Working Days.",
};

// RETURNS AND REFUNDS - FINAL - ONE TIME ALL FIXES
// 1. Ye file pehle galat thi - Iske andar galat page ka content tha - Ab isme asli Returns and Refunds ka content hai
// 2. Rule saaf likh diya - Handcrafted To Order hai, ready stock nahi hai, is liye change-of-mind return nahi hoga
// 3. Custom / Personalized orders - Return nahi honge - Sirf defect pe remake / repair / refund
// 4. Defect ka process - Delivery ke 48 hours ke andar WhatsApp pe photo / video bhejo
// 5. DeliveryEstimated Total: 12-17 Working Days - Crafting 7-10 + DHL 5-7 - Late delivery return ki wajah nahi hai, tracking diya jayega
// 6. Payment - Retail 100% Advance | Wholesale 50% Advance - 50% Before Dispatch - Refund usi method se hoga jisse payment hua tha (Bank Transfer / Western Union / Card)
// 7. B2B alag likh diya - Bulk me defect wale pieces alag se handle honge, poora bulk return nahi hoga

const returnsContent = {
  title: "Returns and Refunds",
  lastUpdated: "November 12, 2026",
  sections: [
    {
      heading: "1. Handcrafted To Order - Please Read First",
      paragraphs: [
        "Every KROSSFORD bag is made only after your order. We do not keep ready-made stock.",
        "Because each piece is cut, stitched, and finished for you, we cannot resell a returned piece to another customer. Please check size, colour, design, and custom text carefully before you confirm your order on WhatsApp.",
      ],
    },
    {
      heading: "2. Change of Mind - No Return",
      paragraphs: [
        "We do not accept returns or exchanges for change of mind - including colour change, size change, design change, or you no longer want the order.",
        "Once crafting has started, your order cannot be cancelled. If crafting has not started yet, contact us on WhatsApp as soon as possible - we will try our best to help, but we cannot promise cancellation.",
      ],
    },
    {
      heading: "3. Defective or Wrong Item - We Will Fix It",
      paragraphs: [
        "If your item arrives damaged, defective, or completely wrong (wrong design / wrong custom text), we will fix it. This is our promise.",
        "What to do:",
      ],
      bullets: [
        "Contact us on WhatsApp within 48 hours of delivery.",
        "Send clear photos and a short video of the issue, plus your order details.",
        "Do not use, wash, or alter the item after you find the defect.",
        "Keep the original DHL packaging until your case is closed.",
      ],
    },
    {
      heading: "4. How We Resolve Defects",
      paragraphs: [
        "After we check your photos / video, we will offer one of these - depending on the issue:",
      ],
      bullets: [
        "Remake - We make the same piece again, free of cost.",
        "Repair - If the issue is small and repairable, we guide you or arrange repair.",
        "Partial refund - If remake or repair is not reasonable, we agree a partial refund.",
        "Full refund - Only if the item is completely unusable and remake is not possible.",
        "You do not need to ship the defective item back to Pakistan unless we specifically ask you to. Return shipping for a defect case will be discussed on WhatsApp - we will not ask you to pay high return shipping without agreement.",
      ],
    },
    {
      heading: "5. Delivery Delays Are Not a Return Reason",
      paragraphs: [
        "Total delivery time isEstimated Total: 12-17 Working Days - Crafting Time: 7-10 Working Days + DHL Express Delivery: 5-7 Working Days. Full tracking is provided.",
        "We always aim to deliver earlier than estimated. A small delay due to crafting, customs, or DHL does not qualify for a return or refund. If your parcel is stuck, message us on WhatsApp with your tracking number and we will check with DHL.",
      ],
    },
    {
      heading: "6. How Refunds Work",
      paragraphs: [
        "If a refund is approved, it will be sent by the same method you paid with - Bank Transfer, Western Union, or Card (VISA / MASTERCARD) - wherever possible.",
        "Refund timing depends on your bank / provider. Bank transfers and Western Union usually take a few working days after we send it. Card refunds can take longer as per your bank.",
        "Retail orders: 100% advance payment. Wholesale orders: 50% advance - 50% before dispatch. Refund is only for the amount actually paid to us, not for any bank / transfer charges charged by your provider.",
      ],
    },
    {
      heading: "7. Wholesale / B2B Orders",
      paragraphs: [
        "Wholesale orders (50+ units) are custom production. Bulk orders cannot be returned for change of mind.",
        "If any pieces in bulk are defective, report them with photos within 7 days of delivery. We will remake or adjust only the defective pieces - not the full bulk order. Sample approval before bulk is strongly recommended - order a sample first, then decide for bulk.",
      ],
    },
    {
      heading: "8. How to Start a Return / Refund Request",
      paragraphs: [
        "Contact us through the Contact Us page or on WhatsApp with your order details, photos / video, and tracking number. We will reply with the next step.",
        "Please do not ship anything back to us without our written confirmation on WhatsApp.",
      ],
    },
  ],
};

export default function ReturnsAndRefundsPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#d4af37] tracking-wide">
            {returnsContent.title}
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Last Updated: {returnsContent.lastUpdated}
          </p>
        </div>

        <LegalNav currentSlug="returns-and-refunds" />

        <div className="space-y-10">
          {returnsContent.sections.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
                {section.heading}
              </h2>
              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                {section.paragraphs.map((p, pIndex) => (
                  <p key={`${section.heading}-p-${pIndex}`}>{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc list-inside space-y-1.5 pl-2 pt-1">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={`${section.heading}-bullet-${bIndex}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
