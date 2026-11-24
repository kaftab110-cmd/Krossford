"use client";
import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, CATEGORIES, getProductsByCategory } from "@/lib/data/shop";
export const dynamic = "force-dynamic";
const WISHLIST_KEY = "krossford_wishlist";
function ShopPageInner() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(urlCategory);
  useEffect(() => { if (urlCategory) setActiveCategory(urlCategory); }, [urlCategory]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">("featured");
  // FIX: Admin (Supabase) wale LIVE products bhi Shop pe dikhen
  // FIX 2 (Audit): API hang ho to Shop Loading pe na atke - 3 sec timeout + local products foran dikhenge
  const [adminProducts, setAdminProducts] = useState<any[]>([]);
  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 3000);
    fetch("/api/products", { cache: "no-store", signal: ctrl.signal }).then(r => r.json()).then(j => {
      const list = (j.products || []).filter((p: any) => p.is_active !== false).map((p: any, i: number) => ({
        id: 100000 + (p.id || i), name: p.name, slug: p.slug || `admin-${p.id}`, price: Number(p.price) || 0,
        category: p.category || "Wallets", image: p.image || "/images/wallet.jpg", gallery: p.image ? [p.image] : [],
        description: p.description || "Handcrafted • Full-Grain Leather", badge: "NEW", forHer: !!p.forHer, stock: p.stock ?? 10,
      }));
      setAdminProducts(list);
    }).catch(() => setAdminProducts([])).finally(() => clearTimeout(t));
    return () => { clearTimeout(t); ctrl.abort(); };
  }, []);
  // WISHLIST - Shop se dil dabao -> Cart ke Saved Products me jayega, same key
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  useEffect(() => { try { const raw = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]"); setWishlistIds(raw.map((i: any) => String(i.slug ?? i.id))); } catch {} }, []);
  const toggleWishlist = (p: any) => {
    try {
      const raw = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      const key = String(p.slug ?? p.id);
      let next;
      if (raw.some((i: any) => String(i.slug ?? i.id) === key)) next = raw.filter((i: any) => String(i.slug ?? i.id) !== key);
      else next = [...raw, { id: p.id, name: p.name, category: p.category, price: p.price, image: p.image, leather: p.leather || "", quantity: 1, colorName: "", slug: p.slug, customerType: "B2C" }];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setWishlistIds(next.map((i: any) => String(i.slug ?? i.id)));
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {}
  };
  const filtered = useMemo(() => {
    let list = [...getProductsByCategory(activeCategory), ...adminProducts.filter((p: any) => activeCategory === "All" || p.category === activeCategory)];
    // Duplicate slug ho to ek hi rakho - Supabase wala jeetega
    list = [...new Map(list.map((p: any) => [p.slug, p])).values()];
    const q = searchQuery.trim().toLowerCase();
    if (q) list = list.filter((p: any) => [p.name, p.description, p.category, p.slug].some((f: any) => String(f || "").toLowerCase().includes(q)));
    if (sortBy === "price-low") list.sort((a: any, b: any) => a.price - b.price);
    if (sortBy === "price-high") list.sort((a: any, b: any) => b.price - a.price);
    if (sortBy === "name") list.sort((a: any, b: any) => String(a.name).localeCompare(String(b.name)));
    return list;
  }, [activeCategory, searchQuery, sortBy, adminProducts]);
  const [slideIndex, setSlideIndex] = useState<Record<number, number>>({});
  const [sliderPaused, setSliderPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const pauseTimer = useRef<any>(null);
  const pauseAuto = () => { setSliderPaused(true); if (pauseTimer.current) clearTimeout(pauseTimer.current); pauseTimer.current = setTimeout(() => setSliderPaused(false), 8000); };
  const filteredIds = filtered.map((p: any) => p.id).join(",");
  useEffect(() => {
    if (sliderPaused) return;
    const t = setInterval(() => { setSlideIndex((prev) => { const next = { ...prev }; filtered.forEach((p: any) => { const total = [...new Set([p.image, ...(p.gallery || [])].filter(Boolean))].length; if (total > 1) next[p.id] = ((prev[p.id] ?? 0) + 1) % total; }); return next; }); }, 4000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderPaused, filteredIds, activeCategory]);
  const goTo = (id: number, total: number, dir: 1 | -1) => { pauseAuto(); setSlideIndex((prev) => ({ ...prev, [id]: (((prev[id] ?? 0) + dir + total) % total) })); };
  const goToIndex = (id: number, idx: number) => { pauseAuto(); setSlideIndex((prev) => ({ ...prev, [id]: idx })); };
  return (
    <main className="bg-black text-white min-h-screen w-full min-w-0 overflow-x-hidden overflow-x-clip">
      <section className="mx-auto max-w-7xl w-full min-w-0 px-3 min-[400px]:px-4 sm:px-6 pt-6 sm:pt-8 pb-6 text-center"><h1 className="text-2xl min-[400px]:text-3xl font-bold uppercase tracking-normal sm:tracking-widest break-words" style={{ fontFamily: "var(--font-brand)" }}>{activeCategory === "For Her" ? "For Her Collection" : "Shop Collection"}</h1><p className="text-[11px] min-[400px]:text-xs text-zinc-400 tracking-normal sm:tracking-widest uppercase mt-2 break-words px-1">{activeCategory === "For Her" ? `Curated For Her • ${filtered.length} Products • Handcrafted • Real Leather` : `${filtered.length} Products • Handcrafted • Real Leather`}</p><p className="text-[11px] text-zinc-500 tracking-wider mt-2">Handcrafted To Order • Hand Stitched • Customized / On Demand • Estimated Total: 12-17 Working Days</p></section>
      <div className="grid grid-cols-2 min-[500px]:flex min-[500px]:flex-wrap min-[500px]:justify-center gap-2 px-3 min-[400px]:px-4 sm:px-6 pb-6 w-full min-w-0 max-w-3xl min-[500px]:max-w-none mx-auto">{CATEGORIES.map((cat) => { const count = getProductsByCategory(cat).length + (cat === "All" ? adminProducts.length : adminProducts.filter((p: any) => p.category === cat).length); return (<button key={cat} onClick={() => { setActiveCategory(cat); setSearchQuery(""); }} className={`w-full min-[500px]:w-auto px-2 min-[400px]:px-4 py-2.5 rounded-full text-[11px] min-[400px]:text-xs font-bold uppercase tracking-normal sm:tracking-widest border cursor-pointer text-center whitespace-nowrap ${activeCategory === cat ? "bg-amber-400 text-black border-amber-400" : "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-amber-400"}`}>{cat} ({count})</button>); })}</div>
      <div className="mx-auto max-w-7xl w-full min-w-0 px-3 min-[400px]:px-4 sm:px-6 pb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between"><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products - wallet, tote, crossbody..." className="flex-1 min-w-0 w-full bg-zinc-950 border border-zinc-800 focus:border-amber-400 outline-none rounded-lg px-4 py-3 text-sm placeholder:text-zinc-500" /><label className="flex items-center gap-2 text-[11px] min-[400px]:text-xs text-zinc-400 uppercase tracking-normal sm:tracking-widest shrink-0">Sort:<select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="flex-1 sm:flex-none min-w-0 bg-zinc-950 border border-zinc-800 focus:border-amber-400 outline-none rounded-lg px-3 py-3 text-sm text-white cursor-pointer"><option value="featured">Featured</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option><option value="name">Name: A to Z</option></select></label></div>
      {filtered.length === 0 ? (<p className="text-center text-sm text-zinc-400 pb-16">No products found for “{searchQuery}” in {activeCategory}. Try another search or category.</p>) : (
      <section className="mx-auto max-w-7xl w-full min-w-0 px-3 min-[400px]:px-4 sm:px-6 pb-16 grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((p: any) => {
          const cardImages = [...new Set([p.image, ...(p.gallery || [])].filter(Boolean))];
          const hasSlider = cardImages.length > 1;
          const curIdx = slideIndex[p.id] ?? 0;
          const currentImage = hasSlider ? cardImages[curIdx % cardImages.length] : p.image;
          const wished = wishlistIds.includes(String(p.slug ?? p.id));
          return (
          <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-amber-400">
            <Link href={`/product/${p.slug}`}>
              <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer" onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchStartX.current === null || !hasSlider) return; const dx = e.changedTouches[0].clientX - touchStartX.current; if (dx < -50) goTo(p.id, cardImages.length, 1); if (dx > 50) goTo(p.id, cardImages.length, -1); touchStartX.current = null; }}>
                <img src={currentImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                {p.badge && <span className="absolute top-3 left-3 bg-amber-400 text-black text-xs font-bold px-2 py-1 uppercase">{p.badge}</span>}
                {p.forHer && <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 uppercase rounded">For Her</span>}
                <span className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-2 py-1">Click To View Designs</span>
                {hasSlider && (<span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">{(curIdx % cardImages.length) + 1} / {cardImages.length}</span>)}
                {hasSlider && (<><button type="button" aria-label="Previous photo" onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(p.id, cardImages.length, -1); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">‹</button><button type="button" aria-label="Next photo" onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(p.id, cardImages.length, 1); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">›</button></>)}
                {hasSlider && (<div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">{cardImages.map((_, i) => (<button key={i} type="button" aria-label={`Go to photo ${i + 1}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToIndex(p.id, i); }} className={`rounded-full transition-all ${i === (curIdx % cardImages.length) ? "w-4 h-2 bg-amber-400" : "w-2 h-2 bg-white/70"}`} />))}</div>)}
              </div>
            </Link>
            <div className="p-4 sm:p-5 space-y-3 min-w-0">
              <div className="flex items-start justify-between gap-2"><span className="text-xs text-amber-400 uppercase tracking-widest">{p.category}{p.forHer ? " • For Her" : ""}</span>
                <button type="button" aria-label={wished ? "Remove from wishlist" : "Save to wishlist"} onClick={() => toggleWishlist(p)} className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-base leading-none ${wished ? "bg-amber-400 text-black border-amber-400" : "border-zinc-700 text-zinc-300 hover:border-amber-400 hover:text-amber-400"}`}>{wished ? "♥" : "♡"}</button>
              </div>
              <Link href={`/product/${p.slug}`}><h3 className="text-sm font-semibold uppercase hover:text-amber-400 cursor-pointer break-words leading-snug">{p.name}</h3></Link>
              <p className="text-xs text-zinc-400 line-clamp-2">{p.description}</p>
              <p className="text-sm text-amber-400 font-mono">${p.price}</p>
              <p className="text-xs text-zinc-400">{p.gallery?.length || 1} Designs Available • Delivery in 12-17 Working Days • Ships via fastest delivery</p>
              <p className="text-[11px] text-zinc-500">Our aim to deliver earlier than estimated.</p>
              <div className="flex flex-col min-[400px]:flex-row gap-2"><Link href={`/product/${p.slug}`} className="flex-1 block text-center bg-amber-400 text-black text-xs font-bold uppercase py-3 rounded whitespace-nowrap">View Designs →</Link><button type="button" onClick={() => toggleWishlist(p)} className={`flex-1 block text-center text-xs font-bold uppercase py-3 rounded border ${wished ? "bg-amber-400/10 border-amber-400 text-amber-400" : "bg-zinc-800 border-zinc-700"}`}>{wished ? "♥ Saved" : "♡ Wishlist"}</button></div>
            </div>
          </div>
          );
        })}
      </section>
      )}
    </main>
  );
}
export default function ShopPage() { return (<Suspense fallback={<main className="bg-black text-white min-h-screen w-full min-w-0 flex flex-col items-center justify-center gap-3 px-4 text-center"><p className="text-3xl font-bold uppercase tracking-widest">Shop Collection</p><p className="text-xs text-zinc-400 tracking-widest uppercase">Loading products - Handcrafted • Real Leather</p></main>}><ShopPageInner /></Suspense>); }
