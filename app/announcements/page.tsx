"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const posts = [
  { tag: "SALE", date: "November 2026", title: "SALE IS ON - UP TO 22% OFF", desc: "Discount is live on Messenger Bag, Wallet and Leather Vest. Order before stock runs out.", link: "/sale", btn: "VIEW SALE →" },
  { tag: "COMBO", date: "November 2026", title: "NEW COMBO DEALS ARE LIVE", desc: "Buy 2 products together and save more than buying separately. Save $29 on Messenger + Wallet Combo.", link: "/combo-deals", btn: "VIEW COMBOS →" },
  { tag: "DELIVERY", date: "November 2026", title: "PAKISTAN DELIVERY IS FREE", desc: "Delivery inside Pakistan is FREE. International delivery will be confirmed after our courier deal is final.", link: "/shop", btn: "SHOP NOW →" },
  { tag: "NEW", date: "November 2026", title: "NEW PRODUCTS COMING SOON", desc: "New wallets, bags and jackets are coming soon. Follow Announcements for the launch.", link: "/shop", btn: "SHOP NOW →" },
];

export default function AnnouncementsPage() {
  const [live, setLive] = useState<boolean | null>(null);

  // Admin Dashboard se announcements_live flag laao - jaise Combo / Sale wala hai
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/site-settings", { cache: "no-store" });
        const data = await res.json();
        setLive(data.announcements_live === true);
      } catch {
        setLive(false);
      }
    }
    load();
  }, []);

  if (live === null) {
    return <main className="bg-black text-white min-h-screen" />;
  }

  // Agar Admin se Hide hai - Coming Soon dikhao - Quiet Luxury style
  if (!live) {
    return (
      <main className="bg-black text-white min-h-screen pt-28 pb-16 flex items-center justify-center px-4">
        <div className="max-w-xl mx-auto text-center space-y-5">
          <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase">Krossford</p>
          <h1 className="text-4xl md:text-5xl tracking-wide" style={{ fontFamily: "var(--font-brand)" }}>ANNOUNCEMENTS — COMING SOON</h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">Our announcements will open soon. No noise, just important updates — new launches, sales and delivery news.</p>
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
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-wide text-center">ANNOUNCEMENTS</h1>
        <p className="text-zinc-400 text-sm text-center mt-3">Latest news, sales and updates from Krossford.</p>
        <div className="mt-10 space-y-6">
          {posts.map((p) => (
            <div key={p.title} className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
              <div className="flex items-center gap-3"><span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-1">{p.tag}</span><span className="text-zinc-500 text-xs">{p.date}</span></div>
              <h2 className="font-bold tracking-wide mt-3">{p.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">{p.desc}</p>
              <Link href={p.link} className="text-[#D4AF37] text-sm font-bold mt-3 inline-block">{p.btn}</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
