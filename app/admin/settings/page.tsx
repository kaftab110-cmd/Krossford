"use client";

import Link from "next/link";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-xl font-bold text-amber-400 uppercase">Settings</h1>
          <Link href="/admin" className="text-xs text-zinc-400">Back to Dashboard -&gt;</Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3 text-xs">
          <p className="font-bold text-white">Admin Info</p>
          <p className="text-zinc-400">Admin Folder: <span className="text-white">app / admin — Sab kuch isi folder me hai</span></p>
          <p className="text-zinc-400">Dashboard: <span className="text-white">/admin</span></p>
          <p className="text-zinc-400">Customers: <span className="text-white">/admin/customers</span></p>
          <p className="text-zinc-400">Orders: <span className="text-white">/admin/orders</span></p>
          <p className="text-zinc-400">Products: <span className="text-white">/admin/products</span></p>
          <p className="text-zinc-400">Events: <span className="text-white">/admin/events</span></p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3 text-xs">
          <p className="font-bold text-white">Note</p>
          <p className="text-zinc-400">Password kabhi code me mat likhna. Password .env.local me hota hai.</p>
          <p className="text-zinc-400">Kuch bhi badalna ho — Sirf admin folder kholna hai — Bahar hath nahi dalna.</p>
        </div>
      </div>
    </div>
  );
}