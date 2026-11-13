"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products, findProductBySlug, getCardSliderImages } from "@/lib/data/shop";

// FEATURED = Hamara Starting Plan + 1 Hero Product - Hamesha Yehi Dikhega
// SYNC FIX: Sirf slug likha hai, naam / price / image / badge sab lib/data/shop.ts se aayega.
// IMAGE_FIX hataya - kyunki shop.ts me keychain ki image pehle se sahi hai (/images/leather-tag-keychain-set1.jpg)
// Dobara yahan hardcode image likhne se phir mismatch hota tha.
// SLIDER FORMULA (ProductCard wala - har folder/file me same):
// - Arrows mobile pe hamesha visible, desktop pe hover pe
// - Dots + Counter (1 / 5)
// - Swipe left/right mobile pe
// - Slider sirf tab jab gallery me 1 se zyada photo ho
// - Delivery estimate: Estimated Total: 12-17 Working Days
const FEATURED_SLUGS = ["card-holder", "leather-tag-keychain-set", "crossbody-messenger-bag", "travel-duffle-bag"];

export default function FeaturedProducts() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // --- SLIDER STATE - Har card ka apna index ---
  const [slideIndex, setSlideIndex] = useState<Record<string, number>>({});
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const HOVER_SLIDE_DELAY = 1800; // 1800ms = 1.8 second me 1 photo - slow

  const hoverProduct = hoverSlug ? findProductBySlug(hoverSlug) : undefined;
  const hoverImages = hoverProduct ? getCardSliderImages(hoverProduct) : [];

  // HOVER AUTO-SLIDE - Desktop hover pe auto, mobile pe manual arrows/swipe
  useEffect(() => {
    if (!hoverSlug || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => {
        const cur = prev[hoverSlug] ?? 0;
        return { ...prev, [hoverSlug]: (cur + 1) % hoverImages.length };
      });
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverSlug, hoverImages.length]);

  const goTo = (slug: string, total: number, dir: 1 | -1) => {
    setSlideIndex((prev) => {
      const cur = prev[slug] ?? 0;
      const next = (cur + dir + total) % total;
      return { ...prev, [slug]: next };
    });
  };

  const goToIndex = (slug: string, idx: number) => {
    setSlideIndex((prev) => ({ ...prev, [slug]: idx }));
  };

  const handleAddToCart = (product: (typeof products)[number]) => {
    const slug = product.slug || String(product.id);
    const image = product.image;
    const existingCart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
    const existingIndex = existingCart.findIndex((it: any) => it.slug === slug && it.colorName === "Jet Black" && it.customerType === "B2C");

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity = Number(existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({
        id: `${slug}-jet-black-b2c-${Date.now()}`,
        slug: slug,
        name: product.name,
        price: product.price,
        image: image,
        quantity: 1,
        colorName: "Jet Black",
        customerType: "B2C",
        additionalOption: "none",
        customText: "",
        uploadedFileName: "",
      });
    }

    localStorage.setItem("krossford_cart", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    setAddedSlug(slug);
    setTimeout(() => setAddedSlug(null), 2000);
  };

  const featured = FEATURED_SLUGS
    .map((slug) => findProductBySlug(slug))
    .filter(Boolean) as typeof products;

  const list = featured.length === 4 ? featured : products.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-2xl font-bold uppercase tracking-widest">Featured Products</h2>
        <p className="text-xs text-zinc-400 tracking-widest uppercase">Best Sellers • Starting From $25 • Honest Price</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((product) => {
          const slug = product.slug || String(product.id);
          const cardImages = getCardSliderImages(product);
          const hasSlider = cardImages.length > 1;
          const curIdx = slideIndex[slug] ?? 0;
          const currentImage = hasSlider ? cardImages[curIdx % cardImages.length] : product.image;
          return (
            <div key={product.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group">
              <Link href={`/product/${slug}`}>
                <div
                  className="relative h-64 bg-zinc-900 overflow-hidden cursor-pointer"
                  onMouseEnter={() => { setHoverSlug(slug); }}
                  onMouseLeave={() => { setHoverSlug(null); }}
                  onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                  onTouchEnd={(e) => {
                    if (touchStartX.current === null || !hasSlider) return;
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    if (dx < -50) goTo(slug, cardImages.length, 1);
                    if (dx > 50) goTo(slug, cardImages.length, -1);
                    touchStartX.current = null;
                  }}
                >
                  <img src={currentImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-amber-400 text-black text-[10px] font-bold px-2 py-1 uppercase">{product.badge}</span>
                  )}
                  {/* COUNTER - Sirf jab 1 se zyada photo ho */}
                  {hasSlider && (
                    <span className="absolute top-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full z-10">{(curIdx % cardImages.length) + 1} / {cardImages.length}</span>
                  )}
                  {/* ARROWS - Mobile pe hamesha visible, Desktop pe hover pe */}
                  {hasSlider && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous photo"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(slug, cardImages.length, -1); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      >‹</button>
                      <button
                        type="button"
                        aria-label="Next photo"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(slug, cardImages.length, 1); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                      >›</button>
                    </>
                  )}
                  {/* DOTS - Sirf jab 1 se zyada photo ho */}
                  {hasSlider && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                      {cardImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`Go to photo ${i + 1}`}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToIndex(slug, i); }}
                          className={`rounded-full transition-all ${i === (curIdx % cardImages.length) ? "w-4 h-2 bg-amber-400" : "w-2 h-2 bg-white/70"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-5 space-y-3">
                <span className="text-[11px] text-amber-400 tracking-widest uppercase">{product.category}</span>
                <Link href={`/product/${slug}`}>
                  <h3 className="text-sm font-semibold uppercase hover:text-amber-400 cursor-pointer">{product.name}</h3>
                </Link>
                <p className="text-xs text-zinc-400 line-clamp-2">{product.description}</p>
                <p className="text-sm font-mono text-amber-400">${product.price}</p>
                <p className="text-[11px] text-zinc-500">Estimated Total: 12-17 Working Days • DHL Express • Tracking Provided</p>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-500 uppercase">Colors:</span>
                  {product.colors?.map((c) => (
                    <Link key={c.name} href={`/product/${slug}`}>
                      <span title={c.name} style={{ background: c.code, width: 16, height: 16, borderRadius: "50%", display: "inline-block", border: "1px solid #fff", cursor: "pointer" }} />
                    </Link>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 block text-center text-xs font-bold tracking-widest uppercase py-3 rounded transition-colors cursor-pointer ${addedSlug === slug ? "bg-green-500 text-white" : "bg-amber-400 hover:bg-amber-300 text-black"}`}
                  >
                    {addedSlug === slug ? "✓ Added!" : "Add to Cart →"}
                  </button>
                  <Link href={`/product/${slug}`} className="flex-1 block text-center bg-zinc-800 hover:border-amber-400 border border-zinc-700 text-xs font-bold tracking-widest uppercase py-3 rounded transition-colors">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-10">
        <Link href="/shop" className="inline-block border border-zinc-700 hover:border-amber-400 hover:text-amber-400 text-xs uppercase tracking-[0.2em] px-6 py-3 rounded transition-colors">
          View All Products →
        </Link>
      </div>
    </section>
  );
}
