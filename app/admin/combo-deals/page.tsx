"use client";
import { useEffect, useState } from "react";

// ADMIN COMBO DEALS - FINAL
// Yahan se Deal banao gi - VS Code khole baghair.
// RULE: Title + Deal Price zaroori hai. Old Price = 2 Singles ka total likho - Save khud banega.
// Jis product ki inventory zyada hai usko Deal me lagao - uski photo ka naam /images/... me likho.
type Combo = { id?: number; title: string; tag: string; description: string; detail: string; old_price: number; price: number; image: string; alt: string; is_active: boolean };
const empty: Combo = { title: "", tag: "BEST SELLER", description: "", detail: "", old_price: 0, price: 0, image: "/images/messenger-bag.jpg", alt: "", is_active: true };

export default function AdminComboDeals() {
  const [list, setList] = useState<Combo[]>([]);
  const [form, setForm] = useState<Combo>(empty);
  const [editing, setEditing] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/combo-deals", { cache: "no-store" });
      const j = await r.json().catch(() => ({}));
      const arr = (j.combos || []).map((c: any) => ({ id: c.id, title: c.title, tag: c.tag || "COMBO", description: c.description || c.desc || "", detail: c.detail || "", old_price: Number(c.old_price ?? c.oldPrice ?? 0), price: Number(c.price || 0), image: c.image || "/images/messenger-bag.jpg", alt: c.alt || "", is_active: c.is_active !== false }));
      setList(arr);
    } catch { setList([]); }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  function set(k: keyof Combo, v: any) { setForm((f) => ({ ...f, [k]: v })); }
  async function save() {
    if (!form.title.trim()) { setMsg("❌ Title likho - jaise Messenger + Wallet Combo"); return; }
    if (!form.price || Number(form.price) <= 0) { setMsg("❌ Deal Price likho - jaise 169"); return; }
    setMsg("Saving...");
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...form, id: editing } : form;
    const r = await fetch("/api/combo-deals", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setMsg("❌ " + (j.error || "Save fail")); return; }
    setMsg("✅ Deal save ho gayi - Combo page pe dikhegi");
    setForm(empty); setEditing(null); load();
  }
  async function edit(c: Combo) { setForm(c); setEditing(c.id || null); setMsg("Edit kar rahi ho: " + c.title); window.scrollTo({ top: 0, behavior: "smooth" }); }
  async function toggle(c: Combo) {
    await fetch("/api/combo-deals", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id, is_active: !c.is_active }) });
    setMsg(c.is_active ? "✅ Deal Hide ho gayi" : "✅ Deal Live ho gayi"); load();
  }
  async function del(c: Combo) {
    if (!confirm("Delete karni hai? " + c.title)) return;
    await fetch("/api/combo-deals", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: c.id }) });
    setMsg("✅ Deal delete ho gayi"); load();
  }
  const saveAmt = Number(form.old_price || 0) - Number(form.price || 0);
  return (
    <main className="bg-zinc-950 text-white min-h-screen p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#D4AF37] text-xs tracking-[0.35em]">KROSSFORD ADMIN</p>
        <h1 className="text-3xl font-bold mt-1">COMBO DEALS — ADMIN</h1>
        <p className="text-zinc-400 text-sm mt-2">Yahan se Deal banao / Edit / Hide / Delete karo. Deal save hote hi Combo page pe dikhegi. Save = Old Price - Deal Price khud banega.</p>
        {msg && <p className="mt-4 bg-zinc-900 border border-zinc-800 rounded p-3 text-sm">{msg}</p>}
        <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-5 space-y-3">
          <h2 className="font-bold">{editing ? "Deal Edit Karo" : "Nayi Deal Banao"}</h2>
          <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Title — jaise Messenger + Wallet Combo" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          <div className="grid sm:grid-cols-2 gap-3">
            <select value={form.tag} onChange={(e) => set("tag", e.target.value)} className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm">
              <option>BEST SELLER</option><option>TRAVEL</option><option>DAILY USE</option><option>COMBO</option><option>LIMITED</option>
            </select>
            <input value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="Photo — /images/messenger-bag.jpg" className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          </div>
          <input value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Desc — jaise Crossbody Messenger Bag + RFID Wallet" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          <input value={form.detail} onChange={(e) => set("detail", e.target.value)} placeholder="Detail — jaise Bag + Wallet together, better value" className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-sm" />
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-sm text-zinc-400">Old Price (1 + 1 Alag ka total)<input type="number" value={form.old_price} onChange={(e) => set("old_price", Number(e.target.value))} className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white" /></label>
            <label className="text-sm text-zinc-400">Deal Price (Combo Price)<input type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} className="w-full mt-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-white" /></label>
          </div>
          <p className="text-sm">Save khud banega: <b className="text-green-400">Save ${saveAmt > 0 ? saveAmt : 0}</b> {saveAmt <= 0 && <span className="text-zinc-500">(Old Price Deal Price se zyada likho)</span>}</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} /> Live — Combo page pe dikhegi</label>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#D4AF37] text-black text-xs font-bold tracking-widest px-6 py-3 rounded">{editing ? "UPDATE DEAL →" : "SAVE DEAL →"}</button>
            {editing && <button onClick={() => { setForm(empty); setEditing(null); setMsg(""); }} className="border border-zinc-600 text-xs font-bold tracking-widest px-6 py-3 rounded">CANCEL</button>}
          </div>
        </div>
        <h2 className="font-bold mt-8">Saved Deals ({list.length})</h2>
        {loading ? <p className="text-zinc-400 text-sm mt-3">Loading...</p> : list.length === 0 ? <p className="text-zinc-400 text-sm mt-3">Abhi koi Admin Deal nahi hai — Combo page pe purani 3 Deals (fallback) dikh rahi hain. Upar se nayi Deal banao.</p> : (
          <div className="mt-4 space-y-3">{list.map((c) => (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div><p className="font-bold">{c.title} <span className="text-xs bg-[#D4AF37] text-black px-2 py-0.5 rounded ml-1">{c.tag}</span> {!c.is_active && <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded ml-1">HIDDEN</span>}</p>
              <p className="text-zinc-400 text-sm mt-1">{c.description}</p>
              <p className="text-sm mt-1"><span className="line-through text-zinc-500">${c.old_price}</span> <b className="text-[#D4AF37]">${c.price}</b> <span className="text-green-400">Save ${c.old_price - c.price}</span></p></div>
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
