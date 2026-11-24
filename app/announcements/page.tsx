"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// FIX 1: Live check - API "true" string bhejti hai. Pehle === true hamesha false hota tha, Announcements kabhi LIVE nahi hoti thi.
// FIX 2: Naam sync - Sale page wala naam yahan bhi wahi hai.
// SIMPLE RULE: No % OFF, no product discount claim, no free-delivery claim here - discount etc Admin Panel se set hoga.
const posts = [
  { tag: "SALE", date: "November 2026", title: "SALE IS ON", desc: "Check Sale page for live deals. Prices and discounts are set from Admin Panel.", link: "/sale", btn: "VIEW SALE →" },
  { tag: "COMBO", date: "November 2026", title: "COMBO DEALS ARE LIVE", desc: "Buy products together and save more than buying separately. Check Combo Deals page.", link: "/combo-deals", btn: "VIEW COMBOS →" },
  { tag: "DELIVERY", date: "November 2026", title: "DELIVERY UPDATE", desc: "Delivery details will be confirmed after order confirmation.", link: "/shop", btn: "SHOP NOW →" },
  { tag: "NEW", date: "November 2026", title: "NEW PRODUCTS COMING SOON", desc: "New wallets, bags and jackets are coming soon. Follow Announcements for the launch.", link: "/shop", btn: "SHOP NOW →" },
];
export default function AnnouncementsPage() {
  const [live, setLive] = useState<boolean | null>(null);
  useEffect(() => {
    async function load() {
      try { const res = await fetch("/api/site-settings", { cache: "no-store" }); const data = await res.json(); setLive(data.announcements_live === true || data.announcements_live === "true"); }
      catch { setLive(false); }
    }
    load();
  }, []);
  if (live === null) return <main className="bg-black text-white min-h-screen" />;
  if (!live) {
    return (
      <main className="bg-black text-white min-h-screen pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 flex items-center justify-center px-3 min-[400px]:px-4 w-full min-w-0 overflow-x-hidden">
        <div className="max-w-xl mx-auto text-center space-y-5 w-full min-w-0">
          <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase">Krossford</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wide break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>ANNOUNCEMENTS — COMING SOON</h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed break-words">Our announcements will open soon. No noise, just important updates — new launches, sales and delivery news. Handstitched • Customized / On Demand — Made As Per Buyer & Customer Requirement.</p>
          <div className="flex flex-col min-[420px]:flex-row justify-center gap-3 pt-2"><Link href="/shop" className="bg-[#E8C15A] text-black text-xs font-bold tracking-widest px-6 py-3 rounded hover:bg-[#D4AF37] text-center border-2 border-[#E8C15A]">SHOP RETAIL →</Link><Link href="/b2b" className="border-2 border-zinc-400 text-white text-xs font-bold tracking-widest px-6 py-3 rounded hover:border-[#D4AF37] text-center">B2B WHOLESALE →</Link></div>
        </div>
      </main>
    );
  }
  return (
    <main className="bg-black text-white min-h-screen pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 w-full min-w-0 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-3 min-[400px]:px-4 w-full min-w-0"><h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center break-words leading-snug">ANNOUNCEMENTS</h1><p className="text-zinc-400 text-xs sm:text-sm text-center mt-3 break-words">Latest news, sales and updates from Krossford. Handstitched • Customized / On Demand • Handcrafted To Order.</p>
        <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-6 w-full min-w-0">{posts.map((p) => (<div key={p.title} className="border border-zinc-800 rounded-lg p-4 sm:p-6 bg-zinc-950 w-full min-w-0 overflow-hidden"><div className="flex items-center gap-2 sm:gap-3 flex-wrap"><span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 shrink-0">{p.tag}</span><span className="text-zinc-500 text-xs break-words">{p.date}</span></div><h2 className="font-bold tracking-wide mt-3 break-words leading-snug">{p.title}</h2><p className="text-zinc-400 text-sm mt-2 break-words leading-relaxed">{p.desc}</p><Link href={p.link} className="mt-4 inline-block bg-[#E8C15A] text-black text-xs font-bold px-4 py-2.5 rounded border-2 border-[#E8C15A] hover:bg-[#D4AF37]">{p.btn}</Link></div>))}</div>
      </div>
    </main>
  );
}