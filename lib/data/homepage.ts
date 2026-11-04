// ======================================================
// KROSSFORD HOMEPAGE DATA
// ======================================================

export interface HeroButton {
  readonly label: string;
  readonly href: string;
}

export interface HeroSection {
  readonly label: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly primaryButton: HeroButton;
  readonly secondaryButton: HeroButton;
}

export interface CollectionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly href: string;
}

export interface CollectionsSection {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly CollectionItem[];
}

export interface CraftsmanshipItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface CraftsmanshipSection {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly CraftsmanshipItem[];
}

export interface ProductItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly href: string;
  readonly imageUrl: string;
}

export interface FeaturedProductsSection {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly products: readonly ProductItem[];
}

export interface StoryItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface BrandStorySection {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly stories: readonly StoryItem[];
}

export interface JournalArticle {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly imageAlt: string;
  readonly href: string;
}

export interface JournalSection {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly articles: readonly JournalArticle[];
}

export interface TestimonialItem {
  readonly id: string;
  readonly customerName: string;
  readonly customerRole: string;
  readonly company?: string;
  readonly review: string;
  readonly avatarAlt: string;
}

export interface TestimonialsSection {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly TestimonialItem[];
}

export interface NewsletterSection {
  readonly label: string;
  readonly title: string;
  readonly description: string;
  readonly inputLabel: string;
  readonly inputPlaceholder: string;
  readonly buttonLabel: string;
}

// ======================================================
// HERO
// ======================================================

export const heroSection: HeroSection = {
  label: "Autumn / Winter 2026",
  title: "ARCHITECTURAL LUXURY",
  subtitle: "Handcrafted leather goods designed for modern professionals.",
  description:
    "Every KROSSFORD creation is built from premium full-grain leather using traditional craftsmanship and timeless design philosophy.",
  primaryButton: {
    label: "Shop Collection",
    href: "/collections",
  },
  secondaryButton: {
    label: "Our Story",
    href: "#brand-story",
  },
} as const;

// ======================================================
// COLLECTIONS
// ======================================================

export const collectionsSection: CollectionsSection = {
  label: "Collections",
  title: "DISCOVER KROSSFORD",
  description: "Luxury leather collections designed to last for generations.",
  items: [
    {
      id: "collection-01",
      title: "Briefcases",
      description:
        "Executive briefcases handcrafted from premium full-grain leather.",
      href: "/collections/briefcases",
    },
    {
      id: "collection-02",
      title: "Travel",
      description:
        "Luxury duffle bags and weekender collections for modern travel.",
      href: "/collections/travel",
    },
    {
      id: "collection-03",
      title: "Accessories",
      description: "Wallets, belts and everyday leather essentials.",
      href: "/collections/accessories",
    },
  ],
} as const;

// ======================================================
// CRAFTSMANSHIP
// ======================================================

export const craftsmanshipSection: CraftsmanshipSection = {
  label: "Craftsmanship",
  title: "MADE TO ENDURE",
  description:
    "Every KROSSFORD piece is handcrafted using traditional leather-working techniques and uncompromising attention to detail.",
  items: [
    {
      id: "craft-01",
      title: "Full-Grain Leather",
      description:
        "Only the finest full-grain hides are selected to ensure exceptional durability and a beautiful natural patina.",
    },
    {
      id: "craft-02",
      title: "Hand Saddle Stitching",
      description:
        "Each stitch is completed by skilled artisans using traditional saddle stitching for maximum strength.",
    },
    {
      id: "craft-03",
      title: "Solid Brass Hardware",
      description:
        "Premium brass hardware is carefully finished for lasting performance and timeless elegance.",
    },
  ],
} as const;

// ======================================================
// FEATURED PRODUCTS
// ======================================================

