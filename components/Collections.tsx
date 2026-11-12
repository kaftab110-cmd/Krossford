"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products, CATEGORIES } from "@/lib/data/shop";

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [...CATEGORIES];

  const allProducts = products.map((p: any) => ({
    id: p.slug || p.id,
    name: p.name,
    category: p.category,
    forHer: p.forHer || false,
    leather: p.description,
    image: p.image,
    gallery: p.gallery || [p.image],
    badge: p.badge,
    price: p.price || 0,
    colors: p.colors ? p.colors.map((c: any) => c.code || c) : ["#1c1917", "#78350f", "#b45309"],
    colorNames: p.colors ? p.colors.map((c: any) => c.name) : [],
  }));

  // SLIDER FORMULA (ProductCard wala - har folder/file me same):
  // - Arrows mobile pe hamesha visible, desktop pe hover pe
  // - Dots + Counter (1 / 5)
  // - Swipe left/right mobile pe
  // - Slider sirf tab jab 1 se zyada photo ho
  const [slideIndex, setSlideIndex] = useState<Record<string, number>>({});
  const [hoverId, setHoverId] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const hoverProduct = hoverId ? allProducts.find((p) => String(p.id) === String(hoverId)) : undefined;
  const hoverImages = hoverProduct ? [...new Set([hoverProduct.image, ...(hoverProduct.gallery || [])].filter(Boolean))] : [];
  const HOVER_SLIDE_DELAY = 1800;

  useEffect(() => {
    if (!hoverId || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => {
        const cur = prev[hoverId] ?? 0;
        return { ...prev, [hoverId]: (cur + 1) % hoverImages.length };
      });
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverId, hoverImages.length]);

  const goTo = (id: string, total: number, dir: 1 | -1) => {
    setSlideIndex((prev) => {
      const cur = prev[id] ?? 0;
      return { ...prev, [id]: (cur + dir + total) % total };
    });
  };

  const goToIndex = (id: string, idx: number) => {
    setSlideIndex((prev) => ({ ...prev, [id]: idx }));
  };

  const filteredProducts =
    selectedCategory === "All"
      ? allProducts
      : selectedCategory === "For Her"
      ? allProducts.filter((p) => p.forHer)
      : allProducts.filter((p) => p.category === selectedCategory);

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">
            Exquisite Full-Grain Hide & Precision Haberdashery
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-white uppercase">
            Our Professional Collections
          </h1>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all ${
                selectedCategory === cat
                  ? "bg-amber-400 text-black border-amber-400 shadow-lg shadow-amber-400/20"
                  : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-amber-400 hover:text-amber-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const cardImages = [...new Set([product.image, ...(product.gallery || [])].filter(Boolean))];
            const hasSlider = cardImages.length > 1;
            const curIdx = slideIndex[String(product.id)] ?? 0;
            const currentImage = hasSlider ? cardImages[curIdx % cardImages.length] : product.image;
            return (
            <div
              key={product.id}
              className="group relative rounded-xl border border-zinc-800 bg-zinc-950 p-4 transition-all duration-300 hover:border-amber-400 flex flex-col justify-between shadow-lg"
            >
              {product.badge && (
                <span className="absolute top-6 left-6 z-10 bg-black text-amber-400 border border-amber-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {product.badge}
                </span>
              )}

              <Link href={`/product/${product.id}`} className="block">
                <div
                  className="relative w-full h-64 rounded-lg bg-zinc-900 overflow-hidden border border-zinc-800/60"
                  onMouseEnter={() => { setHoverId(String(product.id)); }}
                  onMouseLeave={() => { setHoverId(null); }}
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (touchStartX.current === null || !hasSlider) return;
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    if (dx < -50) goTo(String(product.id), cardImages.length, 1);
                    if (dx > 50) goTo(String(product.id), cardImages.length, -1);
                    touchStartX.current = null;
                  }}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* COUNTER */}
                  {hasSlider && (
                    <span className="absolute top-2 right-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full z-10">{(curIdx % cardImages.length) + 1} / {cardImages.length}</span>
                  )}
                  {/* ARROWS - Mobile pe hamesha visible, Desktop pe hover pe */}
                  {hasSlider && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(String(product.id), cardImages.length, -1); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      >‹</button>
                      <button
                        type="button"
                        aria-label="Next photo"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(String(product.id), cardImages.length, 1); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      >›</button>
                    </>
                  )}
                  {/* DOTS */}
                  {hasSlider && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                      {cardImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to photo ${i + 1}`}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToIndex(String(product.id), i); }}
                          className={`rounded-full transition-all ${i === (curIdx % cardImages.length) ? "w-4 h-2 bg-amber-400" : "w-2 h-2 bg-white/70"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Link>

              <div className="mt-4 space-y-2 flex-grow">
                <span className="text-[11px] text-amber-400 font-medium uppercase tracking-wider">
                  {product.category}
                </span>
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-zinc-400">{product.leather}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                <span className="text-lg font-mono text-amber-400 font-bold">${product.price}</span>
                <div className="flex gap-1">
                  {product.colors.map((col: string, i: number) => (
                    <Link key={i} href={`/product/${product.id}`}>
                      <span className="w-3 h-3 rounded-full border border-zinc-700 cursor-pointer block" style={{ backgroundColor: col }} />
                    </Link>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">🚚 Delivery in 12-17 Working Days • DHL Express • Tracking Provided</p>
              <p className="text-[11px] text-zinc-500">Our aim to deliver earlier than estimated.</p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 block text-center rounded bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider transition-all py-2.5"
                >
                  View Designs →
                </Link>
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 block text-center rounded bg-zinc-900 hover:border-amber-400 border border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all text-zinc-200 py-2.5"
                >
                  View Details
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
