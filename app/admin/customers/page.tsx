"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";

function AdminCustomersCRMInner() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === "krossford2026" || pass === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setAuth(true);
      fetchCustomers();
    } else {
      alert("Invalid Security Password!");
    }
  };

  const fetchCustomers = async () => {
    const res = await fetch("/api/lead", { method: "GET" }).catch(() => null);
    const mockData = [
      { id: 1, name: "Kashif Aftab", email: "kaftab110@gmail.com", whatsapp: "+923001234567", total_orders: 3, total_quantity: 550, lead_status: "VIP", priority: "HIGH PRIORITY", country: "Australia" },
      { id: 2, name: "Global Buyer", email: "newcustomer@gmail.com", whatsapp: "+14155552671", total_orders: 1, total_quantity: 50, lead_status: "New", priority: "Normal", country: "Germany" }
    ];
    setCustomers(mockData);
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <form onSubmit={handleLogin} className="bg-zinc-900 p-8 border border-zinc-800 rounded-lg space-y-4 w-80">
          <h2 className="text-amber-400 font-bold uppercase text-center">KROSSFORD CRM ACCESS</h2>
          <input type="password" placeholder="Enter Admin Password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white outline-none focus:border-amber-400" />
          <button type="submit" className="w-full bg-amber-400 text-black py-2 rounded font-bold text-xs uppercase">Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  const filtered = customers.filter(c => {
    const matchesSearch = c.email.toLowerCase().includes(search.toLowerCase()) || c.whatsapp.includes(search);
    if (filter === "All") return matchesSearch;
    return matchesSearch && c.lead_status === filter;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-xl font-bold text-amber-400 uppercase">KROSSFORD Customer CRM & VIP Hub</h1>
          <span className="text-xs text-zinc-400">Total Records: {customers.length}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL CUSTOMERS</p>
            <p className="text-xl font-bold text-white mt-1">{customers.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">REPEAT CUSTOMERS</p>
            <p className="text-xl font-bold text-green-400 mt-1">{customers.filter(c => c.total_orders > 1).length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">VIP ACCOUNTS</p>
            <p className="text-xl font-bold text-amber-400 mt-1">{customers.filter(c => c.lead_status === 'VIP').length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-4 rounded">
            <p className="text-zinc-400">TOTAL UNITS ORDERED</p>
            <p className="text-xl font-bold text-blue-400 mt-1">{customers.reduce((a,b) => a + b.total_quantity, 0)} Pcs</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-zinc-900 p-4 rounded border border-zinc-800">
          <input type="text" placeholder="Search by Email or WhatsApp..." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs w-full md:w-80 outline-none focus:border-amber-400" />
          <div className="flex gap-2">
            {["All", "New", "Repeat", "VIP"].map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors ${filter === f ? "bg-amber-400 text-black" : "bg-zinc-950 text-zinc-400 border border-zinc-800"}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded space-y-3">
              <div className="flex justify-between items-start border-b border-zinc-800 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-white">{c.name || c.email}</h3>
                  <p className="text-[11px] text-zinc-400">{c.whatsapp} • {c.country}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${c.lead_status === 'VIP' ? 'bg-amber-400 text-black' : c.total_orders > 1 ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                  {c.lead_status === 'VIP' ? '🟢 VIP REPEAT' : c.total_orders > 1 ? '🟢 REPEAT' : '🔵 NEW'}
                </span>
              </div>
              <div className="text-xs space-y-1 text-zinc-300">
                <p><span className="text-zinc-500">Total Orders:</span> {c.total_orders}</p>
                <p><span className="text-zinc-500">Total Quantity:</span> {c.total_quantity} Pcs</p>
                <p><span className="text-zinc-500">Priority Level:</span> <span className={c.priority === 'HIGH PRIORITY' ? 'text-red-400 font-bold' : 'text-zinc-400'}>{c.priority}</span></p>
              </div>
              <div className="flex gap-2 pt-2">
                <a href={`https://wa.me/${c.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" className="flex-1 bg-green-600 text-white text-center py-1.5 rounded font-bold text-[10px] uppercase">WhatsApp Chat</a>
                <a href={`mailto:${c.email}`} className="flex-1 bg-amber-400 text-black text-center py-1.5 rounded font-bold text-[10px] uppercase">Email History</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminCustomersCRM() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs">Loading CRM...</div>}>
      <AdminCustomersCRMInner />
    </Suspense>
  );
}
