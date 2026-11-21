"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = {
  name?: string;
  image?: string;
  color?: string;
  colorName?: string;
  size?: string;
  qty?: number;
  quantity?: number;
  price?: number;
  unitPrice?: number;
  customization?: string;
};

type Order = {
  id?: number | string;
  order_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  product?: string;
  quantity?: string | number;
  total_quantity?: number;
  total?: string;
  amount?: string;
  subtotal?: string;
  shipping?: string;
  delivery_charges?: string;
  lead_status?: string;
  status?: string;
  priority?: string;
  source?: string;
  created_at?: string;
  message?: string;
  items?: Item[] | string | null;
};

function clean(v: unknown): string {
  const s = String(v === null || v === undefined ? "" : v).trim();
  if (s.toUpperCase() === "EMPTY" || s.toUpperCase() === "NULL" || s === "-") return "";
  return s;
}

function fieldFromMessage(msg: string, label: string): string {
  const key = label + ":";
  const idx = msg.indexOf(key);
  if (idx < 0) return "";
  const rest = msg.slice(idx + key.length);
  const line = rest.split("\n")[0] || "";
  return clean(line.trim());
}

function parseItems(o: Order): Item[] {
  if (Array.isArray(o.items)) return o.items;
  if (typeof o.items === "string" && o.items.trim() !== "" && o.items.trim() !== "[]") {
    try {
      const p = JSON.parse(o.items);
      if (Array.isArray(p)) return p as Item[];
    } catch {
      return [];
    }
  }
  if (o.message) {
    const idx = o.message.indexOf("Items:");
    if (idx >= 0) {
      const rest = o.message.slice(idx + 6).trim();
      try {
        const p = JSON.parse(rest);
        if (Array.isArray(p)) return p as Item[];
      } catch {
        return [];
      }
    }
  }
  return [];
}

function getTotalVal(o: Order): string {
  const direct = clean(o.total || o.amount);
  if (direct) return direct;
  const msg = o.message ? o.message : "";
  return fieldFromMessage(msg, "Total");
}

