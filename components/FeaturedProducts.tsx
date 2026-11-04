import Link from "next/link";
import { featuredProductsSection } from "@/lib/data/homepage";

export default function FeaturedProducts() {
  return (
    <section id="featured-products" aria-labelledby="featured-products-title" className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">{featuredProductsSection.label}</span>
          <h2 id="featured-products-title" className="mt-4 text-4xl font-bold">{featuredProductsSection.title}</h2>
          <p className="mt-4 leading-7 text-zinc-300">{featuredProductsSection.description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredProductsSection.products.map((product) => (
            <article key={product.id} className="rounded-xl border border-yellow-500/20 bg-zinc-900 p-5 overflow-hidden">
              <div className="mb-5 aspect-square overflow-hidden rounded-lg bg-zinc-800">
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <span className="inline-flex rounded-full border border-yellow-500/30 px-3 py-1 text-xs font-medium uppercase tracking-wide text-yellow-500">
                {product.status}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-yellow-500">{product.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{product.description}</p>
              <Link href={product.href} className="mt-5 inline-flex items-center gap-1 font-medium text-yellow-500 transition hover:underline">
                View Piece <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}