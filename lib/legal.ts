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
    slug: "terms-of-service",
    href: "/terms-of-service",
    shortDescription: "The terms governing use of the KROSSFORD website and services.",
  },
  {
    title: "Returns & Refunds",
    slug: "returns-and-refunds",
    href: "/returns-and-refunds",
    shortDescription: "Information about return requests, refunds, and product issues.",
  },
  {
    title: "Shipping Policy",
    slug: "shipping-policy",
    href: "/shipping-policy",
    shortDescription: "Shipping methods, delivery estimates, costs, and destination restrictions.",
  },
  {
    title: "Store Policy",
    slug: "store-policy",
    href: "/store-policy",
    shortDescription: "General store rules, order processing, and customer responsibilities.",
  },
  {
    title: "FAQs",
    slug: "faqs",
    href: "/faqs",
    shortDescription: "Answers to common questions about products, orders, and services.",
  },
  {
    title: "Help Center",
    slug: "help-center",
    href: "/help-center",
    shortDescription: "Find assistance with orders, products, and customer enquiries.",
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((page) => page.slug === slug);
}

export function getOtherLegalPages(currentSlug: string): LegalPage[] {
  return legalPages.filter((page) => page.slug !== currentSlug);
}