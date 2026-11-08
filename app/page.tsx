import BrandStory from "@/components/BrandStory";
import Collections from "@/components/Collections";
import FeaturedProducts from "@/components/FeaturedProducts";
import Craftsmanship from "@/components/Craftsmanship";
import Bespoke from "@/components/Bespoke";
import Reviews from "@/components/Reviews";

const TOP3 = [
  { name: "Card Holder", price: 29, slug: "card-holder", tag: "BEST SELLER" },
  { name: "Keychain Set", price: 25, slug: "leather-tag-keychain-set", tag: "CUSTOM LOGO" },
  { name: "Crossbody Bag", price: 119, slug: "crossbody-messenger-bag", tag: "BEST SELLER" },
];

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
            <a href="/b2b" className="border border-amber-400 text-amber-400 px-6 py-3 rounded-md text-sm font-medium hover:bg-amber-400 hover:text-black">
              Retail + Wholesale
            </a>
            <a href="/contact-us" className="border border-zinc-300 px-6 py-3 rounded-md text-sm font-medium hover:border-amber-400">
              Request Sample
            </a>
          </div>
          <p className="mt-4 text-[11px] text-zinc-400 tracking-widest uppercase">Ships via DHL Express • Total Delivery: 18-24 Days • Tracking Provided • VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER</p>
        </div>
      </section>

      {/* TOP 3 - STARTING PLAN - Customer Ko Pehle Hi Price Pata Chale */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center mb-6">
          <h2 className="text-xl font-serif uppercase tracking-[0.2em]">Start With Our Best Sellers</h2>
          <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">Honest Price • Handcrafted • Built To Last</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TOP3.map((p) => (
            <div key={p.slug} className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 hover:border-amber-400 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-amber-400 font-bold">{p.tag}</span>
                  <h3 className="text-sm font-semibold uppercase tracking-wider mt-1">{p.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1">Full-Grain Leather • Hand-Stitched</p>
                </div>
                <p className="text-lg font-mono text-amber-400 font-bold shrink-0">${p.price}</p>
              </div>
              <p className="text-[10px] text-zinc-500 mt-2">🚚 Ships in 18-24 Days • DHL Express • Tracking Provided</p>
              <div className="flex gap-2 mt-4">
                <a href={`/product/${p.slug}`} className="flex-1 text-center bg-amber-400 text-black text-[11px] font-bold uppercase tracking-widest py-2.5 rounded hover:bg-amber-300">
                  Add to Cart →
                </a>
                <a href={`/product/${p.slug}`} className="flex-1 text-center border border-zinc-700 text-white text-[11px] uppercase tracking-widest py-2.5 rounded hover:border-amber-400 hover:text-amber-400">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Collections />
      <FeaturedProducts />
      <Craftsmanship />
      <Reviews />
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
        {/* RETAIL + WHOLESALE BANNER - Home Page Se Bhi Dono Ka Rasta */}
        <div className="mt-6 border border-amber-400/30 rounded-lg p-6 bg-zinc-950 text-center space-y-2">
          <p className="text-sm font-serif uppercase tracking-widest">Retail + Wholesale Both Available</p>
          <p className="text-xs text-zinc-400">Retail: 1 Piece - Shop Directly. Wholesale: 50+ Units - Leather Jackets, Biker Suits, Bags, Belts - White Label & Custom Production.</p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <a href="/shop" className="inline-block bg-amber-400 text-black text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 rounded hover:bg-amber-300">
              Shop Retail - 1 Piece
            </a>
            <a href="/b2b" className="inline-block border border-amber-400 text-amber-400 text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 rounded hover:bg-amber-400 hover:text-black">
              Get Wholesale Quote →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}