import Link from "next/link";

export default function ReturnsAndRefundsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">
          Returns & Guarantee Policy
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">
          Last Updated: November 2026
        </p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Quality & Craftsmanship Guarantee</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Every Krossford item undergoes rigorous quality inspections. If your order arrives with any manufacturing defect or structural flaw, we will replace or rectify the piece at no additional cost.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Standard Item Returns</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Non-customized products in unused, original condition with signature packaging may be returned or exchanged within 7 days of delivery. Clients are responsible for return logistics costs unless the item was delivered damaged.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. Bespoke & Personalized Orders</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Custom-engraved, initialed, or specially manufactured wholesale orders are non-refundable once production approval is given, unless there is a confirmed material defect or specification variance.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Initiate a Support Request</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              To request a return or report a craftsmanship concern, please reach out directly through our client concierge team with your order reference.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact-us"
            className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
          >
            Contact Client Support
          </Link>
        </div>
      </section>
    </main>
  );
}