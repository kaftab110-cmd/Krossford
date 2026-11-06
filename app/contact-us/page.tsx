"use client";

import { useState } from "react";

const contact = {
  email: "hello@krossford.com",
  whatsapp: "923030006759", // +92303 0006759
  whatsappDisplay: "+92303 0006759",
  phone: "+92303 0006759",
  location: "Gujrat, Punjab, Pakistan",
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Abhi ke liye mailto se khulega - backend baad me jorenge
    const subject = `Wholesale Enquiry from ${form.name} - ${form.company}`;
    const filesText = files.length > 0
      ? `%0D%0A%0D%0AAttached Design / Images (${files.length}):%0D%0A${files.map((f, i) => `${i + 1}. ${f.name}`).join("%0D%0A")}%0D%0A(Note: Photos email me manually attach kar dein)`
      : "";
    const body = `Name: ${form.name}%0D%0ACompany: ${form.company}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${form.message}${filesText}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-amber-400">Wholesale & Contact</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-widest">B2B Enquiry - Private Label & Bulk Production</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Direct Touchpoints */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Direct Touchpoints</h2>
            <a
              href={`mailto:${contact.email}`}
              className="block rounded-md border border-yellow-500/20 px-5 py-4 text-yellow-500 transition hover:border-yellow-500/60"
            >
              <span className="block text-xs text-zinc-400 uppercase">Email Us</span>
              <span className="text-sm font-bold">{contact.email}</span>
            </a>
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hi KROSSFORD, I want to enquire about wholesale / bulk leather order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md border border-[#25D366]/30 px-5 py-4 transition hover:border-[#25D366]"
            >
              <span className="block text-xs text-zinc-400 uppercase">WhatsApp / Phone</span>
              <span className="text-sm font-bold text-[#25D366]">{contact.whatsappDisplay} 💬 Chat Now</span>
            </a>
            <div className="block rounded-md border border-zinc-800 px-5 py-4">
              <span className="block text-xs text-zinc-400 uppercase">Workshop</span>
              <span className="text-sm font-bold text-zinc-300">{contact.location}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400">Send Enquiry</h2>
            <input
              required
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <input
              placeholder="Company / Entity Name"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <input
              required
              type="email"
              placeholder="Corporate Email *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />
            <textarea
              required
              rows={4}
              placeholder="Tell us about your bulk order, quantity, leather type..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm outline-none focus:border-amber-400"
            />

            {/* ✅ NEW - IMAGE / DESIGN UPLOAD */}
            <div>
              <label className="block text-[11px] tracking-widest text-zinc-400 uppercase font-bold">Upload Your Design / Image (Optional - Max 5)</label>
              <label className="mt-2 w-full border-2 border-dashed border-zinc-700 rounded px-4 py-5 text-center block cursor-pointer hover:border-amber-400 bg-zinc-950">
                <span className="text-sm text-zinc-300">📁 Click to Upload Image / Design (JPG / PNG)</span>
                <span className="block text-[11px] text-zinc-500 mt-1">Apna logo, design ya reference photo yahan add karo</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
              </label>

              {previews.length > 0 && (
                <div className="mt-3">
                  <p className="text-[11px] text-green-400">✅ {files.length} / 5 Photos Selected</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {previews.map((src, i) => (
                      <div key={i} className="relative w-[70px] h-[70px] rounded overflow-hidden border border-zinc-700">
                        <img src={src} alt={files[i]?.name} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeFile(i)} className="absolute top-0 right-0 bg-black/80 text-white text-[10px] w-5 h-5 leading-none">✕</button>
                        <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-[8px] px-1 truncate">{files[i]?.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-amber-400 mt-2">⚠️ SEND ENQUIRY dabane ke baad Email khulega - wahan photos dobara attach kar dena, taake design mil jaye.</p>
                </div>
              )}
            </div>

            <button type="submit" className="w-full bg-amber-400 text-black py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-amber-500">
              Send Enquiry
            </button>
            {sent && <p className="text-xs text-green-400 text-center">Opening your email app... Thank you!</p>}
          </form>
        </div>
      </div>
    </div>
  );
}