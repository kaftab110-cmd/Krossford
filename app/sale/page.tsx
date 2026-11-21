"use client";
import { useState } from "react";
import Link from "next/link";
import { readCartItems, saveCart } from "@/lib/cart";

export const dynamic = "force-dynamic";

type SaleItem = {
  id: string;
  name: string;
  category: string;
  oldPrice: number;
  price: number;
  off: string;
  image: string;
  desc: string;
};

const SALE_ITEMS: SaleItem[] = [
  {
    id: "sale-messenger",
    name: "Crossbody Messenger Bag - Jet Black",
    category: "Bags",
    oldPrice: 149,
    price: 119,
    off: "20% OFF",
    image: "/images/wallet.jpg",
    desc: "Best seller bag - ab sale price pe.",
  },
  {
    id: "sale-wallet",
    name: "RFID Wallet",
    category: "Wallets",
    oldPrice: 89,
    price: 69,
    off: "22% OFF",
    image: "/images/wallet.jpg",
    desc: "RFID safe wallet - daily use ke liye.",
  },
  {
    id: "sale-vest",
    name: "Leather Vest",
    category: "For Him",
    oldPrice: 179,
    price: 139,
    off: "22% OFF",
    image: "/images/wallet.jpg",
    desc: "Premium leather vest - limited stock.",
  },
];

export default function SalePage() {
  const [addedId, setAddedId] = useState<string | null>(null);

  const handleAdd = (p: SaleItem) => {
    const existingCart = readCartItems<Record<string, unknown>>();
    existingCart.push({
      id: `${p.id}-${Date.now()}`,
      slug: p.id,
      name: p.name,
      price: p.price,
      image: p.image,
      quantity: 1,
      colorName: "Jet Black",
      customerType: "B2C",
      additionalOption: "none",
      customText: "",
      uploadedFileName: "",
    });
    saveCart(existingCart);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="bg-red-600 text-white text-center text-xs font-black uppercase tracking-widest py-2 px-4">
        Sale Is On - Limited Time - Stock Khatam Hone Se Pehle Order Karo
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-brand)" }}>Sale - Discount Deals</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">Purani Price Kati Hui - Nayi Price Gold Me - Handcrafted - Real Leather</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SALE_ITEMS.map((p) => (
          <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-[#D4AF37]">
            <div className="relative h-64 bg-zinc-900 overflow-hidden">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase">{p.off}</span>
            </div>
            <div className="p-5 space-y-3">
              <span className="text-xs text-[#D4AF37] uppercase tracking-widest">{p.category}</span>
              <h3 className="text-sm font-semibold uppercase">{p.name}</h3>
              <p className="text-xs text-zinc-400">{p.desc}</p>
              <p className="text-sm">
                <span className="text-zinc-500 line-through mr-2">${p.oldPrice}</span>
                <span className="text-[#D4AF37] font-bold">${p.price}</span>
              </p>
              <p className="text-xs text-zinc-400">Estimated Total: 12-17 Working Days - DHL Express - Pakistan Delivery FREE</p>
              <button
                onClick={() => handleAdd(p)}
                className={`w-full block text-center text-xs font-bold uppercase py-3 rounded cursor-pointer ${addedId === p.id ? "bg-green-500 text-white" : "bg-[#D4AF37] hover:bg-[#E8C15A] text-black"}`}
              >
                {addedId === p.id ? "✓ Added!" : "Add To Cart →"}
              </button>
            </div>
          </div>
        ))}
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 text-center flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/combo-deals" className="inline-block bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full">View Combo Deals →</Link>
        <Link href="/shop" className="inline-block bg-zinc-900 border border-zinc-700 text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:border-[#D4AF37]">Back To Shop →</Link>
      </div>
    </main>
  );
}