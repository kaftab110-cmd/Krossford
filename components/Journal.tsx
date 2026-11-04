import Link from "next/link";
import { journalSection } from "@/lib/data/homepage";
import SafeImage from "./SafeImage";

export default function Journal() {
  return (
    <section
      id="journal"
      aria-labelledby="journal-title"
      className="bg-black py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            {journalSection.label}
          </span>

          <h2
            id="journal-title"
            className="mt-4 text-4xl font-bold"
          >
            {journalSection.title}
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">
            {journalSection.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {journalSection.articles.map((item, index) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-yellow-500/20 bg-zinc-900"
            >
              <SafeImage
                src={`/images/journal-${index + 1}.jpg`}
                alt={item.imageAlt}
                width={800}
                height={450}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-64 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-yellow-500">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {item.excerpt}
                </p>

                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-1 font-medium text-yellow-500 transition hover:underline"
                >
                  Read More <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}