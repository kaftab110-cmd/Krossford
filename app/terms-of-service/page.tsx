import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">
          Terms of Service
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">
          Last Updated: November 2026
        </p>

        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Enquiry-Based Model</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Krossford operates primarily on a direct enquiry and consultation model. Placing an enquiry does not constitute a binding financial transaction until production specifications, lead times, and custom pricing are mutually agreed upon in writing.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. Custom & Bespoke Manufacturing</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              All custom leather products, bespoke initialings, and wholesale orders are crafted according to client-approved specifications. Production begins only after formal confirmation and deposit receipt.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. International Export & Compliance</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              For global B2B shipments, duties, tariffs, and local import taxes are managed according to the agreed Incoterms (FOB/CIF). Krossford ensures export compliance under Pakistani trade guidelines.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Intellectual Property</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              All proprietary designs, product photography, software architecture, and branding assets associated with Krossford remain the exclusive property of Krossford Enterprises.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact-us"
            className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition"
          >
            Have Questions? Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}