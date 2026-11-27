export interface LegalPage {
  title: string;
  slug: string;
  href: string;
  shortDescription: string;
}

export const legalPages: LegalPage[] = [
  {
    title: "Impressum",
    slug: "impressum",
    href: "/impressum",
    shortDescription: "Business information and legal notices.",
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    href: "/privacy-policy",
    shortDescription: "How we collect, use, and protect personal information.",
  },
  {
    title: "Terms of Service",
    slug: "terms",
    href: "/terms",
    shortDescription: "The terms governing use of the KROSSFORD website and services for retail customers and wholesale buyers.",
  },
  {
    title: "Returns & Refunds",
    slug: "returns",
    href: "/returns",
    shortDescription: "Information about return requests, refunds, and product issues for retail and wholesale orders.",
  },
  {
    title: "Shipping Policy",
    slug: "shipping",
    href: "/shipping-policy",
    shortDescription: "Shipping methods, delivery estimates, costs, and destination restrictions for retail and wholesale.",
  },
  {
    title: "Store Policy",
    slug: "store-policy",
    href: "/store-policy",
    shortDescription: "General store rules, order processing, and customer / buyer responsibilities.",
  },
  {
    title: "FAQs",
    slug: "faqs",
    href: "/faqs",
    shortDescription: "Answers to common questions for retail customers (1 Piece) and wholesale buyers (50+ Units).",
  },
  {
    title: "Help Center",
    slug: "help-center",
    href: "/help-center",
    shortDescription: "Find assistance with orders, products, and customer / buyer enquiries.",
  },
  {
    title: "Track Your Order",
    slug: "track-order",
    href: "/track-order",
    shortDescription: "Track your retail or wholesale order via courier tracking or WhatsApp.",
  },
];

// LEGAL_PAGES alias - taake purani files jo LEGAL_PAGES use karti hain wo bhi chalen
export const LEGAL_PAGES = legalPages;

function normalizeSlug(slug: string): string {
  if (slug === "shipping-policy") return "shipping";
  if (slug === "returns-and-refunds") return "returns";
  if (slug === "privacy") return "privacy-policy";
  return slug;
}

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((page) => page.slug === normalizeSlug(slug));
}

export function getLegalPages(): LegalPage[] {
  return legalPages;
}

export function getLegalPageBySlug(slug: string): LegalPage | undefined {
  return getLegalPage(slug);
}

export function getOtherLegalPages(currentSlug: string): LegalPage[] {
  const current = normalizeSlug(currentSlug);
  return legalPages.filter((page) => page.slug !== current);
}