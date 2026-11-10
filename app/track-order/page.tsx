"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderRef, setOrderRef] = useState("");
  const [orderType, setOrderType] = useState("Retail Order - 1 Piece (Customer)");
  const [email, setEmail] = useState("");

  const whatsappNumber = "923030006759";

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderRef.trim()) {
      alert("Please enter your Order Reference / Tracking ID");
      return;
    }
    const message = `Hi KROSSFORD, I want to track my order.\n\nOrder Type: ${orderType}\nOrder Reference / Tracking ID: ${orderRef}\nEmail: ${email}\n\nPlease share my DHL tracking update.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-amber-400">
            Track Your Order
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">
            For Retail Customers (1 Piece) & Wholesale Buyers (50+ Units)
          </p>
        </div>

        {/* TRACKING PROGRESS BAR - Processing -> DHL -> Delivered */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest text-center">Your Order Journey</p>
          <div className="flex items-center justify-between mt-4 px-1">
            <div className="flex flex-col items-center gap-1 text-center flex-1">
              <span className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center text-lg font-bold">📦</span>
              <span className="text-[10px] font-bold uppercase">Processing</span>
              <span className="text-[10px] text-zinc-400">7-10 Days</span>
            </div>
            <div className="h-1 flex-1 bg-amber-400/40 rounded mx-2 mb-5" />
            <div className="flex flex-col items-center gap-1 text-center flex-1">
              <span className="w-10 h-10 rounded-full border-2 border-amber-400 text-amber-400 flex items-center justify-center text-lg">✈️</span>
              <span className="text-[10px] font-bold uppercase">DHL Express</span>
              <span className="text-[10px] text-zinc-400">7-10 Working Days</span>
            </div>
            <div className="h-1 flex-1 bg-zinc-700 rounded mx-2 mb-5" />
            <div className="flex flex-col items-center gap-1 text-center flex-1">
              <span className="w-10 h-10 rounded-full border-2 border-zinc-700 text-zinc-400 flex items-center justify-center text-lg">✅</span>
              <span className="text-[10px] font-bold uppercase">Delivered</span>
              <span className="text-[10px] text-zinc-400">Total 18-24 Days</span>
            </div>
          </div>
          <p className="text-[11px] text-zinc-500 text-center mt-3">Tracking ID milne ke baad neeche DHL Website pe bhi track kar sakte ho.</p>
        </div>

        {/* 2 Raste */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900 text-center">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Retail Customer - 1 Piece</p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Total: 18-24 Days<br />
              Processing: 7-10 Days + DHL: 7-10 Working Days<br />
              Payment: 100% Advance
            </p>
          </div>
          <div className="border border-amber-400/50 rounded-lg p-5 bg-amber-400/5 text-center">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">Wholesale Buyer - 50+ Units</p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Production: As Per Quotation<br />
              + DHL Delivery: 7-10 Working Days<br />
              Payment: 50% Advance - 50% Before Dispatch
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Track Form */}
          <form onSubmit={handleTrack} className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">Enter Order Details</h2>

            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            >
              <option>Retail Order - 1 Piece (Customer)</option>
              <option>Wholesale Order - 50+ Units (Buyer)</option>
              <option>Sample Order</option>
            </select>

            <input
              required
              placeholder="Order Reference / DHL Tracking ID * e.g. KRF-1234 / DHL 1234567890"
              value={orderRef}
              onChange={(e) => setOrderRef(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />

            <input
              type="email"
              placeholder="Email Used For Order (Optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />

            <button type="submit" className="w-full bg-[#25D366] text-black py-3 rounded text-xs font-bold uppercase tracking-wider hover:brightness-110">
              Track Via WhatsApp (Fast) →
            </button>

            <a
              href={orderRef.trim() ? `https://www.dhl.com/global-en/home/tracking/tracking-express.html?submit=1&tracking-id=${encodeURIComponent(orderRef.trim())}` : "https://www.dhl.com/global-en/home/tracking.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-amber-400 text-black py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-amber-300"
            >
              📦 Track On DHL Website →
            </a>

            <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
              DHL Tracking ID Milne Ke Baad Us Ko Direct DHL Website Pe Bhi Track Kar Sakte Ho.
              Agar Tracking ID Nahi Mila To Neeche WhatsApp Karo.
            </p>
          </form>

          {/* Help */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">How Tracking Works?</h2>

            <div className="border border-zinc-800 rounded-md px-5 py-4 bg-zinc-900">
              <p className="text-xs font-bold text-amber-400 uppercase">Step 1 - Processing</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Retail: 7-10 Days - Production, Quality Check & Packing.<br />
                Wholesale: As Per Written Quotation - Depends On Quantity & Custom Logo.
              </p>
            </div>

            <div className="border border-zinc-800 rounded-md px-5 py-4 bg-zinc-900">
              <p className="text-xs font-bold text-amber-400 uppercase">Step 2 - DHL Express</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Ships via DHL Express. Tracking ID WhatsApp / Email Pe Bheja Jata Hai. DHL Delivery: 7-10 Working Days.
              </p>
            </div>

            <div className="border border-zinc-800 rounded-md px-5 py-4 bg-zinc-900">
              <p className="text-xs font-bold text-amber-400 uppercase">Step 3 - Delivery</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Total Retail: 18-24 Days. Our aim to deliver earlier than estimated. Customs delay ho to WhatsApp pe puchho.
              </p>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi KROSSFORD, I want help tracking my Retail / Wholesale order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-[#25D366]/30 px-5 py-4 transition hover:border-[#25D366]"
            >
              <span className="block text-xs text-zinc-400 uppercase">Need Help?</span>
              <span className="text-sm font-bold text-[#25D366]">WhatsApp: +92303 0006759 💬 Chat Now</span>
            </a>

            <div className="flex gap-3 text-xs">
              <Link href="/shop" className="flex-1 text-center border border-zinc-800 py-3 rounded font-bold hover:border-amber-400">Shop Retail →</Link>
              <Link href="/b2b" className="flex-1 text-center border border-amber-400/50 py-3 rounded font-bold hover:border-amber-400">Wholesale →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
