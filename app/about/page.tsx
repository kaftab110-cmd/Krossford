import { aboutContent } from "@/lib/data/about";

export default function AboutUsPage() {
  return (
    <main className="bg-black text-white min-h-screen w-full min-w-0 overflow-x-hidden">
      <section className="mx-auto max-w-4xl px-3 min-[400px]:px-4 sm:px-6 pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 w-full min-w-0">
        <h1 className="mb-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#D4AF37] break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>
          {aboutContent.title}
        </h1>
        <p className="mb-6 leading-relaxed text-zinc-300 break-words">{aboutContent.intro}</p>
        <p className="mb-10 sm:mb-16 text-xs sm:text-sm text-[#D4AF37] tracking-widest uppercase break-words">Handstitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>

        {[aboutContent.craft, aboutContent.story].map((section) => (
          <section key={section.title} className="mb-10 sm:mb-14 min-w-0">
            <h2 className="mb-5 text-xl sm:text-2xl font-semibold text-[#D4AF37] break-words leading-snug" style={{ fontFamily: "var(--font-brand)" }}>
              {section.title}
            </h2>
            <div className="space-y-4 text-zinc-300 min-w-0">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="break-words leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-4 w-full min-w-0">
          <div className="border border-zinc-800 rounded-lg p-4 sm:p-5 bg-zinc-950 min-w-0">
            <p className="text-[#D4AF37] font-bold text-sm break-words">Real Leather</p>
            <p className="text-zinc-400 text-xs mt-2 break-words leading-relaxed">100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel). Handstitched • Customized / On Demand.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-4 sm:p-5 bg-zinc-950 min-w-0">
            <p className="text-[#D4AF37] font-bold text-sm break-words">Sample Before Bulk</p>
            <p className="text-zinc-400 text-xs mt-2 break-words leading-relaxed">Review a sample before deciding on a bulk order.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-4 sm:p-5 bg-zinc-950 min-w-0">
            <p className="text-[#D4AF37] font-bold text-sm break-words">Fastest Delivery</p>
            <p className="text-zinc-400 text-xs mt-2 break-words leading-relaxed">Ships Worldwide • Tracking Provided • Total: 12-17 Working Days</p>
          </div>
        </div>
      </section>
    </main>
  );
}
