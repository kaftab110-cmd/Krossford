"use client";
import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { getForHerProducts } from "@/lib/data/shop";
import { readCartItems, saveCart } from "@/lib/cart";
export const dynamic = "force-dynamic";
function ForHerPageInner() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "name">("featured");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [adminProducts, setAdminProducts] = useState<any[]>([]);
  useEffect(() => { const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 3000); fetch("/api/products", { cache: "no-store", signal: ctrl.signal }).then(r => r.json()).then(j => { const list = (j.products || []).filter((p: any) => p.is_active !== false && !!p.forHer).map((p: any, i: number) => ({ id: 100000 + (p.id || i), name: p.name, slug: p.slug || `admin-${p.id}`, price: Number(p.price) || 0, category: p.category || "Wallets", image: p.image || "/images/wallet.jpg", gallery: p.image ? [p.image] : [], description: p.description || "Handcrafted • Full-Grain Leather", badge: "NEW", forHer: true, forHim: !!p.forHim, stock: p.stock ?? 10 })); setAdminProducts(list); }).catch(() => setAdminProducts([])).finally(() => clearTimeout(t)); return () => { clearTimeout(t); ctrl.abort(); }; }, []);
  const handleAddToCart = (product: any) => {
    const slug = product.slug || String(product.id);
    // FIX: Hardcoded "Jet Black" nahi - product ka pehla colour lo, warna customer ko galat colour jayega
    const firstColor = product.colors?.[0] || { name: "Dark Brown", code: "#3E2723", image: product.image };
    const colorName = firstColor.name || "Dark Brown";
    const existingCart = readCartItems<any>();
    const existingIndex = existingCart.findIndex((it: any) => it.slug === slug && it.colorName === colorName && it.customerType === "B2C" && (it.design || "Design 1") === "Design 1");
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity = Number(existingCart[existingIndex].quantity || 1) + 1;
    } else {
      existingCart.push({
        id: `${slug}-design1-${colorName}-none-${Date.now()}`,
        slug: slug, name: product.name, category: product.category, price: product.price,
        image: firstColor.image || product.image, quantity: 1, colorName: colorName, colorCode: firstColor.code || "",
        design: "Design 1", customerType: "B2C", additionalOption: "none", customText: "", uploadedFileName: "",
        addedAt: Date.now(), extraChargesNote: "", shipmentNote: "Shipment + Delivery Charges To Be Confirmed After Destination Check",
      });
    }
    saveCart(existingCart);
    setAddedSlug(slug);
    setTimeout(() => setAddedSlug(null), 2000);
  };
  // SAFETY: Sirf forHer === true wale - agar shop.ts me galti se gents aa gaya to yahan nahi dikhega
  const allForHer = useMemo(() => getForHerProducts().filter((p: any) => p.forHer === true), []);
  const filtered = useMemo(() => {
    let list = [...new Map([...allForHer, ...adminProducts].map((p: any) => [p.slug, p])).values()];
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((p: any) => [p.name, p.description, p.category, p.slug].some((f: any) => String(f || "").toLowerCase().includes(q)));
    }
    if (sortBy === "price-low") list.sort((a: any, b: any) => a.price - b.price);
    if (sortBy === "price-high") list.sort((a: any, b: any) => b.price - a.price);
    if (sortBy === "name") list.sort((a: any, b: any) => String(a.name).localeCompare(String(b.name)));
    return list;
  }, [allForHer, searchQuery, sortBy, adminProducts]);
  const [slideIndex, setSlideIndex] = useState<Record<number, number>>({});
  const pausedUntil = useRef<Record<number, number>>({});
  const touchStartX = useRef<number | null>(null);
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setSlideIndex((prev) => {
        const next = { ...prev };
        let changed = false;
        for (const p of filtered as any[]) {
          const imgs = [...new Set([p.image, ...(p.gallery || [])].filter(Boolean))];
          if (imgs.length <= 1) continue;
          if ((pausedUntil.current[p.id] || 0) > now) continue;
          const cur = prev[p.id] ?? 0;
          next[p.id] = (cur + 1) % imgs.length;
          changed = true;
        }
        return changed ? next : prev;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [filtered]);
  const manualGo = (id: number, total: number, dir: 1 | -1) => {
    pausedUntil.current[id] = Date.now() + 8000;
    setSlideIndex((prev) => ({ ...prev, [id]: (((prev[id] ?? 0) + dir + total) % total) }));
  };
  const goToIndex = (id: number, idx: number) => {
    pausedUntil.current[id] = Date.now() + 8000;
    setSlideIndex((prev) => ({ ...prev, [id]: idx }));
  };
  return (
    <main className="bg-black text-white min-h-screen w-full min-w-0 overflow-x-hidden">
      <section className="mx-auto max-w-7xl px-3 min-:px-4 sm:px-6 pt- min-:pt- sm:pt- lg:pt- pb-6 text-center w-full min-w-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-widest break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>For Her Collection</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2 break-words">{filtered.length} Products • Handcrafted • Custom Made On Demand • Genuine Leather</p>
        <p className="text-xs text-zinc-500 leading-relaxed max-w-2xl mx-auto mt-3 normal-case tracking-normal">Handcrafted from full-grain leather — vegetable-tanned, carefully cut and hand-finished by KROSSFORD. Bags, wallets, belts and small leather goods for her. Choose your hide, colour and design. Order a paid sample first, then order bulk with confidence.</p>
      </section>
      <div className="mx-auto max-w-7xl px-3 min-:px-4 sm:px-6 pb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between w-full min-w-0">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search For Her - wallet, tote, crossbody..." className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 focus:border-[#D4AF37] outline-none rounded-lg px-4 py-3 text-sm placeholder:text-zinc-500" />
        <label className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest w-full sm:w-auto shrink-0">
          Sort:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="flex-1 sm:flex-none min-w-0 bg-zinc-950 border border-zinc-800 focus:border-[#D4AF37] outline-none rounded-lg px-3 py-3 text-sm text-white cursor-pointer">
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </label>
      </div>
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-zinc-400 pb-16 px-4 break-words">No products found for “{searchQuery}” in For Her. Try another search.</p>
      ) : (
        <section className="mx-auto max-w-7xl px-3 min-:px-4 sm:px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full min-w-0">
          {filtered.map((p: any) => {
            const cardImages = [...new Set([p.image, ...(p.gallery || [])].filter(Boolean))];
            const hasSlider = cardImages.length > 1;
            const curIdx = slideIndex[p.id] ?? 0;
            const currentImage = hasSlider ? cardImages[curIdx % cardImages.length] : p.image;
            return (
              <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group hover:border-[#D4AF37] w-full min-w-0">
                <Link href={`/product/${p.slug}`}>
                  <div
                    className="relative aspect-[4/3] bg-zinc-900 overflow-hidden cursor-pointer"
                    onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                    onTouchEnd={(e) => {
                      if (touchStartX.current === null || !hasSlider) return;
                      const dx = e.changedTouches[0].clientX - touchStartX.current;
                      if (dx < -50) manualGo(p.id, cardImages.length, 1);
                      if (dx > 50) manualGo(p.id, cardImages.length, -1);
                      touchStartX.current = null;
                    }}
                  >
                    <img src={currentImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    {p.badge && <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 uppercase">{p.badge}</span>}
                    <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 uppercase rounded">For Her</span>
                    {(p as any).forHim && <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 uppercase rounded" style={{ marginTop: "28px" }}>For Him</span>}
                    <span className="absolute bottom-3 left-3 bg-black/80 text-white text-xs px-2 py-1">Click To View Designs</span>
                    {hasSlider && (<span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">{(curIdx % cardImages.length) + 1} / {cardImages.length}</span>)}
                    {hasSlider && (
                      <>
                        <button type="button" aria-label="Previous photo" onClick={(e) => { e.preventDefault(); e.stopPropagation(); manualGo(p.id, cardImages.length, -1); }} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">‹</button>
                        <button type="button" aria-label="Next photo" onClick={(e) => { e.preventDefault(); e.stopPropagation(); manualGo(p.id, cardImages.length, 1); }} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center text-lg leading-none opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">›</button>
                      </>
                    )}
                    {hasSlider && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                        {cardImages.map((_: any, i: number) => (
                          <button key={i} type="button" aria-label={`Go to photo ${i + 1}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToIndex(p.id, i); }} className={`rounded-full transition-all ${i === (curIdx % cardImages.length) ? "w-4 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-white/70"}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-4 sm:p-5 space-y-3 min-w-0">
                  <span className="text-xs text-[#D4AF37] uppercase tracking-widest break-words">{p.category}</span>
                  <Link href={`/product/${p.slug}`}><h3 className="text-sm font-semibold uppercase hover:text-[#D4AF37] cursor-pointer break-words leading-snug">{p.name}</h3></Link>
                  <p className="text-xs text-zinc-400 line-clamp-2 break-words">{p.description}</p>
                  <p className="text-sm text-[#D4AF37] font-bold">${p.price}</p>
                  <p className="text-xs text-zinc-400 break-words">{p.gallery?.length || 1} Designs Available • Handcrafted • Custom Made On Demand • Estimated Total: 12-17 Working Days • Fastest Delivery</p>
                  <p className="text- text-zinc-500 break-words">Tip: Colour / Design change karna ho to Details kholo — wahan se sahi colour select hoga.</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleAddToCart(p)} className={`flex-1 block text-center text-xs font-bold uppercase py-3 rounded transition-colors cursor-pointer ${addedSlug === (p.slug || String(p.id)) ? "bg-green-500 text-white" : "bg-[#E8C15A] hover:bg-[#D4AF37] text-black border-2 border-[#E8C15A]"}`}>{addedSlug === (p.slug || String(p.id)) ? "✓ Added!" : "Add to Cart →"}</button>
                    <Link href={`/product/${p.slug}`} className="flex-1 block text-center bg-zinc-800 border border-zinc-700 text-xs font-bold uppercase py-3 rounded">Details</Link>
                  </div>
                  <Link href={`/product/${p.slug}`} className="block text-center text-xs text-zinc-400 hover:text-[#D4AF37] uppercase tracking-widest">View Designs →</Link>
                </div>
              </div>
            );
          })}
        </section>
      )}
      <section className="mx-auto max-w-7xl px-3 min-:px-4 sm:px-6 pb-16 text-center"><p className="text-xs text-zinc-500 leading-relaxed max-w-2xl mx-auto">Handcrafted leather bags for her • Handcrafted leather wallets • Vegetable-tanned belts • Custom leather design • Sample before bulk • Leather care guide</p></section>
    </main>
  );
}
export default function ForHerPage() {
  return (
    <Suspense fallback={<main className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-3 px-4 pt- text-center"><p className="text-2xl sm:text-3xl font-bold uppercase tracking-widest break-words" style={{ fontFamily: "var(--font-brand)" }}>For Her Collection</p><p className="text-xs text-zinc-400 tracking-widest uppercase break-words">Loading products - Handcrafted • Custom Made On Demand • Genuine Leather</p></main>}>
      <ForHerPageInner />
    </Suspense>
  );
}