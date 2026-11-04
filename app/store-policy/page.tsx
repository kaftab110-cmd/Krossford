import { storePolicyContent } from "@/lib/data/storePolicy";

export default function StorePolicyPage() {
  return (
    <main className="bg-black text-white">
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-4xl font-bold text-yellow-500">
          {storePolicyContent.title}
        </h1>
        <p className="mt-2 mb-10 text-sm text-zinc-500">
          Last updated: {storePolicyContent.lastUpdated}
        </p>

        <div className="space-y-10">
          {storePolicyContent.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="mb-3 text-2xl font-semibold text-yellow-500">
                {section.heading}
              </h2>
              <div className="space-y-4 leading-7 text-zinc-300">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}