import SafeImage from "./SafeImage";
import { findProductBySlug } from "@/lib/data/shop";

// SYNC FIX: Testimonial ki photo ab hardcode nahi hai - sirf product slug likha hai, photo lib/data/shop.ts se aayegi.
// Is se shop.ts me photo badli to Testimonial ki photo khud hi same ho jayegi, dobara repeat nahi karna parega.
// Fallback sirf tab jab shop.ts me product na mile - warna shop.ts hi truth hai.
const testimonials = [
  {
    name: "Ahmed Raza",
    role: "Verified Customer - Lahore",
    text: "Quality is unreal for this price. Leather feels premium and stitching is perfect. My backpack gets compliments every day.",
    productSlug: "leather-messenger-bag",
    fallbackImage: "/images/messenger-bag.jpg",
    rating: 5,
  },
  {
    name: "Sarah Khan",
    role: "Verified Customer - Karachi",
    text: "Ordered the duffle bag for my husband. Packaging, finishing, everything feels like a luxury brand. Highly recommended.",
    productSlug: "travel-duffle-bag",
    fallbackImage: "/images/leather-duffle-bag.jpg",
    rating: 5,
  },
  {
    name: "Bilal Ahmed",
    role: "Verified Customer - Islamabad",
    text: "I was worried about online leather shopping, but Krossford delivered more than expected. Will definitely order again.",
    productSlug: "crossbody-messenger-bag",
    fallbackImage: "/images/crossbody-messenger-bag2.jpg",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-zinc-950 py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs tracking-widest text-amber-400">TESTIMONIALS</p>
        <h2 className="mt-2 text-center text-3xl font-bold uppercase">What Our Customers Say</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => {
            const productImage = findProductBySlug(t.productSlug)?.image || t.fallbackImage;
            return (
            <div key={t.name} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-amber-400">{"★".repeat(t.rating)}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">&quot;{t.text}&quot;</p>
              <div className="mt-5 flex items-center gap-3">
                <SafeImage src={productImage} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
