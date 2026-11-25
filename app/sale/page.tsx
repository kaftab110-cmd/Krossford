"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// SALE - FINAL - ADMIN SE CHALEGA
// RULE: Admin se Sale Item aaye to wahi dikhega, warna neeche wali 3 purani Items (fallback) dikhengi.
// Biker / Wallet wali price PENDING hai - tumhare bataye baghair change NAHI kiya.
// Biker: Sale old $179 / sale $139 - Shop $219 | Wallet: Sale old $89 / sale $69 - Shop $49
// Duffle $189 LOCKED: old 189, discount 0, sale $189 - koi 0% badge nahi
const itemsFallback = [
  { cat: "BAGS", title: "Leather Duffle Bag - Jet Black", desc: "Best seller bag - now at sale price.", old: 189, discount: 0, image: "/images/leather-duffle-bag.jpg", alt: "Leather Duffle Bag" },
  { cat: "WALLETS", title: "RFID Wallet", desc: "RFID safe wallet - for daily use.", old: 89, discount: 22, image: "/images/wallet.jpg", alt: "RFID Wallet" },
  { cat: "FOR HIM", title: "Biker Jacket", desc: "Premium leather biker jacket - limited stock.", old: 179, discount: 22, image: "/images/biker-jacket.jpg", alt: "Biker Jacket" },
];
export default function SalePage() {
  const [live, setLive] = useState<boolean | null>(true);
  const [adminItems, setAdminItems] = useState<any[]>([]);
  useEffect(() => {
    async function load() {
      try { const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 3000); const res = await fetch("/api/site-settings", { cache: "no-store", signal: ctrl.signal }); clearTimeout(t); if (!res.ok) return; const data = await res.json().catch(() => ({})); if (data && "sale_live" in data) setLive(data.sale_live === true || data.sale_live === "true"); }
      catch {}
    }
    load();
  }, []);
  // ADMIN SALE - Admin se Item aaye to wahi dikhega, warna fallback
  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    fetch("/api/sale-deals", { cache: "no-store", signal: ctrl.signal }).then(r => r.json()).then(j => {
      const list = (j.items || j.deals || j.sale || []).filter((c: any) => c.is_active !== false && c.title && c.old !== undefined);
      if (list.length > 0) setAdminItems(list);
    }).catch(() => {}).finally(() => clearTimeout(t));
    return () => { clearTimeout(t); ctrl.abort(); };
  }, []);
  const items = adminItems.length > 0 ? adminItems.map((c: any) => ({ cat: c.cat || c.category || "SALE", title: c.title, desc: c.desc || c.description || "", old: Number(c.old ?? c.old_price ?? 0), discount: Number(c.discount ?? 0), image: c.image || "/images/leather-duffle-bag.jpg", alt: c.alt || c.title })) : itemsFallback;
  if (live === null) return null;
  if (!live) {
    return (
      <main className="bg-black text-white min-h-screen pb-16 flex items-center justify-center px-3 min-[400px]:px-4 w-full min-w-0 overflow-x-hidden">
        <div className="max-w-xl mx-auto text-center space-y-5 w-full min-w-0">
          <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase">Krossford</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wide break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>SALE — COMING SOON</h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">Our private sale will open soon. Handcrafted leather, limited pieces, quiet luxury — no noise, just craft. Hand Stitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>
          <div className="flex flex-col min-[420px]:flex-row justify-center gap-3 pt-2"><Link href="/shop" className="bg-[#E8C15A] text-black text-xs font-bold tracking-widest px-6 py-3 rounded hover:bg-[#D4AF37] text-center border-2 border-[#E8C15A]">SHOP RETAIL →</Link><Link href="/b2b" className="border-2 border-zinc-400 text-white text-xs font-bold tracking-widest px-6 py-3 rounded hover:border-[#D4AF37] text-center">B2B WHOLESALE →</Link></div>
        </div>
      </main>
    );
  }
  return (
    <main className="bg-black text-white min-h-screen pb-16 w-full min-w-0 overflow-x-hidden">
      <div className="bg-red-600 text-white text-center text-xs font-bold tracking-widest py-2.5 px-3 break-words">SALE IS ON - LIMITED TIME - ORDER BEFORE STOCK RUNS OUT</div>
      <div className="max-w-7xl mx-auto px-3 min-[400px]:px-4 mt-8 sm:mt-10 text-center w-full min-w-0"><h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide break-words leading-snug">SALE - DISCOUNT DEALS</h1><p className="text-zinc-400 text-xs sm:text-sm mt-3 tracking-wider break-words">OLD PRICE CROSSED OUT - NEW PRICE IN GOLD - HAND STITCHED • CUSTOMIZED / ON DEMAND - HANDCRAFTED - REAL LEATHER</p><p className="text-zinc-500 text-[11px] mt-2 tracking-wider">Handcrafted To Order • Estimated Total: 12-17 Working Days • Full Tracking Provided</p></div>
      <div className="max-w-7xl mx-auto px-3 min-[400px]:px-4 mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full min-w-0">
        {items.map((it) => (
          <div key={it.title} className="bg-white text-black rounded-lg overflow-hidden shadow-xl w-full min-w-0">
            <div className="relative bg-[#F5EFE0] aspect-[4/3] overflow-hidden"><img src={it.image} alt={it.alt} className="w-full h-full object-cover" />{it.discount > 0 && (<span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1">{it.discount}% OFF</span>)}</div>
            <div className="bg-zinc-950 text-white p-4 sm:p-5 min-w-0"><p className="text-[#D4AF37] text-xs tracking-widest">{it.cat}</p><h2 className="font-bold tracking-wide mt-1 break-words leading-snug">{it.title}</h2><p className="text-zinc-400 text-sm mt-2 break-words">Hand Stitched • Customized / On Demand. {it.desc}</p><p className="mt-4"><span className="text-zinc-500 line-through mr-2">${it.old}</span><span className="text-[#D4AF37] font-bold text-lg">${Math.round(it.old * (1 - it.discount / 100))}</span></p>{it.discount > 40 && (<p className="mt-2 bg-red-600 text-white text-[11px] font-bold tracking-wider px-2 py-1.5 rounded">⚠ WARNING: Discount 40% se zyada hai — price dobara check karo, save mat karo.</p>)}<Link href="/shop" className="mt-4 inline-block bg-[#E8C15A] text-black text-xs font-bold px-4 py-2.5 rounded border-2 border-[#E8C15A] hover:bg-[#D4AF37]">SHOP SALE →</Link></div>
          </div>
        ))}
      </div>
    </main>
  );
}
