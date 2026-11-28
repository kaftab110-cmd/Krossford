// FOLDER: app
// FILE: page.tsx - RESTORED FULL HOME PAGE - Jaisa pehle tha - Kuch missing nahi
// Hero + Handcrafted To Order box + 8 Best Sellers + Combo/Sale/Announcements + Craftsmanship (stitching) + Reviews + BrandStory + Bespoke + 3 boxes + Retail+Wholesale box
// TOP8 FIX: BEST SELLER na mile to baaki products se bhar do - Hamesha 8 aayenge. HERO FIX: Image na mile to img gayab, tuta icon kabhi nahi.
// HERO IMAGE FIT FIX: Image har device pe fit - Laptop / Tablet / Mobile - Kata hua nahi - Poora bag dikhega - Baaqi sab wesa hi hai.
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import BrandStory from "@/components/BrandStory";
import Craftsmanship from "@/components/Craftsmanship";
import Bespoke from "@/components/Bespoke";
import Reviews from "@/components/Reviews";
import ComboBanner from "@/components/ComboBanner";
import SaleBanner from "@/components/SaleBanner";
import AnnouncementsBanner from "@/components/AnnouncementsBanner";
import { products, findProductBySlug } from "@/lib/data/shop";
import { readCartItems, saveCart } from "@/lib/cart";

