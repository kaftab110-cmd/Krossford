"use client";

import Link from "next/link";

export default function HidesWeWorkWith() {
  const hides = [
    {
      title: "1. COWHIDE",
      bestFor: "Jackets, Bags & Belts",
      feel: "Strong & Classic Look",
    },
    {
      title: "2. BUFFALO LEATHER",
      bestFor: "Duffles, Wallets & Heavy Duty Products",
      feel: "Tough & Rugged",
    },
    {
      title: "3. GOATSKIN",
      bestFor: "Soft Jackets & Gloves",
      feel: "Light & Soft Feel",
    },
    {
      title: "4. SHEEPSKIN",
      bestFor: "Lining, Light Jackets & Accessories",
      feel: "Premium Soft",
    },
    {
      title: "5. CAMEL LEATHER",
      bestFor: "Belts & Special Products",
      feel: "Unique Texture, Firm",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-6 max-w-7xl mx-auto border-t border-zinc-900">
      <div className="text-center space-y-3 mb-16">
        <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">Material Specifications</span>
        <h2 className="text-3xl font-serif tracking-[0.2em] uppercase">HIDES WE WORK WITH</h2>
        <p className="text-xs text-zinc-400 tracking-widest uppercase">Industrial grade full-grain material options for B2B manufacturing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {hides.map((hide, index) => (
          <div key={index} className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-serif tracking-widest uppercase text-amber-400 font-bold">{hide.title}</h3>
              <p className="text-xs text-zinc-300 font-mono"><span className="text-zinc-500 uppercase">Best For:</span> {hide.bestFor}</p>
              <p className="text-xs text-zinc-300 font-mono"><span className="text-zinc-500 uppercase">Feel / Look:</span> {hide.feel}</p>
            </div>
            <div className="pt-4 border-t border-zinc-900 text-center">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">Thickness & Finish As Per Customer Requirement</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link 
          href="/b2b" 
          className="inline-block font-bold text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-[4px] text-black transition-all hover:bg-amber-500 cursor-pointer"
          style={{ backgroundColor: "#C9A227" }}
        >
          REQUEST QUOTE FOR YOUR HIDE
        </Link>
      </div>
    </section>
  );
}