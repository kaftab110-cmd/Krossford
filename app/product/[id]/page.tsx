"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <main className="bg-black text-white min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-xl">
        <div className="mb-6">
          <Link href="/collections" className="text-xs uppercase tracking-widest text-yellow-500 hover:underline">
            ← Back to Collections
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="w-full h-80 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
              alt="Krossford Leather Work"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <span className="bg-black text-yellow-500 border border-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Verified Product: {id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider text-white uppercase">
              Full-Grain Masterpiece
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Engineered with premium vegetable-tanned full-grain leather. Crafted specifically for modern professionals seeking absolute precision and durability.
            </p>
            
            <div className="pt-4 space-y-3">
              <Link
                href="/cart"
                className="block w-full text-center bg-yellow-500 text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Enquire For This Item
              </Link>
              <Link
                href="/collections"
                className="block w-full text-center bg-zinc-900 text-zinc-300 border border-zinc-800 font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                View All Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}