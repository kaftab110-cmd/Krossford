"use client";

import Link from "next/link";

const CARDS = [
  { title: "Customers", desc: "VIP, Repeat, New customers", href: "/admin/customers", count: "CRM" },
  { title: "Orders", desc: "Sab orders, status, total", href: "/admin/orders", count: "Orders" },
  { title: "Products", desc: "Products add / edit / price", href: "/admin/products", count: "Products" },
  { title: "Events", desc: "90 - 45 - 30 - 20 - 10 - 0 reminder", href: "/admin/events", count: "Events" },
  { title: "Settings", desc: "Site settings, password, info", href: "/admin/settings", count: "Settings" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Website</Link>
          <span className="text-xs text-zinc-400">Dashboard</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL CUSTOMERS</p>
            <p className="text-xl font-bold text-white mt-1">CRM</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL ORDERS</p>
            <p className="text-xl font-bold text-green-400 mt-1">Orders</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL PRODUCTS</p>
            <p className="text-xl font-bold text-amber-400 mt-1">Products</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">UPCOMING EVENTS</p>
            <p className="text-xl font-bold text-blue-400 mt-1">Events</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-2 hover:border-amber-400 block">
              <h3 className="text-sm font-bold text-white">{c.title}</h3>
              <p className="text-xs text-zinc-400">{c.desc}</p>
              <p className="text- text-amber-400 font-bold uppercase">Open {c.title} -&gt;</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}