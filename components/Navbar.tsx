"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const loadCart = () => {
    const saved = localStorage.getItem("krossford_cart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCartItems(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("krossford_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <>
      <header className="bg-black text-white border-b border-zinc-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-serif tracking-widest uppercase">
            <span className="font-bold">KF</span> KROSSFORD
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase font-medium tracking-[0.15em] text-zinc-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <Link href="/b2b" className="hover:text-white transition-colors">Wholesale</Link>
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            <Link href="/about-us" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-6 text-[11px] font-mono tracking-wider">
            <Link href="/contact-us" className="hover:text-amber-400 transition-colors uppercase">Enquiry</Link>
            <button 
              onClick={() => { loadCart(); setIsCartOpen(true); }}
              className="hover:text-amber-400 transition-colors uppercase flex items-center gap-1 font-bold relative cursor-pointer"
            >
              Cart ({cartItems.length})
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer / Popup */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-zinc-950 text-white h-full shadow-2xl flex flex-col border-l border-zinc-800 p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h2 className="text-sm font-serif tracking-[0.2em] uppercase">Your Shopping Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 space-y-6">
                  <p className="text-sm font-serif tracking-widest text-zinc-400 uppercase">
                    Your Cart Is Empty
                  </p>
                  <div>
                    <Link 
                      href="/shop" 
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] transition-all text-black"
                      style={{ backgroundColor: "#C9A227" }}
                    >
                      BROWSE CATALOG
                    </Link>
                  </div>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-zinc-900/50 p-4 rounded border border-zinc-800">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                      <div>
                        <h4 className="text-xs font-semibold uppercase">{item.name}</h4>
                        <p className="text-[10px] text-zinc-400">{item.leather}</p>
                        <p className="text-xs font-mono text-amber-400 font-bold mt-1">${item.price} {item.quantity > 1 ? `(x${item.quantity})` : ''}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] text-zinc-500 hover:text-red-400 uppercase tracking-widest cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-zinc-800 space-y-4">
                <div className="flex justify-between items-center text-sm font-mono font-bold">
                  <span className="text-zinc-400 uppercase text-xs">Subtotal:</span>
                  <span className="text-amber-400 text-base">
                    ${cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)}
                  </span>
                </div>
                <Link 
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full block text-center font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-[4px] text-black"
                  style={{ backgroundColor: "#C9A227" }}
                >
                  PROCEED TO PAYMENT
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}