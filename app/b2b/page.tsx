"use client";

import { useState, useRef, useEffect } from "react";
import { COUNTRIES } from "../../lib/data/countries";
import PhoneInput from "@/components/PhoneInput";
import { buildFullPhone } from "@/lib/data/phone-codes";

const WHATSAPP_NUMBER = "923030006759";

const B2B_PRODUCTS = [
  {
    name: "Leather Jacket - Biker / Bomber",
    img: "/images/biker-jacket.jpg",
    desc: "Full-Grain / Sheep Leather. Custom Logo, Sizes XS-3XL.",
    moq: "MOQ: 50 Pcs",
    tag: "BEST FOR B2B",
    productType: "Leather Jacket",
    quantity: "50",
  },
  {
    name: "Leather Biker Suit - 2 Piece",
    img: "/images/biker-suit.jpg",
    desc: "CE Protection Ready. Custom Fit, Team / Brand Orders.",
    moq: "MOQ: 25 Sets",
    tag: "HIGH MARGIN",
    productType: "Biker Suit",
    quantity: "25",
  },
  {
    name: "Bags, Belts & Wallets - Bulk",
    img: "/images/leather-duffle-bag.jpg",
    desc: "Bags, Belts, Card Holders, Keychains. White Label Available.",
    moq: "MOQ: 100 Pcs",
    tag: "WHITE LABEL",
    productType: "Bag",
    quantity: "100",
  },
];

