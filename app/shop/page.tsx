"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { products, CATEGORIES } from "@/lib/data/shop";

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = useMemo(() =>
    products.filter((p) => activeCategory === "All" || p.category === activeCategory),
  [activeCategory]);

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest">Shop Collection</h1>
        <p className="text-xs text-zinc-400 mt-2 uppercase tracking-widest">Category Select Karo - Phir Design Select Karo</p>
      </section>

      {/* STEP 1 - CATEGORY BUTTONS */}
      <div className="flex flex-wrap justify-center gap-2 px-6 pb-6">
        {CATEGORIES.map((cat) => {
          const count = cat === "All" ? products.length : products.filter((p) => p.category === cat).length;
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest border cursor-pointer ${activeCategory === cat ? "bg-amber-400 text-black border-amber-400" : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-amber-400"}`}>
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-zinc-500 pb-4">Showing {filtered.length} products in {activeCategory} - Kisi Bhi Product Pe Click Karo - Us Ke Designs Khulenge!</p>

      {/* STEP 2 - 1 CARD PER PRODUCT - CLICK KARNE PE DESIGNS KHULENGE */}
      <section className="mx-auto max-w-7xl px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p: any) => (
          <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-amber-400">
            <Link href={`/product/${p.slug}`}>
              <div className="relative h-64 bg-zinc-900 overflow-hidden cursor-pointer">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                {p.badge && <span className="absolute top-3 left-3 bg-amber-400 text-black text-[9px] font-bold px-2 py-1 uppercase">{p.badge}</span>}
                <span className="absolute bottom-3 left-3 bg-black/80 text-white text-[10px] px-2 py-1">👆 Click - {p.gallery?.length || 1} Designs Dekho</span>
              </div>
            </Link>
            <div className="p-5 space-y-3">
              <span className="text-[10px] text-amber-400 uppercase tracking-widest">{p.category}</span>
              <Link href={`/product/${p.slug}`}><h3 className="text-sm font-semibold uppercase hover:text-amber-400 cursor-pointer">{p.name}</h3></Link>
              <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>
              <p className="text-sm text-amber-400 font-mono">${p.price}</p>
              {/* DESIGNS KI CHHOTI PHOTOS - YAHAN SE HI PATA CHALEGA KITNE DESIGNS HAIN */}
              <div className="flex gap-2">
                {p.gallery?.slice(0, 5).map((g: string, i: number) => (
                  <Link key={i} href={`/product/${p.slug}`}>
                    <img src={g} alt={`Design ${i + 1}`} className="w-10 h-10 object-cover rounded border border-zinc-700 hover:border-amber-400 cursor-pointer" />
                  </Link>
                ))}
                <span className="text-[10px] text-zinc-500 self-center">+ {p.gallery?.length} Designs</span>
              </div>
              <div className="flex gap-2">
                <Link href={`/product/${p.slug}`} className="flex-1 block text-center bg-amber-400 text-black text-[11px] font-bold uppercase py-3 rounded">View Designs →</Link>
                <Link href={`/product/${p.slug}`} className="flex-1 block text-center bg-zinc-800 border border-zinc-700 text-[11px] font-bold uppercase py-3 rounded">Details</Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}