export const featuredProductsSection: FeaturedProductsSection = {
  label: "Featured Products",
  title: "SIGNATURE COLLECTION",
  description:
    "Iconic leather essentials created for professionals who value timeless quality.",
  products: [
    {
      id: "product-01",
      title: "Executive Briefcase",
      description:
        "A refined business briefcase handcrafted from premium full-grain leather, combining timeless elegance with everyday practicality.",
      status: "In Stock",
      href: "/product/executive-briefcase",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "product-02",
      title: "Heritage Leather Jacket",
      description:
        "A handcrafted leather jacket designed with classic tailoring and exceptional durability for lasting style.",
      status: "Made to Order",
      href: "/product/heritage-leather-jacket",
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "product-03",
      title: "Signature Bifold Wallet",
      description:
        "A slim, full-grain leather wallet featuring meticulous stitching and a refined finish for everyday luxury.",
      status: "In Stock",
      href: "/product/signature-bifold-wallet",
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "product-04",
      title: "Artisan Leather Tote",
      description:
        "A spacious handcrafted tote bag made from vegetable-tanned leather, offering sophistication for work and travel.",
      status: "Limited Edition",
      href: "/product/artisan-leather-tote",
      imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800",
    },
  ],
} as const;

// ======================================================
// BRAND STORY
// ======================================================

export const brandStorySection: BrandStorySection = {
  label: "Our Story",
  title: "CRAFTED FOR GENERATIONS",
  description:
    "KROSSFORD was founded on one belief: true luxury should improve with age. Every product is designed to become part of your personal journey and develop character over decades.",
  stories: [
    {
      id: "story-01",
      title: "Timeless Philosophy",
      description:
        "We reject disposable fashion in favor of enduring craftsmanship and elegant simplicity.",
    },
    {
      id: "story-02",
      title: "Master Artisans",
      description:
        "Every product is handcrafted by experienced leather craftsmen using traditional techniques passed through generations.",
    },
  ],
} as const;

// ======================================================
// JOURNAL
// ======================================================

export const journalSection: JournalSection = {
  label: "Journal",
  title: "FROM THE ATELIER",
  description:
    "Discover craftsmanship, leather care, and stories behind every KROSSFORD creation.",
  articles: [
    {
      id: "journal-01",
      title: "The Art of Full-Grain Leather",
      excerpt:
        "Understanding why full-grain leather develops unmatched character over time.",
      imageAlt: "Full Grain Leather",
      href: "/journal/full-grain-leather",
    },
    {
      id: "journal-02",
      title: "Behind Every Hand Stitch",
      excerpt:
        "How traditional saddle stitching creates heirloom-quality craftsmanship.",
      imageAlt: "Hand Stitching Process",
      href: "/journal/saddle-stitching",
    },
    {
      id: "journal-03",
      title: "Luxury Leather Care Guide",
      excerpt:
        "Simple maintenance techniques to preserve beauty for generations.",
      imageAlt: "Leather Care",
      href: "/journal/leather-care",
    },
  ],
} as const;

// ======================================================
// TESTIMONIALS
// ======================================================

export const testimonialsSection: TestimonialsSection = {
  label: "Client Experiences",
  title: "VOICES OF DISTINCTION",
  description:
    "Every commission becomes part of a personal legacy shared by our clients worldwide.",
  items: [
    {
      id: "testimonial-01",
      customerName: "Alexander Hughes",
      customerRole: "Architect · London",
      review:
        "The craftsmanship is extraordinary. Every stitch reflects precision and timeless elegance.",
      avatarAlt: "Alexander Hughes",
    },
    {
      id: "testimonial-02",
      customerName: "Isabella Moretti",
      customerRole: "Creative Director · Milan",
      review:
        "KROSSFORD delivers understated luxury that becomes more beautiful every day.",
      avatarAlt: "Isabella Moretti",
    },
    {
      id: "testimonial-03",
      customerName: "Daniel Foster",
      customerRole: "Entrepreneur · New York",
      review:
        "This is not simply a leather product—it is an heirloom built to outlive trends.",
      avatarAlt: "Daniel Foster",
    },
  ],
} as const;

// ======================================================
// NEWSLETTER
// ======================================================

export const newsletterSection: NewsletterSection = {
  label: "Private Circle",
  title: "JOIN THE KROSSFORD JOURNAL",
  description:
    "Receive exclusive product releases, atelier insights, leather care guides, and private invitations before anyone else.",
  inputLabel: "Email Address",
  inputPlaceholder: "Enter your email address",
  buttonLabel: "Subscribe",
} as const;