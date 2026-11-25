"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// COMBO DEALS - FINAL - ADMIN SE CHALEGA
// RULE: Admin se Deal aaye to wahi dikhegi, warna neeche wali 3 purani Deals (fallback) dikhengi.
// Admin Combo page se tum Deal banao gi - jis product ki inventory zyada hogi usko Deal me lagao gi.
// Combo Price LOCKED (fallback): $169 / $189 / $129 - Old Price = 2 Singles ka total: $178 / $228 / $158 - Save khud banega
const combosFallback = [
  { tag: "BEST SELLER", title: "Messenger + Wallet Combo", desc: "Crossbody Messenger Bag - Jet Black + RFID Wallet", detail: "The perfect everyday combo - Bag + Wallet together, better value than buying separately.", oldPrice: 178, price: 169, image: "/images/messenger-bag.jpg", alt: "Messenger and Wallet Combo" },
  { tag: "TRAVEL", title: "Travel Combo", desc: "Duffle Bag + Passport Holder", detail: "A complete travel set - Duffle + Passport Holder, better value together.", oldPrice: 228, price: 189, image: "/images/leather-duffle-bag.jpg", alt: "Travel Combo" },
  { tag: "DAILY USE", title: "Daily Use Combo", desc: "Tote Bag + Card Holder", detail: "A lightweight daily set - Tote + Card Holder, both essentials in one deal.", oldPrice: 158, price: 129, image: "/images/tote-bag.jpg", alt: "Daily Use Combo" },
];

export default function ComboDealsPage() {
  const [live, setLive] = useState<boolean | null>(true);
  const [adminCombos, setAdminCombos] = useState<any[]>([]);
  useEffect(() => {
    async function load() {
      try {
        const ctrl = new AbortController();
        const t = setTimeout(() => ctrl.abort(), 3000);
        const res = await fetch("/api/site-settings", { cache: "no-store", signal: ctrl.signal });
        clearTimeout(t);
        if (!res.ok) return;
        const data = await res.json().catch(() => ({}));
        if (data && "combo_live" in data) setLive(data.combo_live === true || data.combo_live === "true");
      } catch {}
    }
    load();
  }, []);
  // ADMIN COMBOS - Admin se bani Deal aaye to wahi dikhegi, warna fallback
  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    fetch("/api/combo-deals", { cache: "no-store", signal: ctrl.signal }).then(r => r.json()).then(j => {
      const list = (j.combos || j.deals || []).filter((c: any) => c.is_active !== false && c.title && c.price !== undefined);
      if (list.length > 0) setAdminCombos(list);
    }).catch(() => {}).finally(() => clearTimeout(t));
    return () => { clearTimeout(t); ctrl.abort(); };
  }, []);
  const combos = adminCombos.length > 0 ? adminCombos.map((c: any) => ({ tag: c.tag || "COMBO", title: c.title, desc: c.desc || c.description || "", detail: c.detail || "", oldPrice: Number(c.oldPrice ?? c.old_price ?? 0), price: Number(c.price || 0), image: c.image || "/images/messenger-bag.jpg", alt: c.alt || c.title })) : combosFallback;
  if (live === null) return null;
  if (!live) {
    return (
      <main className="bg-zinc-950 text-white min-h-screen pb-16 flex items-center justify-center px-3 min-[400px]:px-4 w-full min-w-0 overflow-x-hidden">
        <div className="max-w-xl mx-auto text-center space-y-5 w-full min-w-0">
          <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase">Krossford</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wide break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>COMBO DEALS — COMING SOON</h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">Our combo deals will open soon. Hand Stitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>
          <div className="flex flex-col min-[420px]:flex-row justify-center gap-3 pt-2"><Link href="/shop" className="bg-[#E8C15A] text-black text-xs font-bold tracking-widest px-6 py-3 rounded hover:bg-[#D4AF37] text-center border-2 border-[#E8C15A]">SHOP RETAIL →</Link><Link href="/b2b" className="border-2 border-zinc-400 text-white text-xs font-bold tracking-widest px-6 py-3 rounded hover:border-[#D4AF37] text-center">B2B WHOLESALE →</Link></div>
        </div>
      </main>
    );
  }
  return (
    <main className="bg-zinc-950 text-white min-h-screen pb-16 w-full min-w-0 overflow-x-hidden">
      <div className="bg-[#D4AF37] text-black text-center text-xs font-bold tracking-widest py-2 px-4 break-words">COMBO DEALS - SAVE MORE TOGETHER - LIMITED TIME OFFER</div>
      <div className="max-w-7xl mx-auto px-4 mt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide break-words">COMBO DEALS</h1>
        <p className="text-zinc-400 text-sm mt-3 tracking-wider">BUY 2 PRODUCTS TOGETHER - BETTER VALUE THAN BUYING SEPARATELY - HANDCRAFTED - REAL LEATHER</p>
        <p className="text-zinc-500 text-[11px] mt-2 tracking-wider">Hand Stitched • Customized / On Demand • Handcrafted To Order • Estimated Total: 12-17 Working Days</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
        {combos.map((c) => (
          <div key={c.title} className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
            <div className="relative bg-[#F5EFE0] aspect-[4/3] overflow-hidden">
              <img src={c.image} alt={c.alt} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1">{c.tag}</span>
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1">Save ${c.oldPrice - c.price}</span>
            </div>
            <div className="bg-zinc-950 text-white p-5">
              <h2 className="font-bold tracking-wide">{c.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">{c.desc}</p>
              <p className="text-zinc-400 text-sm mt-2">{c.detail}</p>
              <p className="mt-4"><span className="text-zinc-500 line-through mr-2">${c.oldPrice}</span><span className="text-[#D4AF37] font-bold text-lg">${c.price}</span></p>
              <Link href="/shop" className="mt-4 inline-block bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 rounded">SHOP COMBO →</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-5">
          <h2 className="text-center text-sm font-bold tracking-widest text-[#D4AF37]">1 PIECE vs 2 PIECE COMBO — KITNA FAIDA?</h2>
          <p className="text-center text-xs text-zinc-400 mt-2">Alag-alag lo to zyada, Combo me lo to sasta — neeche table me dekh lo.</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead><tr className="text-zinc-400 border-b border-zinc-800"><th className="py-2 pr-3">Combo</th><th className="py-2 pr-3">1 + 1 Alag (Old)</th><th className="py-2 pr-3">Combo Price</th><th className="py-2">You Save</th></tr></thead>
              <tbody>{combos.map((c) => (<tr key={c.title} className="border-b border-zinc-800 last:border-0"><td className="py-3 pr-3 font-bold text-white">{c.title}</td><td className="py-3 pr-3 text-zinc-400 line-through">${c.oldPrice}</td><td className="py-3 pr-3 text-[#D4AF37] font-bold">${c.price}</td><td className="py-3 text-green-400 font-bold">Save ${c.oldPrice - c.price}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
