"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h- flex flex-col justify-center items-center text-center overflow-hidden bg-black pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bag.jpg"
          alt="Krossford Leather Bag"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 pt-10 pb-24 w-full max-w-6xl mx-auto">
        {/* KROSSFORD BARA, ENTERPRISES CHOTA - CENTER */}
        <p className="text- sm:text- md:text- font-bold tracking-[0.3em] text-amber-400 uppercase text-center leading-none">
          KROSSFORD
        </p>
        <p className="mt- text- sm:text- md:text- font-medium tracking-[0.5em] text-amber-400/90 uppercase text-center leading-none">
          ENTERPRISES
        </p>

        <h1 className="mt-6 text- sm:text- md:text- leading-[0.95] font-bold text-white text-center">
          Real Leather.
          <br />
          Made Honestly.
        </h1>

        <p className="mt-6 text- sm:text- md:text- text-zinc-200 max-w-2xl mx-auto text-center leading-relaxed">
          A New-Generation International Leather Brand, Since 2025. Sample Before Bulk. 100% Real Leather Guarantee.
        </p>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <Link
            href="/shop"
            className="bg-amber-400 text-black px-6 py-3 rounded text- font-bold tracking-[0.1em] hover:bg-amber-300"
          >
            Shop Collection
          </Link>
          <Link
            href="/b2b"
            className="border border-amber-400 text-amber-400 px-6 py-3 rounded text- font-bold tracking-[0.1em] hover:bg-amber-400 hover:text-black"
          >
            Retail + Wholesale
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-6 py-3 rounded text- font-bold tracking-[0.1em] hover:bg-white hover:text-black"
          >
            Request Sample
          </Link>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 border-t border-white/10 py-2 overflow-hidden">
        <p className="whitespace-nowrap text- sm:text- tracking-[0.2em] text-zinc-300 text-center uppercase">
          Ships Via DHL Express &nbsp;•&nbsp; Total Delivery: 18-24 Working Days &nbsp;•&nbsp; Tracking Provided &nbsp;•&nbsp; VISA | MASTERCARD | WESTERN UNION
        </p>
      </div>
    </section>
  );
}