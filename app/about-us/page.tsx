import { aboutContent } from "@/lib/data/about";

export default function AboutUsPage() {
  return (
    <main className="bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-yellow-500">
          {aboutContent.title}
        </h1>
        <p className="mb-16 leading-8 text-zinc-300">{aboutContent.intro}</p>

        {[aboutContent.craft, aboutContent.story].map((section) => (
          <section key={section.title} className="mb-14">
            <h2 className="mb-5 text-2xl font-semibold text-yellow-500">
              {section.title}
            </h2>
            <div className="space-y-4 text-zinc-300">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}