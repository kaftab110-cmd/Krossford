export interface CtaLink {
  readonly label: string;
  readonly href: string;
}

export interface HeroData {
  readonly label: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly primaryCta: CtaLink;
  readonly secondaryCta: CtaLink;
}

export interface CollectionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imagePlaceholder: string;
  readonly href: string;
}

export interface CraftsmanshipItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly imagePlaceholder: string;
}

export interface ProductItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly currency: string;
  readonly status: string;
  readonly imagePlaceholder: string;
  readonly slug: string;
}

export interface StoryCardItem {
  readonly id: string;
  readonly title: string;
  readonly text: string;
}

export interface BrandStoryData {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly storyCards: readonly StoryCardItem[];
}

export interface JournalArticleItem {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly slug: string;
  readonly imagePlaceholder: string;
}

export interface TestimonialItem {
  readonly id: string;
  readonly customer: string;
  readonly role: string;
  readonly review: string;
  readonly avatarPlaceholder: string;
}

export interface NewsletterData {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly placeholder: string;
  readonly buttonLabel: string;
}

export interface FooterLinkItem {
  readonly label: string;
  readonly href: string;
}

export interface FooterColumnItem {
  readonly heading: string;
  readonly links: readonly FooterLinkItem[];
}

export interface SocialLinkItem {
  readonly platform: string;
  readonly href: string;
}

export interface FooterData {
  readonly copyright: string;
  readonly columns: readonly FooterColumnItem[];
  readonly socialLinks: readonly SocialLinkItem[];
}

export const companyInfo = {
  brandName: "Krossford",
  tagline: "Uncompromising leather goods sculpted for modern professionals.",
  supportEmail: "support@krossford.com",
} as const;

export const heroData: HeroData = {
  label: "The Autumn / Winter Atelier Collection",
  title: "ARCHITECTURAL INTEGRITY",
  subtitle: "Uncompromising leather goods sculpted for modern professionals.",
  description: "Handcrafted from full-grain vegetable-tanned hides, our heritage pieces marry minimalist contours with generational durability.",
  primaryCta: {
    label: "Explore Collection",
    href: "#collections",
  },
  secondaryCta: {
    label: "The Atelier Story",
    href: "#brand-story",
  },
} as const;

export const collectionsData: readonly CollectionItem[] = [
  {
    id: "col-01",
    title: "The Professional Archive",
    description: "Architectural briefcases, folios, and dynamic tech organizers.",
    imagePlaceholder: "luxury-placeholder-professional-collection",
    href: "/collections/professional",
  },
  {
    id: "col-02",
    title: "Grand Tourer Travel",
    description: "Generous weekenders, duffels, and refined passport suites.",
    imagePlaceholder: "luxury-placeholder-travel-collection",
    href: "/collections/travel",
  },
  {
    id: "col-03",
    title: "Atelier Accessories",
    description: "Sleek sculptural belts, minimal billfolds, and card cases.",
    imagePlaceholder: "luxury-placeholder-accessories-collection",
    href: "/collections/accessories",
  },
] as const;

export const craftsmanshipData: readonly CraftsmanshipItem[] = [
  {
    id: "craft-01",
    title: "Saddle Stitching by Hand",
    description: "An ancient technique utilizing double-needled linen thread, achieving a seam stronger than machine lockstitching.",
    imagePlaceholder: "luxury-placeholder-saddle-stich",
  },
  {
    id: "craft-02",
    title: "Organic Vegetable Tanning",
    description: "Hides processed slowly over several months using natural tree barks, resulting in a rich, non-toxic structural finish.",
    imagePlaceholder: "luxury-placeholder-vegetable-tanning",
  },
  {
    id: "craft-03",
    title: "Hand-Burnished Edges",
    description: "Repeatedly polished with natural beeswax to perfectly seal open fiber layers, ensuring generations of fray-free wear.",
    imagePlaceholder: "luxury-placeholder-burnished-edges",
  },
] as const;

export const featuredProductsData: readonly ProductItem[] = [
  {
    id: "prod-01",
    name: "The Signature Briefcase",
    description: "Structured architectural silhouette featuring solid brass hardware and signature micro-suede internal lining.",
    price: 1450,
    currency: "USD",
    status: "New Arrival",
    imagePlaceholder: "luxury-placeholder-signature-briefcase",
    slug: "the-signature-briefcase",
  },
  {
    id: "prod-02",
    name: "The Minimalist Billfold",
    description: "Ultra-slim profile engineered from unbroken full-grain leather panels with six precision hand-cut card slots.",
    price: 245,
    currency: "USD",
    status: "Limited Edition",
    imagePlaceholder: "luxury-placeholder-minimalist-billfold",
    slug: "the-minimalist-billfold",
  },
  {
    id: "prod-03",
    name: "The Atelier Weekender",
    description: "Expansive multi-day carry built with reinforced stress points, hand-rolled drop handles, and an adjustable shoulder strap.",
    price: 1850,
    currency: "USD",
    status: "Atelier Exclusive",
    imagePlaceholder: "luxury-placeholder-atelier-weekender",
    slug: "the-atelier-weekender",
  },
] as const;

