"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { products, findProductBySlug, getCardSliderImages } from "@/lib/data/shop";

// FEATURED = Hamara Starting Plan + 1 Hero Product - Hamesha Yehi Dikhega
// SYNC FIX: Sirf slug likha hai, naam / price / image / badge sab lib/data/shop.ts se aayega.
// IMAGE_FIX hataya - kyunki shop.ts me keychain ki image pehle se sahi hai (/images/leather-tag-keychain-set1.jpg)
// Dobara yahan hardcode image likhne se phir mismatch hota tha.
const FEATURED_SLUGS = ["card-holder", "leather-tag-keychain-set", "crossbody-messenger-bag", "travel-duffle-bag"];

export default function FeaturedProducts() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // --- HOVER SLIDER - Featured ke box ke andar - SLOW ---
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);
  const [hoverIndex, setHoverIndex] = useState(0);
  const hoverProduct = hoverSlug ? findProductBySlug(hoverSlug) : undefined;
  const hoverImages = hoverProduct ? getCardSliderImages(hoverProduct) : [];
  const HOVER_SLIDE_DELAY = 1800; // 1800ms = 1.8 second me 1 photo - slow

  useEffect(() => {
    if (!hoverSlug || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % hoverImages.length);
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverSlug, hoverImages.length]);

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
          const displayImage = product.image;
          const cardImages = getCardSliderImages(product);
          const isHovering = hoverSlug === slug;
          const currentImage = isHovering && cardImages.length > 1 ? cardImages[hoverIndex % cardImages.length] : displayImage;
          return (
            <div key={product.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group">
              <Link href={`/product/${slug}`}>
                <div
                  className="relative h-64 bg-zinc-900 overflow-hidden cursor-pointer"
                  onMouseEnter={() => { setHoverSlug(slug); setHoverIndex(0); }}
                  onMouseLeave={() => { setHoverSlug(null); setHoverIndex(0); }}
                  onTouchStart={() => { setHoverSlug(slug); setHoverIndex(0); }}
                  onTouchEnd={() => { setTimeout(() => { setHoverSlug(null); setHoverIndex(0); }, 6000); }}
                >
                  <img src={currentImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-amber-400 text-black text-[10px] font-bold px-2 py-1 uppercase">{product.badge}</span>
                  )}
                  {isHovering && cardImages.length > 1 && (
                    <span className="absolute top-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded-full">{(hoverIndex % cardImages.length) + 1} / {cardImages.length}</span>
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
                <p className="text-[11px] text-zinc-500">Ships in 18-24 Days • DHL Express • Tracking Provided</p>

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
