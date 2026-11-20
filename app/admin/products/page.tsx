"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("For Her");
  const [image, setImage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("krossford_products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  const save = (list: any[]) => {
    setProducts(list);
    localStorage.setItem("krossford_products", JSON.stringify(list));
  };

  const addProduct = (e: any) => {
    e.preventDefault();
    if (!name || !price) return;
    save([...products, { id: Date.now(), name, price, category, image }]);
    setName(""); setPrice(""); setImage("");
  };

  const del = (id: number) => save(products.filter((p) => p.id !== id));

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-xl font-bold text-amber-400 uppercase">Products — Dashboard Se Hi</h1>
          <Link href="/admin" className="text-xs text-zinc-400">Back to Dashboard -&gt;</Link>
        </div>

        <form onSubmit={addProduct} className="bg-zinc-900 border border-zinc-800 p-4 rounded flex flex-col md:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Naam" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price - 477" className="w-28 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs">
            <option>For Her</option><option>For Him</option><option>Collections</option><option>B2B Wholesale</option>
          </select>
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image Link (optional)" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <button className="bg-amber-400 text-black px-4 py-2 rounded font-bold text-xs uppercase">Add Product</button>
        </form>

        {products.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">Abhi koi product nahi hai. Upar se add karo — VS Code ki zaroorat nahi.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded space-y-2 text-xs">
                {p.image && <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" />}
                <p className="font-bold text-white">{p.name}</p>
                <p className="text-zinc-400">{p.category} • ${p.price}</p>
                <button onClick={() => del(p.id)} className="bg-red-600 px-3 py-1 rounded font-bold text- uppercase">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}