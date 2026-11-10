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

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full overflow-x-hidden">
      <div className="relative bg-zinc-950 text-yellow-500/90 text- md:text-xs tracking-wide uppercase py-2 border-b border-yellow-500/20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={index} className="mx-8 flex items-center gap-4 font-medium">
              <span className="text-yellow-500/50">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-yellow-500/20 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 md:px-6 md:py-4 w-full">
          
          {/* FIX MISTAKE 2: Logo bara kiya - pehle chota lag raha tha */}
          <Link href="/" className="flex items-center gap-2 min-w-0 flex-1">
            <Logo className="h-10 w-10 md:h-10 md:w-10 shrink-0" />
            <span className="text- md:text-xl font-extrabold tracking-[0.08em] md:tracking-[0.15em] text-yellow-500 truncate whitespace-nowrap leading-none">
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
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text- font-bold w-5 h-5 rounded-full flex items-center justify-center">
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
                <span className="absolute -top-2 -right-2 bg-amber-400 text-black text- font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* FIX MISTAKE 2: Mobile Wishlist / Cart / Burger - TEENO SAME SIZE w-10 h-10 */}
          <div className="flex md:hidden items-center gap-1.5 shrink-0">
            <Link
              href="/wishlist"
              className="w-10 h-10 shrink-0 border border-yellow-500/50 rounded-md flex items-center justify-center text-yellow-500 text- leading-none whitespace-nowrap"
              aria-label="Wishlist"
            >
              <span className="flex items-center gap-0.5">♡ {wishlistCount}</span>
            </Link>
            <Link
              href="/cart"
              className="w-10 h-10 shrink-0 border border-yellow-500/50 rounded-md flex items-center justify-center text-yellow-500 text- leading-none whitespace-nowrap"
              aria-label="Cart"
            >
              <span className="flex items-center gap-0.5">C {cartCount}</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-zinc-300 hover:text-yellow-500 focus:outline-none shrink-0 w-10 h-10 flex items-center justify-center border border-transparent"
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
        </div>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <div className="relative z-50 md:hidden bg-black/95 border-t border-yellow-500/20 px-5 py-6 space-y-3">
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
              <div className="pt-2 flex flex-wrap gap-4">
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
          </>
        )}
      </div>
    </header>
  );
}