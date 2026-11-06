import BrandStory from "@/components/BrandStory";
import Collections from "@/components/Collections";
import FeaturedProducts from "@/components/FeaturedProducts";
import Craftsmanship from "@/components/Craftsmanship";
import Bespoke from "@/components/Bespoke";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Hero - FIXED - Full Screen Fit */}
      <section className="relative w-full h-[100svh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image - Full Fit */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/leather-duffle-bag.jpg')" }}
        />
        {/* Kala parda - taake likhai saaf dikhe */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-6 max-w-3xl mx-auto">
          <p className="text-amber-400 tracking-[0.3em] text-xs font-bold">KROSSFORD ENTERPRISES</p>
          <h1 className="mt-4 text-4xl sm:text-6xl font-bold leading-tight">
            Real Leather.<br />Made Honestly.
          </h1>
          <p className="mt-4 text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A New-Generation International Leather Brand, Since 2025.
            Sample Before Bulk. 100% Real Leather Guarantee.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/shop" className="bg-amber-400 text-black px-6 py-3 rounded-md text-sm font-bold hover:bg-amber-300">
              Shop Collection
            </a>
            <a href="/contact-us" className="border border-zinc-300 px-6 py-3 rounded-md text-sm font-medium hover:border-amber-400">
              Request Sample
            </a>
          </div>
        </div>
      </section>

      <Collections />
      <FeaturedProducts />
      <Craftsmanship />
      <BrandStory />
      <Bespoke />

      {/* Trust - No Fake Numbers */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">Sample Before Bulk</p>
            <p className="text-zinc-400 text-xs mt-2">Order a sample first, then decide for bulk.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">100% Real Leather</p>
            <p className="text-zinc-400 text-xs mt-2">Full-grain leather. No fake claims.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <p className="text-amber-400 font-bold">Direct From Maker</p>
            <p className="text-zinc-400 text-xs mt-2">Email us at hello@krossford.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}