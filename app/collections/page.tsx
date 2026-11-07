"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data/shop";

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // FIX: Categories products se hi lo - warna filter khali ho jata hai
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  // 9 LOCKED wale hi aayenge, koi Unsplash / Gucci nahi
  const allProducts = products.map((p) => ({
    id: p.slug,
    name: p.name,
    category: p.category,
    leather: p.description,
    image: p.image,
    badge: p.badge,
    price: p.price,
    colors: p.colors || [],
  }));

  const filteredProducts = selectedCategory === "All"
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
          <p className="text-xs text-zinc-400 tracking-widest uppercase mt-3">Card Holder $29 • Keychain $25 • Crossbody $119 • Honest Price</p>
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

        {filteredProducts.length === 0 && (
          <p className="text-center text-zinc-400 text-sm py-10">No products in this collection yet. <Link href="/shop" className="text-yellow-500 underline">Go To Shop →</Link></p>
        )}

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
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-yellow-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-zinc-400 line-clamp-2">{product.leather}</p>
                <p className="text-sm font-mono text-yellow-500 font-bold">${product.price}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Options</span>
                <div className="flex gap-1">
                  {product.colors.map((col: any) => (
                    <span key={col.name} title={col.name} className="w-3 h-3 rounded-full border border-zinc-700" style={{ backgroundColor: col.code }} />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href={`/product/${product.id}`}
                  className="w-full block text-center rounded bg-zinc-900 hover:bg-yellow-500 hover:text-black border border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all text-zinc-200 py-2.5"
                >
                  Select Options
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* B2B Banner */}
        <div className="mt-12 border border-yellow-500/30 rounded-lg p-6 bg-zinc-950 text-center space-y-2">
          <p className="text-sm font-semibold uppercase tracking-widest">Are You A Brand / Store? Need Bulk?</p>
          <p className="text-xs text-zinc-400">Leather Jackets, Biker Suits, Bags, Belts - White Label & Custom Production. MOQ 25+ Units.</p>
          <Link href="/b2b" className="inline-block bg-yellow-500 text-black text-xs uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-yellow-400 mt-2">
            Get Wholesale Quote →
          </Link>
        </div>
      </section>
    </main>
  );
}