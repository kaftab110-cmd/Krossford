// lib/data/shop.ts - SIRF DATA, KOI <div> NAHI

export type ProductColor = {
  name: string;
  code: string;
  image: string;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  category: string;
  badge: string;
  slug: string;
  aliases: string[];
  price: number;
  colors: ProductColor[];
};

export const products: Product[] = [
  { id: 1, name: "Vintage Leather Backpack", image: "/images/messenger-bag.jpg", description: "Dark Brown, Full-Grain Leather, Double Buckle Flap, Front Zip Pocket", category: "Bags", badge: "BEST SELLER", slug: "vintage-leather-backpack", aliases: ["vintage-backpack", "vintage-leather-bag"], price: 129,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/messenger-bag.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/messenger-bag.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/messenger-bag.jpg" },
    ]},
  { id: 2, name: "Travel Duffle Bag", image: "/images/leather-duffle-bag.jpg", description: "Cognac Brown, Full-Grain Leather, Travel Duffel Bag, Large Capacity, Adjustable Shoulder Strap", category: "Bags", badge: "BEST SELLER", slug: "travel-duffle-bag", aliases: ["duffle-bag", "duffel-bag", "travel-duffel-bag", "travel-bag"], price: 189,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/leather-duffle-bag.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/leather-duffle-bag.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/leather-duffle-bag.jpg" },
    ]},
  { id: 3, name: "Leather Phone Case", image: "/images/card-holder.jpg", description: "Full-Grain Leather, Hand-Stitched, Premium Protection", category: "Accessories", badge: "NEW", slug: "leather-phone-case", aliases: ["phone-case"], price: 49,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/card-holder.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/card-holder.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/card-holder.jpg" },
    ]},
  { id: 4, name: "Leather Gloves", image: "/images/gloves.jpg", description: "Full-Grain Leather, Winter Luxury, Hand-Stitched", category: "Accessories", badge: "NEW", slug: "leather-gloves", aliases: ["gloves"], price: 59,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/gloves.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/gloves.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/gloves.jpg" },
    ]},
  { id: 5, name: "Leather Watch Strap", image: "/images/belt.jpg", description: "Vegetable-Tanned, Hand-Stitched, Fits All Watches", category: "Accessories", badge: "NEW", slug: "leather-watch-strap", aliases: ["watch-strap"], price: 39,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/belt.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/belt.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/belt.jpg" },
    ]},
  { id: 6, name: "Leather Tag + Keychain Set", image: "/images/key-holder.jpg", description: "Custom Name / Logo Engraving Available - KROSSFORD", category: "Custom", badge: "CUSTOM LOGO", slug: "leather-tag-keychain-set", aliases: ["tag-keychain-set", "keychain-set", "key-chain"], price: 25,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/key-holder.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/key-holder.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/key-holder.jpg" },
    ]},
  { id: 7, name: "Leather Desk Mat", image: "/images/leather-journal.jpg", description: "Full-Grain, Office Luxury, Large Desk Pad", category: "Office", badge: "NEW", slug: "leather-desk-mat", aliases: ["desk-mat"], price: 79,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/leather-journal.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/leather-journal.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/leather-journal.jpg" },
    ]},
  { id: 8, name: "Crossbody Messenger Bag", image: "/images/crossbody-messenger-bag.jpg", description: "Cognac Brown, Full-Grain Leather, Adjustable Shoulder Strap, Brass Buckle", category: "Bags", badge: "BEST SELLER", slug: "crossbody-messenger-bag", aliases: ["messenger-bag", "crossbody-bag"], price: 119,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/crossbody-messenger-bag.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/crossbody-messenger-bag.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/crossbody-messenger-bag.jpg" },
    ]},
  { id: 9, name: "Card Holder - Minimalist", image: "/images/card-holder.jpg", description: "Dark Brown, Full-Grain Leather, 4 Card Slots, Hand-Stitched - Premium Quality. Honest Price. Built To Last.", category: "Wallets", badge: "BEST SELLER", slug: "card-holder", aliases: ["cardholder", "card-holder-minimalist", "minimalist-card-holder"], price: 29,
    colors: [
      { name: "Jet Black", code: "#111111", image: "/images/card-holder.jpg" },
      { name: "Dark Brown", code: "#3E2723", image: "/images/card-holder.jpg" },
      { name: "Cognac Tan", code: "#B87333", image: "/images/card-holder.jpg" },
    ]},
];

// Helper - kahin se bhi product dhoondho: slug / id / name / purana slug
export const normalizeSlug = (s: string | number | null | undefined): string =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const findProductBySlug = (slug: string | number | null | undefined): Product | undefined => {
  const target = normalizeSlug(slug);
  return products.find((p) => {
    const all: (string | number)[] = [p.slug, p.id, p.name, ...(p.aliases || [])];
    return all.some((c) => normalizeSlug(c) === target);
  });
};