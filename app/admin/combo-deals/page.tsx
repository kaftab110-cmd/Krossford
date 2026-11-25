"use client";
import { useEffect, useState } from "react";
// ADMIN COMBO DEALS - SET BUILDER - FINAL
// 1 Combo Set = andar 1 se zyada products - har product ka naam + uski price likho - Total khud banega.
// Misaal: Wallet 120 + Card Holder 60 + Belt 90 + Keychain 30 + Box 50 = Total 350 - Combo Price tum 285 ya 275 likhogi - Save khud banega.
// 1 hi MAIN photo lagti hai - poore Set ki photo - jaise tumne wali photo bheji (Wallet + Card Holder + Belt + Keychain + Box ek saath).
type ComboItem = { name: string; price: number };
type Combo = { id?: number; title: string; tag: string; description: string; detail: string; old_price: number; price: number; image: string; items: ComboItem[]; alt: string; is_active: boolean };
const empty: Combo = { title: "", tag: "BEST SELLER", description: "", detail: "", old_price: 0, price: 0, image: "/images/messenger-bag.jpg", items: [{ name: "", price: 0 }], alt: "", is_active: true };
export default function AdminComboDeals() {
  const [list, setList] = useState<Combo[]>([]);
  const [form, setForm] = useState<Combo>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/combo-deals", { cache: "no-store" });
      const j = await r.json().catch(() => ({}));
      const arr = (j.combos || []).map((c: any) => ({ id: c.id, title: c.title, tag: c.tag || "COMBO", description: c.description || c.desc || "", detail: c.detail || "", old_price: Number(c.old_price ?? c.oldPrice ?? 0), price: Number(c.price || 0), image: c.image || "/images/messenger-bag.jpg", items: Array.isArray(c.items) ? c.items : [], alt: c.alt || "", is_active: c.is_active !== false }));
      setList(arr);
    } catch { setList([]); }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  function set(k: keyof Combo, v: any) { setForm((f) => ({ ...f, [k]: v })); }
  function setItem(i: number, k: keyof ComboItem, v: any) { setForm((f) => ({ ...f, items: f.items.map((it, j) => j === i ? { ...it, [k]: v } : it) })); }
  function addItem() { setForm((f) => ({ ...f, items: [...f.items, { name: "", price: 0 }] })); }
  function removeItem(i: number) { setForm((f) => ({ ...f, items: f.items.filter((_, j) => j !== i) })); }
  async function uploadImage(file: File | undefined) {
    if (!file) return; setUploading(true);
    try { const fd = new FormData(); fd.append("file", file); const r = await fetch("/api/upload", { method: "POST", body: fd }); const j = await r.json().catch(() => ({})); const url = j.url || j.image || j.path || ""; if (r.ok && url) set("image", url); else setMsg("❌ Photo upload fail"); } catch { setMsg("❌ Photo upload fail"); }
    setUploading(false);
  }
  const itemsTotal = form.items.reduce((s, it) => s + Number(it.price || 0), 0);
  const totalWithDelivery = itemsTotal; // Old Price me delivery samet total likho - neeche box me samjhaya hai
  async function save() {
    if (!form.title.trim()) { setMsg("❌ Title likho - jaise Wallet + Belt + Keychain Set"); return; }
    if (!form.price || Number(form.price) <= 0) { setMsg("❌ Combo Price likho - jaise 285"); return; }
    if (!form.old_price || Number(form.old_price) <= 0) { setMsg("❌ Original Price (delivery samet) likho - jaise 350"); return; }
    setMsg("Saving...");
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...form, id: editing } : form;
    const r = await fetch("/api/combo-deals", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setMsg("❌ " + (j.error || "Save fail")); return; }
    setMsg("✅ Set save ho gaya - Combo page pe dikhega");
    setForm(empty); setEditing(null); load();
  }
  async function edit(c: Combo) { setForm({ ...c, items: c.items.length ? c.items : [{ name: "", price: 0 }] }); setEditing(c.id || null); setMsg("Edit kar rahi ho: " + c.title); window.scrollTo({ top: 0, behavior: "smooth" }); }
  async function toggle(c: Combo) {
    await fetch("/api/combo-deals", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, is_active: !c.is_active }) });
    setMsg(c.is_active ? "✅ Set Hide ho gaya" : "✅ Set Live ho gaya"); load();
  }
  async function del(c: Combo) {
    if (!confirm("Delete karni hai? " + c.title)) return;
    await fetch("/api/combo-deals", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id }) });
    setMsg("✅ Set delete ho gaya"); load();
  }
  const saveAmt = Number(form.old_price || 0) - Number(form.price || 0);
  return (
    <main className="bg-zinc-950 text-white min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#D4AF37] text-xs tracking-[0.35em]">KROSSFORD ADMIN</p>
        <h1 className="text-3xl font-bold mt-1">COMBO SETS — ADMIN</h1>
        <p className="text-zinc-400 text-sm mt-2">1 Set ke andar 1 se zyada products add karo. Har product ki price likho - Total khud banega. Phir Combo Price likho - Save khud banega.</p>
        {msg && <p className="mt-4 bg-zinc-900 border border-zinc-800 rounded p-3 text-sm">{msg}</p>}
        <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-5 space-y-3">
          <h2 className="font-bold">{editing ? "Set Edit Karo" : "Naya Combo Set Banao"}</h2>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Title — jaise Wallet + Belt + Keychain Set" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          <div className="grid sm:grid-cols-2 gap-3">
            <select value={form.tag} onChange={(e) => set("tag", e.target.value)} className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm">
              <option>BEST SELLER</option><option>TRAVEL</option><option>DAILY USE</option><option>COMBO</option><option>LIMITED</option><option>GIFT SET</option>
            </select>
            <div className="space-y-2">
              <label className="block bg-zinc-950 border border-dashed border-zinc-600 rounded px-3 py-2 text-sm text-center cursor-pointer hover:border-[#D4AF37]">{uploading ? "Uploading..." : "📷 SET KI 1 PHOTO — Poore Set ki photo Choose karo"}<input type="file" accept="image/*" className="hidden" onChange={(e) => uploadImage(e.target.files?.[0])} /></label>
              <input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="Ya photo ka link — /images/..." className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
              {form.image && <img src={form.image} alt="Set Preview" className="w-full h-44 object-cover rounded border border-zinc-700" />}
            </div>
          </div>
          <input value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Desc — jaise Wallet + Card Holder + Belt + Keychain + Gift Box" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          <div className="border border-zinc-700 rounded p-3 space-y-2">
            <p className="font-bold text-sm">Set ke andar wale Products — jitne chahiye utne add karo</p>
            {form.items.map((it, i) => (
              <div key={i} className="flex gap-2">
                <input value={it.name} onChange={(e) => setItem(i, "name", e.target.value)} placeholder={`Product ${i + 1} — jaise ${i === 0 ? "Wallet" : i === 1 ? "Card Holder" : i === 2 ? "Belt" : "Keychain"}`} className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
                <input type="number" value={it.price} onChange={(e) => setItem(i, "price", Number(e.target.value))} placeholder="Price" className="w-24 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
                {form.items.length > 1 && <button type="button" onClick={() => removeItem(i)} className="border border-red-500 text-red-400 text-xs font-bold px-3 rounded">✕</button>}
              </div>
            ))}
            <button type="button" onClick={addItem} className="border border-dashed border-zinc-500 text-xs font-bold px-4 py-2 rounded w-full">+ AUR PRODUCT ADD KARO</button>
            <p className="text-sm">Products ka Total: <b className="text-[#D4AF37]">${itemsTotal}</b> <span className="text-zinc-500 text-xs">(Sirf hisaab ke liye — Original Price neeche alag se likhni hai)</span></p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm text-zinc-400">Original Price — Delivery samet TOTAL (jaise 350)<input type="number" value={form.old_price} onChange={(e) => set("old_price", Number(e.target.value))} placeholder="350" className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white" /></label>
            <label className="text-sm text-zinc-400">Combo Price — Set kitne me dena hai (jaise 285 ya 275)<input type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} placeholder="285" className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white" /></label>
          </div>
          <div className="bg-zinc-950 border border-[#D4AF37]/40 rounded p-3 text-sm"><p>Original (delivery samet): <b>${Number(form.old_price || 0)}</b> &nbsp; Combo Price: <b className="text-[#D4AF37]">${Number(form.price || 0)}</b> &nbsp; Customer Save karega: <b className="text-green-400">${saveAmt > 0 ? saveAmt : 0}</b></p><p className="text-xs text-zinc-500 mt-1">Misaal: Original $350 — Combo $285 = Save $65 &nbsp;|&nbsp; Original $350 — Combo $275 = Save $75</p></div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} /> Live — Combo page pe dikhega</label>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#D4AF37] text-black text-xs font-bold tracking-widest px-6 py-3 rounded">{editing ? "UPDATE SET →" : "SAVE SET →"}</button>
            {editing && <button onClick={() => { setForm(empty); setEditing(null); setMsg(""); }} className="border border-zinc-600 text-xs font-bold tracking-widest px-6 py-3 rounded">CANCEL</button>}
          </div>
        </div>
        <h2 className="font-bold mt-8">Saved Sets ({list.length})</h2>
        {loading ? <p className="text-zinc-400 text-sm mt-3">Loading...</p> : list.length === 0 ? <p className="text-zinc-400 text-sm mt-3">Abhi koi Admin Set nahi hai — Combo page pe purani Deals dikh rahi hain.</p> : (
          <div className="mt-4 space-y-3">{list.map((c) => (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-3"><img src={c.image} alt={c.title} className="w-16 h-16 object-cover rounded shrink-0" /><div><p className="font-bold">{c.title} <span className="text-xs bg-[#D4AF37] text-black px-2 py-0.5 rounded ml-1">{c.tag}</span> {!c.is_active && <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded ml-1">HIDDEN</span>}</p>
              <p className="text-zinc-400 text-sm mt-1">{c.items.length ? c.items.map((it: any) => `${it.name} $${it.price}`).join(" + ") : c.description}</p>
              <p className="text-sm mt-1"><span className="line-through text-zinc-500">${c.old_price}</span> <b className="text-[#D4AF37]">${c.price}</b> <span className="text-green-400">Save ${c.old_price - c.price}</span></p></div></div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => edit(c)} className="bg-white text-black text-xs font-bold px-4 py-2 rounded">EDIT</button>
                <button onClick={() => toggle(c)} className="border border-zinc-600 text-xs font-bold px-4 py-2 rounded">{c.is_active ? "HIDE" : "LIVE"}</button>
                <button onClick={() => del(c)} className="border border-red-500 text-red-400 text-xs font-bold px-4 py-2 rounded">DELETE</button>
              </div>
            </div>
          ))}</div>
        )}
      </div>
    </main>
  );
}
