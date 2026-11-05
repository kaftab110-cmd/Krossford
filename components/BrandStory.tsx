import { brandStorySection } from "@/lib/data/homepage";
import SafeImage from "./SafeImage";

export default function BrandStory() {
  return (
    <section
      id="brand-story"
      aria-labelledby="brand-story-title"
      className="bg-black py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl items-center justify-center gap-12 px-6 lg:grid-cols-2">
        <div className="flex flex-col items-center text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-500">
            {brandStorySection.subtitle}
          </span>

          <h2
            id="brand-story-title"
            className="mt-4 text-4xl font-bold"
          >
            {brandStorySection.title}
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-zinc-300">
            {brandStorySection.description}
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {brandStorySection.stories.map((story) => (
              <div key={story.id}>
                <h3 className="text-lg font-semibold text-yellow-500">
                  {story.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-zinc-300">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-xl border border-yellow-500/20">
          <SafeImage
            src="/images/brand-story.jpg"
            alt="Krossford Brand Story"
            width={700}
            height={900}
            className="h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}