"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { findProductBySlug } from "@/lib/data/shop";

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
  addedAt?: number;
  extraChargesNote?: string;
  shipmentNote?: string;
  customMade?: { enabled: boolean; type?: string; detail?: string; fileName?: string };
};

// SYNC FIX: SUGGESTED ab hardcode nahi hai - sirf slug likha hai, naam / price / image / tag sab lib/data/shop.ts se aayega.
// Is se shop.ts me price badlo to Cart Page khud hi same ho jayega, dobara repeat nahi karna parega.
const SUGGESTED_SLUGS = ["card-holder", "leather-tag-keychain-set", "crossbody-messenger-bag"] as const;

const SUGGESTED = SUGGESTED_SLUGS.map((slug) => {
  const p = findProductBySlug(slug);
  return {
    slug,
    name: p?.name ?? slug,
    price: p?.price ?? 0,
    tag: p?.badge ?? "",
    img: p?.image ?? "",
    fallback: p?.image ?? "",
  };
});

// 
const CART_EXPIRY_MS = 45 * 60 * 1000;
const WISHLIST_KEY = "krossford_wishlist";
// CUSTOM MADE type ka label
const customMadeLabel = (t?: string) => {
  if (t === "full") return "Full Product - Use My Design";
  if (t === "stitching") return "Stitching Only - Hand Stitching";
  if (t === "design") return "Design Change";
  if (t === "size-colour") return "Size / Colour Change";
  if (t === "logo-name") return "Add Logo / Name";
  return t || "";
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  // Purani cart (localStorage) me agar key-holder.jpg / crossbody-messenger-bag.jpg (bina 2 wali) jaisi galat photo hai to usko shop.ts wali sahi photo se fix karo
  // FIX: key-holder.jpg folder me hai hi nahi - is liye tooti photo aa rahi thi
  // Sahi naam: leather-tag-keychain-set1.jpg (jo folder me maujood hai)
  // Crossbody ka base bhi missing tha, is liye 2 wali photo jo maujood hai wo lagai hai
  const fixImage = (src: string) => {
    if (!src) return "/images/card-holder.jpg";
    if (src.includes("key-holder")) return findProductBySlug("leather-tag-keychain-set")?.image || "/images/leather-tag-keychain-set1.jpg";
    if (src.includes("crossbody-messenger-bag.jpg") && !src.includes("crossbody-messenger-bag2")) return findProductBySlug("crossbody-messenger-bag")?.image || "/images/crossbody-messenger-bag2.jpg";
    return src;
  };
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const markFailed = (src: string) => {
    setFailedImages((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };
  const loadWishlist = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]") as CartItem[];
      setWishlist(raw.map((it) => ({ ...it, image: fixImage(it.image) })));
    } catch { setWishlist([]); }
  };
  const saveWishlist = (list: CartItem[]) => {
    setWishlist(list);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event("wishlistUpdated"));
  };
  const loadCart = () => {
    try {
      const raw = JSON.parse(localStorage.getItem("krossford_cart") || "[]") as CartItem[];
      const stamp = Date.now();
      // Purani cart me galat photo ho to abhi fix kar do + addedAt nahi hai to ab se 45 min start karo
      const withTime = raw.map((it) => ({ ...it, image: fixImage(it.image), addedAt: it.addedAt || stamp }));
      // 45 min se zyada purane items auto remove - bina notice, sab ka
      const alive = withTime.filter((it) => stamp - (it.addedAt || stamp) < CART_EXPIRY_MS);
      // FIX: Sirf expired hone pe hi save karna kaafi nahi tha.
      // Purani cart me addedAt nahi hota tha, to har second naya addedAt banta tha aur timer reset ho jata tha.
      // Ab pehli baar hi addedAt + fixed image localStorage me pakka save ho jayega, phir 45 min sahi chalega.
      const needsSave = alive.length !== raw.length || raw.some((it) => !it.addedAt || it.image !== fixImage(it.image));
      if (needsSave) {
        localStorage.setItem("krossford_cart", JSON.stringify(alive));
        localStorage.setItem("cart", JSON.stringify(alive));
      }
      setCart(alive);
    }
    catch { setCart([]); }
  };
  useEffect(() => {
    loadCart();
    loadWishlist();
    window.addEventListener("cartUpdated", loadCart);
    window.addEventListener("storage", loadCart);
    window.addEventListener("wishlistUpdated", loadWishlist);
    // Check once per second so expired items are removed promptly.
    const timer = setInterval(loadCart, 1000);
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("wishlistUpdated", loadWishlist);
      clearInterval(timer);
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
  // LIKE / SAVE FOR LATER: Cart se nikal ke Wishlist me - ye kabhi expire nahi hoga
  const saveForLater = (id: string) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (!wishlist.some((w) => w.id === id)) saveWishlist([...wishlist, { ...item, addedAt: undefined }]);
    updateCart(cart.filter((i) => i.id !== id));
  };
  const moveToCart = (id: string) => {
    const item = wishlist.find((w) => w.id === id);
    if (!item) return;
    const fresh = { ...item, addedAt: Date.now() };
    const next = [...cart, fresh];
    updateCart(next);
    saveWishlist(wishlist.filter((w) => w.id !== id));
  };
  const removeFromWishlist = (id: string) => saveWishlist(wishlist.filter((w) => w.id !== id));
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
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Start With Our Best Sellers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SUGGESTED.filter((s) => !failedImages.has(s.img)).map((s) => (
                  <Link key={s.slug} href={`/product/${s.slug}`} className="bg-zinc-900 border border-zinc-800 rounded overflow-hidden group hover:border-amber-400 transition-colors">
                    <div className="h-32 bg-zinc-800 overflow-hidden">
                      <img src={s.img} alt={s.name} onError={() => markFailed(s.img)} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-4">
                      <span className="text- text-amber-400 tracking-widest uppercase">{s.tag}</span>
                      <h3 className="text-xs font-bold uppercase mt-1">{s.name}</h3>
                      <p className="text-amber-400 font-bold text-sm mt-1">${s.price}</p>
                      <p className="text- text-zinc-400 mt-1">View Product →</p>
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
                {!failedImages.has(fixImage(item.image)) ? (
                  <img src={fixImage(item.image)} alt={item.name} onError={() => markFailed(fixImage(item.image))} className="w-20 h-20 object-cover rounded shrink-0" />
                ) : (
                  <div className="w-20 h-20 bg-zinc-800 rounded shrink-0 flex items-center justify-center text- text-zinc-400 text-center px-1">Photo</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text- text-amber-400 tracking-widest uppercase">{item.category}</p>
                  <h3 className="text-sm font-bold uppercase leading-tight line-clamp-2">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ background: item.colorCode || "#3E2723", width: 16, height: 16, borderRadius: "50%", display: "inline-block", border: "1px solid #fff" }} />
                    <span className="text-xs text-zinc-300">Colour: {item.colorName || "Dark Brown"}</span>
                  </div>
                  {item.customerType && (
                    <p className="text- text-zinc-300 mt-1">Type: <span className="text-white font-bold">{item.customerType}</span> {item.customerType === "B2C" ? "- Single Piece" : "- Bulk Order"}</p>
                  )}
                  {item.additionalOption && item.additionalOption !== "none" && (
                    <div className="mt-1 bg-amber-500/10 border border-amber-500/30 rounded px-2 py-1">
                      <p className="text- text-amber-400">Custom: {item.additionalOption} {item.customText ? ` - ${item.customText}` : ""}</p>
                      {item.uploadedFileName && <p className="text- text-zinc-400">File: {item.uploadedFileName}</p>}
                      <p className="text- text-amber-300">+ Extra Charges - To Be Confirmed</p>
                    </div>
                  )}
                  {item.customMade?.enabled && (
                    <div className="mt-1 bg-amber-400/10 border border-amber-400/40 rounded px-2 py-1">
                      <p className="text- text-amber-400 font-bold">🧵 Custom Made - Hand Stitched - On Customer Demand</p>
                      {item.customMade.type && <p className="text- text-zinc-200 mt-0.5">Customization: {customMadeLabel(item.customMade.type)}</p>}
                      {item.customMade.detail && <p className="text- text-zinc-300 mt-0.5">Detail: {item.customMade.detail}</p>}
                      {item.customMade.fileName && <p className="text- text-zinc-400">Design Image: {item.customMade.fileName}</p>}
                      <p className="text- text-amber-300">{item.extraChargesNote || "Extra charges apply for customization - final price will be confirmed after order confirmation."}</p>
                    </div>
                  )}
                  <p className="text-xs text-zinc-400 mt-1">${item.price} each</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 border border-zinc-700 rounded">-</button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 border border-zinc-700 rounded">+</button>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 text- uppercase ml-2">Remove</button>
                    <button onClick={() => saveForLater(item.id)} className="text-amber-400 text- uppercase ml-2">♡ Save For Later</button>
                  </div>
                </div>
                <p className="text-amber-400 font-bold text-sm shrink-0">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
              </div>
            ))}

            {suggestions.length > 0 && (
              <div className="bg-zinc-900 border border-zinc-800 rounded p-4">
                <h3 className="text-xs font-bold uppercase tracking-widest">Complete Your Set - Add More</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {suggestions.filter((s) => !failedImages.has(s.img)).map((s) => (
                    <Link key={s.slug} href={`/product/${s.slug}`} className="border border-zinc-800 rounded p-3 hover:border-amber-400 transition-colors flex items-center gap-3">
                      <img src={s.img} alt={s.name} onError={() => markFailed(s.img)} className="w-12 h-12 object-cover rounded shrink-0" />
                      <div className="min-w-0">
                        <p className="text- font-bold uppercase truncate">{s.name}</p>
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
                <p className="text- text-zinc-300 mt-1">Retail Checkout | For 50+ units, Get Wholesale Quote - Sample before bulk.</p>
                <Link href="/b2b" className="inline-block mt-2 bg-amber-400 text-black text- font-bold uppercase px-4 py-2 rounded">Go To B2B Form →</Link>
              </div>
            )}
          </div>
        )}
        {wishlist.length > 0 && (
          <div className="bg-zinc-900 border border-amber-400/30 rounded p-4 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber-400">♡ Saved Products - Available Whenever You Are Ready (They Never Expire)</h2>
            {wishlist.map((item) => (
              <div key={item.id} className="flex gap-4 items-start border border-zinc-800 rounded p-3">
                <img src={fixImage(item.image)} alt={item.name} className="w-16 h-16 object-cover rounded shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold uppercase leading-tight line-clamp-2">{item.name}</h3>
                  <p className="text-xs text-zinc-300 mt-1">Colour: {item.colorName || "Dark Brown"} • ${item.price} each • Qty: {item.quantity}</p>
                  {item.customMade?.enabled && (
                    <div className="mt-1 bg-amber-400/10 border border-amber-400/40 rounded px-2 py-1">
                      <p className="text- text-amber-400 font-bold">🧵 Custom Made - Hand Stitched - On Customer Demand</p>
                      {item.customMade.type && <p className="text- text-zinc-200 mt-0.5">Customization: {customMadeLabel(item.customMade.type)}</p>}
                      {item.customMade.detail && <p className="text- text-zinc-300 mt-0.5">Detail: {item.customMade.detail}</p>}
                      {item.customMade.fileName && <p className="text- text-zinc-400">Design Image: {item.customMade.fileName}</p>}
                    </div>
                  )}
                  <div className="flex gap-3 mt-2 flex-wrap">
                    <button onClick={() => moveToCart(item.id)} className="bg-amber-400 text-black text- font-bold uppercase px-3 py-1.5 rounded">Move to Cart →</button>
                    <Link href={`/product/${item.slug}`} className="border border-zinc-700 text- uppercase px-3 py-1.5 rounded">View Product</Link>
                    <button onClick={() => removeFromWishlist(item.id)} className="text-red-400 text- uppercase">Remove</button>
                  </div>
                </div>
                <p className="text-amber-400 font-bold text-sm shrink-0">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-4">
          <div className="flex justify-between text-xs font-bold border-b border-zinc-800 pb-3">
            <span className="text-zinc-400">Total (Product Only)</span><span className="text-amber-400">${total.toFixed(2)} USD</span>
          </div>
          <div className="space-y-1 text- text-zinc-500">
            <p>✓ 100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel) • Sample Before Bulk</p>
            <p>✓ Handcrafted To Order • Ships via | | | BANK TRANSFER / T/T - Retail: 100% Advance | Wholesale: 50% Advance, 50% Before Dispatch</p>
          </div>
          <Link href="/checkout" className="w-full block text-center bg-amber-500 text-black py-3 rounded text-xs font-bold uppercase">Proceed to Checkout</Link>
          <Link href="/shop" className="w-full block text-center text-zinc-400 text- uppercase">← Continue Shopping</Link>
          {cart.length > 0 && <button onClick={() => updateCart([])} className="w-full text-center text-zinc-500 text- uppercase">Clear Cart</button>}
        </div>
      </div>
    </div>
  );
}