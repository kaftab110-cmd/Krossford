"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BrandStory from "@/components/BrandStory";
import Collections from "@/components/Collections";
import FeaturedProducts from "@/components/FeaturedProducts";
import Craftsmanship from "@/components/Craftsmanship";
import Bespoke from "@/components/Bespoke";
import Reviews from "@/components/Reviews";
import { products, findProductBySlug } from "@/lib/data/shop";

// SYNC FIX: TOP3 ab hardcode nahi hai - sirf slug likha hai, naam / price / image / tag sab lib/data/shop.ts se aayega.
// Is se FILE 1 / FILE 2 me price badlo to Home Page khud hi same ho jayega, dobara repeat nahi karna parega.
const TOP3_SLUGS = ["card-holder", "leather-tag-keychain-set", "crossbody-messenger-bag"] as const;

const TOP3 = TOP3_SLUGS.map((slug) => {
  const p = findProductBySlug(slug);
  // Fallback sirf tab jab shop.ts me product na mile - warna shop.ts hi truth hai
  return {
    slug,
    name: p?.name ?? slug,
    price: p?.price ?? 0,
    tag: p?.badge ?? "",
    image: p?.image ?? "",
  };
});

const getTop3Images = (slug: string, fallback: string): string[] => {
  const found = findProductBySlug(slug);
  // FIX: .filter(Boolean) se TypeScript ko nahi pata chalta ke undefined nikal gaya - is liye type guard lagaya
  const all = [fallback, found?.image, ...(found?.gallery || [])].filter((x): x is string => Boolean(x));
  return [...new Set(all)];
};

export default function Home() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState(0);
  const hoverImages = hoverSlug ? getTop3Images(hoverSlug, TOP3.find((p) => p.slug === hoverSlug)?.image || "") : [];
  const HOVER_SLIDE_DELAY = 1800;

  useEffect(() => {
    if (!hoverSlug || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % hoverImages.length);
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverSlug, hoverImages.length]);

  const handleAddToCart = (p: (typeof TOP3)[number]) => {
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
      <section className="relative w-full flex items-center justify-center text-center overflow-hidden bg-black py-24">
        <img
          src="/images/leather-duffle-bag.jpg"
          alt="Leather Duffle Bag"
          className="absolute inset-0 w-full h-full object-cover object-center"
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
            Sample Before Bulk. 100% Real Leather Guarantee.
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
          <p className="mt-6 text-xs sm:text-sm text-zinc-400 tracking-widest uppercase text-center">Ships via {"DHL Express"} • Total Delivery: 18-24 Working Days • Tracking Provided • {"【entity-VISA¦canonical_name=VISA】"} | {"【entity-MASTERCARD¦canonical_name=MASTERCARD】"} | {"【entity-WESTERN UNION¦canonical_name=WESTERN UNION】"} | BANK TRANSFER</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-serif uppercase tracking-widest">Start With Our Best Sellers</h2>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">Honest Price • Handcrafted • Built To Last</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TOP3.map((p) => {
            const cardImages = getTop3Images(p.slug, p.image);
            const isHovering = hoverSlug === p.slug;
            const currentImage = isHovering && cardImages.length > 1 ? cardImages[hoverIndex % cardImages.length] : p.image;
            return (
            <div key={p.slug} className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 hover:border-amber-400 transition-colors overflow-hidden group">
              <Link href={`/product/${p.slug}`} className="block cursor-pointer">
                <div
                  className="relative w-full h-48 rounded-md mb-4 overflow-hidden"
                  onMouseEnter={() => { setHoverSlug(p.slug); setHoverIndex(0); }}
                  onMouseLeave={() => { setHoverSlug(null); setHoverIndex(0); }}
                  onTouchStart={() => { setHoverSlug(p.slug); setHoverIndex(0); }}
                  onTouchEnd={() => { setTimeout(() => { setHoverSlug(null); setHoverIndex(0); }, 6000); }}
                >
                  <img src={currentImage} alt={p.name} className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform" />
                  {isHovering && cardImages.length > 1 && (
                    <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{(hoverIndex % cardImages.length) + 1} / {cardImages.length}</span>
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
              <p className="text-xs text-zinc-500 mt-2">Ships in 18-24 Working Days • DHL Express • Tracking Provided</p>
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
      </section>

      <Collections />
      <FeaturedProducts />
      <Craftsmanship />
      <Reviews />
      <BrandStory />
      <Bespoke />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">Sample Before Bulk</p>
            <p className="text-zinc-400 text-xs mt-2">Order a sample first, then decide for bulk.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">100% Real Leather</p>
            <p className="text-zinc-400 text-xs mt-2">Full-grain leather. No fake claims.</p>
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