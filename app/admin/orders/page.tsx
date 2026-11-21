"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/lead", { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) setOrders(d);
        else if (d?.leads) setOrders(d.leads);
        else setOrders([]);
        setLoading(false);
      })
      .catch(() => {
        setError("Orders load nahi hue. Dobara try karo.");
        setOrders([]);
        setLoading(false);
      });
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
          <p className="text-xl font-bold text-white mt-1">{loading ? "..." : orders.length}</p>
          {error ? <p className="text-red-400 mt-2">{error}</p> : null}
          {!loading && orders.length === 0 ? <p className="text-zinc-500 mt-2">Supabase leads table me abhi koi row nahi hai. Pehle ek test order karo.</p> : null}
        </div>

        {loading ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">
            No orders yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {orders.map((o: any, i: number) => (
              <div key={o.id || i} className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs space-y-1">
                <div className="flex justify-between gap-2">
                  <p className="font-bold text-white text-sm">{o.name || "New Order"}</p>
                  <p className="text-amber-400 font-bold">{o.order_id || o.orderId || ""}</p>
                </div>
                <p className="text-zinc-400">{o.email || "No email"} • {o.whatsapp || o.phone || "No phone"}</p>
                <p className="text-zinc-400">Total: {o.total || o.amount || "-"} • Qty: {o.quantity || o.total_quantity || "-"}</p>
                <p className="text-zinc-500">Status: {o.lead_status || "New"} • Priority: {o.priority || "Normal"} • Country: {o.country || "-"}</p>
                <p className="text-zinc-500">{o.created_at ? new Date(o.created_at).toLocaleString() : ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}