"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import { buildFullPhone } from "@/lib/data/phone-codes";
import { COUNTRIES } from "@/lib/data/countries";

const contact = {
  email: "hello@krossford.com",
  whatsapp: "923030006759",
  whatsappDisplay: "+92303 0006759",
  phone: "+92303 0006759",
  location: "Gujrat, Punjab, Pakistan",
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "", orderType: "Single Piece - B2C", quantity: "", phone: "", altPhone: "", country: "United States" });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Country badle to dono numbers ka code bhi badle - Pakistan +92, India +91, USA +1 ...
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
      alert(`Sirf ${remaining} aur photo add kar sakte ho - Max 5 photos`);
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
    const filesText = files.length > 0 ? `\n\nAttached Design / Images (${files.length}):\n${files.map((f, i) => `${i + 1}. ${f.name}`).join("\n")}\n(Note: Photos WhatsApp / Email me manually attach kar dein)` : "";
    return `Hello Krossford! NEW ENQUIRY\n\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nCountry: ${form.country}\nPhone / WhatsApp: ${form.phone || "Not given"}${form.altPhone ? `\nAlternate / Contact Number: ${form.altPhone}` : ""}\nOrder Type: ${form.orderType}\nQuantity: ${form.quantity}\n\nMessage: ${form.message}${filesText}`;
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill Name, Email and Message");
      return;
    }
    window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(buildMessage())}`, "_blank");
    setSent(true);
  };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill Name, Email and Message");
      return;
    }
    const enquiryType = form.orderType.includes("B2B") ? "Wholesale Enquiry" : form.orderType.includes("Sample") ? "Sample Enquiry" : "Retail Enquiry";
    const subject = `${enquiryType} from ${form.name} - ${form.company}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildMessage())}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-amber-400">Contact Us</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">Retail + Wholesale Enquiry - 1 Piece or Bulk Production</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/shop" className="border border-zinc-800 rounded-lg p-5 bg-zinc-900 hover:border-amber-400 transition-colors text-center">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">I Want To Buy 1 Piece</p>
            <p className="text-xs text-zinc-400 mt-1">Full-Grain Leather • Handcrafted • Honest Price</p>
            <p className="text-xs font-bold mt-2 underline">Go To Shop →</p>
          </Link>
          <Link href="/b2b" className="border border-amber-400/50 rounded-lg p-5 bg-amber-400/5 hover:border-amber-400 transition-colors text-center">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest">I Want Bulk / Wholesale</p>
            <p className="text-xs text-zinc-400 mt-1">Jacket 50+ • Biker Suit 25+ • Small Items 100+</p>
            <p className="text-xs font-bold mt-2 underline">Go To B2B Form →</p>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Direct Touchpoints</h2>
            <a href={`mailto:${contact.email}`} className="block rounded-md border border-amber-400/20 px-5 py-4 text-amber-400 transition hover:border-amber-400/60">
              <span className="block text-xs text-zinc-400 uppercase">Email Us</span>
              <span className="text-sm font-bold">{contact.email}</span>
            </a>
            <a href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi KROSSFORD, I want to enquire about Retail (1 Piece) or Wholesale / Bulk leather order.")}`} target="_blank" rel="noopener noreferrer" className="block rounded-md border border-[#25D366]/30 px-5 py-4 transition hover:border-[#25D366]">
              <span className="block text-xs text-zinc-400 uppercase">WhatsApp / Phone</span>
              <span className="text-sm font-bold text-[#25D366]">{contact.whatsappDisplay} 💬 Chat Now</span>
            </a>
            <div className="block rounded-md border border-zinc-800 px-5 py-4">
              <span className="block text-xs text-zinc-400 uppercase">Workshop</span>
              <span className="text-sm font-bold text-zinc-300">{contact.location}</span>
            </div>
            <div className="block rounded-md border border-zinc-800 px-5 py-4 bg-zinc-900">
              <span className="block text-xs text-zinc-400 uppercase">Payment</span>
              <span className="text-xs text-zinc-300 mt-1 block">VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER</span>
              <span className="text-xs text-zinc-400 mt-1 block">Retail: 100% Advance • Wholesale: 50% Advance - 50% After Order Ready • Sample Before Bulk</span>
            </div>
          </div>
          <form onSubmit={handleWhatsApp} className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">Send Enquiry</h2>
            <input required placeholder="Full Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400" />
            <input placeholder="Company / Entity Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400" />
            <input required type="email" placeholder="Corporate Email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400" />
            {/* COUNTRY + PHONE - Country select karte hi auto code: Pakistan +92, India +91, USA +1 ... */}
            <select value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400">
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <PhoneInput country={form.country} value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} label="Mobile / WhatsApp" placeholder="3001234567" required={false} />
            <PhoneInput country={form.country} value={form.altPhone} onChange={(v) => setForm({ ...form, altPhone: v })} label="Alternate / Contact Number (Optional)" placeholder="3001234567" required={false} name="altPhone" />
            <div className="grid grid-cols-2 gap-3">
              <select value={form.orderType} onChange={(e) => setForm({ ...form, orderType: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400">
                <option>Single Piece - B2C</option>
                <option>Bulk Order - B2B</option>
                <option>Sample Request</option>
              </select>
              <input placeholder="Quantity? e.g. 50" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400" />
            </div>
            <textarea required rows={4} placeholder="Tell us about your order - 1 piece or bulk, quantity, leather type..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400" />
            <div>
              <label className="block text-xs tracking-widest text-zinc-400 uppercase font-bold">Upload Your Design / Image (Optional - Max 5)</label>
              <label className="mt-2 w-full border-2 border-dashed border-zinc-700 rounded px-4 py-5 text-center block cursor-pointer hover:border-amber-400 bg-zinc-950">
                <span className="text-sm text-zinc-300">Click to Upload Image / Design (JPG / PNG)</span>
                <span className="block text-xs text-zinc-500 mt-1">Apna logo, design ya reference photo yahan add karo</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
              </label>
              {previews.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-green-400">✅ {files.length} / 5 Photos Selected</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {previews.map((src, i) => (
                      <div key={i} className="relative w-20 h-20 rounded overflow-hidden border border-zinc-700">
                        <img src={src} alt={files[i]?.name} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeFile(i)} className="absolute top-0 right-0 bg-black/80 text-white text-xs w-5 h-5 leading-none">✕</button>
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text- px-1 truncate">{files[i]?.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-amber-400 mt-2">⚠ WhatsApp / Email khulne ke baad photos dobara attach kar dena, taake design mil jaye.</p>
                </div>
              )}
            </div>
            <button type="submit" className="w-full bg-[#25D366] text-black py-3 rounded text-xs font-bold uppercase tracking-wider hover:brightness-110">Send Via WhatsApp (Fast) →</button>
            <button type="button" onClick={handleEmail} className="w-full border border-zinc-700 py-3 rounded text-xs font-bold uppercase tracking-wider hover:border-amber-400">Send Via Email</button>
            {sent && <p className="text-xs text-green-400 text-center">Opening WhatsApp / Email... Thank you!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
