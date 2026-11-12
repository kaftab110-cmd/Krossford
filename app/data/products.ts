// FILE 1 - app/data/products.ts - KROSSFORD FINAL - HOME PAGE DATA
// Single source of truth for HOME PAGE products. Do NOT duplicate this list in other files.
// Product page / cart / shop must import from here or from lib/data/shop.ts which re-exports this.

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  category: "Bags" | "Custom" | "Belts" | "Wallets" | "Sets";
  badge: string;
  slug: string;
  price: number;
  forHer: boolean;
};

export const products: Product[] = [
  { id: 1, name: "Crossbody Messenger Bag", image: "/images/crossbody-messenger-bag2.jpg", description: "Vintage Brown, Full-Grain Leather, Shoulder Strap - Office + Travel", category: "Bags", badge: "BEST SELLER", slug: "crossbody-messenger-bag", price: 119, forHer: false },
  { id: 2, name: "Custom-Engraved Belt Pouch", image: "/images/belt-pouch-1.jpg", description: "Dark Brown, Full-Grain, Custom Name Plate Available - KROSSFORD", category: "Custom", badge: "CUSTOM LOGO", slug: "custom-engraved-belt-pouch", price: 49, forHer: false },
  { id: 3, name: "Vegetable-Tanned Belt", image: "/images/belt.jpg", description: "Dark Brown, Vegetable-Tanned, Brass Buckle, Handicraft", category: "Belts", badge: "", slug: "vegetable-tanned-belt", price: 59, forHer: false },
  { id: 4, name: "Waist Bag / Fanny Pack", image: "/images/fanny-pack.jpg", description: "Vintage Brown, Functional Luxury, Belt Bag - Since 2025 Trending", category: "Bags", badge: "TRENDING", slug: "waist-bag-fanny-pack", price: 89, forHer: false },
  { id: 5, name: "Minimalist RFID Wallet", image: "/images/wallet.jpg", description: "Full-Grain, RFID Blocking, Handicraft", category: "Wallets", badge: "BEST SELLER", slug: "minimalist-rfid-wallet", price: 49, forHer: false },
  { id: 6, name: "3-Piece Business Set", image: "/images/business-set.jpg", description: "Duffle Bag + Briefcase + Pouch - Vintage Brown, Gift Set / Combo", category: "Sets", badge: "GIFT SET", slug: "3-piece-business-set", price: 249, forHer: false },
  { id: 7, name: "Travel Duffle Bag", image: "/images/leather-duffle-bag.jpg", description: "Cognac Brown, Full-Grain Leather, Travel Duffel", category: "Bags", badge: "HOME MAIN", slug: "travel-duffle-bag", price: 189, forHer: false },
  { id: 8, name: "Card Holder - Minimalist", image: "/images/card-holder.jpg", description: "Dark Brown, Full-Grain, 4 Card Slots, Handicraft - Premium Quality. Honest Price. Built To Last.", category: "Wallets", badge: "BEST SELLER", slug: "card-holder", price: 29, forHer: false },
  { id: 9, name: "Ladies Wallet", image: "/images/ladies-wallet.jpg", description: "Soft Grain Leather, RFID Blocking, Compact Design for Her", category: "Wallets", badge: "LADIES", slug: "ladies-wallet", price: 49, forHer: true },
  { id: 10, name: "Leather Tag + Keychain Set", image: "/images/leather-tag-keychain-set1.jpg", description: "Custom Name / Logo Engraving Available - Small Gift, Long Life.", category: "Custom", badge: "CUSTOM LOGO", slug: "leather-tag-keychain-set", price: 25, forHer: false },
];

// Shared helper for product and cart pages to avoid duplicating product data.
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const footerInfo = {
  payments: "VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER",
  paymentNote: "Retail 100% Advance | Wholesale 50% Advance - 50% Before Dispatch",
  copyright: "© 2026 KROSSFORD ENTERPRISES",
  guarantee: "100% Real Leather Guarantee | Sample Before Bulk | Custom Logo Available"
};