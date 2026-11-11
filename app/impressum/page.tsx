import { buildMetadata } from "@/lib/seo";
import LegalNav from "@/components/LegalNav";

export const metadata = buildMetadata({
  title: "Impressum",
  description: "Legal notice / Impressum for Krossford in accordance with German law (§5 DDG).",
  path: "/impressum",
});

const COMPANY_NAME = "[Krossford Legal Entity Name]";
const COMPANY_ADDRESS = "[Street, ZIP Code, City, Germany]";
const COMPANY_REG = "[Handelsregister Number — coming soon]";
const RESPONSIBLE_PERSON = "[Full Name of Responsible Person]";
const CONTACT_EMAIL = "support@krossford.com";
const CONTACT_PHONE = "[+49 Your Number]";
const VAT_ID = "[VAT ID — coming soon]";

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16 text-gray-200">
      <h1 className="text-3xl font-bold text-white">Impressum</h1>
      <p className="mt-2 text-sm text-gray-500">
        Legal notice in accordance with § 5 DDG (Digitale-Dienste-Gesetz)
      </p>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Company Information</h2>
        <p>
          {COMPANY_NAME}
          <br />
          {COMPANY_ADDRESS}
          <br />
          Germany
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Represented By</h2>
        <p>{RESPONSIBLE_PERSON}</p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p>
          Phone: {CONTACT_PHONE}
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
        <h2 className="text-xl font-semibold text-white">VAT Identification Number</h2>
        <p>
          VAT ID in accordance with §27a of the German VAT Act: {VAT_ID}
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">
          Responsible for Content (§ 18 (2) MStV)
        </h2>
        <p>
          {RESPONSIBLE_PERSON}
          <br />
          {COMPANY_ADDRESS}
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">
          EU Dispute Resolution
        </h2>
        <p>
          The dispute
          resolution (ODR):{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . We are not obligated and generally not willing to participate in
          dispute resolution proceedings before a consumer arbitration board.
        </p>
      </section>

      <section className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold text-white">Liability for Content</h2>
        <p>
          As a service provider, we are responsible for our own content on
          these pages in accordance with general laws. However, we are not
          obligated to monitor transmitted or stored third-party information
          or to investigate circumstances that indicate illegal activity.
        </p>
      </section>

      <LegalNav currentSlug="impressum" />
    </main>
  );
}