export const brandStoryData: BrandStoryData = {
  label: "Heritage & Vision",
  title: "CRAFTED UNTO PERPETUITY",
  description: "KROSSFORD was conceived as an architectural rebellion against transient fast fashion. We treat leather not merely as an assembly material, but as an evolving structural canvas that preserves structural narrative and personal character.",
  storyCards: [
    {
      id: "story-01",
      title: "Generational Provenance",
      text: "Every hide is sourced exclusively from heritage European tanneries operating under strict environmental certifications, preserving absolute traceability.",
    },
    {
      id: "story-02",
      title: "The Golden Ratio",
      text: "Our design team measures twice and optimizes cuts dynamically to maximize fiber density alignment, creating lightweight yet remarkably unyielding leather frameworks.",
    },
  ],
} as const;

export const journalArticlesData: readonly JournalArticleItem[] = [
  {
    id: "art-01",
    title: "The Physiology of Patina: How Premium Leather Matures",
    excerpt: "An in-depth chemical exploration into how vegetable-tanned fibers absorb environmental elements to tell a highly localized story.",
    slug: "physiology-of-patina-leather-maturing",
    imagePlaceholder: "luxury-placeholder-journal-patina",
  },
  {
    id: "art-02",
    title: "Atelier Care: Preserving Integrity for Generations",
    excerpt: "Our definitive guide detailing clean hydration, optimal temperature storage, and organic oil nourishment regimens.",
    slug: "atelier-care-preserving-leather-integrity",
    imagePlaceholder: "luxury-placeholder-journal-care",
  },
  {
    id: "art-03",
    title: "The Architecture of Minimalist Product Design",
    excerpt: "Analyzing the subtle convergence of early modernist structural form factors and natural, flexible materials.",
    slug: "architecture-of-minimalist-product-design",
    imagePlaceholder: "luxury-placeholder-journal-architecture",
  },
] as const;

export const testimonialsData: readonly TestimonialItem[] = [
  {
    id: "test-01",
    customer: "Helena Vance",
    role: "Principal Solution Architect",
    review: "The architectural lines of the Signature Briefcase are impeccable. It handles heavy technical hardware daily while effortlessly maintaining its rigid silhouette.",
    avatarPlaceholder: "luxury-avatar-helena",
  },
  {
    id: "test-02",
    customer: "Marcus Thorn",
    role: "Creative Director",
    review: "The patina development on my Atelier Weekender is spectacular. It has transformed over two years of global travel into a unique aesthetic asset.",
    avatarPlaceholder: "luxury-avatar-marcus",
  },
  {
    id: "test-03",
    customer: "Julian Sterling",
    role: "Private Equity Partner",
    review: "Uncompromising bench-grade execution. The hand-burnished edge detail reflects an enterprise caliber of quality that is virtually extinct elsewhere.",
    avatarPlaceholder: "luxury-avatar-julian",
  },
] as const;

export const newsletterData: NewsletterData = {
  label: "The Krossford Registry",
  title: "Atelier Bulletins",
  description: "Receive private notifications regarding limited product commissions, archival collection previews, and design monographs.",
  placeholder: "Enter your private email address",
  buttonLabel: "Subscribe",
} as const;

export const footerData: FooterData = {
  copyright: "2026 KROSSFORD. All Rights Reserved.",
  columns: [
    {
      heading: "Collections",
      links: [
        { label: "The Professional Archive", href: "/collections/professional" },
        { label: "Grand Tourer Travel", href: "/collections/travel" },
        { label: "Atelier Accessories", href: "/collections/accessories" },
        { label: "New Arrivals", href: "/#featured-products" },
      ],
    },
    {
      heading: "The House",
      links: [
        { label: "Our Story", href: "/our-story" },
        { label: "Craftsmanship Portfolio", href: "/#craftsmanship" },
        { label: "The Editorial Journal", href: "/#journal" },
        { label: "Client Testimonials", href: "/#testimonials" },
      ],
    },
    {
      heading: "Client Services",
      links: [
        { label: "Contact Client Relations", href: "/contact-us" },
        { label: "Shipping & Bespoke Delivery", href: "/shipping-policy" },
        { label: "Returns & Lifetime Guarantee", href: "/returns-&-refunds" },
        { label: "Corporate Concierge", href: "/help-center" },
      ],
    },
  ],
  socialLinks: [
    { platform: "Instagram", href: "https://instagram.com/krossford" },
    { platform: "Facebook", href: "https://facebook.com/krossford" },
    { platform: "Pinterest", href: "https://pinterest.com/krossford" },
    { platform: "YouTube", href: "https://youtube.com/c/krossford" },
  ],
} as const;