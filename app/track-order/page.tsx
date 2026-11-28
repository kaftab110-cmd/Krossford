"use client";

import { useState } from "react";
import Link from "next/link";

// RULE - Courier + chat app ke naam toot ke - seedha naam kahin nahi likhna - warna chip ban jata hai
const C1 = "D" + "HL";
const C2 = "Fed" + "Ex";
const C3 = "U" + "PS";
const C4 = "Ara" + "mex";
const C5 = "U" + "SPS";
const CHAT = "Whats" + "App";

const COURIERS = [
  { id: "d" + "hl", name: C1 + " Express — International", url: (t: string) => `https://www.dhl.com/en/express/tracking.html?AWB=${encodeURIComponent(t)}` },
  { id: "fed" + "ex", name: C2 + " — International", url: (t: string) => `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(t)}` },
  { id: "u" + "ps", name: C3 + " — International", url: (t: string) => `https://www.ups.com/track?tracknum=${encodeURIComponent(t)}` },
  { id: "ara" + "mex", name: C4 + " — International", url: (t: string) => `https://www.aramex.com/us/en/track/shipments?ShipmentNumber=${encodeURIComponent(t)}` },
  { id: "dpd", name: "DPD — Europe / UK", url: (t: string) => `https://www.dpd.com/tracking?parcelNumber=${encodeURIComponent(t)}` },
  { id: "u" + "sps", name: C5 + " — USA", url: (t: string) => `https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=${encodeURIComponent(t)}` },
  { id: "royalmail", name: "Royal Mail — UK", url: (t: string) => `https://www.royalmail.com/track-your-item?trackingNumber=${encodeURIComponent(t)}` },
  { id: "canadapost", name: "Canada Post — Canada", url: (t: string) => `https://www.canadapost-postescanada.ca/track-reperage/en#/details/${encodeURIComponent(t)}` },
  { id: "auspost", name: "Australia Post — Australia", url: (t: string) => `https://auspost.com.au/mypost/track/#/details/${encodeURIComponent(t)}` },
  { id: "d" + "hl-ecommerce", name: C1 + " eCommerce — International", url: (t: string) => `https://webtrack.dhlglobalmail.com/?trackingnumber=${encodeURIComponent(t)}` },
];

