import { storePolicyContent } from "@/lib/data/storePolicy";

export default function StorePolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden pb-[100px]">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-20">
        <h1 className="text-[28px] sm:text-3xl md:text-4xl font-bold text-yellow-500 uppercase tracking-tight break-words px-2 text-center md:text-left">
          {storePolicyContent.title}
        </h1>
        <p className="mt-2 mb-10 text-[12px] sm:text-sm text-zinc-500 px-2 text-center md:text-left font-mono">
          Last updated: {storePolicyContent.lastUpdated}
        </p>

        <div className="space-y-10 px-2 sm:px-0">
          {storePolicyContent.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-[20px] sm:text-[22px] md:text-2xl font-semibold text-yellow-500 break-words">
                {section.heading}
              </h2>
              <div className="space-y-4 leading-[1.7] text-[14px] sm:text-[15px] text-zinc-300">
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx} className="break-words">{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}