"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

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

  const filtered = orders.filter((o: any) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return String(o.order_id || "").toLowerCase().includes(q) || String(o.name || "").toLowerCase().includes(q) || String(o.email || "").toLowerCase().includes(q);
  });

  const getItems = (o: any) => {
    if (Array.isArray(o.items)) return o.items;
    if (typeof o.items === "string") {
      try { const p = JSON.parse(o.items); if (Array.isArray(p)) return p; } catch {}
    }
    return [];
  };

  const selected = orders.find((o: any) => String(o.id || o.order_id) === String(selectedId));

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

        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Order ID / Name / Email..." className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-amber-400 placeholder:text-zinc-500" />

        {loading ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">No orders yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((o: any, i: number) => {
              const items = getItems(o);
              const isOpen = String(o.id || o.order_id) === String(selectedId);
              return (
                <div key={o.id || o.order_id || i} className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs space-y-1">
                  <div className="flex justify-between gap-2">
                    <p className="font-bold text-white text-sm">{o.name || "New Order"}</p>
                    <p className="text-amber-400 font-bold">{o.order_id || o.orderId || ""}</p>
                  </div>
                  <p className="text-zinc-400">{o.email || "No email"} • {o.whatsapp || o.phone || "No phone"}</p>
                  <p className="text-zinc-400">Total: {o.total || o.amount || "-"} • Qty: {o.quantity || o.total_quantity || "-"}</p>
                  <p className="text-zinc-500">Status: {o.lead_status || "New"} • Priority: {o.priority || "Normal"} • Country: {o.country || "-"}</p>
                  <p className="text-zinc-500">{o.created_at ? new Date(o.created_at).toLocaleString() : ""}</p>
                  {o.product ? <p className="text-zinc-300">Products: {o.product}</p> : null}
                  <button onClick={() => setSelectedId(isOpen ? null : String(o.id || o.order_id))} className="mt-2 bg-zinc-950 border border-zinc-700 px-3 py-2 rounded text-xs font-bold hover:border-amber-400">{isOpen ? "Hide Detail ↑" : "View Detail →"}</button>
                  {isOpen ? (
                    <div className="mt-3 bg-zinc-950 border border-zinc-800 rounded p-3 space-y-3">
                      <p className="font-bold text-white text-sm">Order Detail — {o.order_id}</p>
                      <div className="grid md:grid-cols-2 gap-2 text-zinc-300">
                        <p><span className="text-zinc-500">Name:</span> {o.name || "-"}</p>
                        <p><span className="text-zinc-500">Email:</span> {o.email || "-"}</p>
                        <p><span className="text-zinc-500">Phone:</span> {o.whatsapp || o.phone || "-"}</p>
                        <p><span className="text-zinc-500">Total:</span> {o.total || o.amount || "-"}</p>
                        <p><span className="text-zinc-500">Quantity:</span> {o.quantity || o.total_quantity || "-"}</p>
                        <p><span className="text-zinc-500">Status:</span> {o.lead_status || "New"}</p>
                        <p><span className="text-zinc-500">Country:</span> {o.country || "-"}</p>
                        <p><span className="text-zinc-500">Date:</span> {o.created_at ? new Date(o.created_at).toLocaleString() : "-"}</p>
                      </div>
                      {o.product ? <p className="text-zinc-300"><span className="text-zinc-500">Products:</span> {o.product}</p> : null}
                      {items.length > 0 ? (
                        <div className="space-y-2">
                          <p className="font-bold text-white">Items:</p>
                          {items.map((it: any, idx: number) => (
                            <div key={idx} className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded p-2">
                              {it.image ? <img src={it.image} alt={it.name || "Product"} className="w-16 h-16 object-cover rounded" /> : null}
                              <div>
                                <p className="font-bold text-white">{it.name || "Product"}</p>
                                <p className="text-zinc-400">Colour: {it.color || "-"} • Size: {it.size || "-"} • Qty: {it.quantity || 1} • Price: ${it.unitPrice || it.price || "-"}</p>
                                {it.customization ? <p className="text-amber-400/90">Custom: {it.customization}</p> : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-zinc-500">Items detail — purane orders me nahi hoga. Naye orders me product / message wale columns se aayega.</p>
                      )}
                      {o.message ? <div><p className="font-bold text-white">Full Message:</p><pre className="whitespace-pre-wrap text-zinc-300 bg-zinc-900 border border-zinc-800 rounded p-2 mt-1">{o.message}</pre></div> : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}