"use client";
import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data/shop";

// FEATURED = Hamara Starting Plan + 1 Hero Product - Hamesha Yehi Dikhega
const FEATURED_SLUGS = ["card-holder", "leather-tag-keychain-set", "crossbody-messenger-bag", "travel-duffle-bag"];

// FIX: Keychain ki image ka naam yahan force kiya - data file me purana naam ho to bhi yehi chalegi
const IMAGE_FIX: Record<string, string> = {
  "leather-tag-keychain-set": "/images/leather-tag-keychain-set.jpg",
};

export default function FeaturedProducts() {
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    const slug = product.slug || product.id;
    const image = IMAGE_FIX[slug] || product.image;
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
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof products;

  // Agar koi slug na mile to fallback - pehle 4
  const list = featured.length === 4 ? featured : products.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-10 space-y-2">
        <h2 className="text-2xl font-bold uppercase tracking-widest">Featured Products</h2>
        <p className="text-xs text-zinc-400 tracking-widest uppercase">Best Sellers • Starting From $25 • Honest Price</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {list.map((product: any) => {
          const slug = product.slug || product.id;
          const displayImage = IMAGE_FIX[slug] || product.image;
          return (
            <div key={product.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group">
              <Link href={`/product/${slug}`}>
                <div className="relative h-64 bg-zinc-900 overflow-hidden cursor-pointer">
                  <img src={displayImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-amber-400 text-black text-[9px] font-bold px-2 py-1 uppercase">{product.badge}</span>
                  )}
                </div>
              </Link>
              <div className="p-5 space-y-3">
                <span className="text-[10px] text-amber-400 tracking-widest uppercase">{product.category}</span>
                <Link href={`/product/${slug}`}>
                  <h3 className="text-sm font-semibold uppercase hover:text-amber-400 cursor-pointer">{product.name}</h3>
                </Link>
                <p className="text-xs text-zinc-400 line-clamp-2">{product.description}</p>
                <p className="text-sm font-mono text-amber-400">${product.price}</p>
                <p className="text-[10px] text-zinc-500">🚚 Ships in 18-24 Days • DHL Express • Tracking Provided</p>

                {/* Color Dots - Click karne pe bhi Product Page khulega */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 uppercase">Colors:</span>
                  {product.colors?.map((c: any) => (
                    <Link key={c.name} href={`/product/${slug}`}>
                      <span title={c.name} style={{ background: c.code, width: 16, height: 16, borderRadius: "50%", display: "inline-block", border: "1px solid #fff", cursor: "pointer" }} />
                    </Link>
                  ))}
                </div>

                {/* FIX: Add to Cart - Ab Page Nahi Badlega - Wahi Pe Add Hoga */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex-1 block text-center text-[11px] font-bold tracking-widest uppercase py-3 rounded transition-colors cursor-pointer ${addedSlug === slug ? "bg-green-500 text-white" : "bg-amber-400 hover:bg-amber-300 text-black"}`}
                  >
                    {addedSlug === slug ? "✓ Added!" : "Add to Cart →"}
                  </button>
                  <Link href={`/product/${slug}`} className="flex-1 block text-center bg-zinc-800 hover:border-amber-400 border border-zinc-700 text-[11px] font-bold tracking-widest uppercase py-3 rounded transition-colors">
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