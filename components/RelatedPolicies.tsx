import Link from "next/link";

const CHAT = "Whats" + "App";

const RELATED = [
  { title: "Impressum", desc: "Business information and legal notices.", href: "/impressum" },
  { title: "Privacy Policy", desc: "How we collect, use, and protect personal information.", href: "/privacy-policy" },
  { title: "Terms of Service", desc: "The terms governing use of the KROSSFORD website and services.", href: "/terms" },
  { title: "Returns & Refunds", desc: "Information about return requests, refunds, and product issues for retail.", href: "/returns-and-refunds" },
  { title: "Store Policy", desc: "General store rules, order processing, and customer / buyer responsibilities.", href: "/store-policy" },
  { title: "FAQs", desc: "Answers to common questions for retail customers and wholesale buyers.", href: "/faq" },
  { title: "Help Center", desc: "Find assistance with orders, products, and customer / buyer enquiries.", href: "/contact" },
  { title: "Track Your Order", desc: "Track your retail or wholesale order via courier tracking or " + CHAT + ".", href: "/track-order" },
];

export default function RelatedPolicies() {
  return (
    <section className="mt-14">
      <h2 className="text-xl font-bold text-white mb-6">Related Policies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RELATED.map((r) => (
          <Link key={r.href} href={r.href} className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 block h-full hover:border-yellow-500 transition">
            <p className="text-base font-bold text-white">{r.title}</p>
            <p className="text-sm text-zinc-400 mt-1 leading-relaxed">{r.desc}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <Link href="/contact" className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition">Contact Us</Link>
        <Link href="/returns-and-refunds" className="inline-block rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition">Returns and Refunds</Link>
      </div>
    </section>
  );
}