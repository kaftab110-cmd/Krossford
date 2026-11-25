import LegalNav from "@/components/LegalNav";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KROSSFORD Enterprises",
  description: "Privacy Policy for KROSSFORD Enterprises - how we collect, use, and protect your personal information. We never sell or rent your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">Privacy Policy</h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">Last Updated: November 25, 2026</p>

        <LegalNav currentSlug="privacy-policy" />

        <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-zinc-300">
          <section className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Our Promise — Your Information Is Safe With Us</h2>
            <p className="text-zinc-200 text-xs sm:text-sm leading-relaxed">
              We never sell or rent your personal information. We collect only what we need to make and deliver your order — nothing extra. Your payment is processed securely through trusted third-party providers — we do not store your card details.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">1. Who We Are</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              This Privacy Policy explains how KROSSFORD Enterprises (&quot;KROSSFORD&quot;, &quot;we&quot;, &quot;us&quot;) collects, uses, and protects your personal information when you visit krossford.com, place an order on our website, or contact us on WhatsApp. By using our website or placing an order, you agree to this Privacy Policy. If you do not agree, please do not use our website or place an order.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">2. What Information We Collect</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We collect only the information we need to process your order and serve you better:<br /><br />
              <b className="text-zinc-200">Contact details:</b> Your full name, email address, and phone number / WhatsApp number.<br />
              <b className="text-zinc-200">Shipping details:</b> Your full delivery address — street, city, postcode, and country.<br />
              <b className="text-zinc-200">Order details:</b> The product, size, colour, quantity, and price you ordered.<br />
              <b className="text-zinc-200">Custom / engraving details:</b> Any custom design, logo, text, initials, or engraving you send us for your product.<br />
              <b className="text-zinc-200">Messages:</b> Messages you send us on WhatsApp, email, or our Contact page about your order.<br />
              We do NOT collect your card number, CVV, or bank password. Payment details are handled only by the trusted payment provider.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We use your information only for these purposes:<br /><br />
              <b className="text-zinc-200">1. To process your order</b> — to make your product, pack it, and ship it to you.<br />
              <b className="text-zinc-200">2. To provide customer support</b> — to answer your questions and solve any issue with your order.<br />
              <b className="text-zinc-200">3. To improve our website</b> — to understand what our customers like, so we can make our website and products better.<br />
              <b className="text-zinc-200">4. To communicate with you</b> — to send you order updates, cutting / making / packing / shipment images and videos, tracking details, and delivery updates.<br />
              We will never use your information for any other purpose without your permission.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">4. Payment — We Do Not Store Your Card Details</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Your payment is processed securely through trusted third-party payment providers. We do not see, collect, or store your card number, CVV, or bank password. When you pay, you are paying through that trusted provider&apos;s secure system — not through our website. Please never send your card number, CVV, or bank password to us on WhatsApp or email.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">5. Who We Share Your Information With</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We never sell or rent your personal information to anyone.<br /><br />
              We share your information ONLY when it is necessary to fulfil your order or follow the law:<br /><br />
              <b className="text-zinc-200">Payment providers</b> — to process your payment securely.<br />
              <b className="text-zinc-200">Shipping / courier partners</b> — to deliver your parcel — we share only your name, address, and phone number, so the courier can deliver to you.<br />
              <b className="text-zinc-200">Legal requirement</b> — if the law requires us to share information, we will do so only as required by law.<br />
              We never share your custom logo, engraving, or personal design with anyone except the team making your product.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">6. How We Protect Your Information</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              We take reasonable steps to protect your personal information from loss, misuse, or unauthorised access. Only the KROSSFORD team members who need your information to make, pack, ship, or support your order can access it. No method of transmission over the internet is 100% secure, but we do our best to keep your information safe.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">7. Cookies</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Our website may use cookies to improve your browsing experience — for example, to remember your preferences and to understand how visitors use our website. Cookies do not give us access to your personal files. You can disable cookies through your browser settings at any time. If you disable cookies, some parts of our website may not work as smoothly.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">8. Your Rights — Access, Update, or Delete</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              You have the right to ask us:<br /><br />
              <b className="text-zinc-200">What information</b> we hold about you.<br />
              <b className="text-zinc-200">To update or correct</b> your information — for example, if your address or phone number changes.<br />
              <b className="text-zinc-200">To delete</b> your personal information — we will delete it, except where we must keep it for legal or order records.<br />
              To make any of these requests, contact us through our Contact page or WhatsApp. We will respond as soon as possible.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">9. Children&apos;s Privacy</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Our website and products are intended for adults (18 years and older). We do not knowingly collect personal information from children under 18. If you believe a child has shared personal information with us, please contact us and we will delete it.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">10. Changes To This Policy</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              KROSSFORD may update this Privacy Policy at any time. Any changes will be posted on this page with a new &quot;Last Updated&quot; date. We recommend checking this page from time to time. If you continue to use our website after changes are posted, you agree to the updated policy.
            </p>
          </section>

          <section className="rounded-lg border border-yellow-500/10 bg-zinc-950 p-6">
            <h2 className="text-lg font-semibold text-white mb-3">11. Contact Us</h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              If you have any question about this Privacy Policy, or if you wish to access, update, or delete your personal information, please contact us through our Contact page or WhatsApp. We will try our best to help you and resolve any issue directly with you.
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link href="/contact" className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition">Contact Us</Link>
          <Link href="/terms" className="inline-block rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition">Terms and Conditions</Link>
        </div>
      </section>
    </main>
  );
}
