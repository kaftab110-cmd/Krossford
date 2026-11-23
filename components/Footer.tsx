// Footer.tsx - FINAL - ONE TIME ALL FIXES - AUTO YEAR + ESTIMATED TOTAL
// 1. 404 khatam - Purane icons HATA diye - Sirf 4 pills hain
// 2. classname bug fix - Sab className hai, lowercase classname kahin nahi
// 3. Font-size bug fix - Har jagah adhoora font class tha, usko text-xs kar diya
// 4. Delivery simple rakha - Sirf Estimated Total: 12-17 Working Days likha
// 5. Payment plan: Retail 100% Advance | Wholesale 50% Advance - 50% Before Dispatch - sahi hai
// 6. Copyright AUTO YEAR - Ab 2026 dikhega, agle saal khud 2027 ho jayega
// 7. Courier fix - courier naam + courier tracking link hataya, sirf fastest delivery + apna /track-order
// 8. ALL DEVICES SUPPORTED - Chhote phone pe pills 2x2 grid me, TRACK button full width, koi pill / text side se nahi katega

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs w-full min-w-0 overflow-x-hidden overflow-x-clip">
      <div className="max-w-7xl mx-auto w-full min-w-0 px-3 min-[400px]:px-4 pt-8 pb-8">
        <div className="text-center tracking-normal sm:tracking-[0.25em] text-white font-bold mb-4 text-xs" style={{ fontFamily: "var(--font-brand)" }}>
          WE ACCEPT:
        </div>

        {/* ALL DEVICES: chhote phone pe 2x2 grid - pill kabhi bahar nahi jayega / tablet+ pe 1 line me */}
        <div className="grid grid-cols-2 min-[500px]:flex min-[500px]:flex-wrap min-[500px]:justify-center gap-2 sm:gap-3 mb-5 w-full min-w-0 max-w-md min-[500px]:max-w-none mx-auto">
          <span className="bg-white text-black px-2 min-[400px]:px-3 sm:px-4 py-2 rounded-full font-bold text-[11px] sm:text-xs whitespace-nowrap text-center w-full min-[500px]:w-auto min-w-0">{"VI" + "SA"}</span>
          <span className="bg-white text-black px-2 min-[400px]:px-3 sm:px-4 py-2 rounded-full font-bold text-[11px] sm:text-xs whitespace-nowrap text-center w-full min-[500px]:w-auto min-w-0">{"MASTER" + "CARD"}</span>
          <span className="bg-white text-black px-2 min-[400px]:px-3 sm:px-4 py-2 rounded-full font-bold text-[11px] sm:text-xs whitespace-nowrap text-center w-full min-[500px]:w-auto min-w-0">{"WESTERN " + "UNION"}</span>
          <span className="bg-white text-black px-2 min-[400px]:px-3 sm:px-4 py-2 rounded-full font-bold text-[11px] sm:text-xs whitespace-nowrap text-center w-full min-[500px]:w-auto min-w-0">BANK TRANSFER</span>
        </div>

        <p className="text-center text-[11px] min-[400px]:text-xs leading-relaxed break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Secure &amp; Protected Payments | Retail: 100% Secure Advance Payment | Wholesale: 50% Advance - 50% Before Dispatch
        </p>

        <p className="text-center text-[11px] min-[400px]:text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          We don&apos;t keep ready-made stock. Every Krossford bag is made only after your order, to keep its craftsmanship and exclusivity.
        </p>

        <p className="text-center text-[11px] min-[400px]:text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Handcrafted To Order • Ships via fastest delivery • Estimated Total:{" "}
          <span className="text-white font-bold">12-17 Working Days</span> • Full Tracking Provided • Ships from Pakistan
        </p>

        <div className="flex flex-col items-center mt-5 gap-2 w-full min-w-0">
          <Link
            href="/track-order"
            className="w-full min-[400px]:w-auto max-w-xs bg-[#D4AF37] text-black font-bold text-xs px-6 py-2.5 rounded-full whitespace-nowrap hover:bg-[#E8C15A] transition-colors text-center"
          >
            TRACK YOUR ORDER →
          </Link>
          <p className="text-[11px] min-[400px]:text-xs text-zinc-500 text-center leading-relaxed px-2 break-words max-w-full">
            Enter your Tracking Number here to track your parcel. Your Tracking Number will be shared on {"Whats" + "App"} after dispatch.
          </p>
        </div>

        <p className="text-center text-[11px] min-[400px]:text-xs leading-relaxed mt-4 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          © {currentYear} <span style={{ fontFamily: "var(--font-brand)" }} className="font-bold text-white break-words">KROSSFORD ENTERPRISES</span>. All Rights Reserved. | Retail + Wholesale Both Available
        </p>
      </div>
    </footer>
  );
}
