"use client";

import { useState } from "react";

const B2B_PRODUCTS = [
  {
    name: "Leather Jacket - Biker / Bomber",
    img: "/images/biker-jacket.jpg",
    desc: "Full-Grain / Sheep Leather. Custom Logo, Sizes XS-3XL.",
    moq: "MOQ: 50 Pcs",
    tag: "BEST FOR B2B",
  },
  {
    name: "Leather Biker Suit - 2 Piece",
    img: "/images/biker-suit.jpg",
    desc: "CE Protection Ready. Custom Fit, Team / Brand Orders.",
    moq: "MOQ: 25 Sets",
    tag: "HIGH MARGIN",
  },
  {
    name: "Bags, Belts & Wallets - Bulk",
    img: "/images/leather-duffle-bag.jpg",
    desc: "Bags, Belts, Card Holders, Keychains. White Label Available.",
    moq: "MOQ: 100 Pcs",
    tag: "WHITE LABEL",
  },
];

export default function B2BPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    businessEmail: "",
    country: "United States",
    quantity: "100",
    productType: "Leather Jacket",
    whiteLabel: "Yes",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="bg-black text-white min-h-screen py-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3 border-b border-zinc-800 pb-8">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-400 font-mono">
            Krossford Enterprises B2B Export Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-[0.1em] uppercase">
            Wholesale & Custom Production
          </h1>
          <p className="text-xs text-zinc-400 tracking-widest uppercase font-light max-w-xl mx-auto">
            Direct manufacturer sourcing from Sialkot & Buneri hubs. Request a tailored wholesale quotation.
          </p>
          <p className="text-[11px] text-amber-400/90 tracking-wide">
            Sample Before Bulk • 50% Advance - 50% After Order Ready • VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER / T/T
          </p>
          {/* RETAIL WALA YAHAN NA ATKE */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mt-4">
            <p className="text-[11px] text-zinc-300">Need Just 1 Piece? Retail price on Shop - No need to fill this form.</p>
            <a href="/shop" className="inline-block mt-2 bg-white text-black text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded hover:bg-amber-400">
              Shop Retail - 1 Piece →
            </a>
          </div>
        </div>

        {/* B2B PRODUCTS - Buyer Pehle Product Dekhega, Phir Form Bharega */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {B2B_PRODUCTS.map((p) => (
            <div key={p.name} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="h-44 bg-zinc-900 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400 font-semibold">{p.tag}</span>
                <h3 className="text-sm font-serif uppercase tracking-wider">{p.name}</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{p.desc}</p>
                <p className="text-[11px] text-white font-semibold tracking-wider">{p.moq}</p>
                <button
                  onClick={() => setFormData({ ...formData, productType: p.name.includes("Biker Suit") ? "Biker Suit" : p.name.includes("Jacket") ? "Leather Jacket" : "Bag" })}
                  className="text-[10px] uppercase tracking-[0.2em] text-amber-400 border border-amber-400/40 rounded px-3 py-2 hover:bg-amber-400 hover:text-black transition-colors"
                >
                  Get Quote For This →
                </button>
              </div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-zinc-950 border border-amber-400/40 rounded-xl p-10 text-center space-y-6">
            <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-serif uppercase tracking-widest text-white">Request Received</h3>
              <p className="text-xs text-zinc-300 font-light tracking-wide max-w-md mx-auto leading-relaxed">
                Our team will share quote in 24 hours on WhatsApp/Email. Sample available before bulk order.
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-amber-400 text-black text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3 hover:bg-amber-300 transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Company Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.businessEmail}
                  onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Country / Target Market</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Other">Other Global Market</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Estimated Quantity</label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="25">25 Units - Biker Suit</option>
                  <option value="50">50 Units</option>
                  <option value="100">100 Units</option>
                  <option value="500">500 Units</option>
                  <option value="1000+">1000+ Units</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Product Type</label>
                <select
                  value={formData.productType}
                  onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="Leather Jacket">Leather Jacket</option>
                  <option value="Biker Suit">Biker Suit - 2 Piece</option>
                  <option value="Belt">Belt</option>
                  <option value="Bag">Bag</option>
                  <option value="Wallet">Wallet</option>
                  <option value="Card Holder / Keychain">Card Holder / Keychain - Bulk</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">White Label Needed?</label>
                <div className="flex items-center gap-6 pt-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="whiteLabel"
                      value="Yes"
                      checked={formData.whiteLabel === "Yes"}
                      onChange={(e) => setFormData({ ...formData, whiteLabel: e.target.value })}
                      className="accent-amber-400"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="whiteLabel"
                      value="No"
                      checked={formData.whiteLabel === "No"}
                      onChange={(e) => setFormData({ ...formData, whiteLabel: e.target.value })}
                      className="accent-amber-400"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Brand Logo Upload (Optional)</label>
              <input
                type="file"
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Project Specifications & Message</label>
              <textarea
                rows={4}
                placeholder="Mention sizing breakdown, custom leather finish, or target delivery timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-4 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 text-black font-bold text-xs uppercase tracking-[0.2em] py-4 rounded hover:bg-amber-300 transition-colors shadow-md"
            >
              Submit Wholesale Inquiry
            </button>
            <p className="text-center text-[10px] text-zinc-500 tracking-wide">Retail price on Shop | Wholesale quote in 24 hours. Sample before bulk. Ships via DHL Express.</p>
          </form>
        )}
      </div>
    </main>
  );
}