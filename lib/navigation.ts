export interface FooterLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly ariaLabel: string;
}

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly ariaLabel: string;
}

export const footerNavigation: readonly FooterLink[] = [
  {
    id: "shop",
    label: "Shop",
    href: "/shop",
    ariaLabel: "Shop Krossford products",
  },
  {
    id: "collections",
    label: "Collections",
    href: "/collections",
    ariaLabel: "Browse Krossford collections",
  },
  {
    id: "about-us",
    label: "About Us",
    href: "/about-us",
    ariaLabel: "Learn about Krossford",
  },
  {
    id: "our-story",
    label: "Our Story",
    href: "/our-story",
    ariaLabel: "Read the Krossford story",
  },
  {
    id: "contact-us",
    label: "Contact Us",
    href: "/contact-us",
    ariaLabel: "Contact Krossford",
  },
  {
    id: "faqs",
    label: "FAQs",
    href: "/faqs",
    ariaLabel: "View frequently asked questions",
  },
  {
    id: "help-center",
    label: "Help Center",
    href: "/help-center",
    ariaLabel: "Visit the Help Center",
  },
  {
    id: "store-policy",
    label: "Store Policy",
    href: "/store-policy",
    ariaLabel: "Read the Krossford store policy",
  },
] as const;

export const socialLinks: readonly SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com/krossford",
    ariaLabel: "Follow Krossford on Instagram",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/krossford",
    ariaLabel: "Follow Krossford on Facebook",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "https://twitter.com/krossford",
    ariaLabel: "Follow Krossford on Twitter",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/company/krossford",
    ariaLabel: "Follow Krossford on LinkedIn",
  },
] as const;