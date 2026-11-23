"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
type Product = { id: number; name: string; price: number; category: string; image: string; stock: number; description: string; is_active: boolean; slug?: string; forHer?: boolean };
// CATEGORIES - lib/data/shop.ts se SAME - warna Admin se add kiya product Shop ke filter me kabhi nahi dikhega
const CATEGORIES = ["Wallets", "Card Holders", "Belts", "Bags", "Apparel", "Accessories", "Travel & Office", "Custom & Gifts", "Sets"];
const slugify = (s: string) => String(s || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(""); const [price, setPrice] = useState(""); const [category, setCategory] = useState("");
  const [slug, setSlug] = useState(""); const [slugTouched, setSlugTouched] = useState(false);
  const [image, setImage] = useState(""); const [stock, setStock] = useState("10"); const [description, setDescription] = useState("");
  const [forHer, setForHer] = useState(false); const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState(""); const [catFilter, setCatFilter] = useState("All");
  const [editId, setEditId] = useState<number | null>(null); const [editPrice, setEditPrice] = useState(""); const [editStock, setEditStock] = useState("");
  const [msg, setMsg] = useState(""); const [saving, setSaving] = useState(false);
  // Admin ko LIVE + HIDDEN dono chahiye - is liye ?all=true
  const load = async () => { setLoading(true); try { const res = await fetch("/api/products?all=true"); const j = await res.json() as { products?: Product[] }; setProducts(j.products || []); } catch { setProducts([]); } setLoading(false); };
  useEffect(() => { load(); }, []);
  const onNameChange = (v: string) => { setName(v); if (!slugTouched) setSlug(slugify(v)); };
  const onImageFile = async (f: File | null) => {
    if (!f) return; setUploading(true); setMsg("");
    try { const fd = new FormData(); fd.append("file", f); const res = await fetch("/api/upload", { method: "POST", body: fd }); const j = await res.json().catch(() => ({})); if (res.ok && (j.url || j.image)) { setImage(j.url || j.image); setMsg("✅ Photo upload ho gayi!"); } else setMsg("Photo upload nahi hui — link paste kar do ya dobara try karo."); }
    catch { setMsg("Photo upload nahi hui — link paste kar do."); } setUploading(false);
  };
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault(); if (saving) return; setMsg("");
    if (!name.trim() || !price.trim()) { setMsg("Naam aur Price zaroori hai!"); return; }
    const finalSlug = slugify(slug || name);
    if (!finalSlug) { setMsg("Slug nahi bana — Naam likho."); return; }
    setSaving(true);
    const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name.trim(), slug: finalSlug, price: Number(price), category, image: image.trim(), stock: Number(stock) || 10, description: description.trim(), forHer, is_active: true }) });
    const j = await res.json() as { ok?: boolean; error?: string };
    if (!j.ok) { setMsg(j.error || "Save nahi hua"); setSaving(false); return; }
    setMsg("✅ Product save ho gaya! Ab Shop pe dikhega.");
    setName(""); setPrice(""); setImage(""); setStock("10"); setDescription(""); setSlug(""); setSlugTouched(false); setForHer(false);
    load(); setSaving(false); setTimeout(() => setMsg(""), 3000);
  };
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const del = async (id: number, name: string) => {
    if (!confirm(`"${name}" ko DELETE karna hai? Ye wapas nahi aayega.`)) return;
    setMsg("Deleting...");
    setDeletingId(id);
    // FIX: id teen jagah bhejo - URL + body + header - taake Vercel / browser DELETE body kaat bhi de to bhi delete ho jaye
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE", headers: { "Content-Type": "application/json", "x-product-id": String(id) }, body: JSON.stringify({ id }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || j.ok === false) { setMsg(`❌ Delete nahi hua: ${j.error || "API ne mana kar diya"} — HIDE dabao, wo 100% kaam karega.`); setDeletingId(null); return; }
      // List se foran hatao - load() ka wait mat karo, warna lagta hai Delete kaam nahi kiya
      setProducts((prev) => prev.filter((x) => x.id !== id));
      setMsg(`✅ "${name}" delete ho gaya. Shop se bhi gayab ho jayega.`);
      setDeletingId(null);
      load();
    } catch { setMsg("❌ Delete nahi hua — Internet / API masla hai. HIDE dabao."); setDeletingId(null); }
  };
  const toggleLive = async (p: Product) => {
    const next = !p.is_active;
    setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, is_active: next } : x));
    const res = await fetch(`/api/products?id=${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: p.id, is_active: next }) });
    if (!res.ok) { setProducts((prev) => prev.map((x) => x.id === p.id ? { ...x, is_active: p.is_active } : x)); setMsg("Live / Hide save nahi hua — dobara try karo."); }
    else setMsg(next ? `✅ ${p.name} - LIVE ho gaya, Shop pe dikhega.` : `✅ ${p.name} - HIDE ho gaya, Shop pe nahi dikhega.`);
  };
  const startEdit = (p: Product) => { setEditId(p.id); setEditPrice(String(p.price)); setEditStock(String(p.stock)); };
  const saveEdit = async () => { if (editId === null) return; await fetch(`/api/products?id=${editId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editId, price: Number(editPrice), stock: Number(editStock) }) }); setEditId(null); load(); };
  const filtered = products.filter((p) => { if (catFilter !== "All" && p.category !== catFilter) return false; if (search.trim()) { const s = search.toLowerCase(); if (!p.name.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s)) return false; } return true; });
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-6 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4"><Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link><span className="text-xs text-zinc-400">Total: {products.length} • Supabase</span></div>
        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Products</h1>
        <div className="bg-amber-400/10 border border-amber-400/40 rounded p-4 text-xs leading-relaxed text-zinc-200"><p className="font-bold text-amber-400">📋 YE PAGE KIS KAAM KE LIYE HAI?</p><p className="text-zinc-400 mt-1">Yahan se: Naya Product add karo - Naam / Slug / Price / Category / Photo (device se upload ya link) / Stock. Save dabate hi ye Supabase me save hoga aur Shop pe aa jayega. VS Code ki zaroorat nahi.</p><p className="text-zinc-400">Live / Hide: Kisi product ko Hide karo to Shop pe nahi dikhega, Live karo to dobara dikhega. Delete ki zaroorat nahi.</p></div>
        {msg ? <p className="text-xs text-green-400 bg-zinc-900 border border-zinc-800 p-3 rounded">{msg}</p> : null}
        <form onSubmit={addProduct} className="bg-zinc-900 border border-zinc-800 p-4 rounded space-y-3">
          <div className="flex flex-col md:flex-row gap-3"><input value={name} onChange={(e) => onNameChange(e.target.value)} placeholder="Product Naam" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" /><input value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }} placeholder="slug - naam se khud ban jayega" className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" /><input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price - 49" type="number" className="w-28 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" /></div>
          <div className="flex flex-col md:flex-row gap-3"><input list="krossford-categories" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category likho - nayi bhi chalegi, jaise Mini Bags" className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs flex-1" /><datalist id="krossford-categories">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist><input value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock - 10" type="number" className="w-24 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" /><label className="flex items-center gap-2 text-xs bg-zinc-950 border border-zinc-800 px-3 py-2 rounded cursor-pointer"><input type="checkbox" checked={forHer} onChange={(e) => setForHer(e.target.checked)} className="accent-amber-400" /> For Her (ladies item)</label><button disabled={saving} className={`px-4 py-2 rounded font-bold text-xs uppercase ${saving ? "bg-zinc-700 text-zinc-400" : "bg-amber-400 text-black"}`}>{saving ? "Saving..." : "Add Product"}</button></div>
          <div className="flex flex-col md:flex-row gap-3"><label className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs cursor-pointer text-zinc-400">{uploading ? "Uploading photo..." : image ? `✅ Photo: ${image.split("/").pop()}` : "📷 Device se Photo Upload karo (click karo)"}<input type="file" accept="image/*" className="hidden" onChange={(e) => onImageFile(e.target.files?.[0] || null)} /></label><input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Ya Image Link paste karo - https://..." className="flex-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" /></div>
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description - chhota sa (optional)" className="w-full bg-zinc-900 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
        </form>
        <div className="flex flex-col md:flex-row gap-3"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product..." className="flex-1 bg-zinc-900 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400 placeholder:text-zinc-500" /><div className="flex gap-2 flex-wrap">{["All", ...CATEGORIES].map((f) => (<button key={f} type="button" onClick={() => setCatFilter(f)} className={catFilter === f ? "px-3 py-1.5 rounded text-xs font-bold border bg-amber-400 text-black border-amber-400" : "px-3 py-1.5 rounded text-xs font-bold border bg-zinc-900 border-zinc-700 text-zinc-300"}>{f}</button>))}</div></div>
        {loading ? (<div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">Loading products from Supabase...</div>) : filtered.length === 0 ? (<div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">No products yet - Upar se add karo.</div>) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{filtered.map((p) => (
            <div key={p.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded space-y-2 text-xs">
              {p.image ? <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" /> : null}
              <p className="font-bold text-white break-words">{p.name} <span className={`ml-1 px-2 py-0.5 rounded text-[10px] ${p.is_active ? "bg-green-600 text-white" : "bg-zinc-700 text-zinc-300"}`}>{p.is_active ? "LIVE" : "HIDDEN"}</span></p>
              <p className="text-zinc-400">{p.category} • ${p.price} • Stock: {p.stock} {p.slug ? `• /product/${p.slug}` : "• NO SLUG"}</p>
              {p.description ? <p className="text-zinc-500 break-words">{p.description}</p> : null}
              {p.stock <= 5 ? <p className="text-amber-400 font-bold">⚠ Low Stock - Jaldi restock karo</p> : null}
              {editId === p.id ? (<div className="flex gap-2 flex-wrap"><input value={editPrice} onChange={(e) => setEditPrice(e.target.value)} placeholder="New Price" className="w-24 bg-zinc-950 border border-zinc-800 px-2 py-1.5 rounded text-xs outline-none focus:border-amber-400" /><input value={editStock} onChange={(e) => setEditStock(e.target.value)} placeholder="Stock" className="w-20 bg-zinc-950 border border-zinc-800 px-2 py-1.5 rounded text-xs outline-none focus:border-amber-400" /><button onClick={saveEdit} className="bg-green-600 px-3 py-1.5 rounded font-bold text-xs uppercase">Save</button><button onClick={() => setEditId(null)} className="bg-zinc-800 px-3 py-1.5 rounded font-bold text-xs uppercase">Cancel</button></div>) : (
                <div className="flex gap-2 flex-wrap"><button onClick={() => startEdit(p)} className="bg-amber-400 text-black px-3 py-1 rounded font-bold text-xs uppercase">Edit Price / Stock</button><button onClick={() => toggleLive(p)} className={`px-3 py-1 rounded font-bold text-xs uppercase ${p.is_active ? "bg-zinc-800 text-zinc-200" : "bg-green-600 text-white"}`}>{p.is_active ? "Hide" : "Make Live"}</button><button disabled={deletingId === p.id} onClick={() => del(p.id, p.name)} className={`px-3 py-1 rounded font-bold text-xs uppercase ${deletingId === p.id ? "bg-zinc-700 text-zinc-400" : "bg-red-600"}`}>{deletingId === p.id ? "Deleting..." : "Delete"}</button></div>
              )}
            </div>
          ))}</div>
        )}
      </div>
    </div>
  );
}
