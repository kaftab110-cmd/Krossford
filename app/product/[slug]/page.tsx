"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/data/shop";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const product = products.find((p) => p.slug === params.slug);
  const [selectedColor, setSelectedColor] = useState(0);
  const [qty, setQty] = useState(1);
  if (!product) return <div className="min-h-screen bg-zinc-950 text-white p-12 text-center">Product not found - {params.slug}</div>;
  const color = product.colors[selectedColor];
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
    const id = `${product.slug}-${color.name}`;
    const existing = cart.find((i: any) => i.id === id);
    let newCart;
    if (existing) newCart = cart.map((i: any) => i.id === id ? { ...i, quantity: i.quantity + qty } : i);
    else newCart = [...cart, { id, name: product.name, category: product.category, price: product.price, image: color.image, leather: "Full-Grain Leather", quantity: qty, colorName: color.name, colorCode: color.code }];
    localStorage.setItem("krossford_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
    router.push("/cart");
  };
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <img src={color.image} alt={product.name} className="h-[450px] w-full rounded-xl border border-zinc-800 object-cover" />
        <div>
          <p className="text-xs tracking-widest text-amber-400">{product.category} • {product.badge}</p>
          <h1 className="mt-2 text-3xl font-bold uppercase">{product.name}</h1>
          <p className="mt-3 text-sm text-zinc-400">{product.description}</p>
          <p className="mt-4 text-2xl font-bold text-amber-400">${product.price} USD</p>
          <p className="mb-3 mt-6 text-xs uppercase tracking-wider">Select Colour: <span className="text-amber-400 font-bold">{color.name}</span></p>
          <div className="flex gap-3">
            {product.colors.map((c: any, i: number) => (
              <button key={c.name} onClick={() => setSelectedColor(i)} title={c.name} style={{ background: c.code, width: 44, height: 44, borderRadius: "50%", border: selectedColor === i ? "3px solid #fbbf24" : "1px solid #555", cursor: "pointer" }} />
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs uppercase">Qty:</span>
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 rounded border border-zinc-700">-</button>
            <span className="font-bold">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="h-8 w-8 rounded border border-zinc-700">+</button>
          </div>
          <button onClick={addToCart} className="mt-6 w-full rounded bg-amber-400 py-3 text-sm font-bold uppercase text-black hover:bg-amber-300">Add To Cart - {color.name}</button>
        </div>
      </div>
    </div>
  );
}