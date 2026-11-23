// app/admin/products/new/page.tsx - Admin: Image Upload + Detail + Live
"use client";
import { useState } from "react";
import Link from "next/link";

export default function NewProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Wallets");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("100");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setMsg("");
    const form = new FormData();
    form.append("file", file);
    const r = await fetch("/api/upload", { method: "POST", body: form });
    const d = await r.json();
    setUploading(false);
    if (d.ok) { setImage(d.url); setMsg("✅ Image upload ho gayi"); }
    else setMsg("❌ Image upload fail: " + d.error);
  };

  const handleSave = async () => {
    if (!name || !price) { setMsg("❌ Name aur Price zaroori hai"); return; }
    if (!image) { setMsg("❌ Pehle image upload karo"); return; }
    setSaving(true);
    setMsg("");
    const r = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price), category, description, stock: Number(stock), image }),
    });
    const d = await r.json();
    setSaving(false);
    if (d.ok) {
      setMsg("✅ LIVE HO GAYA! Product site pe aa gaya.");
      setName(""); setPrice(""); setDescription(""); setStock("100"); setImage(""); setPreview("");
    } else setMsg("❌ " + (d.error || "Save nahi hua"));
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/admin" className="text-xs underline text-zinc-400">← Back to Admin</Link>
        <h1 className="text-2xl font-bold mt-4">Add New Product — Live</h1>
        <p className="text-xs text-zinc-400 mt-1">Photo device se upload karo, detail likho, Live dabao. Koi file paste nahi karni.</p>

        <div className="mt-6 space-y-4 bg-zinc-950 border border-zinc-800 rounded-lg p-5">
          <div>
            <label className="text-xs font-bold uppercase text-zinc-400">Product Image * — Device Se Upload</label>
            <label className="mt-2 w-full border-2 border-dashed border-zinc-700 rounded-lg px-3 py-6 text-center block cursor-pointer hover:border-[#D4AF37] bg-black">
              {preview ? <img src={preview} alt="Preview" className="w-full max-h-72 object-contain mx-auto rounded" /> : <span className="text-sm text-zinc-400">📷 Click Karke Apne Device Se Image Select Karo</span>}
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
            {uploading && <p className="text-xs text-yellow-400 mt-2">Uploading...</p>}
            {image && <p className="text-xs text-green-400 mt-2 break-all">Saved: {image}</p>}
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-zinc-400">Product Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Messenger Bag" className="mt-1 w-full border border-zinc-700 rounded px-3 py-2.5 text-sm bg-black outline-none focus:border-[#D4AF37]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold uppercase text-zinc-400">Price ($) *</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="129" className="mt-1 w-full border border-zinc-700 rounded px-3 py-2.5 text-sm bg-black outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-zinc-400">Stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="100" className="mt-1 w-full border border-zinc-700 rounded px-3 py-2.5 text-sm bg-black outline-none focus:border-[#D4AF37]" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-zinc-400">Category *</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full border border-zinc-700 rounded px-3 py-2.5 text-sm bg-black outline-none focus:border-[#D4AF37]">
              <option>Wallets</option>
              <option>Bags</option>
              <option>Jackets</option>
              <option>For Her</option>
              <option>Collections</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-zinc-400">Detail / Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Handmade full-grain leather, RFID protection..." rows={4} className="mt-1 w-full border border-zinc-700 rounded px-3 py-2.5 text-sm bg-black outline-none focus:border-[#D4AF37]" />
          </div>

          {msg && <p className="text-sm font-bold">{msg}</p>}

          <button onClick={handleSave} disabled={saving || uploading} className="w-full bg-[#D4AF37] text-black py-3 rounded font-bold uppercase text-sm hover:bg-amber-300 disabled:opacity-50">
            {saving ? "Saving..." : "✅ Live Kar Do"}
          </button>
          <Link href="/shop" className="block text-center text-xs underline text-zinc-400">Shop Pe Dekho →</Link>
        </div>
      </div>
    </div>
  );
}