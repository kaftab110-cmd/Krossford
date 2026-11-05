import { craftsmanshipSection } from "@/lib/data/homepage";
import SafeImage from "./SafeImage";

export default function Craftsmanship() {
  return (
    <section
      id="craftsmanship"
      aria-labelledby="craftsmanship-title"
      className="bg-black py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            {craftsmanshipSection.subtitle}
          </span>

          <h2
            id="craftsmanship-title"
            className="mt-4 text-4xl font-bold"
          >
            {craftsmanshipSection.title}
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">
            {craftsmanshipSection.description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {craftsmanshipSection.items.map((item, index) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-yellow-500/20 bg-zinc-900"
            >
              <SafeImage
                src={`/images/craft-${index + 1}.jpg`}
                alt={item.title}
                width={700}
                height={500}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-yellow-500">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}