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
};

export const products: Product[] = [
  { id: 1, name: "Crossbody Messenger Bag", image: "/images/products/leather-messenger-bag.jpg", description: "Vintage Brown, Full-Grain Leather, Shoulder Strap - Office + Travel", category: "Bags", badge: "BEST SELLER", slug: "crossbody-messenger-bag", price: 119 },
  { id: 2, name: "Custom-Engraved Belt Pouch", image: "/images/products/belt-pouch.jpg", description: "Dark Brown, Full-Grain, Custom Name Plate Available - KROSSFORD", category: "Custom", badge: "CUSTOM LOGO", slug: "custom-engraved-belt-pouch", price: 49 },
  { id: 3, name: "Vegetable-Tanned Belt", image: "/images/products/belt.jpg", description: "Dark Brown, Vegetable-Tanned, Brass Buckle, Handicraft", category: "Belts", badge: "", slug: "vegetable-tanned-belt", price: 59 },
  { id: 4, name: "Waist Bag / Fanny Pack", image: "/images/products/fanny-pack.jpg", description: "Vintage Brown, Functional Luxury, Belt Bag - Since 2025 Trending", category: "Bags", badge: "TRENDING", slug: "waist-bag-fanny-pack", price: 89 },
  { id: 5, name: "Minimalist RFID Wallet", image: "/images/products/wallet.jpg", description: "Full-Grain, RFID Blocking, Handicraft - Colour: Brown / Pink", category: "Wallets", badge: "BEST SELLER", slug: "minimalist-rfid-wallet", price: 49 },
  { id: 6, name: "3-Piece Business Set", image: "/images/products/business-set.jpg", description: "Duffle Bag + Briefcase + Pouch - Vintage Brown, Gift Set / Combo", category: "Sets", badge: "GIFT SET", slug: "3-piece-business-set", price: 249 },
  { id: 7, name: "Travel Duffle Bag", image: "/images/products/leather-duffle-bag.jpg", description: "Cognac Brown, Full-Grain Leather, Travel Duffel - HOME PAGE MAIN", category: "Bags", badge: "HOME MAIN", slug: "travel-duffle-bag", price: 189 },
  { id: 8, name: "Card Holder - Minimalist", image: "/images/products/cardholder-open.jpg", description: "Dark Brown, Full-Grain, 4 Card Slots, Handicraft - Premium Quality. Honest Price. Built To Last.", category: "Wallets", badge: "BEST SELLER", slug: "card-holder", price: 29 },
  { id: 9, name: "Ladies Wallet - Pink", image: "/images/products/wallet-pink.jpg", description: "Same RFID Wallet, Ladies Colour - Pink, Soft Grain Leather", category: "Wallets", badge: "LADIES", slug: "ladies-wallet-pink", price: 49 },
  { id: 10, name: "Leather Tag + Keychain Set", image: "/images/products/key-holder.jpg", description: "Custom Name / Logo Engraving Available - Small Gift, Long Life.", category: "Custom", badge: "CUSTOM LOGO", slug: "leather-tag-keychain-set", price: 25 },
];

// Helper - product page / cart ko yahi use karna hai, dobara hardcode nahi karna
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const footerInfo = {
  payments: "VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER / T/T",
  paymentNote: "50% Advance - 50% Before Dispatch",
  copyright: "© 2025 KROSSFORD ENTERPRISES",
  guarantee: "100% Real Leather Guarantee | Sample Before Bulk | Custom Logo Available"
};
