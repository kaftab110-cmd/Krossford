import Link from "next/link";
import SafeImage from "./SafeImage";

const posts = [
  {
    slug: "full-grain-leather-guide",
    title: "What Is Full-Grain Leather? A Complete Guide",
    excerpt: "Why full-grain is the highest quality leather and how to spot real vs fake.",
    image: "/images/leather-journal.jpg",
    date: "Nov 2026",
    category: "Leather Guide",
  },
  {
    slug: "leather-care-guide",
    title: "How To Care For Your Leather Bag For 20 Years",
    excerpt: "Simple cleaning, conditioning and storage tips to keep your bag like new.",
    image: "/images/messenger-bag.jpg",
    date: "Nov 2026",
    category: "Care Guide",
  },
  {
    slug: "hand-stitched-vs-machine",
    title: "Hand-Stitched vs Machine-Stitched Leather",
    excerpt: "Why hand-stitching lasts longer and why we still do it at Krossford.",
    image: "/images/leather-duffle-bag.jpg",
    date: "Nov 2026",
    category: "Craftsmanship",
  },
];

export default function Journal() {
  return (
    <section className="bg-zinc-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs tracking-widest text-amber-400">THE JOURNAL</p>
        <h2 className="mt-2 text-3xl font-bold uppercase">Craft, Culture & Leather Stories</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Behind the scenes from our workshop - how full-grain leather is cut, stitched and finished by hand.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 hover:border-amber-400">
              <SafeImage src={post.image} alt={post.title} className="h-48 w-full object-cover" />
              <div className="p-5">
                <p className="text-[11px] tracking-widest text-amber-400">{post.category} • {post.date}</p>
                <h3 className="mt-2 font-bold">{post.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{post.excerpt}</p>
                <p className="mt-3 text-sm font-bold text-amber-400">Read Story →</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/journal" className="inline-block rounded bg-amber-400 px-6 py-3 text-sm font-bold uppercase text-black hover:bg-amber-300">
            Read All Stories
          </Link>
        </div>
      </div>
    </section>
  );
}