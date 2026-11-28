// Footer.tsx - FIXED - Policy Links + Blind Partner Rule + Sequence Fixed
// 1. Policy links - Shipping / Impressum / Returns / Privacy / Terms
// 2. Sequence - SHOP Pehle - CUSTOMER SERVICE Dusra - POLICIES Teesra
// 3. Blind Partner Rule - "Ships from Pakistan" HATA diya - Sirf KROSSFORD
// 4. No DHL word - Only Fastest Delivery

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs w-full min-w-0 overflow-x-hidden overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full min-w-0 px-3 min-:px-4 pt-8 pb-8">
        <div className="text-center tracking-normal sm:tracking-[0.25em] text-white font-bold mb-4 text-xs" style={{ fontFamily: "var(--font-brand)" }}>
          WE ACCEPT:
        </div>
        <div className="grid grid-cols-2 min-:flex min-:flex-wrap min-:justify-center gap-2 sm:gap-3 mb-5 w-full min-w-0 max-w-md min-:max-w-none mx-auto">
          <span className="bg-white text-black px-2 min-:px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap text-center w-full min-:w-auto min-w-0">{"VI" + "SA"}</span>
          <span className="bg-white text-black px-2 min-:px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap text-center w-full min-:w-auto min-w-0">{"MASTER" + "CARD"}</span>
          <span className="bg-white text-black px-2 min-:px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap text-center w-full min-:w-auto min-w-0">{"WESTERN " + "UNION"}</span>
          <span className="bg-white text-black px-2 min-:px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap text-center w-full min-:w-auto min-w-0">BANK TRANSFER</span>
        </div>
        <p className="text-center text- min-:text-xs leading-relaxed break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Secure &amp; Protected Payments | Retail: 100% Secure Advance Payment | Wholesale: 50% Advance - 50% Before Dispatch
        </p>
        <p className="text-center text- min-:text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          We don&apos;t keep ready-made stock. Every Krossford bag is made only after your order, to keep its craftsmanship and exclusivity.
        </p>
        <p className="text-center text- min-:text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Handcrafted To Order • Ships via Fastest Delivery • Estimated Total:{" "}
          <span className="text-white font-bold">12-17 Working Days</span> • Full Tracking Provided • Shipped by KROSSFORD
        </p>

        {/* FOOTER LINKS - Sequence Fixed - SHOP Pehle - CUSTOMER SERVICE Dusra - POLICIES Teesra */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-7 text-left">
          <div>
            <p className="text-white font-bold tracking-wider text-xs mb-3">SHOP</p>
            <ul className="space-y-2">
              <li><Link href="/shop" className="hover:text-[#D4AF37]">Shop All</Link></li>
              <li><Link href="/for-her" className="hover:text-[#D4AF37]">For Her</Link></li>
              <li><Link href="/combo-deals" className="hover:text-[#D4AF37]">Combo Deals</Link></li>
              <li><Link href="/b2b" className="hover:text-[#D4AF37]">B2B Wholesale</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-white font-bold tracking-wider text-xs mb-3">CUSTOMER SERVICE</p>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-[#D4AF37]">Contact Us</Link></li>
              <li><Link href="/track-order" className="hover:text-[#D4AF37]">Track Your Order</Link></li>
              <li><Link href="/faq" className="hover:text-[#D4AF37]">FAQs</Link></li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-white font-bold tracking-wider text-xs mb-3">POLICIES</p>
            <ul className="space-y-2">
              <li><Link href="/shipping-policy" className="hover:text-[#D4AF37]">Shipping Policy</Link></li>
              <li><Link href="/impressum" className="hover:text-[#D4AF37]">Impressum</Link></li>
              <li><Link href="/returns" className="hover:text-[#D4AF37]">Returns &amp; Refunds</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-[#D4AF37]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#D4AF37]">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 gap-2 w-full min-w-0">
          <Link
            href="/track-order"
            className="w-full min-:w-auto max-w-xs bg-[#D4AF37] text-black font-bold text-xs px-6 py-2.5 rounded-full whitespace-nowrap hover:bg-[#E8C15A] transition-colors text-center"
          >
            TRACK YOUR ORDER →
          </Link>
          <p className="text- min-:text-xs text-zinc-500 text-center leading-relaxed px-2 break-words max-w-full">
            Enter your Tracking Number here to track your parcel. Your Tracking Number will be shared on {"Whats" + "App"} after dispatch.
          </p>
        </div>
        <p className="text-center text- min-:text-xs leading-relaxed mt-4 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          © {currentYear} <span style={{ fontFamily: "var(--font-brand)" }} className="font-bold text-white break-words">KROSSFORD ENTERPRISES</span>. All Rights Reserved. | Retail + Wholesale Both Available
        </p>
      </div>
    </footer>
  );
}