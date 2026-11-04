"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data/shop";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  const filteredProducts = selectedCategory === "ALL" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    const existingCart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
    
    const itemIndex = existingCart.findIndex((item: any) => item.id === product.id);
    if (itemIndex > -1) {
      existingCart[itemIndex].quantity = (existingCart[itemIndex].quantity || 1) + 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("krossford_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    
    // Smooth Notification instead of annoying alert()
    setNotification(`${product.name} added to cart successfully!`);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <main className="bg-black text-white min-h-screen px-6 py-20 max-w-7xl mx-auto relative">
      {/* Floating Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-amber-400 text-black px-6 py-3 rounded shadow-2xl font-mono text-xs uppercase tracking-wider font-bold animate-in fade-in slide-in-from-bottom-5 duration-300">
          {notification}
        </div>
      )}

      <div className="text-center space-y-3 mb-12">
        <h1 className="text-3xl font-serif tracking-[0.2em] uppercase">B2B & Wholesale Catalog</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase">Select architectural leather goods for production</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-zinc-950 border border-zinc-800/80 rounded-lg overflow-hidden group">
            <div className="relative h-72 bg-zinc-900 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-amber-400 text-black text-[9px] font-mono tracking-widest px-2 py-1 uppercase font-bold">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] text-amber-400/90 tracking-widest uppercase font-mono">{product.category}</span>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-white mt-1">{product.name}</h3>
                <p className="text-xs text-zinc-400 font-light mt-1">{product.leather}</p>
                <p className="text-sm font-mono text-amber-400 mt-2">${product.price}</p>
              </div>
              <div className="pt-2 border-t border-zinc-900 flex items-center justify-between gap-2">
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="flex-1 text-[11px] font-medium tracking-[0.15em] uppercase bg-[#C9A227] text-black hover:bg-amber-500 py-3 transition-colors text-center rounded font-bold cursor-pointer"
                >
                  Add To Cart
                </button>
                <Link 
                  href="/b2b" 
                  className="text-[11px] font-medium tracking-[0.15em] uppercase bg-white text-black hover:bg-zinc-200 px-4 py-3 transition-colors rounded text-center"
                >
                  Quote
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}