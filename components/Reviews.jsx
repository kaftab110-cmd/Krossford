export default function Reviews() {
  const reviews = [
    {
      name: "Ayesha K.",
      city: "Lahore, Pakistan",
      product: "Classic Tote Bag",
      text: "Quality dekh ke hairan reh gayi. Leather itna soft aur stitching itni saaf hai. 2 mahine se daily use kar rahi hoon, abhi tak bilkul new jaisa hai.",
      stars: 5,
      initial: "A",
      color: "bg-amber-500",
    },
    {
      name: "Muhammad U.",
      city: "Dubai, UAE",
      product: "Leather Wallet - Custom Name",
      text: "I ordered a sample first with my name engraved. The finishing was clean and the leather felt real. Delivery took a bit longer than expected, but the quality made up for it.",
      stars: 4,
      initial: "M",
      color: "bg-zinc-700",
    },
    {
      name: "Sarah M.",
      city: "London, UK",
      product: "Crossbody Bag",
      text: "Really impressed with the packaging and the leather itself. It feels premium for the price. I would love to see more colours in the next collection.",
      stars: 5,
      initial: "S",
      color: "bg-amber-700",
    },
  ];

  return (
    <section className="bg-[#0a0a0a] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <p className="text-[11px] tracking-[0.35em] text-amber-400 uppercase text-center">
          From Our First Customers
        </p>
        <h2 className="text-2xl md:text-4xl font-bold uppercase text-center mt-3 tracking-wide">
          What Our Early Buyers Say
        </h2>
        <p className="text-sm text-zinc-400 text-center mt-3">
          Real feedback from sample orders & first buyers
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition"
            >
              <p className="text-amber-400 text-base tracking-widest">
                {"★".repeat(r.stars)}
                {"☆".repeat(5 - r.stars)}
                <span className="text-zinc-500 text-xs ml-2">
                  {r.stars}.0 / 5
                </span>
              </p>
              <p className="text-[14px] leading-relaxed text-zinc-300 mt-4">
                "{r.text}"
              </p>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-zinc-800">
                <div
                  className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center font-bold text-white`}
                >
                  {r.initial}
                </div>
                <div>
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className="text-[11px] text-zinc-500">
                    {r.city} • Sample / First Order
                  </p>
                  <p className="text-[11px] text-amber-400/90 mt-0.5">
                    Bought: {r.product}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note - Honest */}
        <div className="text-center mt-10">
          <p className="text-xs text-zinc-500 mb-4">
            We are a new brand (Since 2025). Every review here is from a real early order.
          </p>
          <a
            href="/shop"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold px-7 py-3 rounded-full transition"
          >
            Shop Best Sellers →
          </a>
        </div>
      </div>
    </section>
  );
}