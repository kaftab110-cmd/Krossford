import Link from "next/link";
import { helpTopics } from "@/lib/data/helpCenter";

export default function HelpCenterPage() {
  return (
    <main className="bg-black text-white min-h-screen w-full min-w-0 overflow-x-hidden">
      <section className="mx-auto max-w-6xl px-3 min-[400px]:px-4 sm:px-6 pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 w-full min-w-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 break-words leading-snug">Help Center</h1>
        <p className="mt-4 mb-4 max-w-2xl text-zinc-300 break-words leading-relaxed">
          Find the right information quickly by exploring the help topics
          below, or contact our team if you need further assistance.
        </p>
        <p className="mb-8 sm:mb-10 text-xs sm:text-sm text-[#D4AF37] tracking-widest uppercase break-words">Handstitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 w-full min-w-0">
          {helpTopics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="rounded-lg border border-yellow-500/20 bg-zinc-900 p-4 sm:p-6 transition hover:border-yellow-500 w-full min-w-0 block"
            >
              <h2 className="mb-2 text-lg sm:text-xl font-semibold text-yellow-500 break-words leading-snug">
                {topic.title}
              </h2>
              <p className="text-zinc-300 break-words leading-relaxed text-sm sm:text-base">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