export default function TrackOrderPage() {
  const [orderRef, setOrderRef] = useState("");
  const [orderType, setOrderType] = useState("Retail Order - 1 Piece (Customer)");
  const [email, setEmail] = useState("");
  const [courierId, setCourierId] = useState("d" + "hl");
  const [trackingNo, setTrackingNo] = useState("");
  const [courierMsg, setCourierMsg] = useState("");

  const whatsappNumber = "923030006759";

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderRef.trim()) {
      alert("Please enter your Order Reference / Tracking ID");
      return;
    }
    const message = `Hi KROSSFORD, I want to track my order.\n\nOrder Type: ${orderType}\nOrder Reference / Tracking ID: ${orderRef}\nEmail: ${email}\n\nPlease share my tracking update.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const openCourier = (id?: string) => {
    const t = (trackingNo || orderRef).trim();
    if (!t) { setCourierMsg("Pehle Tracking Number likho — Jo humne " + CHAT + " / Email par bheja tha."); return; }
    const c = COURIERS.find((x) => x.id === (id || courierId)) || COURIERS[0];
    setCourierMsg("");
    window.open(c.url(t), "_blank", "noopener,noreferrer");
  };

  const isRetail = orderType.startsWith("Retail");
  const isWholesale = orderType.startsWith("Wholesale");

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono pb-16 px-3 sm:px-6 md:px-12 w-full min-w-0 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-8 w-full min-w-0">
        <div className="text-center space-y-2 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-amber-400 break-words leading-snug">
            Track Your Order
          </h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest break-words">
            For Retail Customers (1 Piece) &amp; Wholesale Buyers (50+ Units) • Handcrafted • Custom Made On Demand — Made As Per Buyer &amp; Customer Requirement.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-5 w-full min-w-0 overflow-hidden">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-widest text-center break-words">Your Order Journey</p>
          <div className="flex items-start justify-between mt-4 px-0 sm:px-1 w-full min-w-0">
            <div className="flex flex-col items-center gap-1 text-center flex-1 min-w-0">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-400 text-black flex items-center justify-center text-base sm:text-lg font-bold shrink-0">📦</span>
              <span className="text-xs font-bold uppercase break-words leading-tight">Processing</span>
            </div>
            <div className="h-1 flex-1 min-w-0 bg-amber-400/40 rounded mx-1 sm:mx-2 mt-4 shrink-0" />
            <div className="flex flex-col items-center gap-1 text-center flex-1 min-w-0">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-amber-400 text-amber-400 flex items-center justify-center text-base sm:text-lg shrink-0">✈</span>
              <span className="text-xs font-bold uppercase break-words leading-tight">Fastest Delivery</span>
            </div>
            <div className="h-1 flex-1 min-w-0 bg-zinc-700 rounded mx-1 sm:mx-2 mt-4 shrink-0" />
            <div className="flex flex-col items-center gap-1 text-center flex-1 min-w-0">
              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-zinc-700 text-zinc-400 flex items-center justify-center text-base sm:text-lg shrink-0">✅</span>
              <span className="text-xs font-bold uppercase break-words leading-tight">Delivered</span>
              <span className="text-xs text-zinc-400 break-words leading-tight">Estimated Total: 12-17 Working Days</span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 text-center mt-3 break-words leading-relaxed">Once you receive your tracking ID, you can also track your order on the tracking link we share below.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0">
          <button
            type="button"
            onClick={() => setOrderType("Retail Order - 1 Piece (Customer)")}
            className={`rounded-lg p-4 sm:p-5 text-center min-w-0 border-2 transition ${isRetail ? "border-amber-400 bg-amber-400/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"}`}
          >
            {isRetail && <span className="inline-block bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-2">✓ SELECTED</span>}
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest break-words">Retail Customer - 1 Piece</p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed break-words">
              Estimated Total: 12-17 Working Days<br />
              Payment: 100% Advance
            </p>
          </button>
          <button
            type="button"
            onClick={() => setOrderType("Wholesale Order - 50+ Units (Buyer)")}
            className={`rounded-lg p-4 sm:p-5 text-center min-w-0 border-2 transition ${isWholesale ? "border-amber-400 bg-amber-400/10" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"}`}
          >
            {isWholesale && <span className="inline-block bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-2">✓ SELECTED</span>}
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest break-words">Wholesale Buyer - 50+ Units</p>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed break-words">
              Estimated Bulk Production: 30-45 days after Sample Approval<br />
              Payment: 50% Advance - 50% Before Dispatch
            </p>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
          <form onSubmit={handleTrack} className="bg-zinc-900 border border-zinc-800 p-3 sm:p-6 rounded space-y-4 w-full min-w-0">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 break-words">Enter Order Details</h2>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            >
              <option>Retail Order - 1 Piece (Customer)</option>
              <option>Wholesale Order - 50+ Units (Buyer)</option>
              <option>Sample Order</option>
            </select>
            <input
              required
              placeholder="Order Reference / Tracking ID * e.g. KRF-1234 / 1234567890"
              value={orderRef}
              onChange={(e) => setOrderRef(e.target.value)}
              className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <input
              type="email"
              placeholder="Email Used For Order (Optional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <button type="submit" className="w-full bg-green-500 text-black py-4 rounded text-xs font-bold uppercase tracking-wider hover:brightness-110 border-2 border-green-500">
              Track Via {CHAT} (Fast) →
            </button>
          </form>

          <div className="space-y-4 w-full min-w-0">
            <h2 className="text-xl font-semibold text-white break-words">How Tracking Works?</h2>
            <div className="border border-zinc-800 rounded-md px-4 sm:px-5 py-4 bg-zinc-900 min-w-0">
              <p className="text-xs font-bold text-amber-400 uppercase break-words">Step 1 - Processing</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed break-words">
                Retail: Production, quality check, and packing. Handcrafted • Custom Made On Demand.<br />
                Wholesale: Estimated Bulk Production: 30-45 days after Sample Approval.
              </p>
            </div>
            <div className="border border-zinc-800 rounded-md px-4 sm:px-5 py-4 bg-zinc-900 min-w-0">
              <p className="text-xs font-bold text-amber-400 uppercase break-words">Step 2 - Fastest Delivery</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed break-words">
                Ships via Fastest Delivery. Your tracking ID will be shared by {CHAT} or email after dispatch.
              </p>
            </div>
            <div className="border border-zinc-800 rounded-md px-4 sm:px-5 py-4 bg-zinc-900 min-w-0">
              <p className="text-xs font-bold text-amber-400 uppercase break-words">Step 3 - Delivery</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed break-words">
                Estimated Total: 12-17 Working Days. We always aim to deliver earlier. Contact us on {CHAT} if customs delay your order.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi KROSSFORD, I want help tracking my Retail / Wholesale order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-green-500/30 px-4 sm:px-5 py-4 transition hover:border-green-500 min-w-0"
            >
              <span className="block text-xs text-zinc-400 uppercase break-words">Need Help?</span>
              <span className="text-sm font-bold text-green-500 break-words">{CHAT}: +92303 0006759 💬 Chat Now</span>
            </a>
            <div className="flex gap-3 text-xs min-w-0">
              <Link href="/shop" className="flex-1 min-w-0 text-center border border-zinc-800 py-3 px-2 rounded font-bold hover:border-amber-400 break-words">Shop Retail →</Link>
              <Link href="/b2b" className="flex-1 min-w-0 text-center border border-zinc-800 py-3 px-2 rounded font-bold hover:border-amber-400 break-words">B2B Wholesale →</Link>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-5 w-full min-w-0 overflow-hidden">
          <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 text-center break-words">Track Directly With Courier</h2>
          <p className="text-xs text-zinc-400 text-center mt-2 leading-relaxed break-words">Apna Tracking Number likho — Courier chuno — Uske Tracking Page par chale jao.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full min-w-0">
            <input
              placeholder="Tracking Number * e.g. 1234567890"
              value={trackingNo}
              onChange={(e) => setTrackingNo(e.target.value)}
              className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <select
              value={courierId}
              onChange={(e) => setCourierId(e.target.value)}
              className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            >
              {COURIERS.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            <button type="button" onClick={() => openCourier()} className="bg-amber-400 text-black px-6 py-3 rounded text-xs font-bold uppercase tracking-wider hover:brightness-110 shrink-0">Track Now →</button>
          </div>
          {courierMsg && (<p className="text-xs text-amber-400 text-center mt-3 break-words">{courierMsg}</p>)}
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {COURIERS.map((c) => (<button key={c.id} type="button" onClick={() => openCourier(c.id)} className="border border-zinc-700 hover:border-amber-400 rounded-full px-3 py-1.5 text-xs break-words">{c.name}</button>))}
          </div>
        </div>
      </div>
    </div>
  );
}