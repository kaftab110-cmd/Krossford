import { craftsmanshipSection } from "@/lib/data/homepage";
import SafeImage from "./SafeImage";
export default function Craftsmanship() {
  return (
    <section id="craftsmanship" aria-labelledby="craftsmanship-title" className="bg-black py-14 sm:py-20 text-white overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-10 sm:mb-14 max-w-3xl text-center px-2">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">{craftsmanshipSection.subtitle}</span>
          <h2 id="craftsmanship-title" className="mt-4 text-3xl sm:text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-brand)" }}>{craftsmanshipSection.title}</h2>
          <p className="mt-4 text-sm sm:text-base leading-7 text-zinc-300">{craftsmanshipSection.description}</p>
        </div>
        <div className="grid gap-5 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {craftsmanshipSection.items.map((item, index) => (
            <article key={item.id} className="overflow-hidden rounded-xl border border-amber-400/20 bg-zinc-900 flex flex-col">
              <div className="relative w-full aspect-[7/5] overflow-hidden bg-zinc-800">
                <SafeImage src={(item as { image?: string }).image || `/images/craft-${index + 1}.jpg`} alt={item.title} width={700} height={500} className="absolute inset-0 h-full w-full object-cover object-center" />
              </div>
              <div className="p-5 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-400 leading-snug" style={{ fontFamily: "var(--font-brand)" }}>{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
