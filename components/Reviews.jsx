"use client";
import { useState, useEffect } from "react";

// REVIEW FORM + SLIDER - FINAL - ENGLISH ONLY - components/Reviews.jsx
// This file is .jsx, not .tsx - No TypeScript allowed
// All user-facing text is in English only - No Roman Urdu
// 1. Encode fix - encodeURIComponent so & or ? does not break the link
// 2. Order Ref added - To verify real orders
// 3. Product list - 7 products
// 4. No alert popup - Success message shows inside the form
// 5. City placeholder fix - Pehle example tha, ab sirf "City, Country *" hai - Example hataya, jaisa user ne bola
// 6. NEW - International Reviews Slider - Auto-slide har 4 sec me, jaise demo website me tha
//    USA, UK, UAE, Canada, Australia, Germany - 6 reviews

const PRODUCTS = [
  "Classic Tote Bag",
  "Leather Wallet - Custom Name",
  "Crossbody Bag",
  "Card Holder",
  "Keychain",
  "Leather Handbag",
  "Other Product",
];

// International Reviews - Demo website jaisa slider - 6 Countries
const REVIEWS = [
  {
    name: "James Carter",
    city: "New York, USA",
    country: "USA",
    product: "Classic Tote Bag",
    stars: 5,
    text: "Genuine leather, premium stitching. The tote feels luxury in hand. Delivery via DHL was fast and tracked. Will order again.",
  },
  {
    name: "Emily Thompson",
    city: "London, UK",
    country: "UK",
    product: "Leather Wallet - Custom Name",
    stars: 5,
    text: "Ordered a custom name wallet. Finish is clean, name engraving is perfect. Looks far more expensive than the price. Highly recommended.",
  },
  {
    name: "Ahmed Al Farsi",
    city: "Dubai, UAE",
    country: "UAE",
    product: "Crossbody Bag",
    stars: 5,
    text: "Best crossbody bag I have bought. Strong leather, smooth zip, perfect for daily use. Krossford quality is real.",
  },
  {
    name: "Sophia Miller",
    city: "Toronto, Canada",
    country: "Canada",
    product: "Leather Handbag",
    stars: 5,
    text: "Beautiful handbag, soft leather and honest craftsmanship. Sample first, then bulk — I trust this brand for my boutique.",
  },
  {
    name: "Liam Wilson",
    city: "Sydney, Australia",
    country: "Australia",
    product: "Card Holder",
    stars: 4,
    text: "Slim card holder, very good leather. Delivery took a little time but worth the wait. Quality is excellent for the price.",
  },
  {
    name: "Hannah Schneider",
    city: "Berlin, Germany",
    country: "Germany",
    product: "Keychain",
    stars: 5,
    text: "Small product, big quality. Keychain leather is thick and well finished. Packaging was premium. Great experience.",
  },
];

export default function ReviewForm() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [current, setCurrent] = useState(0);
  const [form, setForm] = useState({
    name: "",
    city: "",
    product: "Classic Tote Bag",
    stars: 5,
    orderRef: "",
    text: "",
  });

  // Auto-slide har 4 sec me - Demo website jaisa
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const review = REVIEWS[current];

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

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* ===== REVIEWS SLIDER - Demo website jaisa - Auto-slide ===== */}
      <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 overflow-hidden">
        <div className="text-center">
          <p className="text-amber-400 text-lg tracking-widest">{"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}</p>
          <p className="text-base sm:text-lg text-zinc-100 leading-relaxed mt-3 min-h-[72px]">&ldquo;{review.text}&rdquo;</p>
          <p className="font-bold mt-4">{review.name}</p>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mt-1">{review.city} • {review.product}</p>
        </div>
        {/* Prev / Next */}
        <button aria-label="Previous Review" onClick={() => setCurrent((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-500 hover:text-black text-white w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer">‹</button>
        <button aria-label="Next Review" onClick={() => setCurrent((prev) => (prev + 1) % REVIEWS.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-500 hover:text-black text-white w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer">›</button>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {REVIEWS.map((_, i) => (
            <button key={i} aria-label={`Go to review ${i + 1}`} onClick={() => setCurrent(i)} className={`h-2 rounded-full cursor-pointer transition-all ${i === current ? "bg-amber-500 w-5" : "bg-zinc-600 w-2"}`} />
          ))}
        </div>
        <p className="text-center text-[11px] text-zinc-500 mt-3 tracking-widest">{current + 1} / {REVIEWS.length} • USA • UK • UAE • Canada • Australia • Germany</p>
      </div>
      {/* ===== SLIDER KHATAM ===== */}

      {!open ? (
        <div className="text-center mt-8">
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-black text-sm font-bold px-7 py-3 rounded-full hover:bg-amber-400 transition"
          >
            ✍ Write a Review
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
}
