import { faqs } from "@/lib/data/faqs";

export default function FAQsPage() {
  return (
    <main className="bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="mb-10 text-4xl font-bold text-yellow-500">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-yellow-500/20 bg-zinc-900 p-5 open:border-yellow-500"
            >
              <summary className="cursor-pointer font-semibold text-yellow-500">
                {faq.question}
              </summary>
              <p className="mt-4 text-zinc-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}