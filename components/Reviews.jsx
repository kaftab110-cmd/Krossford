"use client";
import { useState } from "react";

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", product: "Classic Tote Bag", stars: 5, text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `NEW REVIEW FOR APPROVAL - KROSSFORD%0A%0AName: ${form.name}%0ACity: ${form.city}%0AProduct: ${form.product}%0ARating: ${form.stars} / 5%0AReview: ${form.text}`;
    window.open(`https://wa.me/923030006759?text=${msg}`, "_blank");
    setOpen(false);
    alert("Shukriya! Tumhara review approval ke liye bhej diya gaya hai. Approve hone ke baad website pe dikhega.");
  };

  if (!open) {
    return (
      <div className="text-center mt-8">
        <button onClick={() => setOpen(true)} className="bg-white text-black text-sm font-bold px-7 py-3 rounded-full hover:bg-amber-400 transition">
          ✍️ Write a Review
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">
      <h3 className="font-bold text-lg">Share Your Experience</h3>
      <p className="text-xs text-zinc-400 mt-1">Sirf real orders wale reviews approve honge.</p>
      <form onSubmit={handleSubmit} className="space-y-3 mt-5">
        <input required placeholder="Tumhara Naam *" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500" />
        <input required placeholder="City, Country - e.g. Lahore, Pakistan" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500" />
        <select value={form.product} onChange={(e) => setForm({...form, product: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none">
          <option>Classic Tote Bag</option>
          <option>Leather Wallet - Custom Name</option>
          <option>Crossbody Bag</option>
          <option>Other Product</option>
        </select>
        <select value={form.stars} onChange={(e) => setForm({...form, stars: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none">
          <option value={5}>★★★★★ - 5 - Excellent</option>
          <option value={4}>★★★★☆ - 4 - Very Good</option>
          <option value={3}>★★★☆☆ - 3 - Average</option>
          <option value={2}>★★☆☆☆ - 2 - Not Good</option>
          <option value={1}>★☆☆☆☆ - 1 - Poor</option>
        </select>
        <textarea required rows={4} placeholder="Apna honest review likhein..." value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500" />
        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-amber-500 text-black font-bold text-sm py-3 rounded-full hover:bg-amber-400">Submit for Approval →</button>
          <button type="button" onClick={() => setOpen(false)} className="px-5 py-3 rounded-full border border-zinc-700 text-sm">Cancel</button>
        </div>
      </form>
    </div>
  );
}