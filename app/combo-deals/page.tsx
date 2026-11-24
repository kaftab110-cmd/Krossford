"use client";
import Link from "next/link";
import { findProductBySlug } from "@/lib/data/shop";

// PROFESSIONAL RULE - Google / bade brands jaisa:
// Old Price HAATH SE NAHI likha jayega - Shop wali ASLI prices se AUTO banega.
// Combo = Product 1 + Product 2 (slug se). Old = dono ki Shop price ka jor. Save = Old - Combo Price (khud banega).
// Agar kal Shop me kisi product ki price badli to Combo ka Old + Save khud badal jayega - haath se theek karne ki zaroorat nahi.
// Combo Price (169 / 189 / 129) tumhara set kiya hua hai - isko haath nahi lagaya, sirf Old + Save AUTO kiya hai.
// FINAL: Ye wali file use karni hai - Admin API wali file use NAHI karni. Upar 1 vs 2 wali table hai taake customer ko 2 lena behtar lage.
const combos = [
  {
    tag: "BEST SELLER",
    title: "Messenger + Wallet Combo",
    desc: "Leather Messenger Bag + Minimalist RFID Wallet",
    detail: "The perfect everyday combo - Bag + Wallet together, better value than buying separately.",
    slugs: ["leather-messenger-bag", "minimalist-rfid-wallet"],
    price: 169,
    image: "/images/messenger-bag.jpg",
    alt: "Messenger and Wallet Combo",
  },
  {
    tag: "TRAVEL",
    title: "Travel Combo",
    desc: "Travel Duffle Bag + Leather Passport Holder",
    detail: "A complete travel set - Duffle + Passport Holder, better value together.",
    slugs: ["travel-duffle-bag", "leather-passport-holder"],
    price: 189,
    image: "/images/leather-duffle-bag.jpg",
    alt: "Travel Combo",
  },
  {
    tag: "DAILY USE",
    title: "Daily Use Combo",
    desc: "Leather Tote Bag + Card Holder",
    detail: "A lightweight daily set - Tote + Card Holder, both essentials in one deal.",
    slugs: ["leather-tote-bag", "card-holder"],
    price: 129,
    image: "/images/tote-bag.jpg",
    alt: "Daily Use Combo",
  },
];

export default function ComboDealsPage() {
  return (
    <main className="bg-zinc-950 text-white min-h-screen pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 w-full min-w-0 overflow-x-hidden">
      <div className="bg-[#D4AF37] text-black text-center text-xs font-bold tracking-widest py-2 px-4 break-words">
        COMBO DEALS - SAVE MORE TOGETHER - LIMITED TIME OFFER
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide break-words">COMBO DEALS</h1>
        <p className="text-zinc-400 text-sm mt-3 tracking-wider">BUY 2 PRODUCTS TOGETHER - BETTER VALUE THAN BUYING SEPARATELY - HANDCRAFTED - REAL LEATHER</p>
        <p className="text-zinc-500 text-[11px] mt-2 tracking-wider">Handstitched • Customized / On Demand • Handcrafted To Order • Estimated Total: 12-17 Working Days</p>
      </div>
      {/* 1 PIECE vs 2 PIECES - Customer ko khud samajh aaye 2 lena behtar hai */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="border border-[#D4AF37]/30 rounded-lg bg-zinc-950 overflow-hidden">
          <div className="grid grid-cols-3 text-center text-xs font-bold tracking-widest">
            <div className="p-3 text-zinc-400"></div>
            <div className="p-3 text-zinc-300 border-x border-zinc-800">1 PIECE</div>
            <div className="p-3 text-[#D4AF37] bg-[#D4AF37]/10">2 PIECES - COMBO</div>
          </div>
          <div className="grid grid-cols-3 text-center text-sm border-t border-zinc-800">
            <div className="p-3 text-zinc-400 text-xs">Price</div>
            <div className="p-3 text-zinc-300 border-x border-zinc-800">Full Price</div>
            <div className="p-3 text-[#D4AF37] font-bold bg-[#D4AF37]/10">Lower Than 2 Singles</div>
          </div>
          <div className="grid grid-cols-3 text-center text-sm border-t border-zinc-800">
            <div className="p-3 text-zinc-400 text-xs">Value</div>
            <div className="p-3 text-zinc-300 border-x border-zinc-800">1 Product</div>
            <div className="p-3 text-[#D4AF37] font-bold bg-[#D4AF37]/10">2 Products Together</div>
          </div>
          <div className="grid grid-cols-3 text-center text-sm border-t border-zinc-800">
            <div className="p-3 text-zinc-400 text-xs">Best For</div>
            <div className="p-3 text-zinc-300 border-x border-zinc-800">Single Use</div>
            <div className="p-3 text-[#D4AF37] font-bold bg-[#D4AF37]/10">Gifting + Daily Use</div>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500 mt-3">2 products ek saath lene pe alag-alag lene se sasta parta hai — isi liye Combo behtar hai.</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
        {combos.map((c) => {
          // AUTO: Old Price = dono products ki Shop wali asli price ka jor. Save = Old - Combo Price.
          const oldPrice = c.slugs.reduce((sum, slug) => sum + Number(findProductBySlug(slug)?.price || 0), 0);
          const save = oldPrice - c.price;
          return (
          <div key={c.title} className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
            <div className="relative bg-[#F5EFE0] aspect-[4/3] overflow-hidden">
              <img src={c.image} alt={c.alt} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1">{c.tag}</span>
              {save > 0 && (<span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1">Save ${save}</span>)}
            </div>
            <div className="bg-zinc-950 text-white p-5">
              <h2 className="font-bold tracking-wide">{c.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">{c.desc}</p>
              <p className="text-zinc-400 text-sm mt-2">{c.detail}</p>
              <p className="mt-4"><span className="text-zinc-500 line-through mr-2">${oldPrice}</span><span className="text-[#D4AF37] font-bold text-lg">${c.price}</span></p>
              <Link href="/shop" className="mt-4 inline-block bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 rounded">SHOP COMBO →</Link>
            </div>
          </div>
          );
        })}
      </div>
    </main>
  );
}