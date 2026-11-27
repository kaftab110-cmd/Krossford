"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { readCartItems } from "@/lib/cart";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const updateCount = () => {
      try {
        const cart = readCartItems<{ quantity?: number }>();
        setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
      } catch { setCartCount(0); }
    };
    const updateWishlist = () => {
      try {
        const w = JSON.parse(localStorage.getItem("krossford_wishlist") || "[]");
        if (Array.isArray(w) && w.length > 0) { setWishlistCount(w.length); return; }
        const legacy = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlistCount(Array.isArray(legacy) ? legacy.length : 0);
      } catch { setWishlistCount(0); }
    };
    updateCount();
    updateWishlist();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("wishlistUpdated", updateWishlist);
    window.addEventListener("storage", updateCount);
    window.addEventListener("storage", updateWishlist);
    const t = setInterval(updateCount, 1000);
    return () => {
      clearInterval(t);
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("wishlistUpdated", updateWishlist);
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("storage", updateWishlist);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const cls = (h: string) => (pathname === h ? "text-[#D4AF37]" : "text-zinc-300 hover:text-[#D4AF37] transition-colors");

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 left-0 right-0 z-50 w-full">
      <div className="px-2 sm:px-3 md:px-6 py-2 flex justify-between items-center gap-2 w-full max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-1.5 min-w-0 shrink-0">
          <Logo className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0" />
          <span className="text-[#D4AF37] uppercase text-base sm:text-xl lg:text-2xl whitespace-nowrap leading-none block" style={{ fontFamily: "var(--font-brand)", fontWeight: 600, letterSpacing: "0.08em" }}>KROSSFORD</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-sm xl:text-base font-bold tracking-wider whitespace-nowrap shrink-0">
          <Link href="/" className={pathname === "/" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"}>HOME</Link>
          <Link href="/shop" className={cls("/shop")}>SHOP</Link>
          <Link href="/for-her" className={cls("/for-her")}>FOR HER</Link>
          <Link href="/collections" className={cls("/collections")}>COLLECTIONS</Link>
          <Link href="/b2b" className={cls("/b2b") + " hidden xl:block"}>B2B WHOLESALE</Link>
          <Link href="/about" className={cls("/about")}>ABOUT</Link>
          <Link href="/contact" className={cls("/contact") + " hidden xl:block"}>CONTACT US</Link>
        </nav>
        <div className="hidden lg:flex items-center gap-4 text-sm xl:text-base font-bold tracking-wider shrink-0 whitespace-nowrap">
          <Link href="/wishlist" className="text-zinc-300 hover:text-white">WISHLIST ({mounted ? wishlistCount : 0})</Link>
          <Link href="/cart" className="text-zinc-300 hover:text-white">CART ({mounted ? cartCount : 0})</Link>
        </div>
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          <Link href="/wishlist" className="h-9 px-2.5 text-xs font-bold text-white border border-white/40 rounded-full flex items-center justify-center whitespace-nowrap">WISHLIST ({mounted ? wishlistCount : 0})</Link>
          <Link href="/cart" className="h-9 px-2.5 text-xs font-bold text-white border border-white/40 rounded-full flex items-center justify-center whitespace-nowrap">CART ({mounted ? cartCount : 0})</Link>
          <button onClick={() => setOpen(true)} className="text-white p-1 w-9 h-9 flex items-center justify-center border border-white/20 rounded" aria-label="Open Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>
      <div className="border-t border-zinc-800 bg-black">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 py-2.5 grid grid-cols-3 gap-2 sm:gap-4">
          <Link href="/combo-deals" className="px-1 py-2.5 rounded-full border-2 text-xs sm:text-sm font-bold whitespace-nowrap text-center bg-[#E8C15A] text-black border-[#E8C15A]">COMBO DEALS</Link>
          <Link href="/sale" className="px-1 py-2.5 rounded-full border-2 text-xs sm:text-sm font-bold whitespace-nowrap text-center bg-red-600 text-white border-red-600">SALE 🔥</Link>
          <Link href="/announcements" className="px-1 py-2.5 rounded-full border-2 text-xs sm:text-sm font-bold whitespace-nowrap text-center bg-white text-black border-white">ANNOUNCEMENTS</Link>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-zinc-950 h-full p-6 flex flex-col justify-between border-l border-zinc-800 text-white overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8 shrink-0" />
                  <span className="text-[#D4AF37] uppercase text-sm" style={{ fontFamily: "var(--font-brand)", fontWeight: 600 }}>KROSSFORD</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white p-2 text-lg font-bold" aria-label="Close Menu">X</button>
              </div>
              <nav className="flex flex-col space-y-1 text-xs font-bold tracking-wider">
                <Link href="/" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">HOME</Link>
                <Link href="/shop" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">SHOP</Link>
                <Link href="/for-her" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">FOR HER</Link>
                <Link href="/combo-deals" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">COMBO DEALS</Link>
                <Link href="/sale" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900 text-red-400">SALE</Link>
                <Link href="/announcements" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">ANNOUNCEMENTS</Link>
                <Link href="/collections" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">COLLECTIONS</Link>
                <Link href="/b2b" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">B2B WHOLESALE</Link>
                <Link href="/about" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">ABOUT</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CONTACT US</Link>
                <Link href="/wishlist" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">WISHLIST ({mounted ? wishlistCount : 0})</Link>
                <Link href="/cart" onClick={() => setOpen(false)} className="py-2 border-b border-zinc-900">CART ({mounted ? cartCount : 0})</Link>
              </nav>
            </div>
            <div className="text-xs text-zinc-500 text-center border-t border-zinc-900 pt-4">Handcrafted • Custom Made On Demand • Since 2025.</div>
          </div>
        </div>
      )}
    </header>
  );
}