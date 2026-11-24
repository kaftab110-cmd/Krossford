"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) setItems(JSON.parse(saved));
  }, []);

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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-amber-400 break-words leading-snug">My Wishlist ({items.length})</h1>
        <p className="text-xs text-zinc-400 uppercase tracking-widest mt-2 break-words">Handstitched • Customized / On Demand • Handcrafted • Real Leather</p>
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 w-full min-w-0">
          {items.map((item: any, i: number) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded p-4 w-full min-w-0">
              <p className="font-bold break-words leading-snug">{item.name || item.title}</p>
              <p className="text-amber-400 text-sm mt-1 break-words">${item.price}</p>
              <Link href={`/product/${item.slug || item.id}`} className="inline-block mt-3 bg-[#E8C15A] text-black text-xs font-bold px-4 py-2.5 rounded border-2 border-[#E8C15A] hover:bg-[#D4AF37]">
                View Product →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
