"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-black pt-16">
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
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-amber-400 uppercase text-center leading-none">
          KROSSFORD
        </p>
        <p className="mt-1 text-xs sm:text-sm font-medium tracking-widest text-amber-400/90 uppercase text-center leading-none">
          ENTERPRISES
        </p>

        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl leading-none font-bold text-white text-center">
          Real Leather.
          <br />
          Made Honestly.
        </h1>

        <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-200 max-w-2xl mx-auto text-center leading-relaxed">
          A New-Generation International Leather Brand, Since 2025. Sample Before Bulk. 100% Real Leather Guarantee.
        </p>

        <p className="mt-3 text-xs sm:text-sm text-amber-300/90 max-w-xl mx-auto text-center leading-relaxed">
          Total Delivery: 12-17 Working Days. We will try our best to deliver as soon as possible, even before this time.
        </p>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <Link
            href="/shop"
            className="bg-amber-400 text-black px-6 py-3 rounded text-sm font-bold tracking-wide hover:bg-amber-300"
          >
            Shop Collection
          </Link>
          <Link
            href="/b2b"
            className="border border-amber-400 text-amber-400 px-6 py-3 rounded text-sm font-bold tracking-wide hover:bg-amber-400 hover:text-black"
          >
            Retail + Wholesale
          </Link>
          <Link
            href="/contact"
            className="border border-white text-white px-6 py-3 rounded text-sm font-bold tracking-wide hover:bg-white hover:text-black"
          >
            Request Sample
          </Link>
        </div>
      </div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 border-t border-white/10 py-2 overflow-hidden">
        <p className="whitespace-nowrap text-xs sm:text-sm tracking-widest text-zinc-300 text-center uppercase">
          Ships Via DHL Express &nbsp;•&nbsp; Total Delivery: 12-17 Working Days &nbsp;•&nbsp; Tracking Provided &nbsp;•&nbsp; We Always Aim To Deliver Earlier &nbsp;•&nbsp; VISA | MASTERCARD | WESTERN UNION
        </p>
      </div>
    </section>
  );
}
