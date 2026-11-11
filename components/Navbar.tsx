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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const cls = (h: string) => pathname === h ? "text-amber-400" : "text-zinc-300 hover:text-amber-400 transition-colors";

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden">
      <div className="px-2 md:px-4 py-2 flex justify-between items-center gap-1 w-full max-w-full">
        <Link href="/" className="flex items-center gap-2 min-w-0 flex-1">
          <Logo className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 shrink-0" />
          <div className="flex flex-col leading-none min-w-0">
            <span className="text-white font-extrabold uppercase tracking-wide text-lg sm:text-2xl md:text-3xl whitespace-nowrap leading-none">KROSSFORD</span>
            <span className="text-xs font-medium text-amber-400 tracking-widest uppercase mt-1 leading-none">ENTERPRISES</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider">
          <Link href="/" className={pathname === "/" ? "text-amber-400" : "text-white hover:text-amber-400"}>HOME</Link>
          <Link href="/shop" className={cls("/shop")}>SHOP</Link>
          <div className="relative group">
            <Link href="/shop?category=For Her" className={`${cls("/shop")} flex items-center gap-1 py-2`}>
              FOR HER <span className="text-xs">▼</span>
            </Link>
            <div className="absolute left-0 top-full pt-1 hidden group-hover:block w-56 z-50">
              <div className="bg-zinc-950 border border-zinc-800 rounded-md shadow-2xl py-2 overflow-hidden">
                <div className="px-4 py-2 text-xs tracking-widest text-amber-400 border-b border-zinc-800">FOR HER - CATEGORIES</div>
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
          <Link href="/contact" className={cls("/contact")}>CONTACT US</Link>
        </nav>
        <div className="hidden lg:flex items-center gap-5 text-xs font-bold tracking-wider shrink-0">
          <Link href="/wishlist" className="flex items-center gap-1 whitespace-nowrap text-zinc-300 hover:text-white">WISHLIST ({wishlistCount})</Link>
          <Link href="/cart" className="text-zinc-300 hover:text-white">CART ({cartCount})</Link>
        </div>
        <div className="flex lg:hidden items-center gap-1 shrink-0">
          <Link href="/wishlist" className="w-9 h-9 shrink-0 text-xs text-white border border-white/40 rounded flex items-center justify-center whitespace-nowrap leading-none">W {wishlistCount}</Link>
          <Link href="/cart" className="w-9 h-9 shrink-0 text-xs text-white border border-white/40 rounded flex items-center justify-center whitespace-nowrap leading-none">C {cartCount}</Link>
          <button onClick={() => setOpen(true)} className="text-white p-1 shrink-0 w-9 h-9 flex items-center justify-center border border-transparent" aria-label="Open Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 lg:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} aria-hidden={!open}>
        <div className="absolute inset-0 bg-black/80" onClick={() => setOpen(false)} />
        <div className={`relative w-4/5 max-w-xs bg-zinc-950 h-full p-6 flex flex-col justify-between border-l border-zinc-800 text-white overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`} role="dialog" aria-modal="true" aria-label="Menu">
          <div>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
              <div className="flex items-center gap-2 min-w-0">
                <Logo className="w-8 h-8 shrink-0" />
                <span className="text-white font-bold uppercase text-sm tracking-widest truncate">KROSSFORD</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white p-2 text-lg font-bold shrink-0" aria-label="Close Menu">X</button>
            </div>
            <nav className="flex flex-col space-y-1 text-xs font-bold tracking-wider">
              <Link href="/" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">HOME</Link>
              <Link href="/shop" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">SHOP</Link>
              <div className="py-1 border-b border-zinc-900">
                <button onClick={() => setForHerOpen(!forHerOpen)} className="w-full flex justify-between items-center py-1 text-left text-amber-400">
                  FOR HER <span className="text-xs">{forHerOpen ? "UP" : "DOWN"}</span>
                </button>
                {forHerOpen && (
                  <div className="pl-3 mt-1 flex flex-col">
                    {FOR_HER_CATS.map((c) => (
                      <Link key={c.label} href={c.href} onClick={() => setOpen(false)} className="py-2 text-xs font-medium text-zinc-400 hover:text-amber-400 border-b border-zinc-900/50">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/collections" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">COLLECTIONS</Link>
              <Link href="/b2b" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">B2B WHOLESALE</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">ABOUT</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CONTACT US</Link>
              <Link href="/wishlist" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">WISHLIST ({wishlistCount})</Link>
              <Link href="/cart" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CART ({cartCount})</Link>
            </nav>
          </div>
          <div className="text-xs text-zinc-500 text-center border-t border-zinc-900 pt-4">Crafted in Pakistan. Since 2025.</div>
        </div>
      </div>
    </header>
  );
}