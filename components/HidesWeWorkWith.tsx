"use client";

export default function HidesWeWorkWith() {
  const hides = [
    {
      no: "1.",
      title: "COWHIDE",
      bestFor: "Jackets, Bags & Belts",
      feel: "Strong & Classic Look",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
    },
    {
      no: "2.",
      title: "BUFFALO LEATHER",
      bestFor: "Duffles, Wallets & Heavy Duty Products",
      feel: "Tough & Rugged",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    },
    {
      no: "3.",
      title: "GOATSKIN",
      bestFor: "Gloves, Jackets & Soft Goods",
      feel: "Soft & Lightweight",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
    },
    {
      no: "4.",
      title: "ALL COLORS FULL-GRAIN LEATHER ROLLS",
      bestFor: "International Wholesale & Private Label Manufacturing",
      feel: "Custom-Dyed - Black, Brown, Red, Pink, Green, Blue, Yellow, White",
      image: "/leather-rolls.jpg",
      isRolls: true,
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
            {hide.isRolls ? (
              <>
                <div className="text-center space-y-3">
                  <span className="text-[11px] font-mono tracking-[0.2em] text-amber-400 uppercase block">Custom Hides Available</span>
                  <h3 className="text-[28px] sm:text-3xl font-serif tracking-wide uppercase leading-tight">All Colors Full-<br/>Grain Leather<br/>Rolls</h3>
                  <p className="text-[12px] text-zinc-400 uppercase leading-relaxed max-w-xl mx-auto">
                    Black, Brown, Red, Pink, Green, Blue, Yellow, White — Custom-Dyed Leather Rolls Available For International Wholesale And Private Label Manufacturing.
                  </p>
                </div>
                <div className="w-full h-56 sm:h-64 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 mt-6">
                  <img
                    src="/leather-rolls.jpg"
                    alt="Colorful Leather Rolls"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1473188588951-666fce8e7c68?q=80&w=1000&auto=format&fit=crop";
                    }}
                  />
                </div>
                <p className="text-center text-[11px] text-zinc-500 tracking-widest uppercase mt-4">Thickness & Finish As Per Customer Requirement</p>
              </>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-serif tracking-widest text-amber-400 uppercase">{hide.no} {hide.title}</h3>
                <p className="text-[14px] sm:text-base text-zinc-300"><span className="text-zinc-500 uppercase tracking-wider text-[13px]">Best For:</span> {hide.bestFor}</p>
                <p className="text-[14px] sm:text-base text-zinc-300"><span className="text-zinc-500 uppercase tracking-wider text-[13px]">Feel / Look:</span> {hide.feel}</p>
                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-center text-[11px] text-zinc-500 tracking-widest uppercase">Thickness & Finish As Per Customer Requirement</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}