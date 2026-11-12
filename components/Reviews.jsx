"use client";
import { useState } from "react";

// REVIEW FORM - FINAL - ENGLISH ONLY - components/Reviews.jsx
// This file is .jsx, not .tsx - No TypeScript allowed
// All user-facing text is in English only - No Roman Urdu
// 1. Encode fix - encodeURIComponent so & or ? does not break the link
// 2. Order Ref added - To verify real orders
// 3. Product list - 7 products
// 4. No alert popup - Success message shows inside the form
// 5. City placeholder fix - Pehle example tha, ab sirf "City, Country *" hai - Example hataya, jaisa user ne bola

const PRODUCTS = [
  "Classic Tote Bag",
  "Leather Wallet - Custom Name",
  "Crossbody Bag",
  "Card Holder",
  "Keychain",
  "Leather Handbag",
  "Other Product",
];

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    city: "",
    product: "Classic Tote Bag",
    stars: 5,
    orderRef: "",
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      "NEW REVIEW FOR APPROVAL - KROSSFORD",
      "",
      "Name: " + form.name,
      "City: " + form.city,
      "Product: " + form.product,
      "Rating: " + form.stars + " / 5",
      "Order Ref: " + (form.orderRef || "Not provided"),
      "Review: " + form.text,
    ];
    const msg = encodeURIComponent(lines.join("\n"));
    window.open("https://wa.me/923030006759?text=" + msg, "_blank");
    setSent(true);
    setOpen(false);
  };

  if (sent) {
    return (
      <div className="max-w-lg mx-auto bg-zinc-900 border border-amber-500/30 rounded-xl p-6 mt-8 text-center">
        <p className="font-bold text-lg">Thank You! ✅</p>
        <p className="text-sm text-zinc-400 mt-2">
          Your review has been sent for approval. It will appear on the website after approval. Only reviews from real orders will be approved.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm({ name: "", city: "", product: "Classic Tote Bag", stars: 5, orderRef: "", text: "" });
          }}
          className="mt-4 text-sm underline text-zinc-300 hover:text-amber-400"
        >
          Write another review
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-center mt-8">
        <button
          onClick={() => setOpen(true)}
          className="bg-white text-black text-sm font-bold px-7 py-3 rounded-full hover:bg-amber-400 transition"
        >
          ✍ Write a Review
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">
      <h3 className="font-bold text-lg">Share Your Experience</h3>
      <p className="text-xs text-zinc-400 mt-1">Only reviews from real orders will be approved.</p>
      <form onSubmit={handleSubmit} className="space-y-3 mt-5">
        <input
          required
          placeholder="Your Name *"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500"
        />
        <input
          required
          placeholder="City, Country *"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500"
        />
        <select
          value={form.product}
          onChange={(e) => setForm({ ...form, product: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none"
        >
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select
          value={form.stars}
          onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none"
        >
          <option value={5}>★★★★★ - 5 - Excellent</option>
          <option value={4}>★★★★☆ - 4 - Very Good</option>
          <option value={3}>★★★☆☆ - 3 - Average</option>
          <option value={2}>★★☆☆☆ - 2 - Not Good</option>
          <option value={1}>★☆☆☆☆ - 1 - Poor</option>
        </select>
        <input
          placeholder="Order Ref / Tracking No. (optional - for verification)"
          value={form.orderRef}
          onChange={(e) => setForm({ ...form, orderRef: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500"
        />
        <textarea
          required
          rows={4}
          placeholder="Write your honest review..."
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500"
        />
        <div className="flex gap-3">
          <button type="submit" className="flex-1 bg-amber-500 text-black font-bold text-sm py-3 rounded-full hover:bg-amber-400">
            Submit for Approval →
          </button>
          <button type="button" onClick={() => setOpen(false)} className="px-5 py-3 rounded-full border border-zinc-700 text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
