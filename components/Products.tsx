"use client";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const addToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
      const existing = cart.find((i: any) => i.id === product.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("krossford_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      alert(`${product.name} Added to Cart!`);
    } catch {}
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col font-mono">
      <Link href={`/shop/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-[260px] object-cover" />
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-white font-bold text-[15px] uppercase tracking-wide">{product.name}</h3>
          {product.tag && <span className="text-[9px] bg-amber-400 text-black font-bold px-2 py-1 rounded">{product.tag}</span>}
        </div>

        <p className="text-amber-400 font-bold text-lg mt-2">${product.price}</p>

        <p className="text-[11px] text-zinc-400 leading-relaxed mt-2">
          🚚 Ships via <span className="text-white font-bold">DHL Express</span><br />
          Processing: 7-10 Days After Order<br />
          DHL Delivery: 7-10 Days After Dispatch<br />
          <span className="text-amber-400/90">Total Delivery: 18-24 Days | Tracking Provided</span>
        </p>

        <p className="text-[10px] text-zinc-500 mt-2">We aim to deliver earlier than estimated.</p>

        <button
          onClick={addToCart}
          className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-widest py-3 rounded-lg transition-colors"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}