function getSubtotalVal(o: Order, totalVal: string, dc: string): string {
  const direct = clean(o.subtotal);
  if (direct) return direct;
  const msg = o.message ? o.message : "";
  const fromMsg = fieldFromMessage(msg, "Subtotal");
  if (fromMsg) return fromMsg;
  if (totalVal) {
    const t = Number(totalVal.replace(/[^0-9.]/g, ""));
    const d = Number((dc || "$0.00").replace(/[^0-9.]/g, ""));
    if (Number.isFinite(t)) return "$" + (t - (Number.isFinite(d) ? d : 0)).toFixed(2);
  }
  return "";
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

  useEffect(() => {
    setLoading(true);
    fetch("/api/lead", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setOrders(d as Order[]);
        else if (d && d.leads) setOrders(d.leads as Order[]);
        else setOrders([]);
        setLoading(false);
      })
      .catch(() => {
        setError("Orders load nahi hue. Dobara try karo.");
        setOrders([]);
        setLoading(false);
      });
  }, []);

  function getStatus(o: Order): string {
    const key = String(o.id || o.order_id || "");
    if (statusMap[key]) return statusMap[key];
    const s = clean(o.lead_status || o.status);
    if (s) return s;
    return "New";
  }

  function changeStatus(o: Order, next: string) {
    const key = String(o.id || o.order_id || "");
    const nextMap: Record<string, string> = {};
    Object.keys(statusMap).forEach((k) => { nextMap[k] = statusMap[k]; });
    nextMap[key] = next;
    setStatusMap(nextMap);
    fetch("/api/lead", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: o.id, order_id: o.order_id, status: next.toLowerCase(), lead_status: next }),
    }).catch(() => {});
  }

  const q = search.trim().toLowerCase();
  const filtered: Order[] = [];
  orders.forEach((o) => {
    if (statusFilter !== "All" && getStatus(o).toLowerCase() !== statusFilter.toLowerCase()) return;
    if (q) {
      const hay = (clean(o.order_id) + " " + clean(o.name) + " " + clean(o.email) + " " + clean(o.phone || o.whatsapp)).toLowerCase();
      if (hay.indexOf(q) < 0) return;
    }
    filtered.push(o);
  });

  let totalRevenue = 0;
  filtered.forEach((o) => {
    const tv = getTotalVal(o);
    const n = Number(tv.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(n)) totalRevenue = totalRevenue + n;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">Total: {orders.length}</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Orders</h1>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs">
            <p className="text-zinc-400">TOTAL ORDERS</p>
            <p className="text-xl font-bold text-white mt-1">{loading ? "..." : orders.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs">
            <p className="text-zinc-400">TOTAL REVENUE (Filtered)</p>
            <p className="text-xl font-bold text-amber-400 mt-1">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        {error ? <p className="text-red-400 text-xs">{error}</p> : null}
        {!loading && orders.length === 0 ? <p className="text-zinc-500 text-xs">Supabase leads table me abhi koi row nahi hai. Pehle ek test order karo.</p> : null}

        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Order ID / Name / Email / Phone..." className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-amber-400 placeholder:text-zinc-500" />

        <div className="flex flex-wrap gap-2">
          {["All", "New", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={statusFilter === s ? "px-3 py-1.5 rounded text-xs font-bold border bg-amber-400 text-black border-amber-400" : "px-3 py-1.5 rounded text-xs font-bold border bg-zinc-900 border-zinc-700 text-zinc-300"}>{s}</button>
          ))}
        </div>

        {loading ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">Loading orders...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">No orders yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filtered.map((o, i) => {
              const items = parseItems(o);
              const msg = o.message ? o.message : "";
              const country = clean(o.country) || fieldFromMessage(msg, "Country");
              const address = fieldFromMessage(msg, "Address");
              const city = fieldFromMessage(msg, "City");
              const dc = clean(o.delivery_charges || o.shipping) || fieldFromMessage(msg, "Shipping") || "$0.00";
              const totalVal = getTotalVal(o);
              const subtotalVal = getSubtotalVal(o, totalVal, dc);
              const status = getStatus(o);
              const isOpen = String(o.id || o.order_id || "") === String(selectedId || "");
              let qtyNum = 0;
              if (o.total_quantity) qtyNum = o.total_quantity;
              else if (o.quantity) qtyNum = Number(o.quantity) || 0;
              else {
                items.forEach((it) => { qtyNum = qtyNum + (it.qty || it.quantity || 1); });
              }
              return (
                <div key={String(o.id || o.order_id || i)} className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs space-y-1">
                  <div className="flex justify-between gap-2">
                    <p className="font-bold text-white text-sm">{clean(o.name) || "New Order"}</p>
                    <p className="text-amber-400 font-bold">{clean(o.order_id)}</p>
                  </div>
                  <p className="text-zinc-400">{clean(o.email) || "No email"} | {clean(o.whatsapp || o.phone) || "No phone"}</p>
                  <p className="text-zinc-400">Total: {totalVal || "-"} | Subtotal: {subtotalVal || "-"} | DC: {dc || "$0.00"} | Qty: {String(qtyNum)}</p>
                  <p className="text-zinc-500">Status: {status} | Country: {country || "-"} | {city ? city + ", " : ""}{o.created_at ? new Date(o.created_at).toLocaleString() : ""}</p>
                  {o.product ? <p className="text-zinc-300">Products: {o.product}</p> : null}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button onClick={() => setSelectedId(isOpen ? null : String(o.id || o.order_id || ""))} className="bg-zinc-950 border border-zinc-700 px-3 py-2 rounded text-xs font-bold hover:border-amber-400">{isOpen ? "Hide Detail" : "View Detail"}</button>
                    {["Confirmed", "Shipped", "Delivered"].map((s) => (
                      <button key={s} onClick={() => changeStatus(o, s)} className={status === s ? "px-3 py-2 rounded text-xs font-bold border bg-green-500 text-white border-green-500" : "px-3 py-2 rounded text-xs font-bold border bg-zinc-950 border-zinc-700 hover:border-amber-400"}>Mark {s}</button>
                    ))}
                  </div>
                  {isOpen ? (
                    <div className="mt-3 bg-zinc-950 border border-zinc-800 rounded p-3 space-y-3">
                      <p className="font-bold text-white text-sm">Order Detail - {clean(o.order_id)}</p>
                      <div className="grid md:grid-cols-2 gap-2 text-zinc-300">
                        <p><span className="text-zinc-500">Name: </span>{clean(o.name) || "-"}</p>
                        <p><span className="text-zinc-500">Email: </span>{clean(o.email) || "-"}</p>
                        <p><span className="text-zinc-500">Phone: </span>{clean(o.whatsapp || o.phone) || "-"}</p>
                        <p><span className="text-zinc-500">Country: </span>{country || "-"}</p>
                        <p><span className="text-zinc-500">City: </span>{city || "-"}</p>
                        <p><span className="text-zinc-500">Address: </span>{address || "-"}</p>
                        <p><span className="text-zinc-500">Subtotal: </span>{subtotalVal || "-"}</p>
                        <p><span className="text-zinc-500">Delivery Charges (DC): </span>{dc || "$0.00"}</p>
                        <p><span className="text-zinc-500">Total: </span>{totalVal || "-"}</p>
                        <p><span className="text-zinc-500">Quantity: </span>{String(qtyNum)}</p>
                        <p><span className="text-zinc-500">Status: </span>{status}</p>
                        <p><span className="text-zinc-500">Source: </span>{clean(o.source) || "-"}</p>
                        <p><span className="text-zinc-500">Date: </span>{o.created_at ? new Date(o.created_at).toLocaleString() : "-"}</p>
                      </div>
                      {o.product ? <p className="text-zinc-300"><span className="text-zinc-500">Products: </span>{o.product}</p> : null}
                      {items.length > 0 ? (
                        <div className="space-y-2">
                          <p className="font-bold text-white">Items:</p>
                          {items.map((it, idx) => (
                            <div key={idx} className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded p-2">
                              {it.image ? <img src={it.image} alt={it.name || "Product"} className="w-16 h-16 object-cover rounded" /> : null}
                              <div>
                                <p className="font-bold text-white">{it.name || "Product"}</p>
                                <p className="text-zinc-400">Colour: {it.color || it.colorName || "-"} | Size: {it.size || "-"} | Qty: {it.qty || it.quantity || 1} | Price: ${it.price === undefined ? it.unitPrice : it.price}</p>
                                {it.customization ? <p className="text-amber-400/90">Custom: {it.customization}</p> : null}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-zinc-500">Items detail purane orders me message se aayega.</p>
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