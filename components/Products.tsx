// FILE 2 - app/components/Products.tsx - COPY KARKE PASTE KARO
"use client";
import { useState } from "react";
import Image from "next/image";
import { products } from "@/app/data/products";

const categories = ["ALL", "BAGS", "WALLETS", "BELTS", "CUSTOM", "SETS"];

export default function Products() {
  const [active, setActive] = useState("ALL");
  const filtered = active === "ALL" ? products : products.filter(p => p.category.toUpperCase() === active);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center">KROSSFORD COLLECTION</h2>
      <p className="text-center mt-2">100% Full-Grain Leather | HD Images | Sample Before Bulk</p>

      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {categories.map(c => (
          <button key={c} onClick={() => setActive(c)} className={`px-4 py-2 rounded-full border ${active === c ? "bg-black text-white" : "bg-white"}`}>{c}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filtered.map(p => (
          <div key={p.id} className="border rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="relative w-full h-[320px]">
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              {p.badge && <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">{p.badge}</span>}
            </div>
            <div className="p-4">
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
              <p className="text-xs mt-2 font-semibold">✅ 100% Full-Grain Leather | HD Image</p>
              <button className="w-full mt-3 bg-black text-white py-2 rounded-full">GET WHOLESALE QUOTE</button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10 text-sm">
        <p>VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER / T/T</p>
        <p>50% Advance - 50% After Order Ready</p>
        <p>© 2025 KROSSFORD ENTERPRISES</p>
      </div>
    </section>
  );
}