"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  id?: number | string;
  order_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  country?: string;
  total?: string;
  amount?: string;
  subtotal?: string;
  lead_status?: string;
  status?: string;
  created_at?: string;
  message?: string;
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

function getTotalVal(o: Order): string {
  const direct = clean(o.total || o.amount);
  if (direct) return direct;
  const msg = o.message ? o.message : "";
  return fieldFromMessage(msg, "Total");
}

const CARDS = [
  {
    title: "Orders",
    desc: "Sab orders, status, total",
    href: "/admin/orders",
    guide: "Yahan se: Order ka status badlo - New -> Confirmed -> Shipped -> Delivered. Order ki detail dekho - naam, phone, country, total.",
  },
  {
    title: "Customers",
    desc: "VIP, Repeat, New customers",
    href: "/admin/customers",
    guide: "Yahan se: Customer ka total kharcha dekho. VIP kaun hai, Repeat kaun hai. WhatsApp / Email karo.",
  },
  {
    title: "Products",
    desc: "Products add / edit / price",
    href: "/admin/products",
    guide: "Yahan se: Product ki price / stock badlo. Naya product ka record add karo. NOTE: Abhi ye Shop pe nahi jata, Shop ke liye VS Code chahiye - agle step me Supabase se jorenge.",
  },
  {
    title: "Events",
    desc: "90 - 45 - 30 - 20 - 10 - 0 reminder",
    href: "/admin/events",
    guide: "Yahan se: Shadi / Event ki date daalo. System 90, 45, 30, 20, 10, 0 din pehle yaad dilayega.",
  },
  {
    title: "Settings",
    desc: "Site settings, password, info",
    href: "/admin/settings",
    guide: "Yahan se: Site ka naam, email, WhatsApp number, password badlo. Ye sab jagah update hoga.",
  },
];

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    fetch("/api/lead", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setOrders(d as Order[]);
        else if (d && d.leads) setOrders(d.leads as Order[]);
        else setOrders([]);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  }, []);

  const totalOrders = orders.length;

  let totalRevenue = 0;
  orders.forEach((o) => {
    const tv = getTotalVal(o);
    const n = Number(tv.replace(/[^0-9.]/g, ""));
    if (Number.isFinite(n)) totalRevenue = totalRevenue + n;
  });

  const customerSet = new Set<string>();
  orders.forEach((o) => {
    const key = (clean(o.email) || clean(o.whatsapp || o.phone) || "").toLowerCase();
    if (key) customerSet.add(key);
  });
  const totalCustomers = customerSet.size;

  let newOrders = 0;
  orders.forEach((o) => {
    const s = clean(o.lead_status || o.status) || "New";
    if (s.toLowerCase() === "new") newOrders = newOrders + 1;
  });

  const todayStr = new Date().toDateString();
  let todayOrders = 0;
  orders.forEach((o) => {
    if (o.created_at && new Date(o.created_at).toDateString() === todayStr) todayOrders = todayOrders + 1;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Website</Link>
          <span className="text-xs text-zinc-400">Dashboard</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Admin Dashboard</h1>

        {/* ===== GUIDE BUTTON - YELLOW / GOLD ===== */}
        <div className="text-center">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="inline-block bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-wider px-8 py-3 rounded-full border-2 border-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.6)] transition"
          >
            {showGuide ? "HIDE GUIDE ↑" : "VIEW ADMIN GUIDE →"}
          </button>
          <p className="text- text-zinc-500 mt-2">Is button pe click karo - poori guide list nikal aayegi - kahan se kya karna hai</p>
        </div>

        {showGuide ? (
          <div className="bg-amber-400/10 border border-amber-400/40 rounded p-4 space-y-3">
            <h2 className="font-bold text-amber-400 text-sm">📋 KROSSFORD ADMIN GUIDE - Kahan Se Kya Karna Hai</h2>
            <div className="space-y-3 text-xs leading-relaxed text-zinc-200">
              <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
                <p className="font-bold text-white">1. NAYA ORDER AAYE TO KYA KARNA HAI?</p>
                <p className="text-zinc-400 mt-1">Orders page kholo → Order ko View Detail karo → Customer ko WhatsApp karo → Mark Confirmed dabao → Jab bhej do to Mark Shipped → Jab mil jaye to Mark Delivered.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
                <p className="font-bold text-white">2. NAYA PRODUCT ADD KARNA HO TO KYA KARNA HAI?</p>
                <p className="text-zinc-400 mt-1">Abhi ke liye: VS Code me public/products/ me photo daalo + Shop wali file me product ka block add karo + Deploy karo. Admin Products me sirf record ke liye add karo. Agle step me Admin se hi Shop pe jayega, VS Code ki zaroorat nahi hogi.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
                <p className="font-bold text-white">3. PRICE / STOCK BADALNI HO TO KYA KARNA HAI?</p>
                <p className="text-zinc-400 mt-1">Products page kholo → Edit Price / Stock dabao → Nayi price / stock likho → Save dabao. NOTE: Abhi ye Shop ki price nahi badlega, Shop ki price ke liye VS Code me Shop file badalni hogi.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
                <p className="font-bold text-white">4. CUSTOMER KO WHATSAPP / EMAIL KARNA HO TO?</p>
                <p className="text-zinc-400 mt-1">Customers page kholo → Jis customer ko karna hai uske card me WhatsApp Chat ya Email History dabao.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
                <p className="font-bold text-white">5. VS CODE KAB CHAHIYE, KAB NAHI?</p>
                <p className="text-zinc-400 mt-1">✅ VS Code NAHI chahiye: Order status badalna, Customer dekhna, Dashboard dekhna.</p>
                <p className="text-zinc-400">⚠️ VS Code CHAHIYE (abhi ke liye): Naya product Shop pe lagana, Shop ki price badalna, Website ka design badalna.</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded p-3">
                <p className="font-bold text-white">6. HAR PAGE KIS KAAM KE LIYE HAI?</p>
                <p className="text-zinc-400 mt-1">Orders = Orders dekhna + Status badalna | Customers = VIP / Repeat dekhna | Products = Price / Stock record | Events = Shadi/Event reminder | Settings = Site info / Password</p>
              </div>
            </div>
            <div className="text-center">
              <button onClick={() => setShowGuide(false)} className="bg-zinc-900 border border-zinc-700 px-5 py-2 rounded-full text-xs font-bold">Close Guide ↑</button>
            </div>
          </div>
        ) : null}
        {/* ===== GUIDE KHATAM ===== */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL CUSTOMERS</p>
            <p className="text-xl font-bold text-white mt-1">{loading ? "..." : totalCustomers}</p>
            <p className="text- text-zinc-500 mt-1">Unique Email / Phone se</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL ORDERS</p>
            <p className="text-xl font-bold text-green-400 mt-1">{loading ? "..." : totalOrders}</p>
            <p className="text- text-zinc-500 mt-1">New: {loading ? "..." : newOrders} | Aaj: {loading ? "..." : todayOrders}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL REVENUE</p>
            <p className="text-xl font-bold text-amber-400 mt-1">{loading ? "..." : "$" + totalRevenue.toFixed(2)}</p>
            <p className="text- text-zinc-500 mt-1">Sab orders ka total</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">NEW ORDERS</p>
            <p className="text-xl font-bold text-blue-400 mt-1">{loading ? "..." : newOrders}</p>
            <p className="text- text-zinc-500 mt-1">Abhi confirm karne wale</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-2 hover:border-amber-400 block">
              <h3 className="text-sm font-bold text-white">{c.title}</h3>
              <p className="text-xs text-zinc-400">{c.desc}</p>
              <p className="text-xs text-amber-400/90 leading-relaxed">{c.guide}</p>
              <p className="text- text-amber-400 font-bold uppercase">Open {c.title} -&gt;</p>
            </Link>
          ))}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white">Recent Orders - Last 5</h3>
            <Link href="/admin/orders" className="text-xs text-amber-400 font-bold">View All -&gt;</Link>
          </div>
          {loading ? (
            <p className="text-xs text-zinc-500">Loading...</p>
          ) : orders.length === 0 ? (
            <p className="text-xs text-zinc-500">Abhi koi order nahi hai.</p>
          ) : (
            orders.slice(0, 5).map((o, i) => (
              <div key={String(o.id || o.order_id || i)} className="flex justify-between gap-2 border-b border-zinc-800 pb-2 last:border-0 text-xs">
                <div>
                  <p className="font-bold text-white">{clean(o.name) || "New Order"} <span className="text-amber-400 font-bold ml-1">{clean(o.order_id)}</span></p>
                  <p className="text-zinc-500">{clean(o.email) || ""} | {o.created_at ? new Date(o.created_at).toLocaleString() : ""}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-amber-400">{getTotalVal(o) || "-"}</p>
                  <p className="text-zinc-500">{clean(o.lead_status || o.status) || "New"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}