const BEST = products.filter((p) => String((p as any).badge || "").toUpperCase().replace(/[\s_-]+/g, "") === "BESTSELLER");
const REST = products.filter((p) => !BEST.includes(p));
const TOP8 = [...BEST, ...REST].slice(0, 8).map((p) => ({
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

const getProductSubtitle = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes("wallet")) return "Full-Grain Leather • 6 Card Slots • Vegetable-Tanned";
  if (n.includes("jacket") || n.includes("biker")) return "Full-Grain Cowhide • Brass Zippers • Custom Fit";
  if (n.includes("bag") || n.includes("duffle") || n.includes("messenger") || n.includes("crossbody")) return "Full-Grain Leather • Spacious • Handcrafted";
  if (n.includes("belt")) return "Full-Grain Leather • Solid Brass Buckle • Adjustable";
  if (n.includes("glove")) return "Full-Grain Leather • Warm Lining • Custom Fit";
  if (n.includes("card holder") || n.includes("cardholder")) return "Full-Grain Leather • Slim • 4 Card Slots";
  if (n.includes("keychain") || n.includes("key chain") || n.includes("tag")) return "Full-Grain Leather • Handcrafted • Gift Ready";
  return "Full-Grain Leather • Handcrafted • Custom Design Available";
};

export default function Home() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [siteSettings, setSiteSettings] = useState<{ combo_live?: boolean; sale_live?: boolean; announcements_live?: boolean } | null>(null);

  // GLOBAL SLIDER - auto 4 sec, manual pauses auto 8 sec, arrows/dots/swipe
  const [slideIndex, setSlideIndex] = useState<Record<string, number>>({});
  const pausedUntil = useRef<Record<string, number>>({});
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/site-settings", { cache: "no-store" });
        const data = await res.json();
        setSiteSettings(data);
      } catch {
        setSiteSettings({ combo_live: false, sale_live: false, announcements_live: false });
      }
    }
    loadSettings();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setSlideIndex((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const p of TOP8) {
          const imgs = getTop8Images(p.slug, p.image);
          if (imgs.length <= 1) continue;
          if ((pausedUntil.current[p.slug] || 0) > now) continue;
          next[p.slug] = ((prev[p.slug] ?? 0) + 1) % imgs.length;
          changed = true;
        }
        return changed ? next : prev;
      });
    }, 4000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const manualGo = (slug: string, total: number, dir: 1 | -1) => {
    pausedUntil.current[slug] = Date.now() + 8000;
    setSlideIndex((prev) => ({ ...prev, [slug]: (((prev[slug] ?? 0) + dir + total) % total) }));
  };
  const goToIndex = (slug: string, idx: number) => {
    pausedUntil.current[slug] = Date.now() + 8000;
    setSlideIndex((prev) => ({ ...prev, [slug]: idx }));
  };

  const handleAddToCart = (p: (typeof TOP8)[number]) => {
    const existingCart = readCartItems<any>();
    const existingIndex = existingCart.findIndex((it: any) => it.slug === p.slug && it.colorName === "Jet Black" && it.customerType === "B2C");
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity = Number(existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({
        id: `${p.slug}-jet-black-b2c-${Date.now()}`,
        slug: p.slug,
        name: p.name,
        price: p.price,
        image: p.image,
        quantity: 1,
        colorName: "Jet Black",
        customerType: "B2C",
        additionalOption: "none",
        customText: "",
        uploadedFileName: "",
      });
    }
    saveCart(existingCart);
    setAddedSlug(p.slug);
    setTimeout(() => setAddedSlug(null), 2000);
  };

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* HERO - IMAGE FIT ALL DEVICES - Laptop / Tablet / Mobile - Poora bag dikhega, kata nahi - Baaqi sab wesa hi hai */}
      <section className="relative w-full h- sm:h- lg:h-[calc(100svh-158px)] min-h- lg:min-h- flex items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#2a2118_0%,#000000_65%)]" />
        <img src="/images/leather-duffle-bag.jpg" alt="" aria-hidden="true" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} className="absolute inset-0 w-full h-full object-contain object-center" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 px-3 min-:px-4 sm:px-6 max-w-4xl mx-auto w-full pt-10 sm:pt-12 lg:pt-14 pb-10 sm:pb-12">
          <p className="text- min-:text-4xl sm:text-4xl md:text-5xl font-bold tracking-normal sm:tracking-widest text-[#D4AF37] uppercase text-center leading-tight break-words" style={{ fontFamily: "var(--font-brand)" }}>
            KROSSFORD
          </p>
          <h1 className="mt-4 text- min-:text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-center break-words" style={{ fontFamily: "var(--font-brand)" }}>
            Real Leather.<br />Made Honestly.
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed text-center">
            A New-Generation International Leather Brand, Since 2025.
            Sample Before Bulk. 100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel). Handcrafted • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 w-full max-w-xl mx-auto">
            <a href="/shop" className="w-full sm:w-auto bg-[#E8C15A] text-black px-7 py-3.5 rounded-md text-sm font-bold tracking-wide border-2 border-[#E8C15A] shadow-[0_0_24px_rgba(232,193,90,0.45)] hover:bg-[#D4AF37] text-center">Shop Collection</a>
            <a href="/b2b" className="w-full sm:w-auto border-2 border-[#E8C15A] bg-[#D4AF37]/15 text-[#E8C15A] px-7 py-3.5 rounded-md text-sm font-bold tracking-wide shadow-[0_0_18px_rgba(212,175,55,0.25)] hover:bg-[#E8C15A] hover:text-black text-center">Retail + Wholesale</a>
            <a href="/contact" className="w-full sm:w-auto border-2 border-white bg-white/10 text-white px-7 py-3.5 rounded-md text-sm font-bold tracking-wide hover:border-[#E8C15A] hover:text-[#E8C15A] text-center">Request Sample</a>
          </div>
          <p className="mt-5 text- sm:text-sm text-zinc-400 tracking-widest uppercase text-center leading-relaxed"><span className="text-[#D4AF37]">Shipped by KROSSFORD</span> • Handcrafted • Customized / On Demand • Handcrafted To Order • Secure Payments • Bank Transfer</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-10 pb-2">
        <div className="border border-[#D4AF37]/30 rounded-lg p-5 sm:p-6 bg-zinc-950 text-center space-y-2">
          <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest">Handcrafted To Order • Ships via Fastest Delivery</p>
          <p className="text-sm text-zinc-300">We don&apos;t keep ready-made stock. Every Krossford bag is made only after your order, to keep its craftsmanship and exclusivity.</p>
          <p className="text-xs text-zinc-400">Estimated Total: 12-17 Working Days • Full Tracking Provided • We Always Aim To Deliver Earlier • Shipped by KROSSFORD</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="text-center mb-6">
          <h2 className="text-xl uppercase tracking-widest" style={{ fontFamily: "var(--font-brand)" }}>Start With Our Best Sellers</h2>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">Honest Price • Handcrafted • Built To Last</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOP8.map((p) => {
            const cardImages = getTop8Images(p.slug, p.image);
            const hasSlider = cardImages.length > 1;
            const curIdx = slideIndex[p.slug] ?? 0;
            const currentImage = hasSlider ? cardImages[curIdx % cardImages.length] : p.image;
            return (
            <div key={p.slug} className="border border-zinc-800 rounded-lg p-4 sm:p-5 bg-zinc-950 hover:border-[#D4AF37] transition-colors overflow-hidden group">
              <Link href={`/product/${p.slug}`} className="block cursor-pointer">
                <div
                  className="relative w-full aspect-[4/3] rounded-md mb-4 overflow-hidden group/slider bg-zinc-900"
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (touchStartX.current === null || !hasSlider) return;
                    const diff = e.changedTouches[0].clientX - touchStartX.current;
                    if (diff < -30) manualGo(p.slug, cardImages.length, 1);
                    if (diff > 30) manualGo(p.slug, cardImages.length, -1);
                    touchStartX.current = null;
                  }}
                >
                  <img src={currentImage} alt={p.name} className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform" />
                  {hasSlider && (
                    <>
                      <button aria-label="Previous Image" onClick={(e) => { e.preventDefault(); e.stopPropagation(); manualGo(p.slug, cardImages.length, -1); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#D4AF37] hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-100 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10">‹</button>
                      <button aria-label="Next Image" onClick={(e) => { e.preventDefault(); e.stopPropagation(); manualGo(p.slug, cardImages.length, 1); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#D4AF37] hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-100 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10">›</button>
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {cardImages.map((_, i) => (
                          <button key={i} aria-label={`Go to image ${i + 1}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToIndex(p.slug, i); }} className={`h-2 rounded-full cursor-pointer transition-all ${i === (curIdx % cardImages.length) ? "bg-[#D4AF37] w-4" : "bg-white/60 w-2"}`} />
                        ))}
                      </div>
                      <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{(curIdx % cardImages.length) + 1} / {cardImages.length}</span>
                    </>
                  )}
                </div>
              </Link>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs tracking-widest uppercase text-[#D4AF37] font-bold">{p.tag}</span>
                  <Link href={`/product/${p.slug}`}><h3 className="text-sm font-semibold uppercase tracking-wider mt-1 hover:text-[#D4AF37] cursor-pointer leading-snug">{p.name}</h3></Link>
                  <p className="text-xs text-zinc-400 mt-1">{getProductSubtitle(p.name)}</p>
                </div>
                <p className="text-lg text-[#D4AF37] font-bold shrink-0">${p.price}</p>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => handleAddToCart(p)} className={`flex-1 text-center text-xs font-bold uppercase tracking-widest py-2.5 rounded cursor-pointer ${addedSlug === p.slug ? "bg-green-500 text-white" : "bg-[#D4AF37] text-black hover:bg-[#E8C15A]"}`}>{addedSlug === p.slug ? "✓ Added!" : "Add to Cart →"}</button>
                <Link href={`/product/${p.slug}`} className="flex-1 text-center border border-zinc-700 text-white text-xs uppercase tracking-widest py-2.5 rounded hover:border-[#D4AF37] hover:text-[#D4AF37]">View Details</Link>
              </div>
            </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/shop" className="inline-block bg-[#D4AF37] text-black text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded hover:bg-[#E8C15A]">View All Products →</Link>
        </div>
      </section>

      {siteSettings?.combo_live === true && <ComboBanner />}
      {siteSettings?.sale_live === true && <SaleBanner />}
      {siteSettings?.announcements_live === true && <AnnouncementsBanner />}

      <Craftsmanship />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 text-center">
        <h2 className="text-xl uppercase tracking-widest" style={{ fontFamily: "var(--font-brand)" }}>What Our Customers Say</h2>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">Real Reviews • USA • UK • UAE • Canada • Australia • Germany</p>
        <Reviews />
      </section>
      <BrandStory />
      <Bespoke />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-[#D4AF37] font-bold">Sample Before Bulk</p>
            <p className="text-zinc-400 text-xs mt-2">Order a sample first, then decide for bulk.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-[#D4AF37] font-bold">Hide Confirmed In Writing</p>
            <p className="text-zinc-400 text-xs mt-2">Cow / Buffalo / Sheep / Goat / Camel — hide type is confirmed in writing before production.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-[#D4AF37] font-bold">Direct From KROSSFORD</p>
            <p className="text-zinc-400 text-xs mt-2">Email us at hello@krossford.com</p>
          </div>
        </div>
        <div className="mt-6 border border-[#D4AF37]/30 rounded-lg p-6 bg-zinc-950 text-center space-y-2">
          <p className="text-sm uppercase tracking-widest" style={{ fontFamily: "var(--font-brand)" }}>Retail + Wholesale Both Available</p>
          <p className="text-xs text-zinc-400">Retail: 1 Piece - For Customers - Shop Directly. Wholesale: 50+ Units - For Buyers - Leather Jackets, Biker Suits, Bags, Belts - White Label &amp; Custom Production.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <a href="/shop" className="inline-block bg-[#D4AF37] text-black text-xs uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-[#E8C15A]">Shop Retail - 1 Piece</a>
            <a href="/b2b" className="inline-block border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-[#D4AF37] hover:text-black">Get Wholesale Quote →</a>
          </div>
        </div>
      </section>
    </main>
  );
}