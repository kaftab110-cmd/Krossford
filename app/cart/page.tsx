"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("krossford_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        setCartItems([]);
      }
    }
  }, []);

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("krossford_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <main className="bg-black text-white min-h-screen px-6 py-20 max-w-7xl mx-auto">
      <h1 className="text-3xl font-serif tracking-[0.2em] uppercase mb-8 border-b border-zinc-800 pb-4">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-24 space-y-6">
          <p className="text-xl font-serif tracking-widest text-zinc-400 uppercase">
            Your Cart Is Empty
          </p>
          <div>
            <Link 
              href="/shop" 
              className="inline-block font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] transition-all"
              style={{ backgroundColor: "#C9A227", color: "#000000" }}
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="text-sm font-semibold uppercase">{item.name}</h3>
                  <p className="text-xs text-zinc-400">{item.leather}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-amber-400">${item.price}</span>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-zinc-500 hover:text-red-400 uppercase tracking-widest"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="pt-6 flex justify-between items-center">
            <Link 
              href="/shop"
              className="font-bold text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-[4px] border border-white hover:bg-white hover:text-black transition-colors"
            >
              Shop Now
            </Link>
            <Link 
              href="/b2b"
              className="font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px]"
              style={{ backgroundColor: "#C9A227", color: "#000000" }}
            >
              Proceed to Wholesale Enquiry
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}