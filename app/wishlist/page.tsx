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
      <div className="min-h-screen bg-zinc-950 text-white p-6 text-center">
        <h1 className="text-2xl font-bold text-amber-400 mt-20">Your Wishlist is Empty</h1>
        <p className="text-zinc-400 mt-2">Abhi tumne koi product heart nahi kiya.</p>
        <Link href="/shop" className="inline-block mt-6 bg-amber-400 text-black px-6 py-3 rounded font-bold">
          Go To Shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <h1 className="text-2xl font-bold text-amber-400">My Wishlist ({items.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {items.map((item: any, i: number) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded p-4">
            <p className="font-bold">{item.name || item.title}</p>
            <p className="text-amber-400 text-sm mt-1">${item.price}</p>
            <Link href={`/product/${item.slug || item.id}`} className="text-xs underline mt-2 block">
              View Product →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}