export default function B2BPage() {
  const [submitted, setSubmitted] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    businessEmail: "",
    phone: "",
    altPhone: "",
    country: "United States",
    quantity: "100",
    productType: "Leather Jacket",
    whiteLabel: "Yes",
    message: "",
  });

  // Country badle to dono numbers ka code bhi badle - local part wahi rahega, sirf +92 -> +91 hoga
  useEffect(() => {
    if (formData.phone) setFormData((prev) => ({ ...prev, phone: buildFullPhone(prev.country, prev.phone) }));
    if (formData.altPhone) setFormData((prev) => ({ ...prev, altPhone: buildFullPhone(prev.country, prev.altPhone) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.country]);

  const handleGetQuote = (p: (typeof B2B_PRODUCTS)[number]) => {
    setFormData((prev) => ({ ...prev, productType: p.productType, quantity: p.quantity }));
    setSubmitted(false);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Krossford! NEW B2B / WHOLESALE INQUIRY\n\nCompany: ${formData.companyName}\nBusiness Email: ${formData.businessEmail}\nPhone / WhatsApp: ${formData.phone || "Not given"}${formData.altPhone ? `\nAlternate / Contact Number: ${formData.altPhone}` : ""}\nCountry / Target Market: ${formData.country}\n\nProduct Type: ${formData.productType}\nEstimated Quantity: ${formData.quantity}\nWhite Label Needed: ${formData.whiteLabel}\nBrand Logo File: ${logoFile ? logoFile.name : "Not uploaded"}\n\nProject Specifications / Message:\n${formData.message || "Not given"}\n\nPlease share Wholesale Quote in 24 hours.\nPayment Terms: 50% Advance - 50% Before Dispatch\nDelivery: 18-24 Working Days via DHL Express\nSample: Paid Sample Available - Sample Before Bulk`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setLogoFile(null);
    setFormData({
      companyName: "",
      businessEmail: "",
      phone: "",
      altPhone: "",
      country: "United States",
      quantity: "100",
      productType: "Leather Jacket",
      whiteLabel: "Yes",
      message: "",
    });
  };

  return (
    <main className="bg-black text-white min-h-screen py-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3 border-b border-zinc-800 pb-8">
          <span className="text-[11px] tracking-[0.3em] uppercase text-amber-400 font-mono">
            Krossford Enterprises B2B Export Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif tracking-[0.1em] uppercase">
            Wholesale &amp; Custom Production
          </h1>
          <p className="text-xs text-zinc-400 tracking-widest uppercase font-light max-w-xl mx-auto">
            Direct manufacturer sourcing. Request a tailored wholesale quotation.
          </p>
          <p className="text-[11px] text-amber-400/90 tracking-wide">
            Sample Before Bulk • 50% Advance - 50% Before Dispatch • VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER / T/T
          </p>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mt-4">
            <p className="text-[11px] text-zinc-300">Need Just 1 Piece? Retail price on Shop - No need to fill this form.</p>
            <a href="/shop" className="inline-block mt-2 bg-amber-400 text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded hover:bg-amber-300">
              Shop Retail - 1 Piece →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {B2B_PRODUCTS.map((p) => (
            <div key={p.name} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="h-44 bg-zinc-900 flex items-center justify-center overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-400 font-semibold">{p.tag}</span>
                <h3 className="text-sm font-serif uppercase tracking-wider">{p.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
                <p className="text-[11px] text-white font-semibold tracking-wider">{p.moq}</p>
                <button
                  onClick={() => handleGetQuote(p)}
                  className="text-[11px] uppercase tracking-[0.2em] text-amber-400 border border-amber-400/40 rounded px-3 py-2 hover:bg-amber-400 hover:text-black transition-colors"
                >
                  Get Quote For This →
                </button>
              </div>
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="bg-zinc-950 border border-amber-400/40 rounded-xl p-10 text-center space-y-6">
            <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto text-xl">✓</div>
            <div className="space-y-2">
              <h3 className="text-lg font-serif uppercase tracking-widest text-white">Request Received</h3>
              <p className="text-xs text-zinc-300 font-light tracking-wide max-w-md mx-auto leading-relaxed">
                Your inquiry has been opened in WhatsApp. Please press Send there. Our team will share quote in 24 hours on WhatsApp/Email. Sample available before bulk order.
              </p>
              <p className="text-[11px] text-amber-400">Company: {formData.companyName} • Product: {formData.productType} • Qty: {formData.quantity}</p>
            </div>
            <button
              onClick={handleReset}
              className="bg-amber-400 text-black text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3 hover:bg-amber-300 transition-colors"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 space-y-6 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Company Name *</label>
                <input type="text" required placeholder="Your Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Business Email *</label>
                <input type="email" required placeholder="you@company.com" value={formData.businessEmail} onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                {/* PHONE FIX: Country select karte hi auto code - Pakistan +92, India +91, USA +1 ... */}
                <PhoneInput country={formData.country} value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} label="Phone / WhatsApp" placeholder="3001234567" required={false} />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Country / Target Market</label>
                <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none">
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Alternate / Contact Number - agar pehla na lage to is pe call karenge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <PhoneInput country={formData.country} value={formData.altPhone} onChange={(v) => setFormData({ ...formData, altPhone: v })} label="Alternate / Contact Number (Optional)" placeholder="3001234567" required={false} name="altPhone" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Estimated Quantity</label>
                <select value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none">
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
                <select value={formData.productType} onChange={(e) => setFormData({ ...formData, productType: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-amber-400 focus:outline-none">
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
                    <input type="radio" name="whiteLabel" value="Yes" checked={formData.whiteLabel === "Yes"} onChange={(e) => setFormData({ ...formData, whiteLabel: e.target.value })} className="accent-amber-400" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="whiteLabel" value="No" checked={formData.whiteLabel === "No"} onChange={(e) => setFormData({ ...formData, whiteLabel: e.target.value })} className="accent-amber-400" />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Brand Logo Upload (Optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-amber-400 file:text-black hover:file:bg-amber-300" />
              {logoFile && <p className="text-xs text-green-400">✅ {logoFile.name} - File ka naam WhatsApp inquiry me jayega</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-widest text-zinc-300 font-light">Project Specifications &amp; Message</label>
              <textarea rows={4} placeholder="Mention sizing breakdown, custom leather finish, or target delivery timeline..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-4 text-xs text-white focus:border-amber-400 focus:outline-none" />
            </div>

            <button type="submit" className="w-full bg-amber-400 text-black font-bold text-xs uppercase tracking-[0.2em] py-4 rounded hover:bg-amber-300 transition-colors shadow-md">
              Submit Wholesale Inquiry - Send On WhatsApp →
            </button>
            <p className="text-center text-[11px] text-zinc-500 tracking-wide">Retail price on Shop | Wholesale quote in 24 hours. Sample before bulk. Ships via DHL Express. • 50% Advance - 50% Before Dispatch • Delivery: 18-24 Working Days</p>
          </form>
        )}
      </div>
    </main>
  );
}
