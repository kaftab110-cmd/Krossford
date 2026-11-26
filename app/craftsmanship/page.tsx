"use client";
import Link from "next/link";

// CRAFTSMANSHIP - NEW PAGE - FINAL
// RULE: Sirf KROSSFORD hi hoga - Factory / Manufacturer / Partner / Origin - Kuch NAHI likha
// Handstitched - Sirf Customize / Demand par - Baaki jagah Handcrafted / Handmade
// No 【entity-DHL¦canonical_name=DHL】 - Sirf Fastest Delivery / Courier
// No Price - Is page me price NAHI hai - Price DEMO / Deal ke baad hi Shop me hoga

const STEPS = [
  {
    no: "01",
    title: "Leather Selection",
    desc: "Carefully selected vegetable-tanned full-grain leather. Cow / Buffalo / Sheep / Goat / Camel — as per Buyer & Customer requirement. Har piece check karke select hota hai — kata-phata / daag wala leather reject.",
  },
  {
    no: "02",
    title: "Cutting",
    desc: "Pattern ke hisaab se careful cutting. Har piece ka size, shape aur cutting — order ke hisaab se. Cutting ka step video banta hai — approval ke liye.",
  },
  {
    no: "03",
    title: "Making / Stitching",
    desc: "Handcrafted making — har stitch, har edge, har finish — dhyaan se. Customize / Demand par Handstitched finishing. Normal orders me Handcrafted finishing.",
  },
  {
    no: "04",
    title: "Quality Check",
    desc: "Stitching, zip, button, lining, edge — sab check hota hai. Koi defect ho to piece dobara banta hai — kharab piece dispatch NAHI hota.",
  },
  {
    no: "05",
    title: "Packing",
    desc: "Care Card har order me FREE. Bigger orders me soft cloth FREE. Packing ka step video banta hai — taake customer ko pata chale kya pack hua hai.",
  },
  {
    no: "06",
    title: "Approval Before Shipment",
    desc: "Shipment se pehle — step videos + photos — customer / buyer ko bheje jate hain. Approval ke baad hi dispatch hota hai. Bina approval — shipment NAHI hota.",
  },
];

export default function CraftsmanshipPage() {
  return (
    <main className="bg-black text-white min-h-screen pb-16 w-full min-w-0 overflow-x-hidden">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-8 sm:mt-10 text-center w-full min-w-0">
        <p className="text-[#D4AF37] text-xs tracking-[0.35em] uppercase">Krossford</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide break-words leading-snug mt-3" style={{ fontFamily: "var(--font-brand)" }}>
          CRAFTSMANSHIP
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm mt-3 tracking-wider break-words">
          HANDCRAFTED • CUSTOM MADE ON DEMAND — MADE AS PER BUYER &amp; CUSTOMER REQUIREMENT
        </p>
        <p className="text-zinc-500 text-xs leading-relaxed max-w-2xl mx-auto mt-3 normal-case tracking-normal">
          Handcrafted from full-grain leather — vegetable-tanned, carefully cut and hand-finished by KROSSFORD.
          Har piece — order par banta hai — ready stock NAHI — isliye har piece alag hota hai, personal hota hai.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-5">
          <Link href="/shop" className="bg-[#E8C15A] text-black text-xs font-bold tracking-widest px-6 py-3 rounded hover:bg-[#D4AF37] text-center border-2 border-[#E8C15A]">SHOP RETAIL - 1 PIECE →</Link>
          <Link href="/b2b" className="border-2 border-zinc-400 text-white text-xs font-bold tracking-widest px-6 py-3 rounded hover:border-[#D4AF37] text-center">B2B WHOLESALE - 50+ →</Link>
        </div>
      </div>

      {/* MATERIALS */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-10 w-full min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 text-center">
            <p className="text-[#D4AF37] font-bold text-sm">Full-Grain Leather</p>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">100% Full-Grain Leather Guarantee. Vegetable-tanned — time ke saath rich patina aata hai — har piece uniquely personal ban jata hai.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 text-center">
            <p className="text-[#D4AF37] font-bold text-sm">Sample Before Bulk</p>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">Pehle paid sample dekho, phir bulk ka faisla karo. Sample approve hoga — tabhi bulk production shuru hogi.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950 text-center">
            <p className="text-[#D4AF37] font-bold text-sm">Fastest Delivery</p>
            <p className="text-zinc-400 text-xs mt-2 leading-relaxed">Ships Worldwide • Full Tracking Provided • Estimated Total: 12-17 Working Days • Ships via Fastest Delivery / Courier.</p>
          </div>
        </div>
      </div>

      {/* STEPS */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-10 w-full min-w-0">
        <h2 className="text-center text-xl sm:text-2xl font-bold tracking-widest">HOW YOUR PIECE IS MADE — 6 STEPS</h2>
        <p className="text-center text-xs text-zinc-400 mt-2 tracking-wider">Har step ka video banta hai — Cutting / Making / Packing / Shipment — sab proof ke saath.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {STEPS.map((s) => (
            <div key={s.no} className="bg-white text-black rounded-lg overflow-hidden shadow-xl">
              <div className="bg-zinc-950 text-white p-4 sm:p-5 min-w-0">
                <p className="text-[#D4AF37] text-xs tracking-widest">{s.no}</p>
                <h3 className="font-bold tracking-wide mt-1 break-words leading-snug">{s.title}</h3>
                <p className="text-zinc-400 text-sm mt-2 break-words leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOMIZE */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-10 w-full min-w-0">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-5 text-center">
          <h2 className="text-sm font-bold tracking-widest text-[#D4AF37]">CUSTOMIZE / DEMAND PAR — HANDSTITCHED</h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed max-w-2xl mx-auto">
            Agar tumhe Customize chahiye — Logo / Name / Colour / Size / Design — to bata do.
            Customize / Demand par Handstitched finishing hoti hai. Baaki sab orders me Handcrafted finishing hoti hai.
            Custom / Engraved orders — damage ke ilawa — Replace / Exchange / Adjust hi hoga — design change NAHI hoga.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Link href="/shop" className="bg-[#E8C15A] text-black text-xs font-bold tracking-widest px-6 py-3 rounded hover:bg-[#D4AF37] text-center border-2 border-[#E8C15A]">CUSTOMIZE — SHOP →</Link>
            <Link href="/b2b" className="border-2 border-zinc-400 text-white text-xs font-bold tracking-widest px-6 py-3 rounded hover:border-[#D4AF37] text-center">CUSTOMIZE — B2B →</Link>
          </div>
        </div>
      </div>

      {/* CARE */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 mt-6 text-center">
        <p className="text-xs text-zinc-500 leading-relaxed">
          Handcrafted leather bags • Handcrafted leather wallets • Vegetable-tanned belts • Custom leather design • Sample before bulk • Leather care — clean / condition / store dry • Care Card har order me FREE
        </p>
      </div>
    </main>
  );
}