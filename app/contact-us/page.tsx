import { contactContent } from "@/lib/data/contact";

export default function ContactUsPage() {
  const { title, intro, contact } = contactContent;

  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold text-yellow-500">
          {title}
        </h1>
        <p className="mb-10 text-sm sm:text-base leading-relaxed text-zinc-300 max-w-2xl">
          {intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Quick Contact Links */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Direct Touchpoints</h2>
            <a
              href={`mailto:${contact.email}`}
              className="block rounded-md border border-yellow-500/20 px-5 py-4 text-yellow-500 transition hover:border-yellow-500 bg-zinc-950"
            >
              <span className="block text-xs text-zinc-400 uppercase">Email Us</span>
              <span className="font-medium">{contact.email}</span>
            </a>

            <a
              href={`tel:${contact.phone}`}
              className="block rounded-md border border-yellow-500/20 px-5 py-4 text-yellow-500 transition hover:border-yellow-500 bg-zinc-950"
            >
              <span className="block text-xs text-zinc-400 uppercase">Call Direct</span>
              <span className="font-medium">{contact.phone}</span>
            </a>

            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="block rounded-md border border-yellow-500/20 px-5 py-4 text-yellow-500 transition hover:border-yellow-500 bg-zinc-950"
            >
              <span className="block text-xs text-zinc-400 uppercase">Instant Support</span>
              <span className="font-medium">Connect on WhatsApp →</span>
            </a>
          </div>

          {/* Luxury Enquiry Form */}
          <div className="rounded-lg border border-yellow-500/20 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Bespoke & Wholesale Enquiry</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Enquiry Details</label>
                <textarea
                  rows={4}
                  placeholder="Specify product interest, wholesale quantity, or custom specification..."
                  className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-white focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-yellow-500 py-3 text-sm font-medium text-black transition hover:bg-yellow-400"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}