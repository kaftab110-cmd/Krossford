import LegalNav from "@/components/LegalNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | KROSSFORD",
  description: "Legal notice / Impressum for Krossford - Pakistan law applies. International customers pay VAT / Tax as per their own country law.",
};

const COMPANY_NAME = "[Krossford Legal Entity Name]";
const COMPANY_ADDRESS = "[Street, City, Pakistan]";
const COMPANY_REG = "[Registration Number — coming soon]";
const RESPONSIBLE_PERSON = "[Full Name of Responsible Person]";
const CONTACT_EMAIL = "hello@krossford.com";
const CONTACT_PHONE = "+92303 0006759";
const VAT_ID = "[Tax ID — coming soon]";

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-gray-200">
      <h1 className="text-3xl font-bold text-white">Impressum</h1>
      <p className="mt-2 text-sm text-gray-500">
        Legal notice for Krossford - Pakistan law applies. Serving customers worldwide.
      </p>

      <section className="mt-10 space-y-2 rounded-lg border border-amber-400/40 bg-amber-400/10 p-6">
        <h2 className="text-xl font-semibold text-white">Governing Law — Pakistan</h2>
        <p className="text-sm text-zinc-300">
          This website and all business dealings of KROSSFORD are governed by the laws of Pakistan. Any dispute arising from an order, product, payment, shipping or claim shall be settled under the laws of Pakistan. By ordering from KROSSFORD, the customer / buyer agrees to the laws of Pakistan.
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Company Information</h2>
        <p>
          {COMPANY_NAME}
          <br />
          {COMPANY_ADDRESS}
          <br />
          Pakistan
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Represented By</h2>
        <p>{RESPONSIBLE_PERSON}</p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p>
          Phone / WhatsApp: {CONTACT_PHONE}
          <br />
          Email:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-white">
            {CONTACT_EMAIL}
          </a>
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Commercial Register</h2>
        <p>Registration number: {COMPANY_REG}</p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Tax Identification Number</h2>
        <p>
          Tax ID: {VAT_ID}
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">
          Responsible for Content
        </h2>
        <p>
          {RESPONSIBLE_PERSON}
          <br />
          {COMPANY_ADDRESS}
        </p>
      </section>

      <section className="mt-10 space-y-2 rounded-lg border border-amber-400/40 bg-amber-400/10 p-6">
        <h2 className="text-xl font-semibold text-white">
          International Customers / Buyers — VAT / Tax — As Per Your Country Law
        </h2>
        <p className="text-sm text-zinc-300">
          For international customers / buyers, the KROSSFORD price includes product + dispatch up to clearance from the dispatch location only.<br /><br />
          If any VAT / Tax / Customs Duty / Import Duty applies in your country, it shall be borne solely by you (Customer / Buyer) — as per the law of your own country. It is NOT included in our price. You shall pay it directly to your local courier / customs, as per your country&apos;s law.<br /><br />
          Example: KROSSFORD price $189 = Product + Dispatch up to clearance. If $20 VAT / Tax applies in your country under your country&apos;s law, you shall pay that $20 — KROSSFORD shall not pay it.<br /><br />
          Non-payment of VAT / Tax / Customs under your country&apos;s law shall NOT be a reason for return or refund. Please check your country&apos;s VAT / Tax / Customs law before ordering.
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">
          Dispute Resolution
        </h2>
        <p>
          We will try our best to resolve any dispute by mutual discussion on WhatsApp / Email. If the dispute is not resolved, it shall be settled under the laws of Pakistan. We are not obligated to participate in dispute resolution proceedings before a consumer arbitration board in another country.
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Liability for Content</h2>
        <p>
          As a service provider, we are responsible for our own content on
          these pages in accordance with the laws of Pakistan. However, we are not
          obligated to monitor transmitted or stored third-party information
          or to investigate circumstances that indicate illegal activity.
        </p>
      </section>

      <LegalNav currentSlug="impressum" />
    </main>
  );
}