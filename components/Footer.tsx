// Footer.tsx - FINAL - ONE TIME ALL FIXES - AUTO YEAR
// 1. Gemini wala 404 khatam - Purane Western icons HATA diye - Sirf 4 pills hain: VISA / MASTERCARD / WESTERN UNION / BANK TRANSFER - Koi missing file nahi dhoondhega
// 2. classname bug fix - Sab className hai, lowercase classname kahin nahi
// 3. Font-size bug fix - Har jagah adhoora font class tha, usko text-xs kar diya - Font size ab sahi lagega
// 4. Delivery simple rakha - Sirf 12-17 Working Days likha, zyada detail nahi likhi - Jaisa user ne bola
// 5. Payment plan: Retail 100% Advance | Wholesale 50% Advance - 50% Before Dispatch - sahi hai
// 6. Copyright AUTO YEAR - Pehle 2025 likha tha, ab new Date().getFullYear() hai - Ab 2026 dikhega, agle saal khud 2027 ho jayega, dobara file nahi kholni padegi

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-8">
        <div className="text-center tracking-[0.15em] sm:tracking-[0.25em] text-white font-bold mb-4 text-xs sm:text-xs">
          WE ACCEPT:
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 max-w-full sm:max-w-none mx-auto">
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">VISA</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">MASTERCARD</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">WESTERN UNION</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-xs whitespace-nowrap">BANK TRANSFER</span>
        </div>

        <p className="text-center text-xs leading-relaxed break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Secure &amp; Protected Payments | Retail: 100% Secure Advance Payment | Wholesale: 50% Advance - 50% Before Dispatch
        </p>

        <p className="text-center text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          We don&apos;t keep ready-made stock. Every Krossford bag is made only after your order, to keep its craftsmanship and exclusivity.
        </p>

        <p className="text-center text-xs leading-relaxed mt-2.5 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          Handcrafted To Order • Ships via DHL Express • Total:{" "}
          <span className="text-white font-bold">12-17 Working Days</span> • Full Tracking Provided • Ships from Pakistan
        </p>

        {/* TRACK YOUR ORDER BUTTON - DHL line ke neeche, Copyright se upar */}
        <div className="flex flex-col items-center mt-5 gap-2">
          <a
            href="https://www.dhl.com/global-en/home/tracking.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 text-black font-bold text-xs px-6 py-2.5 rounded-full whitespace-nowrap hover:bg-amber-300 transition-colors"
          >
            TRACK YOUR ORDER →
          </a>
          <p className="text-xs text-zinc-500 text-center leading-relaxed px-2 break-words max-w-full">
            Enter your DHL Tracking Number here to track your parcel. Your Tracking Number will be shared on WhatsApp after dispatch.
          </p>
        </div>

        <p className="text-center text-xs leading-relaxed mt-4 break-words max-w-full sm:max-w-2xl mx-auto px-1">
          © {currentYear} KROSSFORD ENTERPRISES. All Rights Reserved. | Retail + Wholesale Both Available
        </p>
      </div>
    </footer>
  );
}