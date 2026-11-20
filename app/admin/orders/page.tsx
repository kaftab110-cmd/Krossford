"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/lead").then(r => r.json()).then(d => {
      if (Array.isArray(d)) setOrders(d);
      else if (d?.leads) setOrders(d.leads);
      else setOrders([]);
    }).catch(() => setOrders([]));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">Total: {orders.length}</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Orders</h1>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs">
          <p className="text-zinc-400">TOTAL ORDERS</p>
          <p className="text-xl font-bold text-white mt-1">{orders.length}</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">
            No orders yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {orders.map((o: any, i: number) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs space-y-1">
                <p className="font-bold text-white">{o.name || o.email || "New Order"}</p>
                <p className="text-zinc-400">{o.email} • {o.whatsapp || o.phone || ""}</p>
                <p className="text-zinc-400">Total: {o.total || o.amount || "-"} • Qty: {o.quantity || "-"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}