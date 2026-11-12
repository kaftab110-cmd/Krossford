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
  const allImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const uniqueImages = [...new Set(allImages)];

  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<string[]>([]);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const images = uniqueImages.filter((img) => !broken.includes(img));
  const safeIndex = images.length === 0 ? 0 : Math.min(index, images.length - 1);
  const currentImage = images[safeIndex] || product.image;

  const href = product.slug ? `/product/${product.slug}` : `/shop/${product.id}`;

  const hoverTimer = useRef<any>(null);
  const HOVER_SLIDE_DELAY = 1800;

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
    setIndex(0);
  };

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearInterval(hoverTimer.current);
    };
  }, []);

  const next = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length === 0) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (images.length === 0) return;
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

      <div
        className="relative w-full h-64 overflow-hidden bg-zinc-950 group/slider"
        onMouseEnter={startHoverSlide}
        onMouseLeave={stopHoverSlide}
        onTouchStart={(e) => { setTouchStartX(e.touches[0].clientX); startHoverSlide(); }}
        onTouchEnd={(e) => {
          if (touchStartX !== null && images.length > 1) {
            const diff = e.changedTouches[0].clientX - touchStartX;
            if (diff < -30) setIndex((prev) => (prev + 1) % images.length);
            if (diff > 30) setIndex((prev) => (prev - 1 + images.length) % images.length);
          }
          setTouchStartX(null);
          setTimeout(stopHoverSlide, 6000);
        }}
      >
        <Link href={href} className="block w-full h-full cursor-pointer">
          <img
            src={currentImage}
            alt={product.name}
            onError={() => { if (!broken.includes(currentImage)) setBroken([...broken, currentImage]); }}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </Link>

        {images.length > 1 && (
          <>
            <button onClick={prev} aria-label="Previous Image" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-400 hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-100 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10">‹</button>
            <button onClick={next} aria-label="Next Image" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-amber-400 hover:text-black text-white w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold leading-none opacity-100 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity cursor-pointer z-10">›</button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button key={i} onClick={(e: any) => { e.stopPropagation(); setIndex(i); }} aria-label={`Go to image ${i + 1}`} className={`h-2 rounded-full cursor-pointer transition-all ${i === safeIndex ? "bg-amber-400 w-4" : "bg-white/60 w-2"}`} />
              ))}
            </div>

            <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">{safeIndex + 1} / {images.length}</span>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start">
          <Link href={href}><h3 className="text-white font-bold text-sm uppercase tracking-wide hover:text-amber-400 cursor-pointer">{product.name}</h3></Link>
          {(product.tag || product.badge) && <span className="text-xs bg-amber-400 text-black font-bold px-2 py-1 rounded shrink-0 ml-2">{product.tag || product.badge}</span>}
        </div>
        {product.description && <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">{product.description}</p>}
        <p className="text-amber-400 font-bold text-lg mt-2">${product.price}</p>
        <p className="text-xs text-zinc-400 leading-relaxed mt-2">Ships via <span className="text-white font-bold">{"\u0044\u0048\u004C Express"}</span><br />Crafting Time: 7-10 Working Days<br />{"\u0044\u0048\u004C Express"} Delivery: 5-7 Working Days<br /><span className="text-amber-400/90">Total Delivery: 12-17 Working Days | Tracking Provided • Ships from Pakistan</span></p>
        <p className="text-xs text-zinc-500 mt-2">We will try our best to deliver as soon as possible, even before this time.</p>
        <button onClick={addToCart} className="mt-4 w-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-widest py-3 rounded-lg transition-colors cursor-pointer">ADD TO CART</button>
      </div>
    </div>
  );
}
