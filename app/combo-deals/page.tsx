"use client";
import { useState } from "react";
import Link from "next/link";
import { readCartItems, saveCart } from "@/lib/cart";

export const dynamic = "force-dynamic";

type Combo = {
  id: string;
  title: string;
  items: string;
  oldPrice: number;
  price: number;
  save: number;
  image: string;
  tag: string;
  desc: string;
};

const COMBOS: Combo[] = [
  {
    id: "combo-messenger-wallet",
    title: "Messenger + Wallet Combo",
    items: "Crossbody Messenger Bag - Jet Black + RFID Wallet",
    oldPrice: 188,
    price: 159,
    save: 29,
    image: "/images/wallet.jpg",
    tag: "BEST SELLER",
    desc: "Roz ke use ke liye best combo - Bag + Wallet ek saath, alag lene se sasta.",
  },
  {
    id: "combo-travel",
    title: "Travel Combo",
    items: "Duffle Bag + Passport Holder",
    oldPrice: 219,
    price: 189,
    save: 30,
    image: "/images/wallet.jpg",
    tag: "TRAVEL",
    desc: "Travel ke liye poora set - Duffle + Passport Holder, ek saath sasta parega.",
  },
  {
    id: "combo-daily",
    title: "Daily Use Combo",
    items: "Tote Bag + Card Holder",
    oldPrice: 159,
    price: 129,
    save: 30,
    image: "/images/wallet.jpg",
    tag: "DAILY USE",
    desc: "Daily use ke liye halka set - Tote + Card Holder, dono ek saath.",
  },
];

export default function ComboDealsPage() {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAddCombo = (combo: Combo) => {
    const existingCart = readCartItems<Record<string, unknown>>();
    existingCart.push({
      id: `${combo.id}-${Date.now()}`,
      slug: combo.id,
      name: combo.title,
      price: combo.price,
      image: combo.image,
      quantity: 1,
      colorName: "Jet Black",
      customerType: "B2C",
      additionalOption: combo.items,
      customText: "",
      uploadedFileName: "",
    });
    saveCart(existingCart);
    setAddedId(combo.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-[#D4AF37] text-black text-center text-xs font-black uppercase tracking-widest py-2 px-4">
        Combo Deals - Alag Lene Se Sasta - Limited Time Offer
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-brand)" }}>Combo Deals</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">2 Products Ek Saath - Alag Lene Se Sasta - Handcrafted - Real Leather</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {COMBOS.map((c) => (
          <div key={c.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-[#D4AF37]">
            <div className="relative h-64 bg-zinc-900 overflow-hidden">
              <img src={c.image} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 uppercase">{c.tag}</span>
              <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1">Save ${c.save}</span>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-sm font-semibold uppercase">{c.title}</h3>
              <p className="text-xs text-zinc-400">{c.items}</p>
              <p className="text-xs text-zinc-400 line-clamp-2">{c.desc}</p>
              <p className="text-sm">
                <span className="text-zinc-500 line-through mr-2">${c.oldPrice}</span>
                <span className="text-[#D4AF37] font-bold">${c.price}</span>
              </p>
              <p className="text-xs text-zinc-400">Estimated Total: 12-17 Working Days - DHL Express - Pakistan Delivery FREE</p>
              <button
                onClick={() => handleAddCombo(c)}
                className={`w-full block text-center text-xs font-bold uppercase py-3 rounded cursor-pointer ${addedId === c.id ? "bg-green-500 text-white" : "bg-[#D4AF37] hover:bg-[#E8C15A] text-black"}`}
              >
                {addedId === c.id ? "✓ Added!" : "Add Combo To Cart →"}
              </button>
              <Link href="/shop" className="block text-center text-xs text-zinc-400 hover:text-[#D4AF37] uppercase tracking-widest">View All Products →</Link>
            </div>
          </div>
        ))}
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 text-center">
        <Link href="/shop" className="inline-block bg-zinc-900 border border-zinc-700 text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:border-[#D4AF37]">Back To Shop →</Link>
      </div>
    </main>
  );
}