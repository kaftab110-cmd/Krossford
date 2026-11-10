"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop (Retail)", href: "/shop" },
  { label: "Wholesale (B2B)", href: "/b2b" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const tickerItems = [
  "100% Real Leather Guarantee - Sample Before Bulk",
  "Wholesale: Leather Jacket & Biker Suit - MOQ 25+ Units - Get Quote",
  "Ships to USA / UK / EU - VISA | MASTERCARD | WESTERN UNION | BANK TRANSFER",
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const c = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
        const total = c.reduce((s: number, i: any) => s + Number(i.quantity || 1), 0);
        setCartCount(total);
      } catch { setCartCount(0); }
    };
    const updateWishlist = () => {
      try {
        const w = JSON.parse(localStorage.getItem("krossford_wishlist") || "[]");
        setWishlistCount(w.length);
      } catch { setWishlistCount(0); }
    };
    updateCount();
    updateWishlist();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("wishlistUpdated", updateWishlist);
    window.addEventListener("storage", updateCount);
    window.addEventListener("storage", updateWishlist);
    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("wishlistUpdated", updateWishlist);
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="relative bg-zinc-950 text-yellow-500/90 text-xs tracking-wider uppercase py-2 border-b border-yellow-500/20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={index} className="mx-8 flex items-center gap-4 font-medium">
              <span className="text-yellow-500/50">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-yellow-500/20 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="text-xl font-extrabold tracking-[0.15em] text-yellow-500">
              KROSSFORD
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-300">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition hover:text-yellow-500 ${
                  item.href === "/b2b" ? "text-yellow-400 font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/account" className="text-sm font-medium text-zinc-300 hover:text-yellow-500">
              Account
            </Link>
            <Link
              href="/wishlist"
              className="relative whitespace-nowrap rounded-md border border-yellow-500/50 px-4 py-2 text-sm font-medium text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative rounded-md border border-yellow-500/50 px-4 py-2 text-sm font-medium text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              Cart {cartCount > 0 && `(${cartCount})`}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-zinc-300 hover:text-yellow-500 focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-black/95 border-t border-yellow-500/20 px-6 py-6 space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block text-base font-medium transition py-1 border-b border-zinc-900 ${
                  item.href === "/b2b" ? "text-yellow-400 font-semibold" : "text-zinc-300 hover:text-yellow-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 flex gap-4">
              <Link href="/account" onClick={() => setIsOpen(false)} className="text-sm font-medium text-zinc-300 hover:text-yellow-500">
                Account
              </Link>
              <Link href="/wishlist" onClick={() => setIsOpen(false)} className="text-sm font-medium text-yellow-500 hover:underline">
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="text-sm font-medium text-yellow-500 hover:underline">
                Cart {cartCount > 0 && `(${cartCount})`} / Enquiry
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
