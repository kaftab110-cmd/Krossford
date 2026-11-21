"use client";
import { useEffect, useState } from "react";

type Settings = Record<string, string>;

const PAGES = [
  { key: "combo_live", title: "Combo Deals", desc: "【entity-Messenger¦canonical_name=Messenger】 + Wallet, Travel, Daily Use combos" },
  { key: "sale_live", title: "Sale", desc: "Discount / Sale page" },
  { key: "announcements_live", title: "Announcements", desc: "New launches aur news page" },
];

export default function PagesControlPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/site-settings");
    const data = await res.json();
    setSettings(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggle(key: string) {
    const current = settings[key] === "true";
    const next = String(!current);
    setSettings((prev) => ({ ...prev, [key]: next }));
    await fetch("/api/site-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: next }),
    });
  }

  if (loading) return <main className="bg-black text-white min-h-screen pt-28 text-center">Loading...</main>;

  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <p className="text-[#D4AF37] text-xs tracking-[0.3em]">KROSSFORD ADMIN</p>
        <h1 className="text-3xl font-bold mt-2">Pages Control</h1>
        <p className="text-zinc-400 text-sm mt-2">Yahan se page ko LIVE ya COMING SOON karo. VS Code kholne ki zaroorat nahi.</p>

        <div className="mt-8 space-y-4">
          {PAGES.map((p) => {
            const isLive = settings[p.key] === "true";
            return (
              <div key={p.key} className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold">{p.title}</h2>
                  <p className="text-zinc-400 text-sm mt-1">{p.desc}</p>
                  <p className="text-xs mt-2">
                    Status: {isLive ? <span className="text-green-400 font-bold">● LIVE</span> : <span className="text-[#D4AF37] font-bold">● COMING SOON</span>}
                  </p>
                </div>
                <button
                  onClick={() => toggle(p.key)}
                  className={`shrink-0 text-xs font-bold px-5 py-3 rounded ${isLive ? "bg-green-600 text-white" : "bg-[#D4AF37] text-black"}`}
                >
                  {isLive ? "HIDE → COMING SOON" : "MAKE LIVE →"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mt-6 text-sm text-zinc-400">
          <b className="text-white">Guide:</b> Button dabate hi website khud badal jayegi. Agar abhi bhi purana dikhe to page ko Refresh karo.
        </div>
      </div>
    </main>
  );
}