"use client";
import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, CATEGORIES, getProductsByCategory } from "@/lib/data/shop";

export const dynamic = "force-dynamic";

function ShopPageInner() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(urlCategory);

  useEffect(() => {
    if (urlCategory) setActiveCategory(urlCategory);
  }, [urlCategory]);

  // --- SEARCH + SORT - Shop SEO / Usability ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">("featured");

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

  const [hoverId, setHoverId] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState(0);

  const hoverProduct = hoverId !== null ? products.find((p) => p.id === hoverId) : undefined;
  const hoverImages = hoverProduct ? [...new Set([hoverProduct.image, ...(hoverProduct.gallery || [])].filter(Boolean))] : [];

  const HOVER_SLIDE_DELAY = 1800;

  useEffect(() => {
    if (hoverId === null || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % hoverImages.length);
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverId, hoverImages.length]);

  const startHover = (id: number) => {
    setHoverId(id);
    setHoverIndex(0);
  };
  const stopHover = () => {
    setHoverId(null);
    setHoverIndex(0);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-6 pt-28 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest">{activeCategory === "For Her" ? "For Her Collection" : "Shop Collection"}</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">{activeCategory === "For Her" ? `Curated For Her • ${filtered.length} Products • Handcrafted • Real Leather` : `${filtered.length} Products • Handcrafted • Real Leather`}</p>
      </section>

      <div className="flex flex-wrap justify-center gap-2 px-6 pb-6">
        {CATEGORIES.map((cat) => {
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
          const isHovering = hoverId === p.id;
          const currentImage = isHovering && cardImages.length > 1 ? cardImages[hoverIndex % cardImages.length] : p.image;
          return (
          <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-amber-400">
            <Link href={`/product/${p.slug}`}>
              <div
                className="relative h-64 bg-zinc-900 overflow-hidden cursor-pointer"
                onMouseEnter={() => startHover(p.id)}
                onMouseLeave={stopHover}
              >
                <img src={currentImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                {p.badge && <span className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-bold px-2 py-1 uppercase">{p.badge}</span>}
                {p.forHer && <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 uppercase rounded">For Her</span>}
                <span className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-2 py-1">Click To View Designs</span>
                {isHovering && cardImages.length > 1 && (
                  <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{(hoverIndex % cardImages.length) + 1} / {cardImages.length}</span>
                )}
              </div>
            </Link>
            <div className="p-5 space-y-3">
              <span className="text-xs text-amber-400 uppercase tracking-widest">{p.category}{p.forHer ? " • For Her" : ""}</span>
              <Link href={`/product/${p.slug}`}><h3 className="text-sm font-semibold uppercase hover:text-amber-400 cursor-pointer">{p.name}</h3></Link>
              <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>
              <p className="text-sm text-amber-400 font-mono">${p.price}</p>
              <p className="text-xs text-zinc-400">{p.gallery?.length || 1} Designs Available • </p>
              <div className="flex gap-2">
                <Link href={`/product/${p.slug}`} className="flex-1 block text-center bg-amber-400 text-black text-xs font-bold uppercase py-3 rounded">View Designs →</Link>
                <Link href={`/product/${p.slug}`} className="flex-1 block text-center bg-zinc-800 border border-zinc-700 text-xs font-bold uppercase py-3 rounded">Details</Link>
              </div>
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
