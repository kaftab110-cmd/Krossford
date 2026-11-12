export type B2BCategory = {
  label: string;
  href: string;
};

export const B2B_CATS: B2BCategory[] = [
  { label: "All Wholesale", href: "/b2b" },
  { label: "Leather Jackets", href: "/b2b?cat=Jackets" },
  { label: "Biker Suits", href: "/b2b?cat=Biker Suits" },
  { label: "Bags, Belts & Wallets", href: "/b2b?cat=Bags Belts Wallets" },
  { label: "Custom / White Label", href: "/b2b?cat=Custom White Label" },
  { label: "For Her Bulk", href: "/b2b?cat=For Her Bulk" },
];

export type B2BProduct = {
  id: string;
  name: string;
  category: string;
  moq: string;
  sampleImages: string[];
  priceNote: string;
  leadTime: string;
  tag?: string;
  status: "live" | "upcoming";
  description: string;
};

export const B2B_PRODUCTS: B2BProduct[] = [
  {
    id: "b2b-biker-jacket",
    name: "LEATHER JACKET - BIKER / BOMBER",
    category: "Jackets",
    moq: "50 Pcs",
    sampleImages: [
      "/products/b2b/biker-jacket-1.jpg",
      "/products/b2b/biker-jacket-2.jpg",
      "/products/b2b/biker-jacket-3.jpg",
    ],
    priceNote: "Get Quote - Price on Quantity",
    leadTime: "Sample: 7-10 Days | Estimated Bulk Production: 30-45 days after Sample Approval",
    tag: "BEST FOR B2B",
    status: "live",
    description: "Full-grain leather biker / bomber jacket. Custom logo, color and sizing available.",
  },
  {
    id: "b2b-biker-suit",
    name: "LEATHER BIKER SUIT - 2 PIECE",
    category: "Biker Suits",
    moq: "25 Sets",
    sampleImages: [
      "/products/b2b/biker-suit-1.jpg",
      "/products/b2b/biker-suit-2.jpg",
      "/products/b2b/biker-suit-3.jpg",
    ],
    priceNote: "Get Quote - Price on Quantity",
    leadTime: "Sample: 7-10 Days | Estimated Bulk Production: 30-45 days after Sample Approval",
    tag: "HIGH MARGIN",
    status: "live",
    description: "2-piece leather biker suit. Jacket + Pant. CE protection option available.",
  },
  {
    id: "b2b-bags-belts-wallets",
    name: "BAGS, BELTS & WALLETS - BULK",
    category: "Bags Belts Wallets",
    moq: "100 Pcs",
    sampleImages: [
      "/products/b2b/bags-1.jpg",
      "/products/b2b/belts-1.jpg",
      "/products/b2b/wallets-1.jpg",
    ],
    priceNote: "Get Quote - Price on Quantity",
    leadTime: "Sample: 7-10 Days | Estimated Bulk Production: 30-45 days after Sample Approval",
    tag: "WHITE LABEL",
    status: "live",
    description: "Bags, belts and wallets in bulk. White label / own brand available.",
  },
  {
    id: "b2b-custom-white-label",
    name: "CUSTOM / WHITE LABEL - YOUR BRAND",
    category: "Custom White Label",
    moq: "To Be Confirmed",
    sampleImages: [
      "/products/b2b/custom-1.jpg",
      "/products/b2b/custom-2.jpg",
    ],
    priceNote: "Get Quote - After Design Review",
    leadTime: "Sample: 7-10 Days | Estimated Bulk Production: 30-45 days after Sample Approval",
    tag: "CUSTOM",
    status: "live",
    description: "Send your design / logo. We make sample first, bulk after approval.",
  },
];
