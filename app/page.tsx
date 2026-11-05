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
    <main className="bg-black text-white min-h-screen overflow-x-hidden pb-[100px]">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] md:h-[85vh] flex items-center justify-center text-center px-4 sm:px-6 py-12 md:py-20 bg-gradient-to-b from-zinc-950 to-black">
        <div className="max-w-4xl mx-auto space-y-6 w-full">
          <span className="inline-block text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] uppercase text-amber-400 border border-amber-400/30 px-3 sm:px-4 py-1.5 rounded max-w-full">
            Krossford Enterprises B2B Export
          </span>
          
          <h1 className="text-[30px] leading-[1.1] sm:text-[42px] md:text-[60px] font-serif tracking-[0.1em] sm:tracking-[0.15em] uppercase text-white font-light px-2 break-words">
            Uncompromising Leather Architecture
          </h1>
          
          <p className="text-[13px] sm:text-xs md:text-sm text-zinc-400 tracking-wider sm:tracking-widest uppercase font-light max-w-xl mx-auto px-4 leading-relaxed">
            Sourced and fabricated in Sialkot, Pakistan. Handcrafted full-grain cowhide goods built for global wholesale procurement.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 px-4 w-full max-w-md mx-auto">
            <Link 
              href="/shop"
              className="w-full sm:w-auto font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] text-black transition-all hover:bg-amber-500 text-center"
              style={{ backgroundColor: "#C9A227" }}
            >
              Explore Catalog
            </Link>
            <Link 
              href="/b2b"
              className="w-full sm:w-auto font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] border border-white hover:bg-white hover:text-black transition-colors text-center"
            >
              Wholesale Enquiry
            </Link>
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