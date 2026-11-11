// lib/data/shop.ts - KROSSFORD FINAL - SHOP MASTER DATA
// RULE: Price Kabhi Nahi Badlegi - Design / Colour Badalne Se Bhi Price Same!
// RULE: FILE 1 (app/data/products.ts) aur FILE 2 (lib/data/shop.ts) me slug + price + name SAME hone chahiye
// RULE: LOW TO HIGH SORTED: $25 -> $29 -> $39 -> $49 ...
// NOTE: Leather Boots / Footwear - Abhi Ke Liye Khatam Kiya Hua Hai - Neeche Comment Me Pura Hai!
// SLIDER RULE: Gallery Me Sirf ALAG Photos Dalni Hain - Ek Hi Photo 5 Baar Nahi Dalni - Warna Arrow Dabane Pe Photo Badlegi Nahi!
// HOVER RULE: Card pe mouse / mobile touch aane pe - usi product ki gallery + colors wali images usi box ke andar slide hongi - Har category me same formula!
// RULE: MAX 10 - Har Product Me Zyada Se Zyada 10 Photos - base.jpg, base1.jpg ... base9.jpg
// GALLERY RULE (Step 5 Fix): Gallery me SIRF wo photos jo /public/images me MAUJOOD hain - jo photo nahi hai wo list me nahi hogi - taake "10 Designs" ka jhoota dawa na bane
// FIX: Keychain + Crossbody ki base photo folder me hai hi nahi - is liye unki main photo maujood wali lagai hai
// FOR HER: Navbar me FOR HER button hai - jo product forHer: true hai wo FOR HER me dikhega
// SYNC FIX (FILE1 = FILE2): Crossbody / Belt / Wallet / Fanny / Card Holder / Keychain / Duffle - slug + price dono files me SAME kar diye

export type ProductColor = { name: string; code: string; image: string };
export type Product = {
  id: number; name: string; image: string; gallery: string[];
  description: string; category: string; badge: string;
  slug: string; aliases: string[]; price: number; colors: ProductColor[];
  forHer?: boolean;
};

export const CATEGORIES = [
  "All", "For Her", "Wallets", "Card Holders", "Belts", "Bags",
  "Apparel", "Accessories", "Travel & Office", "Custom & Gifts",
] as const;

const COLORS = (img: string | { black?: string; brown?: string; tan?: string }): ProductColor[] => {
  const fallback = typeof img === "string" ? img : img.black || img.brown || img.tan || "";
  const black = typeof img === "string" ? img : img.black || fallback;
  const brown = typeof img === "string" ? img : img.brown || fallback;
  const tan = typeof img === "string" ? img : img.tan || fallback;
  return [
    { name: "Jet Black", code: "#111111", image: black },
    { name: "Dark Brown", code: "#3E2723", image: brown },
    { name: "Cognac Tan", code: "#B87333", image: tan },
  ];
};

const GALLERY = (...images: string[]): string[] => [...new Set(images.filter(Boolean))];

const GALLERY_AUTO = (base: string, total: number, sep = ""): string[] => {
  const list: string[] = [];
  for (let i = 0; i < total; i++) {
    if (i === 0) list.push(`/images/${base}.jpg`);
    else list.push(`/images/${base}${sep}${i}.jpg`);
  }
  return [...new Set(list)];
};

// GALLERY_NUM - Jab base.jpg (bina number wali) folder me nahi hai, sirf 1,2,3... wali hain
// Example: Keychain me sirf set1.jpg, set2.jpg... hain, set.jpg nahi hai
const GALLERY_NUM = (base: string, from: number, to: number, sep = ""): string[] => {
  const list: string[] = [];
  for (let i = from; i <= to; i++) {
    list.push(`/images/${base}${sep}${i}.jpg`);
  }
  return [...new Set(list)];
};

