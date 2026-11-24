"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ===== COMBO BANNER - HOME + COMBO PAGE KE LIYE =====
// Rule: Jab Combo page LIVE hoga, tabhi ye banner dikhega
// Jab COMING SOON hoga, banner khud chhup jayega - kuch karne ki zaroorat nahi
export default function ComboBanner() {
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/site-settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setLive(d.combo_live === true || d.combo_live === "true"))
      .catch(() => setLive(false));
  }, []);

  // Agar LIVE nahi hai to banner mat dikhao
  if (live !== true) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="relative overflow-hidden rounded-xl border border-amber-400/40 bg-zinc-950">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT - TEXT */}
          <div className="p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-bold">Limited Combo Deal</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 leading-tight">
              Bag + Wallet.
              <br />
              Save More Together.
            </h2>
            <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
              Handcrafted full-grain leather combo. Made to order. Sample before bulk. Ships via fastest delivery.
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <Link href="/combo-deals" className="bg-amber-400 text-black px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-amber-300">
                View Combo Deals →
              </Link>
              <Link href="/shop" className="border border-zinc-600 text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:border-amber-400 hover:text-amber-400">
                Shop Collection
              </Link>
            </div>
            <p className="text-xs text-zinc-500 mt-4">Combo Price: $169 — Bag + Wallet • 100% Real Leather</p>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="relative min-h-[220px] md:min-h-[280px] bg-black">
            <img
              src="/images/wallet.jpg"
              alt="Krossford Bag + Wallet Combo"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/leather-duffle-bag.jpg"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
            <span className="absolute top-4 right-4 bg-amber-400 text-black text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              Save With Combo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
