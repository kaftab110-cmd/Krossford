// lib/data/shop.ts - LOW TO HIGH SORTED: $25 -> $29 -> $39 -> $49 ...
// RULE: Price Kabhi Nahi Badlegi - Design / Colour Badalne Se Bhi Price Same!
// NOTE: Leather Boots / Footwear - Abhi Ke Liye Khatam Kiya Hua Hai - Neeche Comment Me Pura Hai!
// SLIDER RULE: Gallery Me Sirf ALAG Photos Dalni Hain - Ek Hi Photo 5 Baar Nahi Dalni - Warna Arrow Dabane Pe Photo Badlegi Nahi!

export type ProductColor = { name: string; code: string; image: string };
export type Product = {
  id: number; name: string; image: string; gallery: string[];
  description: string; category: string; badge: string;
  slug: string; aliases: string[]; price: number; colors: ProductColor[];
};

export const CATEGORIES = [
  "All", "Wallets", "Card Holders", "Belts", "Bags",
  "Apparel", "Accessories", "Travel & Office", "Custom & Gifts",
] as const;

const COLORS = (img: string): ProductColor[] => [
  { name: "Jet Black", code: "#111111", image: img },
  { name: "Dark Brown", code: "#3E2723", image: img },
  { name: "Cognac Tan", code: "#B87333", image: img },
];

