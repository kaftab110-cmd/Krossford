"use client";
import Link from "next/link";
import { useState } from "react";

// FOLDER: components
// FILE: Hero.tsx - PEHLE SE HAI - ISKO POORA REPLACE KARO
// FINAL FIX: Tuta hua icon kabhi nahi dikhega.
// Pehle wali file me problem ye thi - img tag hamesha dikhta tha, chahe image na mile.
// Ab: Agar 3no image fail ho jayein to img tag hi gayab ho jayega - Sirf gradient + writing rahega - Saaf lagega - Toota nahi lagega.
export default function Hero() {
  const FALLBACKS = ["/images/hero-bag.jpg", "/images/leather-duffle-bag.jpg", "/images/wallet.jpg"];
  const [heroIdx, setHeroIdx] = useState(0);
  const [imgFailedAll, setImgFailedAll] = useState(false);
  const heroSrc = FALLBACKS[Math.min(heroIdx, FALLBACKS.length - 1)];
  return (
    <section className="relative w-full min-h-[calc(100svh-132px)] flex flex-col justify-center items-center text-center overflow-hidden bg-black">
      {/* Background - Gradient hamesha rahega - Taake image na bhi ho to hero kaala / toota na lage */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2a2118_0%,#000000_65%)]" />
      {/* Background Image - Sirf tab dikhega jab tak fail nahi hua */}
      {!imgFailedAll && (
        <div className="absolute inset-0">
          <img
            src={heroSrc}
            alt=""
            aria-hidden="true"
            onError={() => {
              if (heroIdx < FALLBACKS.length - 1) setHeroIdx((i) => i + 1);
              else setImgFailedAll(true);
            }}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      {/* Content - pb-14 rakha hai taake neeche wali Ticker buttons ke upar na chadhe */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-6 pb-14 w-full max-w-6xl mx-auto">
        <p className="text-2xl sm:text-3xl md:text-4xl text-amber-400 uppercase text-center leading-none" style={{ fontFamily: "var(--font-brand)", fontWeight: 600, letterSpacing: "0.05em" }}>
          KROSSFORD
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-white text-center" style={{ fontFamily: "var(--font-brand)", fontWeight: 500 }}>
          Real Leather.
          <br />
          Made Honestly.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-zinc-200 max-w-2xl mx-auto text-center leading-relaxed">
          A New-Generation International Leather Brand, Since 2025. Sample Before Bulk. 100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel).
        </p>
        <p className="mt-3 text-xs sm:text-sm text-amber-300/90 max-w-xl mx-auto text-center leading-relaxed">
          Estimated Total: 12-17 Working Days. We will try our best to deliver as soon as possible, even before this time.
        </p>
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <Link href="/shop" className="bg-amber-400 text-black px-6 py-3 rounded text-sm font-bold tracking-wide hover:bg-amber-300">Shop Collection</Link>
          <Link href="/b2b" className="border border-amber-400 text-amber-400 px-6 py-3 rounded text-sm font-bold tracking-wide hover:bg-amber-400 hover:text-black">Retail + Wholesale</Link>
          <Link href="/contact" className="border border-white text-white px-6 py-3 rounded text-sm font-bold tracking-wide hover:bg-white hover:text-black">Request Sample</Link>
        </div>
      </div>
      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 border-t border-white/10 py-2 overflow-hidden">
        <p className="whitespace-nowrap text-xs sm:text-sm tracking-widest text-zinc-300 text-center uppercase">
          Ships Via Fastest Delivery &nbsp;•&nbsp; Estimated Total: 12-17 Working Days &nbsp;•&nbsp; Tracking Provided &nbsp;•&nbsp; We Always Aim To Deliver Earlier &nbsp;•&nbsp; VISA | MASTERCARD | WESTERN UNION
        </p>
      </div>
    </section>
  );
}
