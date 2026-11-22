"use client";

import { useEffect, useState } from "react";

type Settings = {
  combo_live: boolean;
  sale_live: boolean;
  announcements_live: boolean;
};

const PAGES = [
  { key: "combo_live" as const, title: "Combo Deals", desc: "Bag + Wallet, Travel, Daily Use combos", link: "/combo-deals" },
  { key: "sale_live" as const, title: "Sale", desc: "Discount / Sale page", link: "/sale" },
  { key: "announcements_live" as const, title: "Announcements", desc: "New launches and news page", link: "/announcements" },
];

export default function AdminPagesControl() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/site-settings", { cache: "no-store" });
      const data = await res.json();
      setSettings({
        combo_live: data.combo_live === true || data.combo_live === "true",
        sale_live: data.sale_live === true || data.sale_live === "true",
        announcements_live: data.announcements_live === true || data.announcements_live === "true",
      });
    } catch {
      setSettings({ combo_live: false, sale_live: false, announcements_live: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async (key: keyof Settings) => {
    if (!settings || saving) return;
    const next = !settings[key];
    setSaving(key);
    try {
      await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: next }),
      });
      setSettings({ ...settings, [key]: next });
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return (
      <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
        <p className="text-sm text-zinc-400">Loading page controls...</p>
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest uppercase text-amber-400 font-bold">Krossford Admin</p>
          <h2 className="text-xl font-bold text-white mt-1">Pages Control</h2>
          <p className="text-sm text-zinc-400 mt-1">Pages stay on the website. They go LIVE only when you activate them here.</p>
        </div>
        <a href="/admin/pages-control" className="text-xs font-bold uppercase tracking-widest border border-amber-400 text-amber-400 px-4 py-2 rounded hover:bg-amber-400 hover:text-black">
          Open Pages Control →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {PAGES.map((p) => {
          const live = settings ? settings[p.key] : false;
          return (
            <div key={p.key} className="border border-zinc-800 rounded-lg p-4 bg-black">
              <p className="font-bold text-white">{p.title}</p>
              <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{p.desc}</p>
              <p className="text-xs mt-2">
                Status: <span className={live ? "text-green-400 font-bold" : "text-amber-400 font-bold"}>{live ? "● LIVE" : "● COMING SOON"}</span>
              </p>
              <button
                onClick={() => toggle(p.key)}
                disabled={saving === p.key}
                className={`w-full mt-3 py-2.5 rounded text-xs font-bold uppercase tracking-widest cursor-pointer ${live ? "bg-green-500 text-white hover:bg-green-600" : "bg-amber-400 text-black hover:bg-amber-300"}`}
              >
                {saving === p.key ? "Saving..." : live ? "Hide → Coming Soon" : "Make Live →"}
              </button>
              <a href={p.link} target="_blank" className="block text-center text-xs text-zinc-400 hover:text-amber-400 mt-2">View Page →</a>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-zinc-500 mt-4">Guide: Button dabate hi website khud badal jayegi. Agar purana dikhe to page ko Refresh karo.</p>
    </div>
  );
}
