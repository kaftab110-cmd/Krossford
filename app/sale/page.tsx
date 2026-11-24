"use client";
import Link from "next/link";

const items = [
  { off: "20% OFF", cat: "BAGS", title: "Crossbody Messenger Bag - Jet Black", desc: "Best seller bag - now at sale price.", old: "$149", price: "$119", image: "/images/wallet.jpg", alt: "Crossbody Messenger Bag" },
  { off: "22% OFF", cat: "WALLETS", title: "RFID Wallet", desc: "RFID safe wallet - for daily use.", old: "$89", price: "$69", image: "/images/wallet.jpg", alt: "RFID Wallet" },
  { off: "22% OFF", cat: "FOR HIM", title: "Leather Vest", desc: "Premium leather vest - limited stock.", old: "$179", price: "$139", image: "/images/wallet.jpg", alt: "Leather Vest" },
];

export default function SalePage() {
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
