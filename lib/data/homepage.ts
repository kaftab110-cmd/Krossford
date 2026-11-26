// lib/data/homepage.ts - FIXED - RETAIL + WHOLESALE - Since 2025
// FIXES:
// 1. Repetitive "100% Genuine Leather - Hide As Confirmed..." - 7 baar tha - AB SIRF 1 BAAR - Hero me - Baaki jagah dobara NAHI
// 2. "Made in Pakistan" KHATAM - Manufacturing kahin se bhi ho sakti hai - Customer-facing me location fix NAHI karte - Sirf KROSSFORD
// 3. Video SEO Keywords - Natural tarike se - Full-Grain / Vegetable-Tanned / Handcrafted / Handmade / Custom Design / Sample Before Bulk / Leather Care
// 4. No third-party mention - Sirf KROSSFORD - Koi partner / manufacturer / Sialkot / Turkey ka zikr NAHI
// 5. Structure SAME hai - Koi key delete NAHI ki - Sirf text saaf kiya - Taake koi component na toote

export const hero = {
  title: "KROSSFORD",
  subtitle: "Handcrafted Full-Grain Leather Goods — Hide Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel) | Sample Before Bulk | Since 2025",
  image: "/images/leather-duffle-bag.jpg",
  button: "SHOP COLLECTION",
};

export const homepageProducts = [
  { id: 7, name: "Travel Duffle Bag", image: "/images/leather-duffle-bag.jpg", title: "Travel Duffle Bag", description: "Cognac Brown, Full-Grain Leather", href: "/product/travel-duffle-bag" },
  { id: 1, name: "Leather Messenger Bag", image: "/images/messenger-bag.jpg", title: "Leather Messenger Bag", description: "Dark Brown, Full-Grain Leather", href: "/product/leather-messenger-bag" },
  { id: 5, name: "Minimalist RFID Wallet", image: "/images/wallet.jpg", title: "Minimalist RFID Wallet", description: "Full-Grain, RFID Blocking", href: "/product/minimalist-rfid-wallet" },
  { id: 4, name: "Waist Bag / Fanny Pack", image: "/images/fanny-pack.jpg", title: "Waist Bag", description: "Vintage Brown, Full-Grain", href: "/product/waist-bag-fanny-pack" },
];

export const brandStorySection = {
  title: "KROSSFORD",
  subtitle: "Premium Full-Grain Leather Goods - Retail + Wholesale",
  description: "Handcrafted leather bags, wallets and belts. Order a paid sample first, then order bulk with confidence. Custom logo and name engraving available.",
  image: "/images/leather-duffle-bag.jpg",
  button: "SHOP RETAIL - 1 PIECE",
  stories: [
    { id: 1, title: "Genuine Leather", description: "Full-grain, genuine leather. Hide type confirmed in writing before you order.", image: "/images/leather-duffle-bag.jpg" },
    { id: 2, title: "Handicraft", description: "Handcrafted with strong hand-finishing, built for long life.", image: "/images/wallet.jpg" },
    { id: 3, title: "Sample Before Bulk", description: "Custom Logo Available - KROSSFORD", image: "/images/belt.jpg" },
  ],
  items: [
    { id: 1, title: "Genuine Leather", description: "Full-grain, genuine leather. Hide type confirmed in writing." },
    { id: 2, title: "Handicraft", description: "Handcrafted with care." },
    { id: 3, title: "Sample Before Bulk", description: "Custom Logo Available" },
  ],
};

export const craftsmanshipSection = {
  title: "Handcrafted Excellence",
  subtitle: "Full-Grain Leather - Handicraft",
  description: "Vegetable-tanned leather, brass fittings, hand-finished by KROSSFORD for customers and buyers worldwide. Clean, condition and store dry — your leather stays beautiful for years.",
  image: "/images/belt.jpg",
  items: [
    { id: 1, title: "Full-Grain Leather", description: "Full-grain leather that ages beautifully and lasts for years.", image: "/images/belt.jpg" },
    { id: 2, title: "Handicraft", description: "Strong hand-finishing, careful hand-finishing, long life.", image: "/images/wallet.jpg" },
    { id: 3, title: "Custom Logo", description: "Name / Logo Engraving Available", image: "/images/belt.jpg" },
  ],
  features: ["Full-Grain Leather", "Handicraft", "Sample Before Bulk", "Custom Logo Available"],
};

export const featuredProductsSection = {
  label: "Featured Collection",
  title: "KROSSFORD COLLECTION",
  description: "Genuine Leather. Made Honestly. Sample Before Bulk. Retail + Wholesale Both Available.",
  subtitle: "Handcrafted Full-Grain Leather Bags, Wallets & Belts | HD Images | Custom Design",
  products: [
    { id: 1, title: "Leather Messenger Bag", name: "Leather Messenger Bag", description: "Dark Brown, Full-Grain Leather", image: "/images/messenger-bag.jpg", imageUrl: "/images/messenger-bag.jpg", status: "Bestseller", href: "/shop", category: "Bags" },
    { id: 7, title: "Travel Duffle Bag", name: "Travel Duffle Bag", description: "Cognac Brown, Full-Grain Leather", image: "/images/leather-duffle-bag.jpg", imageUrl: "/images/leather-duffle-bag.jpg", status: "New", href: "/shop", category: "Bags" },
    { id: 5, title: "Minimalist RFID Wallet", name: "Minimalist RFID Wallet", description: "Full-Grain, RFID Blocking", image: "/images/wallet.jpg", imageUrl: "/images/wallet.jpg", status: "Featured", href: "/shop", category: "Wallets" },
    { id: 3, title: "Vegetable-Tanned Belt", name: "Vegetable-Tanned Belt", description: "Dark Brown, Vegetable-Tanned", image: "/images/belt.jpg", imageUrl: "/images/belt.jpg", status: "Handmade", href: "/shop", category: "Belts" },
  ],
  items: [
    { id: 1, name: "Leather Messenger Bag", image: "/images/messenger-bag.jpg", title: "Leather Messenger Bag", description: "Dark Brown, Full-Grain Leather", href: "/shop", category: "Bags" },
    { id: 7, name: "Travel Duffle Bag", image: "/images/leather-duffle-bag.jpg", title: "Travel Duffle Bag", description: "Cognac Brown, Full-Grain Leather", href: "/shop", category: "Bags" },
    { id: 5, name: "Minimalist RFID Wallet", image: "/images/wallet.jpg", title: "Minimalist RFID Wallet", description: "Full-Grain, RFID Blocking", href: "/shop", category: "Wallets" },
    { id: 3, name: "Vegetable-Tanned Belt", image: "/images/belt.jpg", title: "Vegetable-Tanned Belt", description: "Dark Brown, Vegetable-Tanned", href: "/shop", category: "Belts" },
  ],
};

export const footerInfo = {
  payments: "VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER / T/T",
  paymentNote: "Retail: 100% Secure Advance Payment | Wholesale: 50% Advance - 50% Before Dispatch",
  copyright: "© 2025 KROSSFORD ENTERPRISES",
};