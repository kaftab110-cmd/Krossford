import Link from "next/link";
import { helpTopics } from "@/lib/data/helpCenter";

export default function HelpCenterPage() {
  return (
    <main className="bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-4xl font-bold text-yellow-500">Help Center</h1>
        <p className="mt-4 mb-10 max-w-2xl text-zinc-300">
          Find the right information quickly by exploring the help topics
          below, or contact our team if you need further assistance.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {helpTopics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="rounded-lg border border-yellow-500/20 bg-zinc-900 p-6 transition hover:border-yellow-500"
            >
              <h2 className="mb-2 text-xl font-semibold text-yellow-500">
                {topic.title}
              </h2>
              <p className="text-zinc-300">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}