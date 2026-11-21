"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  description: string;
  is_active: boolean;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("For Her");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState("10");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [editId, setEditId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const j = await res.json() as { products?: Product[] };
      setProducts(j.products || []);
    } catch {
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (!name.trim() || !price.trim()) { setMsg("Naam aur Price zaroori hai!"); return; }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), price: Number(price), category, image: image.trim(), stock: Number(stock) || 10, description: description.trim() }),
    });
    const j = await res.json() as { ok?: boolean; error?: string };
    if (!j.ok) { setMsg(j.error || "Save nahi hua"); return; }
    setMsg("✅ Product save ho gaya! Ab Shop pe dikhega.");
    setName(""); setPrice(""); setImage(""); setStock("10"); setDescription("");
    load();
    setTimeout(() => setMsg(""), 3000);
  };

  const del = async (id: number) => {
    if (!confirm("Is product ko delete karna hai?")) return;
    await fetch("/api/products", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  const startEdit = (p: Product) => {
    setEditId(p.id);
    setEditPrice(String(p.price));
    setEditStock(String(p.stock));
  };

  const saveEdit = async () => {
    if (editId === null) return;
    await fetch("/api/products", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, price: Number(editPrice), stock: Number(editStock) }) });
    setEditId(null);
    load();
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
    <div className="min-h-screen bg-zinc-950 text-white p-6 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">Total: {products.length} • Supabase</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Products</h1>

        <div className="bg-amber-400/10 border border-amber-400/40 rounded p-4 text-xs leading-relaxed text-zinc-200">
          <p className="font-bold text-amber-400">📋 YE PAGE KIS KAAM KE LIYE HAI?</p>
          <p className="text-zinc-400 mt-1">Yahan se: Naya Product add karo - Naam / Price / Category / Image Link / Stock. Save dabate hi ye Supabase me save hoga aur Shop pe aa jayega. VS Code ki zaroorat nahi.</p>
          <p className="text-zinc-400">Image ke liye: Kisi bhi image ka full https link yahan paste karo - jaise https://www.krossford.com/images/shirt.jpg</p>
        </div>

        {msg ? <p className="text-xs text-green-400 bg-zinc-900 border border-zinc-800 p-3 rounded">{msg}</p> : null}

        <form onSubmit={addProduct} className="bg-zinc-900 border border-zinc-800 p-4 rounded flex flex-col md:flex-row gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Naam" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price - 477" type="number" className="w-28 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs">
            <option>For Her</option><option>For Him</option><option>Collections</option><option>B2B Wholesale</option>
          </select>
          <input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock - 10" type="number" className="w-24 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image Link (optional)" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <button className="bg-amber-400 text-black px-4 py-2 rounded font-bold text-xs uppercase">Add Product</button>
        </form>
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description - chhota sa (optional)" className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />

        <div className="flex flex-col md:flex-row gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product..." className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400 placeholder:text-zinc-500" />
          <div className="flex gap-2">
            {["All", "For Her", "For Him", "Collections", "B2B Wholesale"].map((f) => (
              <button key={f} type="button" onClick={() => setCatFilter(f)} className={catFilter === f ? "px-3 py-1.5 rounded text-xs font-bold border bg-amber-400 text-black border-amber-400" : "px-3 py-1.5 rounded text-xs font-bold border bg-zinc-900 border-zinc-700 text-zinc-300"}>{f}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">Loading products from Supabase...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">No products yet - Upar se add karo.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded space-y-2 text-xs">
                {p.image ? <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" /> : null}
                <p className="font-bold text-white">{p.name}</p>
                <p className="text-zinc-400">{p.category} • ${p.price} • Stock: {p.stock}</p>
                {p.description ? <p className="text-zinc-500">{p.description}</p> : null}
                {p.stock <= 5 ? <p className="text-amber-400 font-bold">⚠️ Low Stock - Jaldi restock karo</p> : null}
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