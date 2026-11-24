"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { setItems([]); }
    }
  }, []);

  const removeItem = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    localStorage.setItem("wishlist", JSON.stringify(next));
  };

  const clearAll = () => {
    setItems([]);
    localStorage.setItem("wishlist", JSON.stringify([]));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 px-3 min-[400px]:px-4 sm:px-6 text-center w-full min-w-0 overflow-x-hidden">
        <div className="max-w-xl mx-auto w-full min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 break-words leading-snug">Your Wishlist is Empty</h1>
          <p className="text-zinc-400 mt-2 text-sm break-words leading-relaxed">You have not saved any products yet. Handstitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>
          <Link href="/shop" className="inline-block mt-6 bg-[#E8C15A] text-black px-6 py-3.5 rounded font-bold border-2 border-[#E8C15A] hover:bg-[#D4AF37] text-sm">
            Go To Shop →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 px-3 min-[400px]:px-4 sm:px-6 w-full min-w-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 min-w-0">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 break-words leading-snug">My Wishlist ({items.length})</h1>
            <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2 break-words">Handstitched • Customized / On Demand • Handcrafted • Real Leather</p>
          </div>
          <button onClick={clearAll} className="text-xs font-bold uppercase tracking-wider text-zinc-400 border border-zinc-800 rounded px-4 py-2.5 hover:border-red-400 hover:text-red-400 transition-colors">Clear All</button>
        </div>
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 w-full min-w-0">
          {items.map((item: any, i: number) => {
            const img = item.image || item.img || item.imageUrl || item.photo || "";
            const href = `/product/${item.slug || item.id}`;
            return (
            <div key={`${item.slug || item.id || item.name || item.title}-${i}`} className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden w-full min-w-0 flex flex-col">
              {img ? (
                <Link href={href} className="block aspect-[4/3] bg-zinc-950 overflow-hidden">
                  <img src={img} alt={item.name || item.title || "Wishlist product"} className="w-full h-full object-cover" />
                </Link>
              ) : (
                <Link href={href} className="flex items-center justify-center aspect-[4/3] bg-zinc-950 text-4xl">🧥</Link>
              )}
              <div className="p-4 w-full min-w-0 flex flex-col flex-1">
                <p className="font-bold break-words leading-snug">{item.name || item.title}</p>
                <p className="text-amber-400 text-sm mt-1 break-words">${item.price}</p>
                <div className="flex gap-2 mt-3 min-w-0">
                  <Link href={href} className="flex-1 min-w-0 text-center bg-[#E8C15A] text-black text-xs font-bold px-3 py-2.5 rounded border-2 border-[#E8C15A] hover:bg-[#D4AF37]">
                    View Product →
                  </Link>
                  <button onClick={() => removeItem(i)} className="shrink-0 text-xs font-bold px-3 py-2.5 rounded border border-zinc-700 text-zinc-300 hover:border-red-400 hover:text-red-400 transition-colors">✕ Remove</button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
