"use client";
import { useEffect, useState } from "react";
type Settings = Record<string, string>;
const PAGES = [
  { key: "combo_live", title: "Combo Deals", desc: "Messenger + Wallet, Travel, Daily Use combos" },
  { key: "sale_live", title: "Sale", desc: "Discount / Sale page" },
  { key: "announcements_live", title: "Announcements", desc: "New launches aur news page" },
];
export default function PagesControlPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  async function load() {
    try { const res = await fetch("/api/site-settings", { cache: "no-store" }); const data = await res.json(); setSettings(data || {}); }
    catch { setMsg("Settings load nahi hue — page refresh karo."); }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);
  async function toggle(key: string, title: string) {
    // FIX: Double-click guard + rollback - API fail ho to UI wapas purani halat pe aa jayega
    if (savingKey) return;
    const prev = settings[key] === "true";
    const next = String(!prev);
    setSavingKey(key); setMsg("");
    setSettings((p) => ({ ...p, [key]: next }));
    try {
      const res = await fetch("/api/site-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, value: next }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || j.ok === false) throw new Error(j.error || "Save nahi hua");
      setMsg(`✅ ${title} - ${next === "true" ? "LIVE ho gaya." : "COMING SOON ho gaya."} Site pe check karo.`);
    } catch {
      setSettings((p) => ({ ...p, [key]: String(prev) }));
      setMsg(`❌ ${title} - Save nahi hua. Dobara try karo, page refresh karke check karo.`);
    }
    setSavingKey(null);
  }
  if (loading) return <main className="bg-black text-white min-h-screen pt-28 text-center">Loading...</main>;
  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-[#D4AF37] text-xs tracking-[0.3em]">KROSSFORD ADMIN</p>
        <h1 className="text-3xl font-bold mt-2">Pages Control</h1>
        <p className="text-zinc-400 text-sm mt-2">Yahan se page ko LIVE ya COMING SOON karo. VS Code kholne ki zaroorat nahi.</p>
        {msg ? <p className="text-xs bg-zinc-950 border border-zinc-800 p-3 rounded mt-4">{msg}</p> : null}
        <div className="mt-8 space-y-4">
          {PAGES.map((p) => {
            const isLive = settings[p.key] === "true";
            const saving = savingKey === p.key;
            return (
              <div key={p.key} className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 flex items-center justify-between gap-4">
                <div><h2 className="font-bold">{p.title}</h2><p className="text-zinc-400 text-sm mt-1">{p.desc}</p><p className="text-xs mt-2">Status: {isLive ? <span className="text-green-400 font-bold">● LIVE</span> : <span className="text-[#D4AF37] font-bold">● COMING SOON</span>}</p></div>
                <button onClick={() => toggle(p.key, p.title)} disabled={saving} className={`shrink-0 text-xs font-bold px-5 py-3 rounded ${saving ? "bg-zinc-700 text-zinc-400" : isLive ? "bg-green-600 text-white" : "bg-[#D4AF37] text-black"}`}>{saving ? "Saving..." : isLive ? "HIDE → COMING SOON" : "MAKE LIVE →"}</button>
              </div>
            );
          })}
        </div>
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mt-6 text-sm text-zinc-400"><b className="text-white">Guide:</b> Button dabate hi website khud badal jayegi. Agar abhi bhi purana dikhe to page ko Refresh karo (Ctrl + R).</div>
      </div>
    </main>
  );
}
