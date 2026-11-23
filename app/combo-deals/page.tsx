export const dynamic = "force-dynamic";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
// FIX: Teenon combos ki ek hi Wallet photo thi - ab har combo ki photo uske products se match karegi
// Messenger+Wallet -> Messenger bag wali photo nahi hai, is liye Duffle nahi - Wallet hi rakha (combo ka 1 hissa)
// Travel -> Duffle Bag ki photo (combo ka main product)
// Daily Use -> Tote Bag ki photo (combo ka main product)
const combos = [
  { tag: "BEST SELLER", save: "Save $29", title: "Messenger + Wallet Combo", desc: "Crossbody Messenger Bag - Jet Black + RFID Wallet", detail: "The perfect everyday combo - Bag + Wallet together, cheaper than buying separately.", oldPrice: "$198", price: "$169", image: "/images/wallet.jpg", alt: "Messenger and Wallet Combo - RFID Wallet" },
  { tag: "TRAVEL", save: "Save $30", title: "Travel Combo", desc: "Duffle Bag + Passport Holder", detail: "A complete travel set - Duffle + Passport Holder, cheaper together.", oldPrice: "$219", price: "$189", image: "/images/leather-duffle-bag.jpg", alt: "Travel Combo - Leather Duffle Bag" },
  { tag: "DAILY USE", save: "Save $30", title: "Daily Use Combo", desc: "Tote Bag + Card Holder", detail: "A lightweight daily set - Tote + Card Holder, both essentials in one deal.", oldPrice: "$159", price: "$129", image: "/images/tote-bag.jpg", alt: "Daily Use Combo - Tote Bag" },
];
async function isComboLive() {
  try { const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!); const { data } = await supabase.from("site_settings").select("value").eq("key", "combo_live").single(); return data?.value === "true" || (data as any)?.value === true; }
  catch { return false; }
}
export default async function ComboDealsPage() {
  const live = await isComboLive();
  if (!live) {
    return (
      <main className="bg-black text-white min-h-screen pt-28 pb-16 flex items-center justify-center"><div className="max-w-xl mx-auto px-4 text-center"><p className="text-[#D4AF37] text-xs tracking-[0.3em]">KROSSFORD</p><h1 className="text-4xl md:text-5xl font-bold tracking-wide mt-4">COMBO DEALS</h1><p className="text-zinc-400 text-sm mt-4 leading-relaxed">Our curated combo deals are being crafted. Two products, one special price - worth the wait.</p><p className="text-zinc-500 text-xs mt-6 tracking-widest">COMING SOON - WE ARE CRAFTING SOMETHING SPECIAL</p><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><Link href="/shop" className="bg-[#D4AF37] text-black text-xs font-bold px-6 py-3 rounded">SHOP CURRENT COLLECTION →</Link><a href="mailto:hello@krossford.com?subject=Notify me - Combo Deals" className="border border-zinc-700 text-white text-xs font-bold px-6 py-3 rounded">NOTIFY ME →</a></div></div></main>
    );
  }
  return (
    <main className="bg-zinc-950 text-white min-h-screen pt-28 pb-16">
      <div className="bg-[#D4AF37] text-black text-center text-xs font-bold tracking-widest py-2 px-4">COMBO DEALS - CHEAPER TOGETHER - LIMITED TIME OFFER</div>
      <div className="max-w-7xl mx-auto px-4 mt-10 text-center"><h1 className="text-4xl md:text-5xl font-bold tracking-wide">COMBO DEALS</h1><p className="text-zinc-400 text-sm mt-3 tracking-wider">BUY 2 PRODUCTS TOGETHER - CHEAPER THAN BUYING SEPARATELY - HANDCRAFTED - REAL LEATHER</p></div>
      <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
        {combos.map((c) => (
          <div key={c.title} className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
            <div className="relative bg-[#F5EFE0] aspect-[4/3] overflow-hidden"><img src={c.image} alt={c.alt} className="w-full h-full object-cover" /><span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1">{c.tag}</span><span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1">{c.save}</span></div>
            <div className="bg-zinc-950 text-white p-5"><h2 className="font-bold tracking-wide">{c.title}</h2><p className="text-zinc-400 text-sm mt-2">{c.desc}</p><p className="text-zinc-400 text-sm mt-2">{c.detail}</p><p className="mt-4"><span className="text-zinc-500 line-through mr-2">{c.oldPrice}</span><span className="text-[#D4AF37] font-bold text-lg">{c.price}</span></p><Link href="/shop" className="mt-4 inline-block bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 rounded">SHOP COMBO →</Link></div>
          </div>
        ))}
      </div>
    </main>
  );
}
