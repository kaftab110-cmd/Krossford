"use client";
import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, CATEGORIES, getProductsByCategory } from "@/lib/data/shop";

export const dynamic = "force-dynamic";

function ShopPageInner() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(urlCategory);

  useEffect(() => {
    if (urlCategory === 'For Her') { window.location.href = '/for-her'; return; }
    setActiveCategory(urlCategory);
    setSearchQuery('');
  }, [urlCategory]);

  // --- SEARCH + SORT - Shop SEO / Usability ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">("featured");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // ADD TO CART - Shop me pehle tha hi nahi, sirf View Designs tha - is liye add kiya
  const handleAddToCart = (product: any) => {
    const slug = product.slug || String(product.id);
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
        image: product.image,
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

  const filtered = useMemo(() => {
    let list = [...getProductsByCategory(activeCategory)];
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p: any) =>
        [p.name, p.description, p.category, p.slug].some((f: any) => String(f || "").toLowerCase().includes(q))
      );
    }
    if (sortBy === "price-low") list.sort((a: any, b: any) => a.price - b.price);
    if (sortBy === "price-high") list.sort((a: any, b: any) => b.price - a.price);
    if (sortBy === "name") list.sort((a: any, b: any) => String(a.name).localeCompare(String(b.name)));
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  // SLIDER FORMULA (ProductCard wala - har folder/file me same):
  // - Arrows mobile pe hamesha visible, desktop pe hover pe
  // - Dots + Counter (1 / 5)
  // - Swipe left/right mobile pe
  // - Slider sirf tab jab 1 se zyada photo ho
  const [slideIndex, setSlideIndex] = useState<Record<number, number>>({});
  const [hoverId, setHoverId] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const hoverProduct = hoverId !== null ? products.find((p) => p.id === hoverId) : undefined;
  const hoverImages = hoverProduct ? [...new Set([hoverProduct.image, ...(hoverProduct.gallery || [])].filter(Boolean))] : [];

  const HOVER_SLIDE_DELAY = 1800;

  useEffect(() => {
    if (hoverId === null || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => {
        const cur = prev[hoverId] ?? 0;
        return { ...prev, [hoverId]: (cur + 1) % hoverImages.length };
      });
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverId, hoverImages.length]);

  const goTo = (id: number, total: number, dir: 1 | -1) => {
    setSlideIndex((prev) => {
      const cur = prev[id] ?? 0;
      return { ...prev, [id]: (cur + dir + total) % total };
    });
  };

  const goToIndex = (id: number, idx: number) => {
    setSlideIndex((prev) => ({ ...prev, [id]: idx }));
  };

  const startHover = (id: number) => {
    setHoverId(id);
  };
  const stopHover = () => {
    setHoverId(null);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest">{activeCategory === "For Her" ? "For Her Collection" : "Shop Collection"}</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">{activeCategory === "For Her" ? `Curated For Her • ${filtered.length} Products • Handcrafted • Real Leather` : `${filtered.length} Products • Handcrafted • Real Leather`}</p>
      </section>

      {/* FOR HER BUTTON - Sirf SHOP pe dikhega, FOR HER pe nahi - Badi websites jaisa: Shop pills me For Her ka pill nahi hota, sirf button hota hai */}
      {activeCategory !== "For Her" && (
        <div className="mx-auto max-w-7xl px-6 pb-4 text-center">
          <Link href="/for-her" className="inline-block bg-pink-500 hover:bg-pink-400 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded">Go to For Her Page →</Link>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-2 px-6 pb-6">
        {CATEGORIES.filter((cat) => cat !== 'For Her').map((cat) => {
          const count = getProductsByCategory(cat).length;
          return (
            <button key={cat} onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border cursor-pointer ${activeCategory === cat ? "bg-amber-400 text-black border-amber-400" : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-amber-400"}`}>
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* SEARCH + SORT */}
      <div className="mx-auto max-w-7xl px-6 pb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products - wallet, tote, crossbody..."
          className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-amber-400 outline-none rounded-lg px-4 py-3 text-sm placeholder:text-zinc-500"
        />
        <label className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest">
          Sort:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-zinc-950 border border-zinc-800 focus:border-amber-400 outline-none rounded-lg px-3 py-3 text-sm text-white cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-zinc-400 pb-16">No products found for “{searchQuery}” in {activeCategory}. Try another search or category.</p>
      ) : (
      <section className="mx-auto max-w-7xl px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p: any) => {
          const cardImages = [...new Set([p.image, ...(p.gallery || [])].filter(Boolean))];
          const hasSlider = cardImages.length > 1;
          const curIdx = slideIndex[p.id] ?? 0;
          const currentImage = hasSlider ? cardImages[curIdx % cardImages.length] : p.image;
          return (
          <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-amber-400">
            <Link href={`/product/${p.slug}`}>
              <div
                className="relative h-64 bg-zinc-900 overflow-hidden cursor-pointer"
                onMouseEnter={() => startHover(p.id)}
                onMouseLeave={stopHover}
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null || !hasSlider) return;
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (dx < -50) goTo(p.id, cardImages.length, 1);
                  if (dx > 50) goTo(p.id, cardImages.length, -1);
                  touchStartX.current = null;
                }}
              >
                <img src={currentImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                {p.badge && <span className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-bold px-2 py-1 uppercase">{p.badge}</span>}
                {p.forHer && <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 uppercase rounded">For Her</span>}
                <span className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-2 py-1">Click To View Designs</span>
                {/* COUNTER - Sirf jab 1 se zyada photo ho */}
                {hasSlider && (
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">{(curIdx % cardImages.length) + 1} / {cardImages.length}</span>
                )}
                {/* ARROWS - Mobile pe hamesha visible, Desktop pe hover pe */}
                {hasSlider && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(p.id, cardImages.length, -1); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                    >‹</button>
                    <button
                      type="button"
                      aria-label="Next photo"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(p.id, cardImages.length, 1); }}
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
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToIndex(p.id, i); }}
                        className={`rounded-full transition-all ${i === (curIdx % cardImages.length) ? "w-4 h-2 bg-amber-400" : "w-2 h-2 bg-white/70"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Link>
            <div className="p-5 space-y-3">
              <span className="text-xs text-amber-400 uppercase tracking-widest">{p.category}{p.forHer ? " • For Her" : ""}</span>
              <Link href={`/product/${p.slug}`}><h3 className="text-sm font-semibold uppercase hover:text-amber-400 cursor-pointer">{p.name}</h3></Link>
              <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>
              <p className="text-sm text-amber-400 font-mono">${p.price}</p>
              <p className="text-xs text-zinc-400">{p.gallery?.length || 1} Designs Available • Delivery in 12-17 Working Days • DHL Express</p>
              <p className="text-[11px] text-zinc-500">Our aim to deliver earlier than estimated.</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAddToCart(p)}
                  className={`flex-1 block text-center text-xs font-bold uppercase py-3 rounded transition-colors cursor-pointer ${addedSlug === (p.slug || String(p.id)) ? "bg-green-500 text-white" : "bg-amber-400 hover:bg-amber-300 text-black"}`}
                >
                  {addedSlug === (p.slug || String(p.id)) ? "✓ Added!" : "Add to Cart →"}
                </button>
                <Link href={`/product/${p.slug}`} className="flex-1 block text-center bg-zinc-800 border border-zinc-700 text-xs font-bold uppercase py-3 rounded">Details</Link>
              </div>
              <Link href={`/product/${p.slug}`} className="block text-center text-[11px] text-zinc-400 hover:text-amber-400 uppercase tracking-widest">View Designs →</Link>
            </div>
          </div>
          );
        })}
      </section>
      )}
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<main className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-3"><p className="text-3xl font-bold uppercase tracking-widest">Shop Collection</p><p className="text-xs text-zinc-400 tracking-widest uppercase">Loading products - Handcrafted • Real Leather</p></main>}>
      <ShopPageInner />
    </Suspense>
  );
}
