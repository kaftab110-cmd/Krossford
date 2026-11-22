"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { off: "20% OFF", cat: "BAGS", title: "Crossbody Messenger Bag - Jet Black", desc: "Best seller bag - now at sale price.", old: "$149", price: "$119", image: "/images/wallet.jpg", alt: "Crossbody Messenger Bag" },
  { off: "22% OFF", cat: "WALLETS", title: "RFID Wallet", desc: "RFID safe wallet - for daily use.", old: "$89", price: "$69", image: "/images/wallet.jpg", alt: "RFID Wallet" },
  { off: "22% OFF", cat: "FOR HIM", title: "Leather Vest", desc: "Premium leather vest - limited stock.", old: "$179", price: "$139", image: "/images/wallet.jpg", alt: "Leather Vest" },
];

export default function SalePage() {
  const [live, setLive] = useState<boolean | null>(null);

  // Admin Dashboard se sale_live flag laao - jaise Combo wala hai
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/site-settings", { cache: "no-store" });
        const data = await res.json();
        setLive(data.sale_live === true);
      } catch {
        setLive(false);
      }
    }
    load();
  }, []);

  // Jab tak flag load ho raha hai - kuch mat dikhao, flicker nahi hoga
  if (live === null) {
    return <main className="bg-black text-white min-h-screen" />;
  }

  // Agar Admin se Hide hai - Coming Soon dikhao - Quiet Luxury style
  if (!live) {
    return (
      <main className="bg-black text-white min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase">Krossford</p>
          <h1 className="text-4xl md:text-5xl tracking-wide" style={{ fontFamily: "var(--font-brand)" }}>SALE — COMING SOON</h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">Our private sale will open soon. Handcrafted leather, limited pieces, quiet luxury — no noise, just craft.</p>
          <div className="flex justify-center gap-3 pt-2">
            <Link href="/shop" className="bg-[#D4AF37] text-black text-xs font-bold tracking-widest px-6 py-3 rounded hover:bg-[#E8C15A]">SHOP RETAIL →</Link>
            <Link href="/b2b" className="border border-zinc-700 text-white text-xs font-bold tracking-widest px-6 py-3 rounded hover:border-[#D4AF37]">B2B WHOLESALE →</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-16">
      <div className="bg-red-600 text-white text-center text-xs font-bold tracking-widest py-2 px-4">
        SALE IS ON - LIMITED TIME - ORDER BEFORE STOCK RUNS OUT
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">SALE - DISCOUNT DEALS</h1>
        <p className="text-zinc-400 text-sm mt-3 tracking-wider">OLD PRICE CROSSED OUT - NEW PRICE IN GOLD - HANDCRAFTED - REAL LEATHER</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
            <div className="relative bg-[#F5EFE0] aspect-[4/3] overflow-hidden">
              <img src={it.image} alt={it.alt} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1">{it.off}</span>
            </div>
            <div className="bg-zinc-950 text-white p-5">
              <p className="text-[#D4AF37] text-xs tracking-widest">{it.cat}</p>
              <h2 className="font-bold tracking-wide mt-1">{it.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">{it.desc}</p>
              <p className="mt-4"><span className="text-zinc-500 line-through mr-2">{it.old}</span><span className="text-[#D4AF37] font-bold text-lg">{it.price}</span></p>
              <Link href="/shop" className="mt-4 inline-block bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 rounded">SHOP SALE →</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
