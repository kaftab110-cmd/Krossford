"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ===== SALE BANNER - HOME PAGE KE LIYE =====
// Rule: Jab Sale page LIVE hoga, tabhi ye banner dikhega
// Jab COMING SOON hoga, banner khud chhup jayega
export default function SaleBanner() {
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/site-settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setLive(d.sale_live === true || d.sale_live === "true"))
      .catch(() => setLive(false));
  }, []);

  if (live !== true) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="relative overflow-hidden rounded-xl border border-red-500/40 bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-xs tracking-[0.25em] uppercase text-red-400 font-bold">Limited Time Sale</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 leading-tight">
              Sale Is Live.
              <br />
              Premium Leather, Better Price.
            </h2>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
              Handcrafted full-grain leather pieces at special sale prices. Made to order. Ships via DHL Express.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href="/sale" className="bg-red-500 text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-red-600">
                View Sale →
              </Link>
              <Link href="/shop" className="border border-zinc-600 text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:border-red-400 hover:text-red-400">
                Shop Collection
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4">Sale prices for a limited time only.</p>
          </div>
          <div className="relative min-h-[220px] md:min-h-[280px] bg-black">
            <img
              src="/images/leather-duffle-bag.jpg"
              alt="Krossford Sale"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/wallet.jpg"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Sale Live
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
