import { testimonialsSection } from "@/lib/data/homepage";
import SafeImage from "./SafeImage";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="bg-black py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            {testimonialsSection.label}
          </span>

          <h2
            id="testimonials-title"
            className="mt-4 text-4xl font-bold"
          >
            {testimonialsSection.title}
          </h2>

          <p className="mt-4 leading-7 text-zinc-300">
            {testimonialsSection.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonialsSection.items.map((item, index) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-yellow-500/20 bg-zinc-900"
            >
              <SafeImage
                src={`/images/testimonial-${index + 1}.jpg`}
                alt={item.avatarAlt}
                width={700}
                height={450}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <p className="italic leading-7 text-zinc-300">
                  &quot;{item.review}&quot;
                </p>

                <div className="mt-6">
                  <p className="font-semibold text-white">
                    {item.customerName}
                  </p>

                  <p className="text-sm text-yellow-500">
                    {item.customerRole}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}