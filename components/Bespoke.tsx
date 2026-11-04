import Link from "next/link";
import SafeImage from "./SafeImage";

const features = [
  "Private Design Consultation",
  "Premium Full-Grain Leather",
  "Handcrafted by Master Artisans",
  "Lifetime Craftsmanship Promise",
];

const images = [
  {
    src: "/images/bespoke-1.jpg",
    alt: "Krossford Bespoke Leather Consultation",
  },
  {
    src: "/images/bespoke-2.jpg",
    alt: "Pakistani Leather Artisan",
  },
  {
    src: "/images/bespoke-3.jpg",
    alt: "Luxury Leather Workshop",
  },
  {
    src: "/images/bespoke-4.jpg",
    alt: "Master Leather Craftsman",
  },
];

export default function Bespoke() {
  return (
    <section
      id="bespoke"
      aria-labelledby="bespoke-title"
      className="bg-zinc-950 py-24 text-white"
    >
      <div className="mx-auto grid max-w-7xl items-center justify-center gap-16 px-6 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-500">
            Bespoke Luxury
          </span>

          <h2
            id="bespoke-title"
            className="mt-5 text-4xl font-bold leading-tight lg:text-5xl"
          >
            Crafted Exclusively For You
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            Every bespoke Krossford creation begins with a private consultation.
            Select your preferred leather, colour, stitching, hardware,
            dimensions and personal monogram to create a piece made exclusively
            for you.
          </p>

          <ul className="mt-10 space-y-4">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center justify-center gap-3 text-zinc-200"
              >
                <span className="text-xl text-yellow-500">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/bespoke"
            className="mt-10 inline-flex rounded-lg bg-yellow-500 px-7 py-4 font-semibold text-black transition duration-300 hover:bg-yellow-400"
          >
            Book Private Consultation
          </Link>
        </div>

        {/* Right Images */}
        <div className="mx-auto grid w-full max-w-[480px] grid-cols-2 gap-5">
          {images.map((image) => (
            <div
              key={image.src}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-yellow-500/20"
            >
              <SafeImage
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 240px"
                className="object-cover transition duration-700 group-hover:scale-105"
                fallbackClassName="flex h-full w-full items-center justify-center bg-zinc-800 text-sm text-zinc-400"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}