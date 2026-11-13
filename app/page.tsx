"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BrandStory from "@/components/BrandStory";
import Craftsmanship from "@/components/Craftsmanship";
import Bespoke from "@/components/Bespoke";
import Reviews from "@/components/Reviews";
import { products, findProductBySlug } from "@/lib/data/shop";

// HOME PAGE - FINAL - ONE TIME ALL FIXES
// 1. Home Best Sellers uses up to 8 products flagged BEST SELLER.
// 2. View All Products links to Shop; catalog and featured grids are not rendered on the homepage.
// 3. Delivery lines DE-DUPLICATE ki - Pehle 4 jagah delivery thi (Hero + Info box 3 lines + Card) - Ab delivery ki DETAIL sirf 1 jagah: Info box me
//    - Hero se "Total: 12-17" hataya - sirf Ships + Handcrafted + Secure rakha
//    - Info box se "We will try our best..." wali duplicate aim line hatayi
//    - Card se "Ships from Pakistan - 12-17 - DHL" wali repeated line hatayi - Card pe sirf Full-Grain line rakhi
// 4. Slider formula + Add to Cart same rakha

const TOP8 = products.filter((p) => p.badge === "BEST SELLER").slice(0, 8).map((p) => ({
  slug: p.slug,
  name: p.name,
  price: p.price,
  tag: (p as any).badge ?? "",
  image: p.image ?? "",
}));

const getTop8Images = (slug: string, fallback: string): string[] => {
  const found = findProductBySlug(slug);
  const all = [fallback, found?.image, ...(found?.gallery || [])].filter((x): x is string => Boolean(x));
  return [...new Set(all)];
};

