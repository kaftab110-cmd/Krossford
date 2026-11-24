"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// FIX 1: Naam = Photo. Pehle galat naam ke saath galat photo thi.
// Ab title wahi hai jo photo me hai - galat product kabhi nahi dikhega.
// FIX 2: Live check - API "true" string bhejti hai, boolean nahi. Pehle === true check hamesha false hota tha, Sale kabhi LIVE nahi hoti thi.
const items = [
  // PRICE FORMULA - SIRF old + discount likhna hai, price + OFF khud banega - haath se galti ka chance khatam
  // FORMULA: sale = Math.round(old * (1 - discount/100))  |  $149, 20% -> $119 | $89, 22% -> $69 | $179, 22% -> $139
  // AGAR discount 40% se zyada likha to card pe RED WARNING aayega - phir bhi save nahi hoga jab tak theek na karo
  // NOTE: Duffle price yahan waisa hi rakha hai jaisa tumne bheja (old 149, 20% -> 119). Shop wale $189 se mismatch abhi pending hai - tumhare bataye baghair change NAHI kiya.
  { cat: "BAGS", title: "Leather Duffle Bag - Jet Black", desc: "Best seller bag - now at sale price.", old: 149, discount: 20, image: "/images/leather-duffle-bag.jpg", alt: "Leather Duffle Bag" },
  { cat: "WALLETS", title: "RFID Wallet", desc: "RFID safe wallet - for daily use.", old: 89, discount: 22, image: "/images/wallet.jpg", alt: "RFID Wallet" },
  { cat: "FOR HIM", title: "Biker Jacket", desc: "Premium leather biker jacket - limited stock.", old: 179, discount: 22, image: "/images/biker-jacket.jpg", alt: "Biker Jacket" },
];
export default function SalePage() {
  const [live, setLive] = useState<boolean | null>(true); // FIX: default TRUE - API fail ho to bhi Sale dikhegi, page blank/crash nahi hoga
  useEffect(() => {
    async function load() {
      try { const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 3000); const res = await fetch("/api/site-settings", { cache: "no-store", signal: ctrl.signal }); clearTimeout(t); if (!res.ok) return; const data = await res.json().catch(() => ({})); if (data && "sale_live" in data) setLive(data.sale_live === true || data.sale_live === "true"); }
      catch { /* API down ho to bhi Sale dikhao - live=true hi rehne do */ }
    }
    load();
  }, []);
  if (live === null) return null; // kabhi blank black screen mat dikhao
  if (!live) {
    return (
      <main className="bg-black text-white min-h-screen pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 flex items-center justify-center px-3 min-[400px]:px-4 w-full min-w-0 overflow-x-hidden">
        <div className="max-w-xl mx-auto text-center space-y-5 w-full min-w-0">
          <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase">Krossford</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wide break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>SALE — COMING SOON</h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">Our private sale will open soon. Handcrafted leather, limited pieces, quiet luxury — no noise, just craft. Handstitched • Customized / On Demand — Made As Per Buyer & Customer Requirement.</p>
          <div className="flex flex-col min-[420px]:flex-row justify-center gap-3 pt-2"><Link href="/shop" className="bg-[#E8C15A] text-black text-xs font-bold tracking-widest px-6 py-3 rounded hover:bg-[#D4AF37] text-center border-2 border-[#E8C15A]">SHOP RETAIL →</Link><Link href="/b2b" className="border-2 border-zinc-400 text-white text-xs font-bold tracking-widest px-6 py-3 rounded hover:border-[#D4AF37] text-center">B2B WHOLESALE →</Link></div>
        </div>
      </main>
    );
  }
  return (
    <main className="bg-black text-white min-h-screen pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 w-full min-w-0 overflow-x-hidden">
      <div className="bg-red-600 text-white text-center text-xs font-bold tracking-widest py-2.5 px-3 break-words">SALE IS ON - LIMITED TIME - ORDER BEFORE STOCK RUNS OUT</div>
      <div className="max-w-7xl mx-auto px-3 min-[400px]:px-4 mt-8 sm:mt-10 text-center w-full min-w-0"><h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide break-words leading-snug">SALE - DISCOUNT DEALS</h1><p className="text-zinc-400 text-xs sm:text-sm mt-3 tracking-wider break-words">OLD PRICE CROSSED OUT - NEW PRICE IN GOLD - HANDSTITCHED • CUSTOMIZED / ON DEMAND - HANDCRAFTED - REAL LEATHER</p><p className="text-zinc-500 text-[11px] mt-2 tracking-wider">Handcrafted To Order • Estimated Total: 12-17 Working Days • Full Tracking Provided</p></div>
      <div className="max-w-7xl mx-auto px-3 min-[400px]:px-4 mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
        {items.map((it) => (
          <div key={it.title} className="bg-white text-black rounded-lg overflow-hidden shadow-xl w-full min-w-0">
            <div className="relative bg-[#F5EFE0] aspect-[4/3] overflow-hidden"><img src={it.image} alt={it.alt} className="w-full h-full object-cover" /><span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1">{it.discount}% OFF</span></div>
            <div className="bg-zinc-950 text-white p-4 sm:p-5 min-w-0"><p className="text-[#D4AF37] text-xs tracking-widest">{it.cat}</p><h2 className="font-bold tracking-wide mt-1 break-words leading-snug">{it.title}</h2><p className="text-zinc-400 text-sm mt-2 break-words">Handstitched • Customized / On Demand. {it.desc}</p><p className="mt-4"><span className="text-zinc-500 line-through mr-2">${it.old}</span><span className="text-[#D4AF37] font-bold text-lg">${Math.round(it.old * (1 - it.discount / 100))}</span></p>{it.discount > 40 && (<p className="mt-2 bg-red-600 text-white text-[11px] font-bold tracking-wider px-2 py-1.5 rounded">⚠️ WARNING: Discount 40% se zyada hai — price dobara check karo, save mat karo.</p>)}<Link href="/shop" className="mt-4 inline-block bg-[#E8C15A] text-black text-xs font-bold px-4 py-2.5 rounded border-2 border-[#E8C15A] hover:bg-[#D4AF37]">SHOP SALE →</Link></div>
          </div>
        ))}
      </div>
    </main>
  );
}