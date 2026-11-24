"use client";
import Link from "next/link";

const combos = [
  {
    tag: "BEST SELLER",
    save: "Save $29",
    title: "Messenger + Wallet Combo",
    desc: "Crossbody Messenger Bag - Jet Black + RFID Wallet",
    detail: "The perfect everyday combo - Bag + Wallet together, cheaper than buying separately.",
    oldPrice: "$198",
    price: "$169",
    image: "/images/wallet.jpg",
    alt: "Messenger and Wallet Combo",
  },
  {
    tag: "TRAVEL",
    save: "Save $30",
    title: "Travel Combo",
    desc: "Duffle Bag + Passport Holder",
    detail: "A complete travel set - Duffle + Passport Holder, cheaper together.",
    oldPrice: "$219",
    price: "$189",
    image: "/images/wallet.jpg",
    alt: "Travel Combo",
  },
  {
    tag: "DAILY USE",
    save: "Save $30",
    title: "Daily Use Combo",
    desc: "Tote Bag + Card Holder",
    detail: "A lightweight daily set - Tote + Card Holder, both essentials in one deal.",
    oldPrice: "$159",
    price: "$129",
    image: "/images/wallet.jpg",
    alt: "Daily Use Combo",
  },
];

export default function ComboDealsPage() {
  return (
    <main className="bg-zinc-950 text-white min-h-screen pt-28 pb-16">
      <div className="bg-[#D4AF37] text-black text-center text-xs font-bold tracking-widest py-2 px-4">
        COMBO DEALS - CHEAPER TOGETHER - LIMITED TIME OFFER
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">COMBO DEALS</h1>
        <p className="text-zinc-400 text-sm mt-3 tracking-wider">BUY 2 PRODUCTS TOGETHER - CHEAPER THAN BUYING SEPARATELY - HANDCRAFTED - REAL LEATHER</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
        {combos.map((c) => (
          <div key={c.title} className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
            <div className="relative bg-[#F5EFE0] aspect-[4/3] overflow-hidden">
              <img src={c.image} alt={c.alt} className="w-full h-full object-cover" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1">{c.tag}</span>
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-2 py-1">{c.save}</span>
            </div>
            <div className="bg-zinc-950 text-white p-5">
              <h2 className="font-bold tracking-wide">{c.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">{c.desc}</p>
              <p className="text-zinc-400 text-sm mt-2">{c.detail}</p>
              <p className="mt-4"><span className="text-zinc-500 line-through mr-2">{c.oldPrice}</span><span className="text-[#D4AF37] font-bold text-lg">{c.price}</span></p>
              <Link href="/shop" className="mt-4 inline-block bg-[#D4AF37] text-black text-xs font-bold px-4 py-2 rounded">SHOP COMBO →</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