export default function Home() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const hoverImages = hoverSlug ? getTop8Images(hoverSlug, TOP8.find((p) => p.slug === hoverSlug)?.image || "") : [];
  const HOVER_SLIDE_DELAY = 1800;

  useEffect(() => {
    if (!hoverSlug || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % hoverImages.length);
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverSlug, hoverImages.length]);

  const handleAddToCart = (p: (typeof TOP8)[number]) => {
    const existingCart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
    const existingIndex = existingCart.findIndex((it: any) => it.slug === p.slug && it.colorName === "Jet Black" && it.customerType === "Single Piece");
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity = Number(existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({
        id: `${p.slug}-jet-black-single-piece-${Date.now()}`,
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
        quantity: 1,
        colorName: "Jet Black",
        customerType: "Single Piece",
        additionalOption: "none",
        customText: "",
        uploadedFileName: "",
      });
    }
    localStorage.setItem("krossford_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    setAddedSlug(p.slug);
    setTimeout(() => setAddedSlug(null), 2000);
  };

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      <section className="relative w-full min-h-screen flex items-center justify-center text-center overflow-hidden bg-black">
        <img
          src="/images/leather-duffle-bag.jpg"
          alt="Leather Duffle Bag"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto py-6 w-full">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-amber-400 uppercase text-center leading-none">
            KROSSFORD
          </p>
          <p className="mt-1 text-xs sm:text-sm font-medium tracking-widest text-amber-400 uppercase text-center leading-none">
            ENTERPRISES
          </p>
          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold leading-none text-center">
            Real Leather.<br />Made Honestly.
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed text-center">
            A New-Generation International Leather Brand, Since 2025.
            Sample Before Bulk. 100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel).
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/shop" className="bg-amber-400 text-black px-7 py-3 rounded-md text-sm font-bold tracking-wide hover:bg-amber-300">
              Shop Collection
            </a>
            <a href="/b2b" className="border border-amber-400 text-amber-400 px-7 py-3 rounded-md text-sm font-bold tracking-wide hover:bg-amber-400 hover:text-black">
              Retail + Wholesale
            </a>
            <a href="/contact" className="border border-zinc-300 px-7 py-3 rounded-md text-sm font-bold tracking-wide hover:border-amber-400">
              Request Sample
            </a>
          </div>
          <p className="mt-6 text-xs sm:text-sm text-zinc-400 tracking-widest uppercase text-center">Ships from Pakistan • Handcrafted To Order • Secure Payments • Bank Transfer</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-10 pb-2">
        <div className="border border-amber-400/30 rounded-lg p-6 bg-zinc-950 text-center space-y-2">
          <p className="text-sm font-bold text-amber-400 uppercase tracking-widest">Handcrafted To Order • Ships via DHL Express</p>
          <p className="text-sm text-zinc-300">We don&apos;t keep ready-made stock. Every Krossford bag is made only after your order, to keep its craftsmanship and exclusivity.</p>
          <p className="text-xs text-zinc-400">Estimated Total: 12-17 Working Days • Full Tracking Provided • We Always Aim To Deliver Earlier • Ships from Pakistan</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-serif uppercase tracking-widest">Start With Our Best Sellers</h2>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">Honest Price • Handcrafted • Built To Last</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP8.map((p) => {
            const cardImages = getTop8Images(p.slug, p.image);
            const isHovering = hoverSlug === p.slug;
            const currentImage = isHovering && cardImages.length > 1 ? cardImages[hoverIndex % cardImages.length] : p.image;
            return (
            <div key={p.slug} className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 hover:border-amber-400 transition-colors overflow-hidden group">
              <Link href={`/product/${p.slug}`} className="block cursor-pointer">
                <div
                  className="relative w-full h-48 rounded-md mb-4 overflow-hidden group/slider"
                  onMouseEnter={() => { setHoverSlug(p.slug); setHoverIndex(0); }}
                  onMouseLeave={() => { setHoverSlug(null); setHoverIndex(0); }}
                  onTouchStart={(e) => { setHoverSlug(p.slug); setTouchStartX(e.touches[0].clientX); }}
                  onTouchEnd={(e) => {
                    if (touchStartX !== null && cardImages.length > 1) {
                      const diff = e.changedTouches[0].clientX - touchStartX;
                      if (diff < -30) setHoverIndex((prev) => (prev + 1) % cardImages.length);
                      if (diff > 30) setHoverIndex((prev) => (prev - 1 + cardImages.length) % cardImages.length);
                    }
                    setTouchStartX(null);
                    setTimeout(() => { setHoverSlug(null); setHoverIndex(0); }, 6000);
                  }}
                >
                  <img src={currentImage} alt={p.name} className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform" />
                  {cardImages.length > 1 && (
                    <>
                      <button
                        aria-label="Previous Image"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setHoverSlug(p.slug); setHoverIndex((prev) => (prev - 1 + cardImages.length) % cardImages.length); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-400 hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-100 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10"
                      >‹</button>
                      <button
                        aria-label="Next Image"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setHoverSlug(p.slug); setHoverIndex((prev) => (prev + 1) % cardImages.length); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-400 hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-100 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10"
                      >›</button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {cardImages.map((_, i) => (
                          <button key={i} aria-label={`Go to image ${i + 1}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setHoverSlug(p.slug); setHoverIndex(i); }} className={`h-2 rounded-full cursor-pointer transition-all ${i === (hoverIndex % cardImages.length) ? "bg-amber-400 w-4" : "bg-white/60 w-2"}`} />
                        ))}
                      </div>
                      <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{(hoverIndex % cardImages.length) + 1} / {cardImages.length}</span>
                    </>
                  )}
                </div>
              </Link>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs tracking-widest uppercase text-amber-400 font-bold">{p.tag}</span>
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider mt-1 hover:text-amber-400 cursor-pointer">{p.name}</h3>
                  </Link>
                  <p className="text-xs text-zinc-400 mt-1">Full-Grain Leather • Custom Design As Per Customer Requirement</p>
                </div>
                <p className="text-lg text-amber-400 font-bold shrink-0">${p.price}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleAddToCart(p)}
                  className={`flex-1 text-center text-xs font-bold uppercase tracking-widest py-2.5 rounded cursor-pointer ${addedSlug === p.slug ? "bg-green-500 text-white" : "bg-amber-400 text-black hover:bg-amber-300"}`}
                >
                  {addedSlug === p.slug ? "✓ Added!" : "Add to Cart →"}
                </button>
                <Link href={`/product/${p.slug}`} className="flex-1 text-center border border-zinc-700 text-white text-xs uppercase tracking-widest py-2.5 rounded hover:border-amber-400 hover:text-amber-400">
                  View Details
                </Link>
              </div>
            </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/shop" className="inline-block bg-amber-400 text-black text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded hover:bg-amber-300">View All Products →</Link>
        </div>
      </section>

      <Craftsmanship />
      <section className="mx-auto max-w-7xl px-6 py-12 text-center">
        <p className="text-sm text-zinc-400">No Reviews Yet — Be The First To Review</p>
        <Reviews />
      </section>
      <BrandStory />
      <Bespoke />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">Sample Before Bulk</p>
            <p className="text-zinc-400 text-xs mt-2">Order a sample first, then decide for bulk.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel)</p>
            <p className="text-zinc-400 text-xs mt-2">Hide type is confirmed in writing before production.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">Direct From Maker</p>
            <p className="text-zinc-400 text-xs mt-2">Email us at hello@krossford.com</p>
          </div>
        </div>
        <div className="mt-6 border border-amber-400/30 rounded-lg p-6 bg-zinc-950 text-center space-y-2">
          <p className="text-sm font-serif uppercase tracking-widest">Retail + Wholesale Both Available</p>
          <p className="text-xs text-zinc-400">Retail: 1 Piece - For Customers - Shop Directly. Wholesale: 50+ Units - For Buyers - Leather Jackets, Biker Suits, Bags, Belts - White Label & Custom Production.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <a href="/shop" className="inline-block bg-amber-400 text-black text-xs uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-amber-300">
              Shop Retail - 1 Piece
            </a>
            <a href="/b2b" className="inline-block border border-amber-400 text-amber-400 text-xs uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-amber-400 hover:text-black">
              Get Wholesale Quote →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
