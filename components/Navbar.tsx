"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50 font-mono w-full px-4 py-3 flex justify-between items-center overflow-hidden">
      {/* Brand Logo */}
      <Link href="/" className="flex flex-col">
        <span className="text-amber-400 font-bold uppercase tracking-wider text-[18px] md:text-[20px] leading-tight">
          KROSSFORD
        </span>
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest leading-none mt-0.5">
          ENTERPRISES
        </span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6 text-xs text-zinc-300">
        <Link href="/store-policy" className="hover:text-amber-400 transition-colors">Shop</Link>
        <Link href="/about-us" className="hover:text-amber-400 transition-colors">Wholesale / B2B</Link>
        <Link href="/our-story" className="hover:text-amber-400 transition-colors">Our Story</Link>
        <Link href="/help-center" className="hover:text-amber-400 transition-colors">Help Center</Link>
        <Link href="/faqs" className="hover:text-amber-400 transition-colors">FAQs</Link>
        <Link href="/contact-us" className="hover:text-amber-400 transition-colors">Contact</Link>
      </nav>

      <div className="hidden lg:flex items-center gap-4">
        <Link href="/cart" className="text-xs text-amber-400 border border-amber-400/40 px-3 py-1.5 rounded hover:bg-amber-400/10 transition-colors">
          Cart (0)
        </Link>
      </div>

      {/* Mobile / Tablet Hamburger Button */}
      <div className="flex lg:hidden items-center gap-3">
        <Link href="/cart" className="text-xs text-amber-400 border border-amber-400/40 px-2.5 py-1 rounded">
          Cart
        </Link>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-white p-1.5 focus:outline-none"
          aria-label="Open Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Slide-in Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="w-[80%] max-w-[300px] bg-zinc-950 h-full p-6 flex flex-col justify-between border-l border-zinc-800 text-white font-mono">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
                <div>
                  <h3 className="text-amber-400 font-bold uppercase text-sm">KROSSFORD</h3>
                  <span className="text-[9px] text-zinc-400 tracking-widest">ENTERPRISES</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-400 hover:text-white p-2 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col space-y-4 text-xs">
                <Link href="/store-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1 border-b border-zinc-900">Shop</Link>
                <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1 border-b border-zinc-900">Wholesale / B2B</Link>
                <Link href="/our-story" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1 border-b border-zinc-900">Our Story</Link>
                <Link href="/help-center" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1 border-b border-zinc-900">Help Center</Link>
                <Link href="/faqs" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1 border-b border-zinc-900">FAQs</Link>
                <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="hover:text-amber-400 py-1 border-b border-zinc-900">Contact Us</Link>
              </nav>
            </div>

            <div className="text-[10px] text-zinc-500 text-center border-t border-zinc-900 pt-4">
              Crafted in Pakistan. Since 2025.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}