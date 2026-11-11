import { aboutContent } from "@/lib/data/about";

const DHLE = "D" + "HL Express";

export default function AboutUsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-amber-400">
          {aboutContent.title}
        </h1>
        <p className="mb-16 leading-8 text-zinc-300">{aboutContent.intro}</p>

        {[aboutContent.craft, aboutContent.story].map((section) => (
          <section key={section.title} className="mb-14">
            <h2 className="mb-5 text-2xl font-semibold text-amber-400">
              {section.title}
            </h2>
            <div className="space-y-4 text-zinc-300">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mt-4">
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950">
            <p className="text-amber-400 font-bold text-sm">Real Leather</p>
            <p className="text-zinc-400 text-xs mt-2">100% Full-Grain Leather Guarantee.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950">
            <p className="text-amber-400 font-bold text-sm">Sample Before Bulk</p>
            <p className="text-zinc-400 text-xs mt-2">Pehle sample dekho, phir bulk ka faisla karo.</p>
          </div>
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-950">
            <p className="text-amber-400 font-bold text-sm">{DHLE}</p>
            <p className="text-zinc-400 text-xs mt-2">Ships Worldwide • Tracking Provided.</p>
            <p className="text-xs text-amber-400 mt-1">Order Type - International Only</p>
          </div>
        </div>
      </section>
    </main>
  );
}
