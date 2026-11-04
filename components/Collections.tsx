"use client";

import { useState } from "react";
import Link from "next/link";

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Bags", "Belts", "Wallets", "Laptop Bags", "Accessories"];

  const products = [
    {
      id: "w1",
      name: "Executive Bi-Fold Wallet",
      category: "Wallets",
      leather: "Full-Grain Vegetable-Tanned",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
      badge: "HOT",
      colors: ["#1c1917", "#78350f", "#b45309"]
    },
    {
      id: "b1",
      name: "Artisan Dress Belt",
      category: "Belts",
      leather: "Solid Full-Grain Hide",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      badge: "HOT",
      colors: ["#1c1917", "#78350f"]
    },
    {
      id: "lb1",
      name: "Commander Laptop Briefcase",
      category: "Laptop Bags",
      leather: "Heavy-Duty Full-Grain Leather",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
      badge: "HOT",
      colors: ["#1c1917", "#78350f", "#475569"]
    },
    {
      id: "bg1",
      name: "Handcrafted Duffle Bag",
      category: "Bags",
      leather: "Distressed Dark Brown Hide",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      badge: "",
      colors: ["#78350f", "#1c1917"]
    },
    {
      id: "ac1",
      name: "Minimalist Slim Card Holder",
      category: "Accessories",
      leather: "Front Pocket Design",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      badge: "",
      colors: ["#1c1917", "#78350f"]
    },
    {
      id: "w2",
      name: "Traveler Card Wallet",
      category: "Wallets",
      leather: "Vegetable-Tanned Leather",
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      badge: "HOT",
      colors: ["#78350f", "#1c1917"]
    },
    {
      id: "lb2",
      name: "Nomad Leather Backpack",
      category: "Laptop Bags",
      leather: "Pebbled Grain Leather",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      badge: "HOT",
      colors: ["#78350f", "#475569"]
    },
    {
      id: "b2",
      name: "Founder's Buckle Belt",
      category: "Belts",
      leather: "Rugged Workwear Leather",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      badge: "",
      colors: ["#1c1917", "#78350f"]
    }
  ];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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

              {/* Linked to Cart / Enquiry page instead of missing dynamic route */}
              <Link href="/cart" className="block">
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
                <Link href="/cart" className="block">
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-yellow-500 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-zinc-400">
                  {product.leather}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Options</span>
                <div className="flex gap-1">
                  {product.colors.map((col, i) => (
                    <span 
                      key={i} 
                      className="w-3 h-3 rounded-full border border-zinc-700" 
                      style={{ backgroundColor: col }} 
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href="/cart"
                  className="w-full block text-center rounded bg-zinc-900 hover:bg-yellow-500 hover:text-black border border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all text-zinc-200 py-2.5"
                >
                  Select Options
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}