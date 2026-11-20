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
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <h1 className="text-xl font-bold text-amber-400 uppercase">Orders</h1>
          <Link href="/admin" className="text-xs text-zinc-400">Back to Dashboard -&gt;</Link>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded text-xs">
          <p className="text-zinc-400">TOTAL ORDERS</p>
          <p className="text-xl font-bold text-white mt-1">{orders.length}</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-xs text-zinc-400">
            Abhi koi order data nahi mila. Jaise hi naya order aayega, yahan nazar aayega.
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