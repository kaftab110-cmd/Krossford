"use client";
import { useEffect, useState } from "react";
// ADMIN SALE DEALS - FINAL - ADMIN SE CHALEGA
// Yahan se Sale Item + PRICE banao gi - VS Code khole baghair.
// RULE: Title + Old Price zaroori hai. Discount % likho - Sale Price khud banega: Old * (1 - Discount/100)
// Biker / Wallet PENDING - jo price yahan likhogi wahi dikhega, code wali price nahi.
type Item = { id?: number; cat: string; title: string; description: string; old: number; discount: number; image: string; alt: string; is_active: boolean };
const empty: Item = { cat: "BAGS", title: "", description: "", old: 0, discount: 0, image: "/images/leather-duffle-bag.jpg", alt: "", is_active: true };
export default function AdminSaleDeals() {
  const [list, setList] = useState<Item[]>([]);
  const [form, setForm] = useState<Item>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/sale-deals", { cache: "no-store" });
      const j = await r.json().catch(() => ({}));
      const arr = (j.items || []).map((c: any) => ({ id: c.id, cat: c.cat || c.category || "SALE", title: c.title, description: c.description || c.desc || "", old: Number(c.old ?? c.old_price ?? 0), discount: Number(c.discount ?? 0), image: c.image || "/images/leather-duffle-bag.jpg", alt: c.alt || "", is_active: c.is_active !== false }));
      setList(arr);
    } catch { setList([]); }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  function set(k: keyof Item, v: any) { setForm((f) => ({ ...f, [k]: v })); }
  async function save() {
    if (!form.title.trim()) { setMsg("❌ Title likho - jaise Leather Duffle Bag"); return; }
    if (!form.old || Number(form.old) <= 0) { setMsg("❌ Old Price likho - jaise 189"); return; }
    if (Number(form.discount) > 40) { setMsg("⚠ Discount 40% se zyada hai - dobara check karo. Agar pakka hai to Discount 40 ya kam likho."); return; }
    setMsg("Saving...");
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...form, id: editing } : form;
    const r = await fetch("/api/sale-deals", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setMsg("❌ " + (j.error || "Save fail")); return; }
    setMsg("✅ Sale Item save ho gaya - Sale page pe dikhega");
    setForm(empty); setEditing(null); load();
  }
  async function edit(c: Item) { setForm(c); setEditing(c.id || null); setMsg("Edit kar rahi ho: " + c.title); window.scrollTo({ top: 0, behavior: "smooth" }); }
  async function toggle(c: Item) {
    await fetch("/api/sale-deals", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, is_active: !c.is_active }) });
    setMsg(c.is_active ? "✅ Item Hide ho gaya" : "✅ Item Live ho gaya"); load();
  }
  async function del(c: Item) {
    if (!confirm("Delete karni hai? " + c.title)) return;
    await fetch("/api/sale-deals", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id }) });
    setMsg("✅ Item delete ho gaya"); load();
  }
  const salePrice = Math.round(Number(form.old || 0) * (1 - Number(form.discount || 0) / 100));
  return (
    <main className="bg-zinc-950 text-white min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#D4AF37] text-xs tracking-[0.35em]">KROSSFORD ADMIN</p>
        <h1 className="text-3xl font-bold mt-1">SALE — ADMIN</h1>
        <p className="text-zinc-400 text-sm mt-2">Yahan se Sale Item + PRICE banao / Edit / Hide / Delete karo. Price save hote hi Sale page pe dikhega. Sale Price khud banega.</p>
        {msg && <p className="mt-4 bg-zinc-900 border border-zinc-800 rounded p-3 text-sm">{msg}</p>}
        <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-5 space-y-3">
          <h2 className="font-bold">{editing ? "Sale Item Edit Karo" : "Nayi Sale Item Banao"}</h2>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Title — jaise Leather Duffle Bag" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          <div className="grid sm:grid-cols-2 gap-3">
            <select value={form.cat} onChange={(e) => set("cat", e.target.value)} className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm">
              <option>BAGS</option><option>WALLETS</option><option>FOR HIM</option><option>FOR HER</option><option>JACKETS</option><option>SALE</option>
            </select>
            <input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="Photo — /images/leather-duffle-bag.jpg" className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          </div>
          <input value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Desc — jaise Best seller bag - now at sale price." className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm text-zinc-400">Old Price (pehle wali price)<input type="number" value={form.old} onChange={(e) => set("old", Number(e.target.value))} className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white" /></label>
            <label className="text-sm text-zinc-400">Discount % (jaise 22)<input type="number" value={form.discount} onChange={(e) => set("discount", Number(e.target.value))} className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white" /></label>
          </div>
          <p className="text-sm">Sale Price khud banega: <b className="text-[#D4AF37]">${salePrice}</b> <span className="text-zinc-500">(Old ${Number(form.old || 0)} - {Number(form.discount || 0)}% OFF)</span></p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} /> Live — Sale page pe dikhega</label>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#D4AF37] text-black text-xs font-bold tracking-widest px-6 py-3 rounded">{editing ? "UPDATE SALE ITEM →" : "SAVE SALE ITEM →"}</button>
            {editing && <button onClick={() => { setForm(empty); setEditing(null); setMsg(""); }} className="border border-zinc-600 text-xs font-bold tracking-widest px-6 py-3 rounded">CANCEL</button>}
          </div>
        </div>
        <h2 className="font-bold mt-8">Saved Sale Items ({list.length})</h2>
        {loading ? <p className="text-zinc-400 text-sm mt-3">Loading...</p> : list.length === 0 ? <p className="text-zinc-400 text-sm mt-3">Abhi koi Admin Sale Item nahi hai — Sale page pe purani 3 Items (fallback) dikh rahi hain. Upar se nayi Item banao.</p> : (
          <div className="mt-4 space-y-3">{list.map((c) => {
            const sp = Math.round(c.old * (1 - c.discount / 100));
            return (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div><p className="font-bold">{c.title} <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded ml-1">{c.discount}% OFF</span> {!c.is_active && <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded ml-1">HIDDEN</span>}</p>
              <p className="text-zinc-400 text-sm mt-1">{c.description}</p>
              <p className="text-sm mt-1"><span className="line-through text-zinc-500">${c.old}</span> <b className="text-[#D4AF37]">${sp}</b></p></div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => edit(c)} className="bg-white text-black text-xs font-bold px-4 py-2 rounded">EDIT</button>
                <button onClick={() => toggle(c)} className="border border-zinc-600 text-xs font-bold px-4 py-2 rounded">{c.is_active ? "HIDE" : "LIVE"}</button>
                <button onClick={() => del(c)} className="border border-red-500 text-red-400 text-xs font-bold px-4 py-2 rounded">DELETE</button>
              </div>
            </div>
            );
          })}</div>
        )}
      </div>
    </main>
  );
}