export const products: Product[] = [
  { id: 1, name: "Leather Tag + Keychain Set", image: "/images/leather-tag-keychain-set1.jpg", gallery: GALLERY(
    "/images/leather-tag-keychain-set1.jpg", "/images/leather-tag-keychain-set2.jpg",
    "/images/leather-tag-keychain-set4.jpg", "/images/leather-tag-keychain-set5.jpg",
    "/images/leather-tag-keychain-set6.jpg", "/images/leather-tag-keychain-set7.jpg",
  ), description: "For Her - Custom Name / Logo Engraving, Perfect Gift - Keychain + Leather Tag Set, Full-Grain Leather", category: "Custom & Gifts", badge: "CUSTOM LOGO", slug: "leather-tag-keychain-set", aliases: ["keychain-set"], price: 25, colors: COLORS("/images/leather-tag-keychain-set1.jpg"), forHer: true },
  { id: 2, name: "Card Holder", image: "/images/card-holder.jpg", gallery: GALLERY_AUTO("card-holder", 10, "-"), description: "For Her - Slim Card Holder, 4-6 Cards + Cash, Fits Mini Bag & Clutch - Full-Grain Leather, 10 Designs", category: "Card Holders", badge: "BEST SELLER", slug: "card-holder", aliases: ["cardholder", "card-holder-minimalist"], price: 29, colors: COLORS("/images/card-holder.jpg"), forHer: true },
  { id: 5, name: "Leather Passport Holder", image: "/images/leather-passport-holder.jpg", gallery: GALLERY_AUTO("leather-passport-holder", 6), description: "For Her - Travel Essential, Passport + Cards + Boarding Pass, Slim & Secure - 6 Designs", category: "Travel & Office", badge: "NEW", slug: "leather-passport-holder", aliases: ["passport-holder"], price: 39, colors: COLORS("/images/leather-passport-holder.jpg"), forHer: true },
  { id: 4, name: "Leather Watch Strap", image: "/images/leather-watch-strap.jpg", gallery: GALLERY("/images/leather-watch-strap.jpg"), description: "Fits All Watches, Handicraft", category: "Accessories", badge: "NEW", slug: "leather-watch-strap", aliases: ["watch-strap"], price: 39, colors: COLORS("/images/leather-watch-strap.jpg") },
  // SYNC FIX: FILE1 me belt $59 hai (Vegetable-Tanned Belt) - FILE2 me $39 tha, is liye mismatch tha. Ab dono me $59 + slug vegetable-tanned-belt SAME hai. Purana slug alias me rakha hai taake purane links na tootein.
  { id: 3, name: "Vegetable-Tanned Belt", image: "/images/belt.jpg", gallery: GALLERY("/images/belt.jpg", ...GALLERY_NUM("belt", 2, 10)), description: "Dark Brown, Vegetable-Tanned, Brass Buckle, Handicraft - Full-Grain, Brass / Black / Silver Buckle - 10 Buckle Designs - Price Same Rahegi!", category: "Belts", badge: "BEST SELLER", slug: "vegetable-tanned-belt", aliases: ["leather-belt", "belt"], price: 59, colors: COLORS("/images/belt.jpg") },
  { id: 30, name: "Custom-Engraved Belt Pouch", image: "/images/belt-pouch-1.jpg", gallery: GALLERY("/images/belt-pouch-1.jpg", "/images/belt-pouch-2.jpg", "/images/belt-pouch-3.jpg", "/images/belt-pouch-4.jpg", "/images/belt-pouch-5.jpg", "/images/belt-pouch-6.jpg"), description: "Dark Brown, Full-Grain, Custom Name Plate Available - KROSSFORD", category: "Custom & Gifts", badge: "CUSTOM LOGO", slug: "custom-engraved-belt-pouch", aliases: ["belt-pouch"], price: 49, colors: COLORS("/images/belt-pouch-1.jpg") },
  // SYNC FIX: FILE1 = Minimalist RFID Wallet ($49, slug minimalist-rfid-wallet) - FILE2 = Bifold Wallet ($49, slug bifold-wallet). Dono ko ek kiya - naam FILE1 wala, purana slug alias me.
  { id: 7, name: "Minimalist RFID Wallet", image: "/images/wallet.jpg", gallery: GALLERY("/images/wallet.jpg"), description: "Full-Grain, RFID Blocking, Handicraft - Colour: Brown / Pink - Full-Grain Leather, 6 Card Slots, Cash Pocket - Price Same Rahegi!", category: "Wallets", badge: "BEST SELLER", slug: "minimalist-rfid-wallet", aliases: ["bifold-wallet", "wallet", "leather-bifold-wallet"], price: 49, colors: COLORS("/images/wallet.jpg") },
  { id: 31, name: "Ladies Wallet", image: "/images/ladies-wallet-pink-1.jpg", gallery: GALLERY("/images/ladies-wallet-pink-1.jpg", "/images/ladies-wallet-pink-2.jpg", "/images/ladies-wallet-pink-3.jpg", "/images/ladies-wallet-pink-4.jpg", "/images/ladies-wallet-pink-5.jpg", "/images/ladies-wallet-pink-6.jpg", "/images/ladies-wallet-pink-7.jpg", "/images/ladies-wallet-pink-8.jpg", "/images/ladies-wallet-pink-9.jpg", "/images/ladies-wallet-pink-10.jpg"), description: "Same RFID Wallet, Ladies Colour, Soft Grain Leather", category: "Wallets", badge: "LADIES", slug: "ladies-wallet-pink", aliases: ["wallet-pink"], price: 49, colors: COLORS("/images/ladies-wallet-pink-1.jpg"), forHer: true },
  { id: 8, name: "Leather Phone Case", image: "/images/leather-phone-case.jpg", gallery: GALLERY("/images/leather-phone-case.jpg"), description: "Card Slots, Premium Protection", category: "Accessories", badge: "NEW", slug: "leather-phone-case", aliases: ["phone-case"], price: 49, colors: COLORS("/images/leather-phone-case.jpg") },
  { id: 9, name: "Leather Gloves", image: "/images/gloves.jpg", gallery: GALLERY("/images/gloves.jpg"), description: "For Her - Winter Luxury Gloves, Soft Lining, Handicraft - Full-Grain Leather", category: "Accessories", badge: "NEW", slug: "leather-gloves", aliases: ["gloves"], price: 59, colors: COLORS("/images/gloves.jpg"), forHer: true },
  { id: 10, name: "Leather Tool Roll", image: "/images/leather-tool-roll.jpg", gallery: GALLERY("/images/leather-tool-roll.jpg"), description: "Roll-Up Organizer", category: "Travel & Office", badge: "NEW", slug: "leather-tool-roll", aliases: ["tool-roll"], price: 59, colors: COLORS("/images/leather-tool-roll.jpg") },
  // SYNC FIX: FILE1 = Waist Bag / Fanny Pack $89 slug waist-bag-fanny-pack - FILE2 = Leather Fanny Pack $69 slug leather-fanny-pack. Ab dono me $89 + slug waist-bag-fanny-pack SAME hai.
  { id: 11, name: "Waist Bag / Fanny Pack", image: "/images/fanny-pack.jpg", gallery: GALLERY("/images/fanny-pack.jpg"), description: "For Her - Hands-Free Sling Bag, Compact, Phone + Keys + Cards - Everyday & Travel - Vintage Brown, Functional Luxury, Belt Bag - Since 2025 Trending", category: "Bags", badge: "TRENDING", slug: "waist-bag-fanny-pack", aliases: ["leather-fanny-pack", "fanny-pack"], price: 89, colors: COLORS("/images/fanny-pack.jpg"), forHer: true },
  { id: 12, name: "Leather Apron", image: "/images/leather-apron.jpg", gallery: GALLERY("/images/leather-apron.jpg"), description: "Workshop, Kitchen & Craft", category: "Accessories", badge: "NEW", slug: "leather-apron", aliases: ["apron"], price: 69, colors: COLORS("/images/leather-apron.jpg") },
  { id: 13, name: "Leather Journal", image: "/images/leather-journal.jpg", gallery: GALLERY("/images/leather-journal.jpg"), description: "For Her - Leather Journal, Premium Paper, Handicraft - For Notes, Planning & Gifting", category: "Travel & Office", badge: "BEST SELLER", slug: "leather-journal", aliases: ["journal"], price: 79, colors: COLORS("/images/leather-journal.jpg"), forHer: true },
  { id: 14, name: "Leather Desk Mat", image: "/images/leather-desk-mat.jpg", gallery: GALLERY("/images/leather-desk-mat.jpg"), description: "Office Luxury, Large Desk Pad", category: "Travel & Office", badge: "NEW", slug: "leather-desk-mat", aliases: ["desk-mat"], price: 79, colors: COLORS("/images/leather-desk-mat.jpg") },
  { id: 15, name: "Crossbody Messenger Bag", image: "/images/crossbody-messenger-bag2.jpg", gallery: GALLERY_NUM("crossbody-messenger-bag", 2, 7), description: "For Her - Hands-Free Crossbody, Adjustable Strap, Phone + Wallet + Keys, Soft Full-Grain Leather - 6 Designs - Vintage Brown, Full-Grain Leather, Shoulder Strap - Office + Travel", category: "Bags", badge: "BEST SELLER", slug: "crossbody-messenger-bag", aliases: ["crossbody-bag", "leather-messenger-bag"], price: 119, colors: COLORS("/images/crossbody-messenger-bag2.jpg"), forHer: true },
  { id: 16, name: "Leather Tote Bag", image: "/images/tote-bag.jpg", gallery: GALLERY("/images/tote-bag.jpg"), description: "For Her - Structured Work Tote, Fits Laptop + Daily Essentials, Soft Full-Grain Leather, Handicraft - 2026 Everyday Essential", category: "Bags", badge: "BEST SELLER", slug: "leather-tote-bag", aliases: ["tote-bag"], price: 129, colors: COLORS("/images/tote-bag.jpg"), forHer: true },
  { id: 17, name: "Leather Messenger Bag", image: "/images/messenger-bag.jpg", gallery: GALLERY("/images/messenger-bag.jpg"), description: "For Her - Messenger Bag, Double Buckle Flap, Front Zip Pocket, Work + College + Travel - Full-Grain Leather", category: "Bags", badge: "NEW", slug: "leather-messenger-bag", aliases: ["messenger-bag"], price: 129, colors: COLORS("/images/leather-messenger-bag.jpg"), forHer: true },
  { id: 18, name: "Leather Vest", image: "/images/leather-vest.jpg", gallery: GALLERY("/images/leather-vest.jpg"), description: "Classic Fit, Biker & Casual", category: "Apparel", badge: "NEW", slug: "leather-vest", aliases: ["vest"], price: 139, colors: COLORS("/images/leather-vest.jpg") },
  { id: 20, name: "Leather Pants", image: "/images/leather-pants.jpg", gallery: GALLERY("/images/leather-pants.jpg"), description: "Slim Fit, Premium Biker Pants", category: "Apparel", badge: "NEW", slug: "leather-pants", aliases: ["pants"], price: 149, colors: COLORS("/images/leather-pants.jpg") },
  { id: 22, name: "Travel Duffle Bag", image: "/images/leather-duffle-bag.jpg", gallery: GALLERY("/images/leather-duffle-bag.jpg"), description: "Cognac Brown, Full-Grain Leather, Travel Duffel - HOME PAGE MAIN - Large Capacity, Adjustable Strap", category: "Bags", badge: "HOME MAIN", slug: "travel-duffle-bag", aliases: ["duffle-bag"], price: 189, colors: COLORS("/images/leather-duffle-bag.jpg") },
  { id: 23, name: "Bomber Jacket", image: "/images/bomber-jacket.jpg", gallery: GALLERY_AUTO("bomber-jacket", 1), description: "Bomber Style, Premium Everyday", category: "Apparel", badge: "BEST SELLER", slug: "bomber-jacket", aliases: ["bomber"], price: 199, colors: COLORS("/images/bomber-jacket.jpg") },
  { id: 24, name: "Biker Jacket", image: "/images/biker-jacket.jpg", gallery: GALLERY("/images/biker-jacket.jpg"), description: "Classic Biker, Full-Grain Leather", category: "Apparel", badge: "BEST SELLER", slug: "biker-jacket", aliases: ["biker"], price: 219, colors: COLORS("/images/biker-jacket.jpg") },
  { id: 32, name: "3-Piece Business Set", image: "/images/products/business-set.jpg", gallery: GALLERY("/images/products/business-set.jpg"), description: "Duffle Bag + Briefcase + Pouch - Vintage Brown, Gift Set / Combo", category: "Sets", badge: "GIFT SET", slug: "3-piece-business-set", aliases: ["business-set"], price: 249, colors: COLORS("/images/products/business-set.jpg") },
  { id: 25, name: "Biker Suit", image: "/images/biker-suit.jpg", gallery: GALLERY("/images/biker-suit.jpg"), description: "Full Protection, Professional", category: "Apparel", badge: "BEST SELLER", slug: "biker-suit", aliases: [], price: 349, colors: COLORS("/images/biker-suit.jpg") },
  // CAP SKIP - Abhi Ke Liye Khatam Kiya Hua Hai - Photo Ready Hone Pe Wapas Kholein Ge - Delete Nahi Kiya
  // { id: 6, name: "Leather Cap", image: "/images/leather-cap.jpg", gallery: GALLERY_AUTO("leather-cap", 10), description: "Adjustable, Premium Cap", category: "Accessories", badge: "NEW", slug: "leather-cap", aliases: ["cap"], price: 45, colors: COLORS("/images/leather-cap.jpg") },
  // FOR HER - FUTURE - Photo Ready Hone Pe // Hatana Hai - Abhi Comment Me Hai
  // { id: 26, name: "Women's Slouchy Hobo Bag", image: "/images/womens-hobo-bag.jpg", gallery: GALLERY_AUTO("womens-hobo-bag", 10), description: "Soft Slouchy Hobo, Fall 2026 Trend", category: "Bags", badge: "NEW", slug: "womens-hobo-bag", aliases: ["hobo-bag"], price: 119, colors: COLORS("/images/womens-hobo-bag.jpg"), forHer: true },
  // { id: 27, name: "Women's Long Wallet - RFID", image: "/images/womens-long-wallet.jpg", gallery: GALLERY_AUTO("womens-long-wallet", 10), description: "Zip Around, RFID Blocking, Large Capacity", category: "Wallets", badge: "NEW", slug: "womens-long-wallet", aliases: ["long-wallet"], price: 59, colors: COLORS("/images/womens-long-wallet.jpg"), forHer: true },
  // { id: 28, name: "Women's Clutch / Wristlet", image: "/images/womens-clutch.jpg", gallery: GALLERY_AUTO("womens-clutch", 10), description: "Evening Clutch With Wristlet Strap", category: "Bags", badge: "NEW", slug: "womens-clutch", aliases: ["clutch"], price: 69, colors: COLORS("/images/womens-clutch.jpg"), forHer: true },
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

export const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

export const getProductsByCategory = (category: string): Product[] => {
  if (!category || category === "All") return products;
  if (category === "For Her" || category === "for-her" || category === "for her") return products.filter((p) => p.forHer);
  return products.filter((p) => p.category === category);
};

export const getForHerProducts = (): Product[] => products.filter((p) => p.forHer);

export const searchProducts = (query: string): Product[] => {
  const q = normalizeSlug(query);
  if (!q) return products;
  return products.filter((p) =>
    [p.name, p.description, p.category, p.slug, ...(p.aliases || [])]
      .some((field) => normalizeSlug(field).includes(q))
  );
};

export const getRelatedProducts = (product: Product, count = 4): Product[] =>
  products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, count);

export const bestSellers = products.filter((p) => p.badge === "BEST SELLER");

export const getCardSliderImages = (product: Product): string[] => {
  const all = [product.image, ...(product.gallery || []), ...(product.colors || []).map((c) => c.image)];
  return [...new Set(all.filter(Boolean))];
};

export const hasCardSlider = (product: Product): boolean => getCardSliderImages(product).length > 1;

export const HOVER_SLIDE_DELAY = 1800;