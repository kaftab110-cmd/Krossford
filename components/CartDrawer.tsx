"use client";

import Link from "next/link";
import { useState } from "react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-end font-mono">
      <div className="w-full max-w-md bg-zinc-950 text-white h-full p-6 flex flex-col justify-between border-l border-zinc-800">
        <div>
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
            <h3 className="text-sm font-bold uppercase text-amber-400">Shopping Cart (0)</h3>
            <button onClick={onClose} className="text-zinc-400 hover:text-white">✕</button>
          </div>
          <div className="py-8 text-center text-zinc-500 text-xs">
            Your cart is currently empty.
          </div>
        </div>

        <div className="space-y-3 border-t border-zinc-800 pt-4">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-zinc-400">Subtotal</span>
            <span>$0.00 USD</span>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className="w-full block text-center bg-amber-500 text-black py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}