"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import { buildFullPhone } from "@/lib/data/phone-codes";
import { COUNTRIES } from "@/lib/data/countries";

const WA = "Whats" + "App";
const VISA = "VI" + "SA";
const MC = "MASTER" + "CARD";
const WU = "WESTERN " + "UNION";

const contact = {
  email: "hello@krossford.com",
  waNumber: "923030006759",
  waDisplay: "+92303 0006759",
  phone: "+92303 0006759",
  location: "Gujrat, Punjab, Pakistan",
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "", orderType: "Sample Piece - B2B", quantity: "", phone: "", altPhone: "", country: "United States" });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (form.phone) setForm((prev) => ({ ...prev, phone: buildFullPhone(prev.country, prev.phone) }));
    if (form.altPhone) setForm((prev) => ({ ...prev, altPhone: buildFullPhone(prev.country, prev.altPhone) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.country]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    const remaining = 5 - files.length;
    if (selected.length > remaining) {
      alert(`You can add ${remaining} more photos (maximum 5).`);
    }
    const toAdd = selected.slice(0, remaining);
    const newPreviews = toAdd.map((f) => URL.createObjectURL(f));
    setFiles((prev) => [...prev, ...toAdd]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const buildMessage = () => {
    const filesText = files.length > 0 ? `\n\nAttached Design / Images (${files.length}):\n${files.map((f, i) => `${i + 1}. ${f.name}`).join("\n")}\n(Note: Please attach the photos manually to ${WA} or email)` : "";
    return `Hello Krossford! NEW ENQUIRY\n\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nCountry: ${form.country}\nPhone / ${WA}: ${form.phone || "Not given"}${form.altPhone ? `\nAlternate / Contact Number: ${form.altPhone}` : ""}\nOrder Type: ${form.orderType}\nQuantity: ${form.quantity}\n\nMessage: ${form.message}${filesText}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill Name, Email and Message");
      return;
    }
    setSubmitting(true);
    setSubmissionError(null);
    const message = buildMessage();

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          lead: {
            source: "b2b-contact",
            customerName: form.name,
            email: form.email,
            contact: form.phone || form.altPhone,
            product: form.orderType,
            quantity: form.quantity,
            message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Contact enquiry submission failed.");
      }

      setSent(true);
    } catch (error) {
      console.error("Contact enquiry submission failed:", error);
      setSubmissionError("We could not submit your enquiry. Please try again or use the direct contact options.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 px-3 min-[400px]:px-4 sm:px-6 md:px-12 w-full min-w-0 overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-8 w-full min-w-0">
        <div className="text-center space-y-2 min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#D4AF37] break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>Contact Us</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest break-words">Wholesale / Bulk Enquiries Only • Handstitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 w-full min-w-0">
          <Link href="/b2b" className="border border-[#D4AF37]/50 rounded-lg p-4 sm:p-5 bg-[#D4AF37]/5 hover:border-[#D4AF37] transition-colors text-center min-w-0">
            <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest break-words">I Want Bulk / Wholesale</p>
            <p className="text-xs text-zinc-400 mt-1 break-words">Jacket 50+ • Biker Suit 25+ • Small Items 100+</p>
            <p className="text-xs font-bold mt-2 underline break-words">Go To B2B Form →</p>
          </Link>
          <Link href="/shop" className="border border-zinc-800 rounded-lg p-4 sm:p-5 bg-zinc-900 hover:border-[#D4AF37] transition-colors text-center min-w-0">
            <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest break-words">I Want To Buy 1 Piece</p>
            <p className="text-xs text-zinc-400 mt-1 break-words">Full-Grain Leather • Handcrafted • Honest Price</p>
            <p className="text-xs font-bold mt-2 underline break-words">Go To Shop →</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 w-full min-w-0">
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-3 min-[400px]:p-4 sm:p-6 rounded space-y-4 w-full min-w-0">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37] break-words">Send Enquiry</h2>
            <input required placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
            <input placeholder="Company / Entity Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
            <input required type="email" placeholder="Corporate Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
            <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-[#D4AF37]">
              {COUNTRIES.map((c, i) => <option key={`${c}-${i}`} value={c}>{c}</option>)}
            </select>
            <PhoneInput country={form.country} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} label={"Mobile / " + WA} placeholder="3001234567" required={false} />
            <PhoneInput country={form.country} value={form.altPhone} onChange={(v) => setForm({ ...form, altPhone: v })} label="Alternate / Contact Number (Optional)" placeholder="3001234567" required={false} name="altPhone" />
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 min-w-0">
              <select value={form.orderType} onChange={(e) => setForm({ ...form, orderType: e.target.value })} className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-[#D4AF37]">
                <option>Sample Piece - B2B</option>
                <option>Bulk Order - B2B</option>
                <option>Sample Request</option>
              </select>
              <input placeholder="Quantity? e.g. 50" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
            </div>
            <textarea required rows={4} placeholder="Tell us about your bulk order or sample request - quantity, leather type..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full min-w-0 bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
            <div className="min-w-0">
              <label className="block text-xs tracking-widest text-zinc-400 uppercase font-bold break-words">Upload Your Design / Image (Optional - Max 5)</label>
              <label className="mt-2 w-full border-2 border-dashed border-zinc-700 rounded px-4 py-5 text-center block cursor-pointer hover:border-[#D4AF37] bg-zinc-950">
                <span className="text-sm text-zinc-300 break-words">Click to Upload Image / Design (JPG / PNG)</span>
                <span className="block text-xs text-zinc-500 mt-1 break-words">Add your logo, design, or reference photo here.</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
              </label>
              {previews.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-green-400 break-words">✅ {files.length} / 5 Photos Selected</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {previews.map((src, i) => (
                      <div key={i} className="relative w-20 h-20 rounded overflow-hidden border border-zinc-700">
                        <img src={src} alt={files[i]?.name} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeFile(i)} className="absolute top-0 right-0 bg-black/80 text-white text-xs w-5 h-5 leading-none">✕</button>
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs px-1 truncate">{files[i]?.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#D4AF37] mt-2 break-words">⚠ {WA} / Email khulne ke baad photos dobara attach kar dena, taake design mil jaye.</p>
                </div>
              )}
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-[#25D366] text-black py-4 rounded text-xs font-bold uppercase tracking-wider hover:brightness-110 disabled:opacity-60 border-2 border-[#25D366] shadow-md">
              {submitting ? "Sending..." : "SEND ENQUIRY"}
            </button>
            {submissionError && <p role="alert" className="text-xs text-red-400 text-center break-words">{submissionError}</p>}
            {sent && <p className="text-xs text-green-400 text-center break-words">Enquiry sent to our team. Thank you!</p>}
          </form>
          <div className="space-y-4 w-full min-w-0">
            <h2 className="text-xl font-semibold text-white mb-4 break-words" style={{ fontFamily: "var(--font-brand)" }}>Direct Touchpoints</h2>
            <a href={`mailto:${contact.email}`} className="block rounded-md border border-[#D4AF37]/20 px-4 sm:px-5 py-4 text-[#D4AF37] transition hover:border-[#D4AF37]/60 min-w-0">
              <span className="block text-xs text-zinc-400 uppercase break-words">Email Us</span>
              <span className="text-sm font-bold break-all">{contact.email}</span>
            </a>
            <a href={`https://wa.me/${contact.waNumber}?text=${encodeURIComponent("Hi KROSSFORD, I want to enquire about Retail (1 Piece) or Wholesale / Bulk leather order.")}`} target="_blank" rel="noopener noreferrer" className="block rounded-md border border-[#25D366]/30 px-4 sm:px-5 py-4 transition hover:border-[#25D366] min-w-0">
              <span className="block text-xs text-zinc-400 uppercase break-words">{WA} / Phone</span>
              <span className="text-sm font-bold text-[#25D366] break-words">{contact.waDisplay} 💬 Chat Now</span>
            </a>
            <div className="block rounded-md border border-zinc-800 px-4 sm:px-5 py-4 min-w-0">
              <span className="block text-xs text-zinc-400 uppercase break-words">Workshop</span>
              <span className="text-sm font-bold text-zinc-300 break-words">{contact.location}</span>
            </div>
            <div className="block rounded-md border border-zinc-800 px-4 sm:px-5 py-4 bg-zinc-900 min-w-0">
              <span className="block text-xs text-zinc-400 uppercase break-words">Payment</span>
              <span className="text-xs text-zinc-300 mt-1 block break-words">{VISA} | {MC} | {WU} | BANK TRANSFER</span>
              <span className="text-xs text-zinc-400 mt-1 block break-words">Retail: 100% Advance • Wholesale: 50% Advance - 50% After Order Ready • Sample Before Bulk • Handstitched • Customized / On Demand</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
