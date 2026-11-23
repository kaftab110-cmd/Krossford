"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { COUNTRIES } from "../../lib/data/countries";
import PhoneInput from "@/components/PhoneInput";
import { buildFullPhone } from "@/lib/data/phone-codes";
const WHATSAPP_NUMBER = "923030006759";
const B2B_PRODUCTS = [
  { name: "Leather Jacket - Biker / Bomber", img: "/images/biker-jacket.jpg", desc: "Full-Grain / Sheep Leather. Custom Logo, Sizes XS-3XL.", moq: "MOQ: 50 Pcs", tag: "BEST FOR B2B", productType: "Leather Jacket", quantity: "50" },
  { name: "Leather Biker Suit - 2 Piece", img: "/images/biker-suit.jpg", desc: "CE Protection Ready. Custom Fit, Team / Brand Orders.", moq: "MOQ: 25 Sets", tag: "HIGH MARGIN", productType: "Biker Suit", quantity: "25" },
  { name: "Bags, Belts & Wallets - Bulk", img: "/images/leather-duffle-bag.jpg", desc: "Bags, Belts, Card Holders, Keychains. White Label Available.", moq: "MOQ: 100 Pcs", tag: "WHITE LABEL", productType: "Bag", quantity: "100" },
];
function B2BPageInner() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sent" | "failed">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState({ companyName: "", businessEmail: "", phone: "", altPhone: "", country: "United States", quantity: "100", productType: "Leather Jacket", otherProduct: "", whiteLabel: "Yes", message: "" });
  useEffect(() => {
    const p = searchParams.get("product");
    const qty = searchParams.get("qty");
    const color = searchParams.get("color");
    const design = searchParams.get("design");
    const price = searchParams.get("price");
    if (!p && !qty) return;
    setFormData((prev) => {
      let productType = prev.productType;
      let otherProduct = prev.otherProduct;
      if (p) {
        if (p.toLowerCase().includes("wallet")) productType = "Wallet";
        else if (p.toLowerCase().includes("jacket")) productType = "Leather Jacket";
        else if (p.toLowerCase().includes("suit")) productType = "Biker Suit";
        else if (p.toLowerCase().includes("belt")) productType = "Belt";
        else if (p.toLowerCase().includes("bag")) productType = "Bag";
        else if (p.toLowerCase().includes("card") || p.toLowerCase().includes("keychain")) productType = "Card Holder / Keychain";
        else { productType = "Others"; otherProduct = p; }
      }
      const msgParts = [];
      if (p) msgParts.push(`Product: ${p}`);
      if (color) msgParts.push(`Colour: ${color}`);
      if (design) msgParts.push(design);
      if (price) msgParts.push(`Retail Price: $${price}`);
      const prefillMsg = msgParts.join(" - ");
      return { ...prev, productType, otherProduct, quantity: qty || prev.quantity, message: prefillMsg ? (prev.message ? prev.message : `From Product Page - ${prefillMsg}. Please share wholesale quote.`) : prev.message };
    });
  }, [searchParams]);
  useEffect(() => {
    if (formData.phone) setFormData((prev) => ({ ...prev, phone: buildFullPhone(prev.country, prev.phone) }));
    if (formData.altPhone) setFormData((prev) => ({ ...prev, altPhone: buildFullPhone(prev.country, prev.altPhone) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.country]);
  const handleGetQuote = (p: (typeof B2B_PRODUCTS)[number]) => {
    setFormData((prev) => ({ ...prev, productType: p.productType, quantity: p.quantity }));
    setSubmitted(false); setEmailStatus("idle");
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  const getFinalProduct = () => {
    if (formData.productType === "Others") return formData.otherProduct.trim() ? `Others - ${formData.otherProduct.trim()}` : "Others - Custom / Not Listed";
    return formData.productType;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // DOUBLE-SUBMIT GUARD - 2 baar dabane se 2 emails / 2 WhatsApp nahi khulenge
    if (submittingRef.current || isSubmitting) return;
    submittingRef.current = true; setIsSubmitting(true);
    const finalProduct = getFinalProduct();
    let emailOk = false;
    try {
      const qtyNum = parseInt(formData.quantity.replace(/[^0-9]/g, ""), 10) || 100;
      const res = await fetch("/api/lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit", channel: "B2B",
          lead: {
            source: "b2b-enquiry", channel: "B2B", enquiryType: "B2B",
            customerName: formData.companyName, company: formData.companyName, email: formData.businessEmail,
            contact: formData.phone, phone: formData.phone, altPhone: formData.altPhone, country: formData.country,
            product: finalProduct, quantity: String(qtyNum), total: 0,
            message: `B2B Wholesale Inquiry\n\nCompany: ${formData.companyName}\nPhone: ${formData.phone || "Not given"}${formData.altPhone ? `\nAlternate: ${formData.altPhone}` : ""}\nCountry: ${formData.country}\nProduct Type: ${finalProduct}\nQuantity: ${formData.quantity}\nWhite Label: ${formData.whiteLabel}\nLogo: ${logoFile ? logoFile.name : "Not uploaded"}\n\nMessage:\n${formData.message || "Not given"}`,
            items: [{ title: finalProduct, quantity: qtyNum, notes: `White Label: ${formData.whiteLabel} | ${formData.message || ""}` }],
            paymentTerms: "Wholesale: 50% Advance, 50% Before Dispatch", shippingMethod: "fastest delivery",
          },
        }),
      });
      const j: any = await res.json().catch(() => ({}));
      // FIX: sirf success nahi, emailSent bhi check karo - warna fail pe bhi "sent" dikhega
      emailOk = res.ok && j.success !== false && j.emailSent !== false;
    } catch (err) { console.error("B2B EMAIL FAILED:", err); emailOk = false; }
    setEmailStatus(emailOk ? "sent" : "failed");
    const msg = `Hello Krossford! NEW B2B / WHOLESALE INQUIRY\n\nCompany: ${formData.companyName}\nBusiness Email: ${formData.businessEmail}\nPhone / WhatsApp: ${formData.phone || "Not given"}${formData.altPhone ? `\nAlternate / Contact Number: ${formData.altPhone}` : ""}\nCountry / Target Market: ${formData.country}\n\nProduct Type: ${finalProduct}\nEstimated Quantity: ${formData.quantity}\nWhite Label Needed: ${formData.whiteLabel}\nBrand Logo File: ${logoFile ? logoFile.name : "Not uploaded"}\n\nProject Specifications / Message:\n${formData.message || "Not given"}\n\nPlease share Wholesale Quote in 24 hours.\nPayment Terms: 50% Advance - 50% Before Dispatch\nEstimated Total: 12-17 Working Days\nSample: Paid Sample Available - Sample Before Bulk`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };
  const handleReset = () => {
    setSubmitted(false); setEmailStatus("idle"); setLogoFile(null); submittingRef.current = false; setIsSubmitting(false);
    setFormData({ companyName: "", businessEmail: "", phone: "", altPhone: "", country: "United States", quantity: "100", productType: "Leather Jacket", otherProduct: "", whiteLabel: "Yes", message: "" });
  };
  const qtyOptions = ["25", "50", "100", "500", "1000+"];
  const showCustomQty = formData.quantity && !qtyOptions.includes(formData.quantity);
  return (
    <main className="bg-black text-white min-h-screen py-16 px-4 sm:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3 border-b border-zinc-800 pb-8">
          <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] font-bold">Krossford Enterprises B2B Export Portal</span>
          <h1 className="text-3xl sm:text-4xl tracking-[0.1em] uppercase" style={{ fontFamily: "var(--font-brand)" }}>Wholesale &amp; Custom Production</h1>
          <p className="text-xs text-zinc-400 tracking-widest uppercase font-light max-w-xl mx-auto">Direct manufacturer sourcing. Request a tailored wholesale quotation.</p>
          <p className="text-xs text-[#D4AF37]/90 tracking-wide">Sample Before Bulk • 50% Advance - 50% Before Dispatch • VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER / T/T</p>
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 mt-4">
            <p className="text-xs text-zinc-300">Need Just 1 Piece? Retail price on Shop - No need to fill this form.</p>
            <a href="/shop" className="inline-block mt-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded hover:bg-[#E8C15A]">Shop Retail - 1 Piece →</a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {B2B_PRODUCTS.map((p) => (
            <div key={p.name} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="aspect-[16/9] bg-zinc-900 flex items-center justify-center overflow-hidden"><img src={p.img} alt={p.name} className="w-full h-full object-cover" /></div>
              <div className="p-5 space-y-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">{p.tag}</span>
                <h3 className="text-sm uppercase tracking-wider" style={{ fontFamily: "var(--font-brand)" }}>{p.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
                <p className="text-xs text-white font-semibold tracking-wider">{p.moq}</p>
                <button onClick={() => handleGetQuote(p)} className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/40 rounded px-3 py-2 hover:bg-[#D4AF37] hover:text-black transition-colors">Get Quote For This →</button>
              </div>
            </div>
          ))}
        </div>
        {submitted ? (
          <div className="bg-zinc-950 border border-[#D4AF37]/40 rounded-xl p-6 sm:p-10 text-center space-y-6">
            <div className="w-12 h-12 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-xl">✓</div>
            <div className="space-y-2">
              <h3 className="text-lg uppercase tracking-widest text-white" style={{ fontFamily: "var(--font-brand)" }}>Request Received</h3>
              {emailStatus === "sent" ? (
                <p className="text-xs text-zinc-300 font-light tracking-wide max-w-md mx-auto leading-relaxed">Your inquiry has been sent on Email + WhatsApp. Please press Send on WhatsApp too. Our team will share quote in 24 hours on WhatsApp/Email. Sample available before bulk order.</p>
              ) : (
                <p className="text-xs text-zinc-300 font-light tracking-wide max-w-md mx-auto leading-relaxed">WhatsApp inquiry ready — please press Send on WhatsApp to complete it. Email could not be confirmed this time, so please also send it via WhatsApp. Our team will share quote in 24 hours.</p>
              )}
              <p className="text-xs text-[#D4AF37]">Company: {formData.companyName} • Product: {getFinalProduct()} • Qty: {formData.quantity}</p>
              {emailStatus === "failed" && <p className="text-xs text-amber-400">Email status: Not confirmed — WhatsApp se zaroor Send dabayein.</p>}
            </div>
            <button onClick={handleReset} className="bg-[#D4AF37] text-black text-xs uppercase tracking-[0.2em] font-semibold px-6 py-3 hover:bg-[#E8C15A] transition-colors">Submit Another Inquiry</button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 sm:p-8 space-y-6 scroll-mt-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">Company Name *</label><input type="text" required placeholder="Your Company Name" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none" /></div>
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">Business Email *</label><input type="email" required placeholder="you@company.com" value={formData.businessEmail} onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none" /></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2"><PhoneInput country={formData.country} value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} label="Phone / WhatsApp" placeholder="3001234567" required={false} /></div>
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">Country / Target Market</label><select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none">{COUNTRIES.map((c, i) => <option key={`${c}-${i}`} value={c}>{c}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2"><PhoneInput country={formData.country} value={formData.altPhone} onChange={(v) => setFormData({ ...formData, altPhone: v })} label="Alternate / Contact Number (Optional)" placeholder="3001234567" required={false} name="altPhone" /></div>
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">Estimated Quantity</label>
                <select value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none">
                  {showCustomQty && <option value={formData.quantity}>{formData.quantity} Units - From Product Page</option>}
                  <option value="25">25 Units - Biker Suit</option><option value="50">50 Units</option><option value="100">100 Units</option><option value="500">500 Units</option><option value="1000+">1000+ Units</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">Product Type</label>
                <select value={formData.productType} onChange={(e) => setFormData({ ...formData, productType: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none">
                  <option value="Leather Jacket">Leather Jacket</option><option value="Biker Suit">Biker Suit - 2 Piece</option><option value="Belt">Belt</option><option value="Bag">Bag</option><option value="Wallet">Wallet</option><option value="Card Holder / Keychain">Card Holder / Keychain - Bulk</option><option value="Others">Others - Custom / Not Listed</option>
                </select>
                {formData.productType === "Others" && (<input type="text" required placeholder="Please specify your product — e.g. Custom Leather Product" value={formData.otherProduct} onChange={(e) => setFormData({ ...formData, otherProduct: e.target.value })} className="w-full bg-zinc-900 border border-[#D4AF37]/60 rounded px-4 py-3 text-xs text-white focus:border-[#D4AF37] focus:outline-none mt-2" />)}
                {formData.productType === "Others" && (<p className="text-[11px] text-zinc-400 tracking-wide">List me nahi hai to yahan apna product likh dein — hum quote de denge.</p>)}
              </div>
              <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">White Label Needed?</label>
                <div className="flex items-center gap-6 pt-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="whiteLabel" value="Yes" checked={formData.whiteLabel === "Yes"} onChange={(e) => setFormData({ ...formData, whiteLabel: e.target.value })} className="accent-[#D4AF37]" /><span>Yes</span></label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="whiteLabel" value="No" checked={formData.whiteLabel === "No"} onChange={(e) => setFormData({ ...formData, whiteLabel: e.target.value })} className="accent-[#D4AF37]" /><span>No</span></label>
                </div>
              </div>
            </div>
            <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">Brand Logo Upload (Optional)</label><input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className="w-full bg-zinc-900 border border-zinc-800 rounded px-4 py-2.5 text-xs text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-black hover:file:bg-[#E8C15A]" />{logoFile && <p className="text-xs text-green-400">✅ {logoFile.name} - This filename will be included in the WhatsApp inquiry.</p>}</div>
            <div className="space-y-2"><label className="text-xs uppercase tracking-widest text-zinc-300 font-light">Project Specifications &amp; Message</label><textarea rows={4} placeholder="Mention sizing breakdown, custom leather finish, or target delivery timeline..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 rounded p-4 text-xs text-white focus:border-[#D4AF37] focus:outline-none" /></div>
            <button type="submit" disabled={isSubmitting} className={`w-full font-bold text-xs uppercase tracking-[0.2em] py-4 rounded transition-colors shadow-md ${isSubmitting ? "bg-zinc-700 text-zinc-400 cursor-not-allowed" : "bg-[#D4AF37] text-black hover:bg-[#E8C15A]"}`}>{isSubmitting ? "Submitting... Please Wait" : "Submit Wholesale Inquiry - Send On Email + WhatsApp →"}</button>
            <p className="text-center text-xs text-zinc-500 tracking-wide">Retail price on Shop | Wholesale quote in 24 hours. Sample before bulk. Ships via fastest delivery. • 50% Advance - 50% Before Dispatch • Estimated Total: 12-17 Working Days</p>
          </form>
        )}
      </div>
    </main>
  );
}
export default function B2BPage() {
  return (<Suspense fallback={<main className="bg-black text-white min-h-screen flex items-center justify-center text-sm">Loading B2B Form...</main>}><B2BPageInner /></Suspense>);
}
