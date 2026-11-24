"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Lead = {
  id?: number | string;
  order_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  quantity?: string | number;
  total_quantity?: string | number;
  total?: string;
  amount?: string;
  lead_status?: string;
  status?: string;
  priority?: string;
  created_at?: string;
  message?: string;
};

type Customer = {
  key: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  total_orders: number;
  total_quantity: number;
  total_spent: number;
  lead_status: string;
  priority: string;
  last_order_id: string;
  last_order_date: string;
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

function getTotalVal(o: Lead): string {
  const direct = clean(o.total || o.amount);
  if (direct) return direct;
  const msg = o.message ? o.message : "";
  return fieldFromMessage(msg, "Total");
}

export default function AdminCustomersCRM() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/lead", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: unknown) => {
        let leads: Lead[] = [];
        if (Array.isArray(data)) leads = data as Lead[];
        else if (data && typeof data === "object" && "leads" in data && Array.isArray((data as { leads: unknown }).leads)) leads = (data as { leads: Lead[] }).leads;
        const map: Record<string, Customer> = {};
        leads.forEach((o) => {
          const email = clean(o.email).toLowerCase();
          const phone = clean(o.whatsapp || o.phone);
          const key = email || phone || clean(o.name).toLowerCase() || "unknown";
          if (!map[key]) {
            map[key] = {
              key,
              name: clean(o.name) || "New Customer",
              email: clean(o.email),
              whatsapp: phone,
              country: clean(o.country) || fieldFromMessage(o.message || "", "Country"),
              total_orders: 0,
              total_quantity: 0,
              total_spent: 0,
              lead_status: "New",
              priority: clean(o.priority) || "Normal",
              last_order_id: clean(o.order_id),
              last_order_date: o.created_at || "",
            };
          }
          const c = map[key];
          c.total_orders = c.total_orders + 1;
          const q = Number(o.total_quantity || o.quantity || 1) || 1;
          c.total_quantity = c.total_quantity + q;
          const tv = getTotalVal(o);
          const n = Number(tv.replace(/[^0-9.]/g, ""));
          if (Number.isFinite(n)) c.total_spent = c.total_spent + n;
          if (!c.name || c.name === "New Customer") c.name = clean(o.name) || c.name;
          if (!c.email) c.email = clean(o.email);
          if (!c.whatsapp) c.whatsapp = phone;
          if (!c.country) c.country = clean(o.country) || fieldFromMessage(o.message || "", "Country");
          if (clean(o.priority) === "HIGH PRIORITY") c.priority = "HIGH PRIORITY";
          if (o.created_at && (!c.last_order_date || new Date(o.created_at).getTime() > new Date(c.last_order_date).getTime())) {
            c.last_order_date = o.created_at;
            c.last_order_id = clean(o.order_id);
          }
        });
        const list: Customer[] = Object.keys(map).map((k) => {
          const c = map[k];
          if (c.total_spent >= 500) c.lead_status = "VIP";
          else if (c.total_orders > 1) c.lead_status = "Repeat";
          else c.lead_status = "New";
          return c;
        }).sort((a, b) => b.total_spent - a.total_spent);
        setCustomers(list);
        setLoading(false);
      })
      .catch(() => {
        setCustomers([]);
        setLoading(false);
      });
  }, []);

  const filtered = customers.filter((c) => {
    const s = search.toLowerCase();
    const matchesSearch = (c.name || "").toLowerCase().includes(s) || (c.email || "").toLowerCase().includes(s) || (c.whatsapp || "").includes(search);
    if (filter === "All") return matchesSearch;
    return matchesSearch && c.lead_status === filter;
  });

  const totalRevenue = customers.reduce((a, b) => a + b.total_spent, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">Total Records: {loading ? "..." : customers.length}</span>
        </div>

        <h1 className="text-2xl font-serif tracking-[0.2em] font-bold text-amber-400 uppercase text-center">KROSSFORD Customer CRM & VIP Hub</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL CUSTOMERS</p>
            <p className="text-xl font-bold text-white mt-1">{loading ? "..." : customers.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">REPEAT CUSTOMERS</p>
            <p className="text-xl font-bold text-green-400 mt-1">{customers.filter((c) => c.total_orders > 1).length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">VIP ACCOUNTS</p>
            <p className="text-xl font-bold text-amber-400 mt-1">{customers.filter((c) => c.lead_status === "VIP").length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL UNITS ORDERED</p>
            <p className="text-xl font-bold text-blue-400 mt-1">{customers.reduce((a, b) => a + b.total_quantity, 0)} Pcs</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900 p-4 rounded border border-zinc-800">
          <input type="text" placeholder="Search by Name, Email or WhatsApp..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs w-full md:w-80 outline-none focus:border-amber-400" />
          <div className="flex gap-2">
            {["All", "New", "Repeat", "VIP"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded text-xs font-bold uppercase ${filter === f ? "bg-amber-400 text-black" : "bg-zinc-950 text-zinc-400 border border-zinc-800"}`}>{f}</button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">Loading customers...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">No customers yet. Pehle ek test order karo.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((c) => (
              <div key={c.key} className="bg-zinc-900 border border-zinc-800 p-4 rounded space-y-3">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white">{c.name || c.email}</h3>
                    <p className="text-xs text-zinc-400">{c.whatsapp} • {c.country}</p>
                    <p className="text-xs text-zinc-500 mt-1">{c.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${c.lead_status === "VIP" ? "bg-amber-400 text-black" : c.total_orders > 1 ? "bg-green-600 text-white" : "bg-zinc-800 text-zinc-300"}`}>
                    {c.lead_status === "VIP" ? "VIP REPEAT" : c.total_orders > 1 ? "REPEAT" : "NEW"}
                  </span>
                </div>
                <div className="text-xs space-y-1 text-zinc-300">
                  <p><span className="text-zinc-500">Total Orders:</span> {c.total_orders}</p>
                  <p><span className="text-zinc-500">Total Quantity:</span> {c.total_quantity} Pcs</p>
                  <p><span className="text-zinc-500">Total Spent:</span> ${c.total_spent.toFixed(2)}</p>
                  <p><span className="text-zinc-500">Last Order:</span> {c.last_order_id} - {c.last_order_date ? new Date(c.last_order_date).toLocaleString() : "-"}</p>
                  <p><span className="text-zinc-500">Priority Level:</span> <span className={c.priority === "HIGH PRIORITY" ? "text-red-400 font-bold" : "text-zinc-400"}>{c.priority}</span></p>
                </div>
                <div className="flex gap-2 pt-2">
                  {c.whatsapp ? <a href={`https://wa.me/${c.whatsapp?.replace(/[^0-9]/g, "")}`} target="_blank" className="flex-1 bg-green-600 text-white text-center py-1.5 rounded font-bold text-xs uppercase">WhatsApp Chat</a> : <span className="flex-1 bg-zinc-800 text-zinc-500 text-center py-1.5 rounded font-bold text-xs uppercase">No WhatsApp</span>}
                  {c.email ? <a href={`mailto:${c.email}`} className="flex-1 bg-amber-400 text-black text-center py-1.5 rounded font-bold text-xs uppercase">Email History</a> : <span className="flex-1 bg-zinc-800 text-zinc-500 text-center py-1.5 rounded font-bold text-xs uppercase">No Email</span>}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && customers.length > 0 ? (
          <p className="text-center text-xs text-zinc-500">Total Revenue from Customers: ${totalRevenue.toFixed(2)}</p>
        ) : null}
      </div>
    </div>
  );
}
