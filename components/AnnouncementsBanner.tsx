"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ===== ANNOUNCEMENTS BANNER - HOME PAGE KE LIYE =====
// Rule: Jab Announcements page LIVE hoga, tabhi ye banner dikhega
// Jab COMING SOON hoga, banner khud chhup jayega
export default function AnnouncementsBanner() {
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/site-settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setLive(d.announcements_live === true || d.announcements_live === "true"))
      .catch(() => setLive(false));
  }, []);

  if (live !== true) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-6">
      <div className="relative overflow-hidden rounded-xl border border-amber-400/40 bg-zinc-950">
        <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-bold">New From Krossford</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 leading-tight">Something New Is Coming.</h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-2xl">
              New launches, collections and important updates from Krossford. Stay ahead — check the latest announcements.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/announcements" className="bg-amber-400 text-black px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-amber-300">
              View Announcements →
            </Link>
            <Link href="/shop" className="border border-zinc-600 text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:border-amber-400 hover:text-amber-400">
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
