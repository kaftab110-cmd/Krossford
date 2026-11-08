"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  leather: string;
  quantity: number;
  colorName?: string;
  colorCode?: string;
  slug?: string | number;
  customerType?: string;
  additionalOption?: string;
  customText?: string;
  uploadedFileName?: string;
  extraChargesNote?: string;
  shipmentNote?: string;
};

const SUGGESTED = [
  { name: "Card Holder - Minimalist", price: 29, slug: "card-holder", img: "/images/card-holder.jpg", tag: "BEST SELLER" },
  { name: "Leather Tag + Keychain Set", price: 25, slug: "leather-tag-keychain-set", img: "/images/key-holder.jpg", tag: "CUSTOM LOGO" },
  { name: "Crossbody Messenger Bag", price: 119, slug: "crossbody-messenger-bag", img: "/images/crossbody-messenger-bag.jpg", tag: "BEST SELLER" },
];

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
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const changeQty = (id: string, delta: number) => {
    updateCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };
  const removeItem = (id: string) => updateCart(cart.filter(item => item.id !== id));
  const total = cart.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
  const hasB2B = cart.some((i) => i.customerType === "B2B");
  const cartSlugs = cart.map((i) => String(i.slug || "").toLowerCase());
  const suggestions = SUGGESTED.filter((s) => !cartSlugs.includes(s.slug));

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6 md:p-12 pb-32">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-xl font-bold uppercase text-amber-400 border-b border-zinc-800 pb-4">
          Your Shopping Cart {cart.length > 0 && `(${cart.reduce((s,i)=>s+i.quantity,0)})`}
        </h1>
        {cart.length === 0 ? (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-zinc-400 text-xs">
              Your cart is empty.
              <div className="mt-4"><Link href="/shop" className="bg-amber-400 text-black px-5 py-2 rounded text-xs font-bold uppercase inline-block">Go to Shop</Link></div>
            </div>
            {/* Khali Cart Me Bhi Sale - Top 3 Dikhao */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Start With Our Best Sellers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SUGGESTED.map((s) => (
                  <Link key={s.slug} href={`/product/${s.slug}`} className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden group hover:border-amber-400 transition-colors">
                    <div className="h-32 bg-zinc-800 overflow-hidden">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-4">
                      <span className="text-[9px] text-amber-400 tracking-widest uppercase">{s.tag}</span>
                      <h3 className="text-xs font-bold uppercase mt-1">{s.name}</h3>
                      <p className="text-amber-400 font-bold text-sm mt-1">${s.price}</p>
                      <p className="text-[10px] text-zinc-400 mt-1">View Product →</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded flex gap-4 items-start">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-amber-400 tracking-widest uppercase">{item.category}</p>
                  <h3 className="text-sm font-bold uppercase leading-tight line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ background: item.colorCode || "#3E2723", width: 16, height: 16, borderRadius: "50%", display: "inline-block", border: "1px solid #fff" }} />
                    <span className="text-xs text-zinc-300">Colour: {item.colorName || "Dark Brown"}</span>
                  </div>
                  {item.customerType && (
                    <p className="text-[11px] text-zinc-300 mt-1">Type: <span className="text-white font-bold">{item.customerType}</span> {item.customerType === "B2C" ? "- Single Piece" : "- Bulk Order"}</p>
                  )}
                  {item.additionalOption && item.additionalOption !== "none" && (
                    <div className="mt-1 bg-amber-500/10 border border-amber-500/30 rounded px-2 py-1">
                      <p className="text-[11px] text-amber-400">Custom: {item.additionalOption} {item.customText ? ` - ${item.customText}` : ""}</p>
                      {item.uploadedFileName && <p className="text-[10px] text-zinc-400">File: {item.uploadedFileName}</p>}
                      <p className="text-[10px] text-amber-300">+ Extra Charges - To Be Confirmed</p>
                    </div>
                  )}
                  <p className="text-xs text-zinc-400 mt-1">${item.price} each</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 border border-zinc-700 rounded">-</button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 border border-zinc-700 rounded">+</button>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 text-[11px] uppercase ml-2">Remove</button>
                  </div>
                </div>
                <p className="text-amber-400 font-bold text-sm shrink-0">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
              </div>
            ))}

            {/* Add More - Average Order Badhao */}
            {suggestions.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded p-4">
                <h3 className="text-xs font-bold uppercase tracking-widest">Complete Your Set - Add More</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {suggestions.map((s) => (
                    <Link key={s.slug} href={`/product/${s.slug}`} className="border border-zinc-800 rounded p-3 hover:border-amber-400 transition-colors flex items-center gap-3">
                      <img src={s.img} alt={s.name} className="w-12 h-12 object-cover rounded shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase truncate">{s.name}</p>
                        <p className="text-amber-400 text-xs font-bold">${s.price} • Add →</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {hasB2B && (
              <div className="bg-amber-400/10 border border-amber-400/30 rounded p-4 text-center">
                <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">B2B Bulk Item In Cart</p>
                <p className="text-[11px] text-zinc-300 mt-1">Retail Checkout | For 50+ units, Get Wholesale Quote - Sample before bulk.</p>
                <Link href="/b2b" className="inline-block mt-2 bg-amber-400 text-black text-[11px] font-bold uppercase px-4 py-2 rounded">Go To B2B Form →</Link>
              </div>
            )}
          </div>
        )}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-4">
          <div className="flex justify-between text-xs font-bold border-b border-zinc-800 pb-3">
            <span className="text-zinc-400">Total (Product Only)</span><span className="text-amber-400">${total.toFixed(2)} USD</span>
          </div>
          <div className="space-y-1 text-[11px] text-zinc-500">
            <p>✓ 100% Real Leather Guarantee • Sample Before Bulk</p>
            <p>✓ Ships via DHL Express • Processing: 7-10 Days + DHL Delivery: 7-10 Days = Total 18-24 Days • Tracking Provided</p>
            <p>✓ Shipment + Delivery Charges - To Be Confirmed After Destination Check.</p>
            <p>✓ Customization extra charges bhi alag se confirm honge. No hidden charges.</p>
            <p>✓ Payment: VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER / T/T - Retail: 100% Advance | Wholesale: 50% Advance, 50% Before Dispatch</p>
          </div>
          <Link href="/checkout" className="w-full block text-center bg-amber-500 text-black py-3 rounded text-xs font-bold uppercase">Proceed to Checkout</Link>
          <Link href="/shop" className="w-full block text-center text-zinc-400 text-[11px] uppercase">← Continue Shopping</Link>
          {cart.length > 0 && <button onClick={() => updateCart([])} className="w-full text-center text-zinc-500 text-[11px] uppercase">Clear Cart</button>}
        </div>
      </div>
    </div>
  );
}