"use client";
import Link from "next/link";
import { products } from "@/lib/data/shop";

// FEATURED = Hamara Starting Plan + 1 Hero Product - Hamesha Yehi Dikhega
const FEATURED_SLUGS = ["card-holder", "leather-tag-keychain-set", "crossbody-messenger-bag", "travel-duffle-bag"];

export default function FeaturedProducts() {
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
          return (
            <div key={product.id} className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden group">
              <Link href={`/product/${slug}`}>
                <div className="relative h-64 bg-zinc-900 overflow-hidden cursor-pointer">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-black text-[9px] font-bold px-2 py-1 uppercase">{product.badge}</span>
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

                {/* Color Dots - Click karne pe bhi Product Page khulega */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 uppercase">Options:</span>
                  {product.colors?.map((c: any) => (
                    <Link key={c.name} href={`/product/${slug}`}>
                      <span title={c.name} style={{ background: c.code, width: 16, height: 16, borderRadius: "50%", display: "inline-block", border: "1px solid #fff", cursor: "pointer" }} />
                    </Link>
                  ))}
                </div>

                {/* FIX: SELECT OPTIONS ab Cart pe nahi, Product Page pe jayega */}
                <Link href={`/product/${slug}`} className="block w-full text-center bg-zinc-800 hover:bg-amber-400 hover:text-black text-[11px] font-bold tracking-widest uppercase py-3 rounded transition-colors">
                  Select Options
                </Link>
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