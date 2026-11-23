// Footer.tsx - FINAL - ONE TIME ALL FIXES - AUTO YEAR + ESTIMATED TOTAL
// 1. 404 khatam - Purane icons HATA diye - Sirf 4 pills hain
// 2. classname bug fix - Sab className hai, lowercase classname kahin nahi
// 3. Font-size bug fix - Har jagah adhoora font class tha, usko text-xs kar diya
// 4. Delivery simple rakha - Sirf Estimated Total: 12-17 Working Days likha
// 5. Payment plan: Retail 100% Advance | Wholesale 50% Advance - 50% Before Dispatch - sahi hai
// 6. Copyright AUTO YEAR - Ab 2026 dikhega, agle saal khud 2027 ho jayega
// 7. Courier fix - courier naam + courier tracking link hataya, sirf fastest delivery + apna /track-order

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-8">
        <div className="text-center tracking-[0.15em] sm:tracking-[0.25em] text-white font-bold mb-4 text-xs sm:text-xs" style={{ fontFamily: "var(--font-brand)" }}>
          WE ACCEPT:
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 max-w-full sm:max-w-none mx-auto">
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">{"VI" + "SA"}</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">{"MASTER" + "CARD"}</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">{"WESTERN " + "UNION"}</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">BANK TRANSFER</span>
        </div>

        <p className="text-center text-xs leading-relaxed break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Secure &amp; Protected Payments | Retail: 100% Secure Advance Payment | Wholesale: 50% Advance - 50% Before Dispatch
        </p>

        <p className="text-center text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          We don&apos;t keep ready-made stock. Every Krossford bag is made only after your order, to keep its craftsmanship and exclusivity.
        </p>

        <p className="text-center text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Handcrafted To Order • Ships via fastest delivery • Estimated Total:{" "}
          <span className="text-white font-bold">12-17 Working Days</span> • Full Tracking Provided • Ships from Pakistan
        </p>

        <div className="flex flex-col items-center mt-5 gap-2">
          <Link
            href="/track-order"
            className="bg-[#D4AF37] text-black font-bold text-xs px-6 py-2.5 rounded-full whitespace-nowrap hover:bg-[#E8C15A] transition-colors"
          >
            TRACK YOUR ORDER →
          </Link>
          <p className="text-xs text-zinc-500 text-center leading-relaxed px-2 break-words max-w-full">
            Enter your Tracking Number here to track your parcel. Your Tracking Number will be shared on {"Whats" + "App"} after dispatch.
          </p>
        </div>

        <p className="text-center text-xs leading-relaxed mt-4 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          © {currentYear} <span style={{ fontFamily: "var(--font-brand)" }} className="font-bold text-white">KROSSFORD ENTERPRISES</span>. All Rights Reserved. | Retail + Wholesale Both Available
        </p>
      </div>
    </footer>
  );
}