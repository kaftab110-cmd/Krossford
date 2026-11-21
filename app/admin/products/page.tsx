"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  stock: string;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("For Her");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("10");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [editId, setEditId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("krossford_products");
      if (saved) {
        const parsed = JSON.parse(saved) as Product[];
        if (Array.isArray(parsed)) {
          const fixed: Product[] = parsed.map((p) => ({
            id: Number(p.id) || Date.now(),
            name: String(p.name || ""),
            price: String(p.price || ""),
            category: String(p.category || "For Her"),
            image: String(p.image || ""),
            stock: String(p.stock || "10"),
          }));
          setProducts(fixed);
        }
      }
    } catch {
      setProducts([]);
    }
  }, []);

  const save = (list: Product[]) => {
    setProducts(list);
    try {
      localStorage.setItem("krossford_products", JSON.stringify(list));
    } catch {
      // storage full - ignore
    }
  };

  const addProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;
    const next: Product = {
      id: Date.now(),
      name: name.trim(),
      price: price.trim(),
      category,
      image: image.trim(),
      stock: stock.trim() || "10",
    };
    save([...products, next]);
    setName(""); setPrice(""); setImage(""); setStock("10");
  };

  const del = (id: number) => {
    if (!confirm("Is product ko delete karna hai?")) return;
    save(products.filter((p) => p.id !== id));
  };

  const startEdit = (p: Product) => {
    setEditId(p.id);
    setEditPrice(p.price);
    setEditStock(p.stock);
  };

  const saveEdit = () => {
    if (editId === null) return;
    const list: Product[] = products.map((p) => {
      if (p.id === editId) return { ...p, price: editPrice.trim(), stock: editStock.trim() };
      return p;
    });
    save(list);
    setEditId(null);
  };

  const filtered = products.filter((p) => {
    if (catFilter !== "All" && p.category !== catFilter) return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      if (!p.name.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s)) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">Total: {products.length}</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Products</h1>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text- text-yellow-200">
          Note: Ye Admin Products list abhi sirf is browser me save hoti hai (localStorage). Shop ke products alag code me hain. Isliye yahan add karne se Shop pe product nahi aayega - wo agle step me Supabase se connect karenge.
        </div>

        <form onSubmit={addProduct} className="bg-zinc-900 border border-zinc-800 p-4 rounded flex flex-col md:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Naam" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price - 477" className="w-28 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs">
            <option>For Her</option><option>For Him</option><option>Collections</option><option>B2B Wholesale</option>
          </select>
          <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock - 10" className="w-24 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image Link (optional)" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <button className="bg-amber-400 text-black px-4 py-2 rounded font-bold text-xs uppercase">Add Product</button>
        </form>

        <div className="flex flex-col md:flex-row gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product..." className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400 placeholder:text-zinc-500" />
          <div className="flex gap-2">
            {["All", "For Her", "For Him", "Collections", "B2B Wholesale"].map((f) => (
              <button key={f} type="button" onClick={() => setCatFilter(f)} className={catFilter === f ? "px-3 py-1.5 rounded text-xs font-bold border bg-amber-400 text-black border-amber-400" : "px-3 py-1.5 rounded text-xs font-bold border bg-zinc-900 border-zinc-700 text-zinc-300"}>{f}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">No products yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded space-y-2 text-xs">
                {p.image ? <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" /> : null}
                <p className="font-bold text-white">{p.name}</p>
                <p className="text-zinc-400">{p.category} • ${p.price} • Stock: {p.stock}</p>
                {editId === p.id ? (
                  <div className="flex gap-2">
                    <input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="New Price" className="w-24 bg-zinc-950 border border-zinc-800 px-2 py-1.5 rounded text-xs outline-none focus:border-amber-400" />
                    <input value={editStock} onChange={(e) => setEditStock(e.target.value)} placeholder="Stock" className="w-20 bg-zinc-950 border border-zinc-800 px-2 py-1.5 rounded text-xs outline-none focus:border-amber-400" />
                    <button onClick={saveEdit} className="bg-green-600 px-3 py-1.5 rounded font-bold text-xs uppercase">Save</button>
                    <button onClick={() => setEditId(null)} className="bg-zinc-800 px-3 py-1.5 rounded font-bold text-xs uppercase">Cancel</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(p)} className="bg-amber-400 text-black px-3 py-1 rounded font-bold text-xs uppercase">Edit Price / Stock</button>
                    <button onClick={() => del(p.id)} className="bg-red-600 px-3 py-1 rounded font-bold text-xs uppercase">Delete</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}