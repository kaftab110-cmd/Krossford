"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type Product = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  tag?: string;
  badge?: string;
  description?: string;
  category?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  // ✅ SLIDER - Gallery Me Jitni Photos Hongi - Utni Slide Hongi
  // Agar Gallery Nahi Di - To Sirf 1 Photo Dikhayega - Arrow Nahi Aayega
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [index, setIndex] = useState(0);

  // ✅ LINK - Agar Slug Hai To /product/slug - Warna Purana /shop/id
  const href = product.slug ? `/product/${product.slug}` : `/shop/${product.id}`;

  // --- HOVER SLIDER - Slow - Mouse / Touch Aane Pe Auto Slide ---
  const hoverTimer = useRef<any>(null);
  const HOVER_SLIDE_DELAY = 1800; // 1800ms = 1.8 second me 1 photo - slow

  const startHoverSlide = () => {
    if (images.length <= 1) return;
    if (hoverTimer.current) return;
    hoverTimer.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, HOVER_SLIDE_DELAY);
  };

  const stopHoverSlide = () => {
    if (hoverTimer.current) {
      clearInterval(hoverTimer.current);
      hoverTimer.current = null;
    }
    setIndex(0); // Mouse hatne pe wapas pehli photo
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearInterval(hoverTimer.current);
    };
  }, []);

  const next = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const addToCart = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
      const existing = cart.find((i: any) => i.id === product.id);
      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem("krossford_cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      alert(`${product.name} Added to Cart!`);
    } catch {}
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden flex flex-col font-mono hover:border-amber-400 transition-colors group/card">

      {/* ✅ PHOTO SLIDER WALA HISSA - YAHI NAYA HAI! */}
      <div
        className="relative w-full h-[260px] overflow-hidden bg-zinc-950 group/slider"
        onMouseEnter={startHoverSlide}
        onMouseLeave={stopHoverSlide}
        onTouchStart={startHoverSlide}
        onTouchEnd={() => { setTimeout(stopHoverSlide, 6000); }}
      >
        <Link href={href} className="block w-full h-full cursor-pointer">
          <img src={images[index]} alt={product.name} className="w-full h-full object-cover transition-all duration-500" />
        </Link>

        {/* ✅ ARROW - SIRF JAB MOUSE AAYEGA TAB DIKHEGA - AGAR 1 SE ZYADA PHOTO HAI TABHI */}
        {images.length > 1 && (
          <>
            {/* LEFT ARROW < */}
            <button
              onClick={prev}
              aria-label="Previous Image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-400 hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10"
            >
              ‹
            </button>

            {/* RIGHT ARROW > */}
            <button
              onClick={next}
              aria-label="Next Image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-400 hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-0 group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10"
            >
              ›
            </button>

            {/* NEECHE DOTS */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e: any) => { e.stopPropagation(); setIndex(i); }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2 rounded-full cursor-pointer transition-all ${i === index ? "bg-amber-400 w-4" : "bg-white/60 w-2"}`}
                />
              ))}
            </div>

            {/* UPAR COUNTER - 1 / 5 */}
            <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full z-10">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <Link href={href}>
            <h3 className="text-white font-bold text-sm uppercase tracking-wide hover:text-amber-400 cursor-pointer">{product.name}</h3>
          </Link>
          {(product.tag || product.badge) && <span className="text-[10px] bg-amber-400 text-black font-bold px-2 py-1 rounded shrink-0 ml-2">{product.tag || product.badge}</span>}
        </div>

        {product.description && (
          <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">{product.description}</p>
        )}

        <p className="text-amber-400 font-bold text-lg mt-2">${product.price}</p>

        <p className="text-xs text-zinc-400 leading-relaxed mt-2">
          🚚 Ships via <span className="text-white font-bold">DHL Express</span><br />
          Processing: 7-10 Days After Order<br />
          DHL Delivery: 7-10 Working Days After Dispatch<br />
          <span className="text-amber-400/90">Total Delivery: 18-24 Days | Tracking Provided</span>
        </p>

        <p className="text-[11px] text-zinc-500 mt-2">Our aim to deliver earlier than estimated.</p>

        <button
          onClick={addToCart}
          className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-widest py-3 rounded-lg transition-colors cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
