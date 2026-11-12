"use client";

export default function HidesWeWorkWith() {
  const hides = [
    {
      no: "1.",
      title: "COWHIDE",
      bestFor: "Jackets, Bags & Belts",
      feel: "Strong & Classic Look",
    },
    {
      no: "2.",
      title: "BUFFALO LEATHER",
      bestFor: "Duffles, Wallets & Heavy Duty Products",
      feel: "Tough & Rugged",
    },
    {
      no: "3.",
      title: "GOATSKIN",
      bestFor: "Gloves, Jackets & Soft Goods",
      feel: "Soft & Lightweight",
    },
    {
      no: "4.",
      title: "SHEEPSKIN",
      bestFor: "Jackets, Gloves & Luxury Soft Goods",
      feel: "Super Soft & Smooth",
    },
    {
      no: "5.",
      title: "LAMBSKIN",
      bestFor: "Premium Jackets & Fashion Goods",
      feel: "Ultra Soft & Lightweight",
    },
    {
      no: "6.",
      title: "ALL COLORS FULL-GRAIN LEATHER ROLLS",
      bestFor: "International Wholesale & Private Label Manufacturing",
      feel: "Black, Brown, Red, Pink, Green, Blue, Yellow, White - Custom-Dyed",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center space-y-3 mb-12">
        <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">Custom Hides Available</span>
        <h2 className="text-[24px] sm:text-3xl font-serif tracking-[0.15em] uppercase">Hides We Work With</h2>
        <p className="text-[11px] sm:text-xs text-zinc-400 tracking-widest uppercase">Choose Your Leather - Crafted As Per Your Requirement</p>
      </div>

      <div className="space-y-6">
        {hides.map((hide) => (
          <div key={hide.title} className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-6 sm:p-8 overflow-hidden">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-serif tracking-widest text-amber-400 uppercase">{hide.no} {hide.title}</h3>
              <p className="text-[14px] sm:text-base text-zinc-300"><span className="text-zinc-500 uppercase tracking-wider text-[13px]">Best For:</span> {hide.bestFor}</p>
              <p className="text-[14px] sm:text-base text-zinc-300"><span className="text-zinc-500 uppercase tracking-wider text-[13px]">Feel / Look:</span> {hide.feel}</p>
              <div className="border-t border-zinc-800 pt-4">
                <p className="text-center text-[11px] text-zinc-500 tracking-widest uppercase">Thickness & Finish As Per Customer Requirement</p>
              </div>
            </div>
          </div>
        ))}

        {/* Sourcing Note */}
        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-6 sm:p-8 text-center space-y-3">
          <h3 className="text-lg sm:text-xl font-serif tracking-widest text-amber-400 uppercase">Need Any Other Hide?</h3>
          <p className="text-[13px] sm:text-sm text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            We can source any type of hide available in Pakistan to meet your requirements. Tell us what you need, and we will arrange the best quality hide for you.
          </p>
          <p className="text-[11px] text-zinc-500 tracking-widest uppercase">Custom Sourcing Available On Demand</p>
        </div>
      </div>
    </section>
  );
}