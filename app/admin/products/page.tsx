"use client";

import Link from "next/link";

export default function AdminProducts() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-xl font-bold text-amber-400 uppercase">Products</h1>
          <Link href="/admin" className="text-xs text-zinc-400">Back to Dashboard -&gt;</Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center space-y-3">
          <p className="text-sm font-bold text-white">Products Yahan Se Manage Honge</p>
          <p className="text-xs text-zinc-400">Add / Edit / Price — Agle Step Me Yahan Button Lagayenge</p>
          <p className="text- text-amber-400">Abhi ke liye page ready hai — Baad me isko shop se jodenge</p>
        </div>
      </div>
    </div>
  );
}