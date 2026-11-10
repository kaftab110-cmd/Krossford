export type ForHerCategory = {
  label: string;
  href: string;
};

export const FOR_HER_CATS: ForHerCategory[] = [
  { label: "All For Her", href: "/for-her" },
  { label: "Jackets & Coats", href: "/for-her?cat=Jackets & Coats" },
  { label: "Long Leather Coats", href: "/for-her?cat=Long Leather Coats" },
  { label: "Fringe Jackets & Coats", href: "/for-her?cat=Fringe Jackets & Coats" },
  { label: "Leather Corsets", href: "/for-her?cat=Leather Corsets" },
  { label: "Leather Dresses", href: "/for-her?cat=Leather Dresses" },
  { label: "Handbags & Tote Bags", href: "/for-her?cat=Bags" },
  { label: "Crossbody Bags", href: "/for-her?cat=Crossbody" },
  { label: "Wallets For Her", href: "/for-her?cat=Wallets" },
  { label: "Card Holders", href: "/for-her?cat=Card Holders" },
  { label: "Belts For Her", href: "/for-her?cat=Belts" },
  { label: "Accessories & Gifts", href: "/for-her?cat=Accessories" },
  { label: "Innerwear - Upcoming", href: "/for-her?cat=Innerwear" },
  { label: "Custom & Gifts For Her", href: "/for-her?cat=Custom & Gifts" },
];

export type ForHerProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  tag?: string;
  status?: "live" | "upcoming";
  description?: string;
};

export const FOR_HER_PRODUCTS: ForHerProduct[] = [
  {
    id: "for-her-corset-dress",
    name: "Leather Corset Dress - Lace-Up - For Her",
    price: 189,
    image: "/products/for-her/corset-dress.jpg",
    category: "Leather Dresses",
    tag: "SELECTED",
    status: "live",
    description: "Handcrafted full-grain leather corset dress. Lace-up front, belted waist. Made to order.",
  },
  {
    id: "for-her-long-leather-coat",
    name: "Long Leather Coat - Premium - For Her",
    price: 249,
    image: "/products/for-her/long-leather-coat.jpg",
    category: "Long Leather Coats",
    tag: "PREMIUM",
    status: "live",
    description: "Direct manufacturer premium long leather coat. Custom sizing available.",
  },
  {
    id: "for-her-fringe-jacket-white",
    name: "Fringe Leather Jacket - White - For Her",
    price: 179,
    image: "/products/for-her/fringe-jacket-white.jpg",
    category: "Fringe Jackets & Coats",
    tag: "NEW",
    status: "live",
    description: "White fringe leather jacket. Hand-stitched fringe detail.",
  },
  {
    id: "for-her-fringe-jacket-black",
    name: "Fringe Leather Jacket - Black - For Her",
    price: 179,
    image: "/products/for-her/fringe-jacket-black.jpg",
    category: "Fringe Jackets & Coats",
    tag: "NEW",
    status: "live",
    description: "Black fringe leather jacket. Same style in black.",
  },
  {
    id: "for-her-fringe-vest",
    name: "Fringe Leather Vest - Embroidered - For Her",
    price: 149,
    image: "/products/for-her/fringe-vest.jpg",
    category: "Fringe Jackets & Coats",
    tag: "NEW",
    status: "live",
    description: "Sleeveless fringe vest with embroidered detail.",
  },
  {
    id: "for-her-harness-corset-brown",
    name: "Leather Harness Corset - Brown - For Her",
    price: 169,
    image: "/products/for-her/harness-corset-brown.jpg",
    category: "Leather Corsets",
    tag: "SELECTED",
    status: "live",
    description: "Brown leather harness corset with buckle straps. Outerwear style.",
  },
  {
    id: "for-her-harness-corset-red",
    name: "Leather Harness Corset - Red - For Her",
    price: 169,
    image: "/products/for-her/harness-corset-red.jpg",
    category: "Leather Corsets",
    tag: "SELECTED",
    status: "live",
    description: "Red leather harness corset with buckle straps. Outerwear style.",
  },
  {
    id: "for-her-leather-gloves",
    name: "Leather Gloves - For Her",
    price: 49,
    image: "/products/gloves.jpg",
    category: "Accessories",
    tag: "FOR HER",
    status: "live",
  },
  {
    id: "for-her-card-holder",
    name: "Card Holder - For Her",
    price: 35,
    image: "/products/card-holder.jpg",
    category: "Card Holders",
    tag: "BEST SELLER",
    status: "live",
  },
  {
    id: "for-her-passport-holder",
    name: "Leather Passport Holder - For Her",
    price: 45,
    image: "/products/passport-holder.jpg",
    category: "Travel & Office",
    tag: "NEW",
    status: "live",
  },
  {
    id: "for-her-innerwear-1",
    name: "Innerwear Collection - For Her - Coming Soon",
    price: 0,
    image: "/products/for-her/innerwear-coming-soon.jpg",
    category: "Innerwear",
    tag: "UPCOMING",
    status: "upcoming",
    description: "Upcoming collection. Enquiry on WhatsApp for custom orders.",
  },
];
