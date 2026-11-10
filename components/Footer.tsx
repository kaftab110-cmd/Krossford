// Footer.tsx - CLEAN VERSION - UPDATED
// Total ab 18-24 Working Days hai - Tracking Button Added

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-28 sm:pb-8">
        <div className="text-center tracking-[0.15em] sm:tracking-[0.25em] text-white font-bold mb-4 text- sm:text-xs">
          WE ACCEPT:
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 max-w- sm:max-w-none mx-auto">
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap">VISA</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap">MASTERCARD</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap">WESTERN UNION</span>
          <span className="bg-white text-black px-3 sm:px-4 py-2 rounded-full font-bold text- sm:text-xs whitespace-nowrap">BANK TRANSFER</span>
        </div>

        <p className="text-center text- leading-relaxed break-words max-w- sm:max-w-2xl mx-auto px-1">
          Secure &amp; Protected Payments | Retail: 100% Secure Advance Payment | Wholesale: 50% Advance - 50% Before Dispatch
        </p>

        <p className="text-center text- leading-relaxed mt-2.5 break-words max-w- sm:max-w-2xl mx-auto px-1">
          Ships via DHL Express • Processing + DHL Delivery: Total{" "}
          <span className="text-white font-bold">18-24 Working Days</span> • Tracking Provided • Our aim to deliver earlier than estimated.
        </p>

        {/* BUTTON YAHAN LAGAYA HAI - DHL line ke neeche, Copyright se upar */}
        <div className="flex flex-col items-center mt-5 gap-2">
          <a
            href="https://www.dhl.com/global-en/home/tracking.html"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 text-black font-bold text- px-6 py-2.5 rounded-full whitespace-nowrap hover:bg-amber-300 transition-colors"
          >
            TRACK YOUR ORDER →
          </a>
          <p className="text- text-zinc-500 text-center leading-relaxed px-2 break-words max-w-">
            Apna DHL Tracking Number yahan daal ke apna parcel track karein. Tracking Number dispatch ke baad WhatsApp pe milega.
          </p>
        </div>

        <p className="text-center text- leading-relaxed mt-4 break-words max-w- sm:max-w-2xl mx-auto px-1">
          © 2025 KROSSFORD ENTERPRISES. All Rights Reserved. | Retail + Wholesale Both Available
        </p>
      </div>
    </footer>
  );
}