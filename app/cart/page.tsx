"use client";

import Link from "next/link";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-xl font-bold uppercase text-amber-400 border-b border-zinc-800 pb-4">
          Your Shopping Cart
        </h1>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded text-center text-zinc-400 text-xs">
          Your cart is empty. Add bulk leather goods or samples to proceed.
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded space-y-4">
          <div className="flex justify-between text-xs font-bold border-b border-zinc-800 pb-3">
            <span className="text-zinc-400">Total</span>
            <span className="text-amber-400">$0.00 USD</span>
          </div>
          <Link
            href="/checkout"
            className="w-full block text-center bg-amber-500 text-black py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}