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
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-4xl space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded">
            Krossford Enterprises B2B Export
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif tracking-[0.15em] uppercase text-white font-light">
            Uncompromising Leather Architecture
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 tracking-widest uppercase font-light max-w-xl mx-auto">
            Sourced and fabricated in Sialkot, Pakistan. Handcrafted full-grain cowhide goods built for global wholesale procurement.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link 
              href="/shop"
              className="font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] text-black transition-all hover:bg-amber-500"
              style={{ backgroundColor: "#C9A227" }}
            >
              Explore Catalog
            </Link>
            <Link 
              href="/b2b"
              className="font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] border border-white hover:bg-white hover:text-black transition-colors"
            >
              Wholesale Enquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Collections Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">Curated Lineup</span>
          <h2 className="text-3xl font-serif tracking-[0.2em] uppercase">Professional Collections</h2>
          <p className="text-xs text-zinc-400 tracking-widest uppercase">Explore our flagship full-grain leather categories</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((item) => (
            <div key={item.id} className="bg-zinc-950 border border-zinc-800/80 rounded-lg overflow-hidden group">
              <div className="relative h-80 overflow-hidden bg-zinc-900">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 space-y-4 text-center">
                <span className="text-[10px] text-amber-400/90 tracking-widest uppercase font-mono">{item.subtitle}</span>
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