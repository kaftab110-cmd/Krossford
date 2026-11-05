"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type CartItem = {
  id: string; name: string; category: string; price: number;
  image: string; leather: string; quantity: number;
  colorName?: string; colorCode?: string;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const loadCart = () => {
    try { setCart(JSON.parse(localStorage.getItem("krossford_cart") || "[]")); }
    catch { setCart([]); }
  };
  useEffect(() => {
    loadCart();
    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("krossford_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const changeQty = (id: string, delta: number) => {
    updateCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const removeItem = (id: string) => updateCart(cart.filter(item => item.id !== id));
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-xl font-bold uppercase text-amber-400 border-b border-zinc-800 pb-4">
          Your Shopping Cart {cart.length > 0 && `(${cart.reduce((s,i)=>s+i.quantity,0)})`}
        </h1>
        {cart.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-zinc-400 text-xs">
            Your cart is empty.
            <div className="mt-4"><Link href="/shop" className="bg-amber-400 text-black px-5 py-2 rounded text-xs font-bold uppercase inline-block">Go to Shop</Link></div>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-amber-400 tracking-widest uppercase">{item.category}</p>
                  <h3 className="text-sm font-bold uppercase truncate">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ background: item.colorCode || "#3E2723", width: 16, height: 16, borderRadius: "50%", display: "inline-block", border: "1px solid #fff" }} />
                    <span className="text-xs text-zinc-300">Colour: {item.colorName || "Dark Brown"}</span>
                  </div>
                  <p className="text-xs text-zinc-400">${item.price} each</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 border border-zinc-700 rounded">-</button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 border border-zinc-700 rounded">+</button>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 text-[11px] uppercase ml-2">Remove</button>
                  </div>
                </div>
                <p className="text-amber-400 font-bold text-sm shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-4">
          <div className="flex justify-between text-xs font-bold border-b border-zinc-800 pb-3">
            <span className="text-zinc-400">Total</span><span className="text-amber-400">${total.toFixed(2)} USD</span>
          </div>
          <Link href="/checkout" className="w-full block text-center bg-amber-500 text-black py-3 rounded text-xs font-bold uppercase">Proceed to Checkout</Link>
          {cart.length > 0 && <button onClick={() => updateCart([])} className="w-full text-center text-zinc-500 text-[11px] uppercase">Clear Cart</button>}
        </div>
      </div>
    </div>
  );
}