"use client";

import { useState } from "react";

const contact = {
  email: "hello@krossford.com",
  whatsapp: "Coming Soon",
  phone: "Coming Soon",
  location: "Gujrat, Punjab, Pakistan",
};

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Abhi ke liye mailto se khulega - backend baad me jorenge
    const subject = `Wholesale Enquiry from ${form.name} - ${form.company}`;
    const body = `Name: ${form.name}%0D%0ACompany: ${form.company}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${form.message}`;
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
            <div className="block rounded-md border border-zinc-800 px-5 py-4">
              <span className="block text-xs text-zinc-400 uppercase">WhatsApp / Phone</span>
              <span className="text-sm font-bold text-zinc-300">{contact.whatsapp}</span>
            </div>
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