import Link from "next/link";

export default function OurStoryPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-yellow-500 font-semibold mb-3">
          Heritage & Craftsmanship
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-6">
          The Art of Leather Engineering
        </h1>
        <p className="text-sm sm:text-base leading-relaxed text-zinc-300 max-w-2xl mx-auto">
          At Krossford, we bridge traditional Pakistani leather artistry with contemporary minimalist architecture. Every piece is precision-crafted from premium full-grain leather to deliver timeless durability and unmatched luxury.
        </p>
      </section>

      {/* Philosophy Grid */}
      <section className="mx-auto max-w-6xl px-6 sm:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-lg border border-yellow-500/20 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-yellow-500 mb-2">Uncompromising Quality</h2>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
              We source only top-tier full-grain hides, ensuring each item develops a rich patina over time rather than wearing out.
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/20 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-yellow-500 mb-2">Bespoke Precision</h2>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
              From hand-stitched minimal cardholders to bespoke corporate orders, accuracy and structural integrity define our work.
            </p>
          </div>

          <div className="rounded-lg border border-yellow-500/20 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-yellow-500 mb-2">Global Export Reach</h2>
            <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
              Engineered to meet international luxury standards, serving retail clients and global B2B wholesale partners alike.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Link
            href="/collections"
            className="inline-block rounded-md bg-yellow-500 px-8 py-3 text-sm font-medium text-black transition hover:bg-yellow-400"
          >
            Explore Our Craft
          </Link>
        </div>
      </section>
    </main>
  );
}