"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data/shop";

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Bags", "Accessories", "Custom", "Office"];

  const allProducts = products.map((p: any) => ({
    id: p.slug || p.id,
    name: p.name,
    category: p.category,
    leather: p.description,
    image: p.image,
    badge: p.badge,
    price: p.price || 0,
    // FIX: Asli colors data se lo, agar na ho to fallback
    colors: p.colors ? p.colors.map((c: any) => c.code || c) : ["#1c1917", "#78350f", "#b45309"],
    colorNames: p.colors ? p.colors.map((c: any) => c.name) : [],
  }));

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-yellow-500 mb-2">
            Exquisite Full-Grain Hide & Precision Haberdashery
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-white uppercase">
            Our Professional Collections
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all ${
                selectedCategory === cat
                  ? "bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/20"
                  : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-yellow-500 hover:text-yellow-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-300 hover:border-yellow-500 flex flex-col justify-between shadow-lg"
            >
              {product.badge && (
                <span className="absolute top-6 left-6 z-10 bg-black text-yellow-500 border border-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              {/* FIX 1: Image ab Cart pe nahi, Product Page pe jayegi */}
              <Link href={`/product/${product.id}`} className="block">
                <div className="relative w-full h-64 rounded-lg bg-zinc-900 overflow-hidden border border-zinc-800/60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="mt-4 space-y-2 flex-grow">
                <span className="text-[11px] text-yellow-500 font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                {/* FIX 2: Naam bhi Product Page pe jayega */}
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-yellow-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-zinc-400">{product.leather}</p>
              </div>

              {/* PRICE + DELIVERY - Ab Buyer Ko Price Pehle Hi Pata Chalega */}
              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-lg font-mono text-amber-400 font-bold">${product.price}</span>
                <div className="flex gap-1">
                  {product.colors.map((col: string, i: number) => (
                    <Link key={i} href={`/product/${product.id}`}>
                      <span className="w-3 h-3 rounded-full border border-zinc-700 cursor-pointer block" style={{ backgroundColor: col }} />
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">🚚 Ships in 18-24 Days • DHL Express • Tracking Provided</p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 block text-center rounded bg-yellow-500 hover:bg-amber-400 text-black text-xs font-bold uppercase tracking-wider transition-all py-2.5"
                >
                  Add to Cart →
                </Link>
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 block text-center rounded bg-zinc-900 hover:border-yellow-500 border border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all text-zinc-200 py-2.5"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}