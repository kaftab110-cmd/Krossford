"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop (Retail)", href: "/shop" },
  { label: "Wholesale (B2B)", href: "/b2b" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact-us" },
];

const tickerItems = [
  "Architectural Leather Works — Crafted for Modern Professionals",
  "Exquisite Full-Grain Hide & Precision Haberdashery",
  "Direct Global B2B & Wholesale Export Inquiries Welcome",
  "Minimalist Elegance — Built to Last a Lifetime",
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Luxury Sliding Announcement Bar */}
      <div className="relative bg-zinc-950 text-yellow-500/90 text-xs tracking-wider uppercase py-2 border-b border-yellow-500/20 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Repeat items to ensure seamless infinite loop */}
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <span key={index} className="mx-8 flex items-center gap-4 font-medium">
              <span className="text-yellow-500/50">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <div className="border-b border-yellow-500/20 bg-black/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand Logo / Name */}
          <Link href="/" className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="text-xl font-extrabold tracking-[0.15em] text-yellow-500">
              KROSSFORD
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/account" className="text-sm font-medium text-zinc-300 hover:text-yellow-500">
              Account
            </Link>
            <Link
              href="/cart"
              className="rounded-md border border-yellow-500/50 px-4 py-2 text-sm font-medium text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
            >
              Cart
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
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

        {/* Mobile Dropdown Menu */}
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
              <Link
                href="/account"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-yellow-500"
              >
                Account
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-yellow-500 hover:underline"
              >
                Cart / Enquiry
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}