"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const FOR_HER_CATS = [
  { label: "All For Her", href: "/shop?category=For Her" },
  { label: "Handbags & Tote Bags", href: "/shop?category=Bags" },
  { label: "Crossbody Bags", href: "/shop?category=Crossbody" },
  { label: "Wallets For Her", href: "/shop?category=Wallets" },
  { label: "Card Holders", href: "/shop?category=Card Holders" },
  { label: "Belts For Her", href: "/shop?category=Belts" },
  { label: "Accessories & Gifts", href: "/shop?category=Accessories" },
  { label: "Custom & Gifts For Her", href: "/shop?category=Custom & Gifts" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [forHerOpen, setForHerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
        setCartCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
      } catch { setCartCount(0); }
    };
    const updateWishlist = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("krossford_wishlist") || "[]");
        setWishlistCount(wishlist.length);
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

  const cls = (h: string) => pathname === h ? "text-amber-400" : "text-zinc-300 hover:text-amber-400 transition-colors";

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 fixed top-0 left-0 right-0 z-50 font-mono w-full px-4 py-2 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3 group">
        <Logo className="w-10 h-10 shrink-0" />
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold uppercase tracking-[0.15em] text-base md:text-lg">KROSSFORD</span>
          <span className="text-[10px] text-amber-400/80 tracking-[0.4em] uppercase mt-1">Enterprises</span>
        </div>
      </Link>

      {/* DESKTOP NAV */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider">
        <Link href="/" className={pathname === "/" ? "text-amber-400" : "text-white hover:text-amber-400"}>HOME</Link>
        <Link href="/shop" className={cls("/shop")}>SHOP</Link>

        {/* FOR HER + DROPDOWN */}
        <div className="relative group">
          <Link href="/shop?category=For Her" className={`${cls("/shop")} flex items-center gap-1 py-2`}>
            FOR HER <span className="text-[9px]">▼</span>
          </Link>
          <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-56 z-50">
            <div className="bg-zinc-950 border border-zinc-800 rounded-md shadow-2xl py-2 overflow-hidden">
              <div className="px-4 py-2 text-[10px] tracking-[0.25em] text-amber-400 border-b border-zinc-800">FOR HER - CATEGORIES</div>
              {FOR_HER_CATS.map((c) => (
                <Link key={c.label} href={c.href} className="block px-4 py-2.5 text-xs font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors">
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link href="/collections" className={cls("/collections")}>COLLECTIONS</Link>
        <Link href="/b2b" className={cls("/b2b")}>B2B WHOLESALE</Link>
        <Link href="/about" className={cls("/about")}>ABOUT</Link>
        <Link href="/contact" className={cls("/contact")}>CONTACT</Link>
      </nav>

      <div className="hidden lg:flex items-center gap-5 text-xs font-bold tracking-wider">
        <Link href="/contact" className="text-zinc-300 hover:text-white">ENQUIRY</Link>
        <Link href="/wishlist" className="flex items-center gap-1 whitespace-nowrap text-zinc-300 hover:text-white">♡ WISHLIST ({wishlistCount})</Link>
        <Link href="/cart" className="text-zinc-300 hover:text-white">CART ({cartCount})</Link>
      </div>

      <div className="flex lg:hidden items-center gap-3">
        <Link href="/wishlist" className="text-xs text-white border border-white/40 px-2.5 py-1 rounded whitespace-nowrap">♡ ({wishlistCount})</Link>
        <Link href="/cart" className="text-xs text-white border border-white/40 px-2.5 py-1 rounded">CART ({cartCount})</Link>
        <button onClick={() => setOpen(true)} className="text-white p-1.5" aria-label="Open Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="w-[85%] max-w-xs bg-zinc-950 h-full p-6 flex flex-col justify-between border-l border-zinc-800 text-white font-mono overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8" />
                  <span className="text-white font-bold uppercase text-sm tracking-widest">KROSSFORD</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white p-2 text-lg font-bold">✕</button>
              </div>
              <nav className="flex flex-col space-y-1 text-xs font-bold tracking-wider">
                <Link href="/" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">HOME</Link>
                <Link href="/shop" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">SHOP</Link>

                {/* MOBILE FOR HER EXPAND */}
                <div className="py-1 border-b border-zinc-900">
                  <button onClick={() => setForHerOpen(!forHerOpen)} className="w-full flex justify-between items-center py-1 text-left text-amber-400">
                    FOR HER <span className="text-[10px]">{forHerOpen ? "▲" : "▼"}</span>
                  </button>
                  {forHerOpen && (
                    <div className="pl-3 mt-1 flex flex-col">
                      {FOR_HER_CATS.map((c) => (
                        <Link key={c.label} href={c.href} onClick={() => setOpen(false)} className="py-2 text-[11px] font-medium text-zinc-400 hover:text-amber-400 border-b border-zinc-900/50">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/collections" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">COLLECTIONS</Link>
                <Link href="/b2b" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">B2B WHOLESALE</Link>
                <Link href="/about" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">ABOUT</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CONTACT</Link>
                <Link href="/wishlist" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">♡ WISHLIST ({wishlistCount})</Link>
                <Link href="/cart" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CART ({cartCount})</Link>
              </nav>
            </div>
            <div className="text-xs text-zinc-500 text-center border-t border-zinc-900 pt-4">Crafted in Pakistan. Since 2025.</div>
          </div>
        </div>
      )}
    </header>
  );
}
