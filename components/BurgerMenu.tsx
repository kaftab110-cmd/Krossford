"use client";
import { useState } from "react";
import Link from "next/link";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white p-1.5"
        aria-label="Open Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="w-[85%] max-w-xs bg-zinc-950 h-full p-6 flex flex-col justify-between border-l border-zinc-800 text-white">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
                <span className="font-bold tracking-widest">KROSSFORD</span>
                <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white p-2 text-lg font-bold">
                  X
                </button>
              </div>
              <nav className="flex flex-col space-y-1 text-xs font-bold tracking-wider">
                <Link href="/" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">HOME</Link>
                <Link href="/shop" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">SHOP</Link>
                <Link href="/for-her" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">FOR HER</Link>
                <Link href="/collections" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">COLLECTIONS</Link>
                <Link href="/b2b" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">B2B WHOLESALE</Link>
                <Link href="/about" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">ABOUT</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CONTACT</Link>
                <Link href="/wishlist" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">WISHLIST</Link>
                <Link href="/cart" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CART</Link>
              </nav>
            </div>
            <div className="text-xs text-zinc-500 text-center border-t border-zinc-900 pt-4">
              Crafted in Pakistan. Since 2025.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
