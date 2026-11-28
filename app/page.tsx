// FOLDER: app
// FILE: page.tsx - IS FILE ME SIRF HERO WALA HISSA REPLACE KARNA HAI
// Agar poori page.tsx chahiye to is HeroLocked ko import karke use karo - neeche tareeka likha hai

"use client";
import Link from "next/link";

export default function HeroLocked() {
  return (
    <section className="w-full bg-black px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 pb-3 sm:pb-4">
      {/* OUTLINE BORDER FRAME - SAB KUCH ISKE ANDAR - BAHAR KUCH NAHI */}
      <div className="relative w-full overflow-hidden rounded-xl border border-[#D4AF37]/60 bg-black"
        style={{ height: "calc(100svh - 130px)", minHeight: "560px", maxHeight: "860px" }}>

        {/* IMAGE - CONTAIN - KATेगी NAHI - POORI DIKHEGI */}
        <img
          src="/hero.jpg"
          alt="Krossford Genuine Leather Bag"
          className="absolute inset-0 h-full w-full object-contain object-center"
        />
        {/* HALKI DARK LAYER - TAKE WRITING PARHI JAYE - IMAGE KO CHUPAYE NAHI */}
        <div className="absolute inset-0 bg-black/35" />

        {/* WRITING + BUTTONS + STRIPS - SAB FRAME KE ANDAR */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-6">
          <p className="text-[#D4AF37] tracking-[0.35em] text-xs sm:text-sm font-bold" style={{ fontFamily: "var(--font-brand)" }}>
            KROSSFORD
          </p>

          <h1 className="mt-3 text-white font-bold leading-[1.05] text-[32px] sm:text-[48px] lg:text-[64px]" style={{ fontFamily: "var(--font-brand)" }}>
            Genuine Leather.<br />Made Honestly.
          </h1>

          <p className="mt-3 max-w-2xl text-[13px] sm:text-[15px] leading-relaxed text-zinc-200">
            A New-Generation International Leather Brand, Since 2025. Sample Before Bulk. Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel). Custom Made On Demand — Made As Per Buyer &amp; Customer Requirement.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link href="/shop" className="bg-[#D4AF37] text-black px-5 sm:px-6 py-3 rounded text-[13px] sm:text-sm font-bold">
              Shop Collection
            </Link>
            <Link href="/b2b" className="border border-[#D4AF37] text-[#D4AF37] px-5 sm:px-6 py-3 rounded text-[13px] sm:text-sm font-bold bg-black/40">
              Retail + Wholesale
            </Link>
            <Link href="/contact" className="border border-white text-white px-5 sm:px-6 py-3 rounded text-[13px] sm:text-sm font-bold bg-black/40">
              Request Sample
            </Link>
          </div>

          {/* STRIPS - AB FRAME KE ANDAR - NEeche CHIPKI HUI - KABHI GAYAB NAHI HONGI */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#D4AF37]/40 bg-black/60 py-2.5 px-3">
            <p className="text-[10px] sm:text-[11px] tracking-[0.18em] text-[#D4AF37] uppercase truncate">
              Shipped By Krossford • Custom Made On Demand • Secure Payments • Bank Transfer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
  app / page.tsx ME KAISE LAGANA HAI:
  1. Upar wala HeroLocked component ko components / HeroLocked.tsx me paste karo
  2. app / page.tsx me sabse upar likho: import HeroLocked from "@/components/HeroLocked";
  3. Jahan pehle hero tha wahan sirf likho: <HeroLocked />
  4. Purana hero wala <section> hata do - Dono mat rakhna
  5. Hero image ka naam check karo: /hero.jpg - Agar tumhari image ka naam /hero-bag.jpg hai to src me wahi likho
*/
