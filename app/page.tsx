"use client";

import Link from "next/link";
import HidesWeWorkWith from "@/components/HidesWeWorkWith";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  const collections = [
    {
      id: 1,
      title: "Executive Outerwear",
      subtitle: "Full-Grain Cowhide Jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?category=jackets"
    },
    {
      id: 2,
      title: "Architectural Travel",
      subtitle: "Minimalist Duffles & Briefcases",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?category=bags"
    },
    {
      id: 3,
      title: "Bespoke Small Goods",
      subtitle: "Handcrafted Leather Wallets & Belts",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
      link: "/shop?category=wallets"
    }
  ];

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden pb-[120px]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center text-center overflow-hidden bg-[#111] px-4">
        <img 
          src="/hero.jpg" 
          alt="Krossford Leather" 
          className="absolute inset-0 w-full h-full object-cover" 
          style={{ opacity: 0.55 }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=2000&auto=format&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
        <div className="relative z-10 flex flex-col items-center py-20 max-w-4xl mx-auto w-full pb-16">
          <span className="text-[11px] tracking-[0.15em] text-yellow-400 border border-yellow-500/60 px-4 py-2 rounded-full font-mono max-w-full">
            KROSSFORD ENTERPRISES B2B EXPORT
          </span>
          <h1 className="text-[32px] leading-[1.1] sm:text-[48px] lg:text-[64px] font-bold text-white mt-6 w-full break-words whitespace-normal tracking-normal uppercase font-serif">
            Uncompromising<br/>Leather<br/>Architecture
          </h1>
          <p className="text-[14px] leading-[1.6] text-gray-200 w-full max-w-[520px] mt-4 break-words whitespace-normal tracking-normal px-2 uppercase">
            Sourced and fabricated in Sialkot, Pakistan. Handcrafted full-grain cowhide goods built for global wholesale procurement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full max-w-[400px] sm:max-w-none justify-center">
            <a href="/shop" className="bg-yellow-500 text-black font-bold px-8 py-3.5 rounded-full text-[15px] uppercase tracking-normal text-center">
              Explore Catalog
            </a>
            <a href="/b2b" className="bg-transparent text-white border border-white px-8 py-3.5 rounded-full text-[15px] uppercase tracking-normal text-center hover:bg-white hover:text-black transition-colors">
              Wholesale Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Colorful Leather Rolls / Hides Showcase Banner */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">Custom Hides Available</span>
            <h2 className="text-2xl sm:text-3xl font-serif tracking-wide uppercase">All Colors Full-Grain Leather Rolls</h2>
            <p className="text-xs text-zinc-400 uppercase leading-relaxed">
              Black, Brown, Red, Pink, Green, Blue, Yellow, White — custom-dyed cowhide rolls available for international wholesale and private label manufacturing in Sialkot.
            </p>
          </div>
          <div className="w-full md:w-[350px] h-48 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
            <img 
              src="/leather-rolls.jpg" 
              alt="Colorful Leather Rolls" 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop";
              }}
            />
          </div>
        </div>
      </section>

      {/* Professional Collections Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12 md:mb-16">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">Curated Lineup</span>
          <h2 className="text-[24px] sm:text-3xl font-serif tracking-[0.15em] sm:tracking-[0.2em] uppercase px-2">Professional Collections</h2>
          <p className="text-[11px] sm:text-xs text-zinc-400 tracking-widest uppercase px-4">Explore our flagship full-grain leather categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((item) => (
            <div key={item.id} className="bg-zinc-950 border border-zinc-800/80 rounded-lg overflow-hidden group">
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden bg-zinc-900">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-5 sm:p-6 space-y-3 sm:space-y-4 text-center">
                <span className="text-[10px] text-amber-400/90 tracking-widest uppercase font-mono block">{item.subtitle}</span>
                <h3 className="text-sm font-semibold tracking-widest uppercase text-white">{item.title}</h3>
                <div>
                  <Link 
                    href={item.link}
                    className="inline-block text-[11px] font-medium tracking-[0.15em] uppercase text-amber-400 hover:text-white transition-colors border-b border-amber-400/50 pb-1"
                  >
                    View Collection &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hides We Work With Section */}
      <HidesWeWorkWith />

      {/* Newsletter / B2B Trade List Section */}
      <Newsletter />
    </main>
  );
}