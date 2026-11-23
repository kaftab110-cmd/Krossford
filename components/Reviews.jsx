"use client";
import { useState, useEffect, useRef } from "react";
// components/Reviews.jsx - DROPLEATHER STYLE - .jsx only, no TypeScript
// 1. Initials wala rang-biranga dabba KHATAM - har reviewer ki gol PHOTO hai
// 2. Ek bada card KHATAM - ab chhote WHITE cards, ek saath 3 dikhenge (mobile pe 1)
// 3. Sliding: auto-slide har 4 sec, arrow / dot pe 8 sec pause, touch swipe bhi chalega
// 4. Write a Review form SAME hai - WhatsApp pe jayega, wahan Send dabana hoga
// 5. Photo: pravatar faces - jab asli customer ki photo milegi to uska image yahan laga denge
const PRODUCTS = ["Leather Tote Bag", "Minimalist RFID Wallet", "Crossbody Messenger Bag", "Card Holder", "Leather Tag + Keychain Set", "Leather Handbag", "Other Product"];
const REVIEWS = [
  { name: "James Carter", role: "Retail Brand Owner", city: "New York, USA", product: "Leather Tote Bag", stars: 5, img: "https://i.pravatar.cc/100?img=12", text: "Genuine leather, premium stitching. The tote feels luxury in hand. Delivery was fast and tracked. Will order again." },
  { name: "Emily Thompson", role: "Boutique Owner", city: "London, UK", product: "Minimalist RFID Wallet", stars: 5, img: "https://i.pravatar.cc/100?img=47", text: "Ordered a custom name wallet. Finish is clean, name engraving is perfect. Looks far more expensive than the price. Highly recommended." },
  { name: "Ahmed Al Farsi", role: "Product Designer", city: "Dubai, UAE", product: "Crossbody Messenger Bag", stars: 5, img: "https://i.pravatar.cc/100?img=33", text: "Best crossbody bag I have bought. Strong leather, smooth zip, perfect for daily use. Krossford quality is real." },
  { name: "Sophia Miller", role: "Small Business Owner", city: "Toronto, Canada", product: "Leather Handbag", stars: 5, img: "https://i.pravatar.cc/100?img=45", text: "Beautiful handbag, soft leather and honest craftsmanship. Sample first, then bulk - I trust this brand for my boutique." },
  { name: "Liam Wilson", role: "Fashion Entrepreneur", city: "Sydney, Australia", product: "Card Holder", stars: 4, img: "https://i.pravatar.cc/100?img=53", text: "Slim card holder, very good leather. Delivery took a little time but worth the wait. Quality is excellent for the price." },
  { name: "Hannah Schneider", role: "Brand Owner", city: "Berlin, Germany", product: "Leather Tag + Keychain Set", stars: 5, img: "https://i.pravatar.cc/100?img=44", text: "Small product, big quality. Keychain leather is thick and well finished. Packaging was premium. Will order in bulk." },
];
export default function Reviews() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", city: "", product: "Leather Tote Bag", stars: 5, orderRef: "", text: "" });
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const pausedUntil = useRef(0);
  const touchX = useRef(null);
  useEffect(() => {
    const update = () => setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update);
  }, []);
  const maxIndex = Math.max(0, REVIEWS.length - perView);
  useEffect(() => {
    const t = setInterval(() => { if (Date.now() < pausedUntil.current) return; setIndex((p) => (p >= maxIndex ? 0 : p + 1)); }, 4000);
    return () => clearInterval(t);
  }, [maxIndex]);
  const go = (dir) => { pausedUntil.current = Date.now() + 8000; setIndex((p) => Math.max(0, Math.min(maxIndex, p + dir))); };
  const handleSubmit = (e) => { e.preventDefault(); const lines = ["NEW REVIEW FOR APPROVAL - KROSSFORD", "", "Name: " + form.name, "City: " + form.city, "Product: " + form.product, "Rating: " + form.stars + " / 5", "Order Ref: " + (form.orderRef || "Not provided"), "Review: " + form.text]; const msg = encodeURIComponent(lines.join("\n")); window.open("https://wa.me/923030006759?text=" + msg, "_blank"); setSent(true); setOpen(false); };
  if (sent) return (<div className="max-w-lg mx-auto bg-zinc-900 border border-amber-500/30 rounded-xl p-6 mt-8 text-center"><p className="font-bold text-lg text-white">WhatsApp Ready — Please Press Send ✅</p><p className="text-sm text-zinc-400 mt-2">Your review is ready in WhatsApp. Please press Send there to complete it. It will appear after approval. Only real orders will be approved.</p><button onClick={() => { setSent(false); setForm({ name: "", city: "", product: "Leather Tote Bag", stars: 5, orderRef: "", text: "" }); }} className="mt-4 text-sm underline text-zinc-300 hover:text-amber-400">Write another review</button></div>);
  return (
    <div className="w-full mt-8">
      <div className="relative overflow-hidden" onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchX.current === null) return; const d = e.changedTouches[0].clientX - touchX.current; if (d < -30) go(1); if (d > 30) go(-1); touchX.current = null; }}>
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * (100 / perView)}%)` }}>
          {REVIEWS.map((r) => (
            <div key={r.name} className="shrink-0 px-2" style={{ width: `${100 / perView}%` }}>
              <div className="bg-white text-black rounded-xl p-5 h-full flex flex-col min-h-[240px] shadow-lg">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={r.img} alt={r.name} className="w-11 h-11 rounded-full object-cover shrink-0" loading="lazy" />
                    <div className="min-w-0"><p className="font-bold text-sm truncate">{r.name}</p><p className="text-xs text-zinc-500 truncate">{r.role}</p></div>
                  </div>
                  <span className="text-red-500 text-xs font-bold shrink-0">★ {r.stars}/5</span>
                </div>
                <p className="text-sm text-zinc-800 leading-relaxed mt-4 flex-1">&ldquo;{r.text}&rdquo;</p>
                <p className="text-[11px] text-zinc-500 tracking-widest uppercase mt-4">{r.city} • {r.product}</p>
              </div>
            </div>
          ))}
        </div>
        <button aria-label="Previous Reviews" onClick={() => go(-1)} className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-amber-500 hover:text-black text-white w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer z-10">‹</button>
        <button aria-label="Next Reviews" onClick={() => go(1)} className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-amber-500 hover:text-black text-white w-9 h-9 rounded-full flex items-center justify-center text-xl font-bold cursor-pointer z-10">›</button>
      </div>
      <div className="flex justify-center gap-2 mt-5">{Array.from({ length: maxIndex + 1 }).map((_, i) => (<button key={i} aria-label={`Go to reviews ${i + 1}`} onClick={() => { pausedUntil.current = Date.now() + 8000; setIndex(i); }} className={`h-2 rounded-full cursor-pointer transition-all ${i === index ? "bg-amber-500 w-5" : "bg-zinc-600 w-2"}`} />))}</div>
      {!open ? (<div className="text-center mt-8"><button onClick={() => setOpen(true)} className="bg-white text-black text-sm font-bold px-7 py-3 rounded-full hover:bg-amber-400 transition">✍ Write a Review</button></div>) : (
        <div className="max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8 text-left">
          <h3 className="font-bold text-lg text-white">Share Your Experience</h3><p className="text-xs text-zinc-400 mt-1">Only reviews from real orders will be approved.</p>
          <form onSubmit={handleSubmit} className="space-y-3 mt-5">
            <input required placeholder="Your Name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500 text-white" />
            <input required placeholder="City, Country *" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500 text-white" />
            <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none text-white">{PRODUCTS.map((p) => (<option key={p} value={p}>{p}</option>))}</select>
            <select value={form.stars} onChange={(e) => setForm({ ...form, stars: Number(e.target.value) })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none text-white"><option value={5}>★★★★★ - 5 - Excellent</option><option value={4}>★★★★☆ - 4 - Very Good</option><option value={3}>★★★☆☆ - 3 - Average</option><option value={2}>★★☆☆☆ - 2 - Not Good</option><option value={1}>★☆☆☆☆ - 1 - Poor</option></select>
            <input placeholder="Order Ref / Tracking No. (optional - for verification)" value={form.orderRef} onChange={(e) => setForm({ ...form, orderRef: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500 text-white" />
            <textarea required rows={4} placeholder="Write your honest review..." value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-sm outline-none focus:border-amber-500 text-white" />
            <div className="flex gap-3"><button type="submit" className="flex-1 bg-amber-500 text-black font-bold text-sm py-3 rounded-full hover:bg-amber-400">Submit for Approval →</button><button type="button" onClick={() => setOpen(false)} className="px-5 py-3 rounded-full border border-zinc-700 text-sm text-white">Cancel</button></div>
          </form>
        </div>
      )}
    </div>
  );
}