// SORTED: Sab Se Sasta Pehle!
export const products: Product[] = [
  // $25
  { id: 1, name: "Leather Tag + Keychain Set", image: "/images/leather-tag-keychain-set.jpg", gallery: ["/images/leather-tag-keychain-set.jpg"], description: "Custom Name / Logo Engraving Available - KROSSFORD", category: "Custom & Gifts", badge: "CUSTOM LOGO", slug: "leather-tag-keychain-set", aliases: ["keychain-set"], price: 25, colors: COLORS("/images/leather-tag-keychain-set.jpg") },
  // $29 - ✅ 7 ALAG PHOTOS - IS ME SLIDER CHALEGA!
  { id: 2, name: "Card Holder", image: "/images/card-holder.jpg", gallery: ["/images/card-holder.jpg", "/images/card-holder-2.jpg", "/images/card-holder-3.jpg", "/images/card-holder-4.jpg", "/images/card-holder-5.jpg", "/images/card-holder-6.jpg", "/images/card-holder-7.jpg"], description: "Slim, 4-6 Card Slots, Full-Grain Leather - 7 Designs Available - Price Same Rahegi!", category: "Card Holders", badge: "BEST SELLER", slug: "card-holder", aliases: ["cardholder"], price: 29, colors: COLORS("/images/card-holder.jpg") },
  // $39 - Sab $39 Wale Ek Saath
  // NOTE: Belt Ki 5 Alag Photos Abhi Nahi Hain - Is Liye Sirf 1 Photo Rakhi Hai - Jab 5 Buckle Designs Ki Photos Aa Jayein To Yahan Add Kar Dena - Tab Slider Chalega!
  { id: 3, name: "Leather Belt", image: "/images/belt.jpg", gallery: ["/images/belt.jpg"], description: "Full-Grain, Brass / Black / Silver Buckle - 5 Buckle Designs - Price Same Rahegi!", category: "Belts", badge: "BEST SELLER", slug: "leather-belt", aliases: ["belt"], price: 39, colors: COLORS("/images/belt.jpg") },
  { id: 4, name: "Leather Watch Strap", image: "/images/leather-watch-strap.jpg", gallery: ["/images/leather-watch-strap.jpg"], description: "Fits All Watches, Hand-Stitched", category: "Accessories", badge: "NEW", slug: "leather-watch-strap", aliases: ["watch-strap"], price: 39, colors: COLORS("/images/leather-watch-strap.jpg") },
  { id: 5, name: "Leather Passport Holder", image: "/images/leather-passport-holder.jpg", gallery: ["/images/leather-passport-holder.jpg"], description: "Passport + Cards + Boarding Pass", category: "Travel & Office", badge: "NEW", slug: "leather-passport-holder", aliases: ["passport-holder"], price: 39, colors: COLORS("/images/leather-passport-holder.jpg") },
  // $45
  { id: 6, name: "Leather Cap", image: "/images/leather-cap.jpg", gallery: ["/images/leather-cap.jpg"], description: "Adjustable, Premium Cap", category: "Accessories", badge: "NEW", slug: "leather-cap", aliases: ["cap"], price: 45, colors: COLORS("/images/leather-cap.jpg") },
  // $49 - Sab $49 Wale Ek Saath
  // NOTE: Wallet Ki 5 Alag Photos Abhi Nahi Hain - Is Liye Sirf 1 Photo Rakhi Hai!
  { id: 7, name: "Bifold Wallet", image: "/images/wallet.jpg", gallery: ["/images/wallet.jpg"], description: "Full-Grain Leather, 6 Card Slots, Cash Pocket - 5 Designs - Price Same Rahegi!", category: "Wallets", badge: "BEST SELLER", slug: "bifold-wallet", aliases: ["wallet", "leather-bifold-wallet"], price: 49, colors: COLORS("/images/wallet.jpg") },
  { id: 8, name: "Leather Phone Case", image: "/images/leather-phone-case.jpg", gallery: ["/images/leather-phone-case.jpg"], description: "Card Slots, Premium Protection", category: "Accessories", badge: "NEW", slug: "leather-phone-case", aliases: ["phone-case"], price: 49, colors: COLORS("/images/leather-phone-case.jpg") },
  // $59
  { id: 9, name: "Leather Gloves", image: "/images/gloves.jpg", gallery: ["/images/gloves.jpg"], description: "Winter Luxury, Hand-Stitched", category: "Accessories", badge: "NEW", slug: "leather-gloves", aliases: ["gloves"], price: 59, colors: COLORS("/images/gloves.jpg") },
  { id: 10, name: "Leather Tool Roll", image: "/images/leather-tool-roll.jpg", gallery: ["/images/leather-tool-roll.jpg"], description: "Roll-Up Organizer", category: "Travel & Office", badge: "NEW", slug: "leather-tool-roll", aliases: ["tool-roll"], price: 59, colors: COLORS("/images/leather-tool-roll.jpg") },
  // $69
  { id: 11, name: "Leather Fanny Pack", image: "/images/fanny-pack.jpg", gallery: ["/images/fanny-pack.jpg"], description: "Sling Bag, Compact & Stylish", category: "Bags", badge: "NEW", slug: "leather-fanny-pack", aliases: ["fanny-pack"], price: 69, colors: COLORS("/images/fanny-pack.jpg") },
  { id: 12, name: "Leather Apron", image: "/images/leather-apron.jpg", gallery: ["/images/leather-apron.jpg"], description: "Workshop, Kitchen & Craft", category: "Accessories", badge: "NEW", slug: "leather-apron", aliases: ["apron"], price: 69, colors: COLORS("/images/leather-apron.jpg") },
  // $79
  { id: 13, name: "Leather Journal", image: "/images/leather-journal.jpg", gallery: ["/images/leather-journal.jpg"], description: "Premium Paper, Hand-Stitched", category: "Travel & Office", badge: "BEST SELLER", slug: "leather-journal", aliases: ["journal"], price: 79, colors: COLORS("/images/leather-journal.jpg") },
  { id: 14, name: "Leather Desk Mat", image: "/images/leather-desk-mat.jpg", gallery: ["/images/leather-desk-mat.jpg"], description: "Office Luxury, Large Desk Pad", category: "Travel & Office", badge: "NEW", slug: "leather-desk-mat", aliases: ["desk-mat"], price: 79, colors: COLORS("/images/leather-desk-mat.jpg") },
  // $119
  { id: 15, name: "Crossbody Messenger Bag", image: "/images/crossbody-messenger-bag.jpg", gallery: ["/images/crossbody-messenger-bag.jpg"], description: "Cognac Brown, Adjustable Shoulder Strap, Brass Buckle", category: "Bags", badge: "BEST SELLER", slug: "crossbody-messenger-bag", aliases: ["crossbody-bag"], price: 119, colors: COLORS("/images/crossbody-messenger-bag.jpg") },
  // $129
  { id: 16, name: "Leather Tote Bag", image: "/images/tote-bag.jpg", gallery: ["/images/tote-bag.jpg"], description: "Full-Grain Leather, Large Capacity, Hand-Stitched", category: "Bags", badge: "BEST SELLER", slug: "leather-tote-bag", aliases: ["tote-bag"], price: 129, colors: COLORS("/images/tote-bag.jpg") },
  { id: 17, name: "Leather Messenger Bag", image: "/images/messenger-bag.jpg", gallery: ["/images/messenger-bag.jpg"], description: "Double Buckle Flap, Front Zip Pocket", category: "Bags", badge: "NEW", slug: "leather-messenger-bag", aliases: ["vintage-leather-backpack"], price: 129, colors: COLORS("/images/messenger-bag.jpg") },
  // $139
  { id: 18, name: "Leather Vest", image: "/images/leather-vest.jpg", gallery: ["/images/leather-vest.jpg"], description: "Classic Fit, Biker & Casual", category: "Apparel", badge: "NEW", slug: "leather-vest", aliases: ["vest"], price: 139, colors: COLORS("/images/leather-vest.jpg") },
  // $149
  { id: 20, name: "Leather Pants", image: "/images/leather-pants.jpg", gallery: ["/images/leather-pants.jpg"], description: "Slim Fit, Premium Biker Pants", category: "Apparel", badge: "NEW", slug: "leather-pants", aliases: ["pants"], price: 149, colors: COLORS("/images/leather-pants.jpg") },
  // $189
  { id: 22, name: "Travel Duffle Bag", image: "/images/leather-duffle-bag.jpg", gallery: ["/images/leather-duffle-bag.jpg"], description: "Large Capacity, Adjustable Strap", category: "Travel & Office", badge: "BEST SELLER", slug: "travel-duffle-bag", aliases: ["duffle-bag"], price: 189, colors: COLORS("/images/leather-duffle-bag.jpg") },
  // $199
  { id: 23, name: "Bomber Jacket", image: "/images/bomber-jacket.jpg", gallery: ["/images/bomber-jacket.jpg"], description: "Bomber Style, Premium Everyday", category: "Apparel", badge: "BEST SELLER", slug: "bomber-jacket", aliases: ["bomber"], price: 199, colors: COLORS("/images/bomber-jacket.jpg") },
  // $219
  { id: 24, name: "Biker Jacket", image: "/images/biker-jacket.jpg", gallery: ["/images/biker-jacket.jpg"], description: "Classic Biker, Full-Grain Leather", category: "Apparel", badge: "BEST SELLER", slug: "biker-jacket", aliases: ["biker"], price: 219, colors: COLORS("/images/biker-jacket.jpg") },
  // $349
  { id: 25, name: "Biker Suit", image: "/images/biker-suit.jpg", gallery: ["/images/biker-suit.jpg"], description: "Full Protection, Professional", category: "Apparel", badge: "BEST SELLER", slug: "biker-suit", aliases: [], price: 349, colors: COLORS("/images/biker-suit.jpg") },

  // FOOTWEAR - ABHI KE LIYE BAND HAI - Jab Photo Aa Jaye To // Hata Ke Wapas Laga Dena
  // { id: 19, name: "Leather Loafers", image: "/images/leather-loafers.jpg", gallery: ["/images/leather-loafers.jpg"], description: "Penny Loafers, Comfort + Style", category: "Footwear", badge: "NEW", slug: "leather-loafers", aliases: ["loafers"], price: 139, colors: COLORS("/images/leather-loafers.jpg") },
  // { id: 21, name: "Leather Boots", image: "/images/leather-boots.jpg", gallery: ["/images/leather-boots.jpg"], description: "Ankle Boots, Durable, Premium", category: "Footwear", badge: "NEW", slug: "leather-boots", aliases: ["boots"], price: 179, colors: COLORS("/images/leather-boots.jpg") },
];

export const normalizeSlug = (s: string | number | null | undefined): string =>
  String(s ?? "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const findProductBySlug = (slug: string | number | null | undefined): Product | undefined => {
  const target = normalizeSlug(slug);
  return products.find((p) => {
    const all: (string | number)[] = [p.slug, p.id, p.name, ...(p.aliases || [])];
    return all.some((c) => normalizeSlug(c) === target);
  });
};