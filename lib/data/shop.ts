export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  leather: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "EXECUTIVE LEATHER JACKET",
    category: "JACKETS",
    price: 450,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    leather: "Full-Grain Butter-Soft Cowhide",
    badge: "B2B Flagship"
  },
  {
    id: "2",
    name: "MINIMALIST TRAVEL DUFFLE",
    category: "BAGS",
    price: 380,
    image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=800&q=80",
    leather: "Full-Grain Waxed Cow Leather",
    badge: "Wholesale Hotspot"
  },
  {
    id: "3",
    name: "BESPOKE DRESS BELT",
    category: "BELTS",
    price: 90,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    leather: "Vegetable-Tanned Italian Leather"
  },
  {
    id: "4",
    name: "SLIM EXECUTIVE BRIEFCASE",
    category: "BAGS",
    price: 420,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    leather: "Full-Grain Pebble Grain Hide",
    badge: "Private Label"
  },
  {
    id: "5",
    name: "MINIMALIST CARD WALLET",
    category: "WALLETS",
    price: 65,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    leather: "Full-Grain Nappa Leather"
  },
  {
    id: "6",
    name: "ARCHITECTURAL LAPTOP SLEEVE",
    category: "LAPTOP BAGS",
    price: 150,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    leather: "Full-Grain Matte Black Cowhide"
  }
];