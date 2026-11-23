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
      } catch {
        setCartCount(0);
      }
    };
    const updateWishlist = () => {
      try {
        const wishlist = JSON.parse(localStorage.getItem("krossford_wishlist") || "[]");
        setWishlistCount(wishlist.length);
      } catch {
        setWishlistCount(0);
      }
    };
    updateCount();
    updateWishlist();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("wishlistUpdated", updateWishlist);
    window.addEventListener("storage", updateCount);
    window.addEventListener("storage", updateWishlist);
    const cartExpiryTimer = setInterval(updateCount, 1000);
    return () => {
      clearInterval(cartExpiryTimer);
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

  const cls = (h: string) => {
    if (pathname === h) return "text-[#D4AF37]";
    return "text-zinc-300 hover:text-[#D4AF37] transition-colors";
  };

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 fixed top-0 left-0 right-0 z-50 w-full overflow-hidden">
      <div className="px-2 sm:px-3 md:px-6 py-2 flex justify-between items-center gap-1 sm:gap-2 md:gap-6 w-full max-w-full">
        <Link href="/" className="flex items-center gap-1.5 min-w-0 flex-1 lg:flex-none xl:flex-1 overflow-hidden">
          <Logo className="h-8 w-8 sm:h-10 sm:w-10 md:h-16 md:w-16 shrink-0" />
          <div className="flex flex-col leading-none min-w-0 overflow-hidden">
            <span
              className="text-[#D4AF37] uppercase text-[15px] sm:text-xl lg:text-xl xl:text-3xl whitespace-nowrap leading-none block"
              style={{ fontFamily: "var(--font-brand)", fontWeight: 600, letterSpacing: "0.08em" }}
            >
              KROSSFORD
            </span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4 text-[10px] xl:text-[11px] font-bold tracking-wider whitespace-nowrap shrink-0">
          <Link href="/" className={pathname === "/" ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"}>HOME</Link>
          <Link href="/shop" className={cls("/shop")}>SHOP</Link>
          <Link href="/for-her" className={pathname === "/for-her" ? "text-[#D4AF37]" : "text-zinc-300 hover:text-[#D4AF37] transition-colors"}>FOR HER</Link>
          <Link href="/combo-deals" className={cls("/combo-deals")}>COMBO DEALS</Link>
          <Link href="/sale" className={pathname === "/sale" ? "text-red-500" : "text-red-400 hover:text-red-300 transition-colors"}>SALE</Link>
          <Link href="/announcements" className={cls("/announcements") + " hidden xl:block"}>ANNOUNCEMENTS</Link>
          <Link href="/collections" className={cls("/collections")}>COLLECTIONS</Link>
          <Link href="/b2b" className={cls("/b2b") + " hidden xl:block"}>B2B WHOLESALE</Link>
          <Link href="/about" className={cls("/about")}>ABOUT</Link>
          <Link href="/contact" className={cls("/contact") + " whitespace-nowrap hidden xl:block"}>CONTACT US</Link>
        </nav>
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 text-[11px] xl:text-xs font-bold tracking-wider shrink-0 whitespace-nowrap ml-2 xl:ml-4">
          <Link href="/wishlist" className="flex items-center gap-1 whitespace-nowrap text-zinc-300 hover:text-white">WISHLIST ({mounted ? wishlistCount : 0})</Link>
          <Link href="/cart" className="text-zinc-300 hover:text-white">CART ({mounted ? cartCount : 0})</Link>
        </div>
        {/* MOBILE - FIX: W / C katna band - ab icon + count, button bada, kuch nahi katega */}
        <div className="flex lg:hidden items-center gap-1.5 shrink-0">
          <Link href="/wishlist" aria-label="Wishlist" title="Wishlist" className="h-9 min-w-[44px] px-1.5 shrink-0 text-xs text-white border border-white/40 rounded flex items-center justify-center gap-0.5 whitespace-nowrap leading-none">
            <span aria-hidden="true">♡</span><span>{mounted ? wishlistCount : 0}</span>
          </Link>
          <Link href="/cart" aria-label="Cart" title="Cart" className="h-9 min-w-[44px] px-1.5 shrink-0 text-xs text-white border border-white/40 rounded flex items-center justify-center gap-0.5 whitespace-nowrap leading-none">
            <span aria-hidden="true">🛒</span><span>{mounted ? cartCount : 0}</span>
          </Link>
          <button onClick={() => setOpen(true)} className="text-white p-1 shrink-0 w-8 h-8 flex items-center justify-center border border-transparent" aria-label="Open Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
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
                <span className="text-[#D4AF37] uppercase text-sm truncate" style={{ fontFamily: "var(--font-brand)", fontWeight: 600, letterSpacing: "0.08em" }}>KROSSFORD</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white p-2 text-lg font-bold shrink-0" aria-label="Close Menu">X</button>
            </div>
            <nav className="flex flex-col space-y-1 text-xs font-bold tracking-wider">
              <Link href="/" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/" ? "text-[#D4AF37]" : ""}`}>HOME</Link>
              <Link href="/shop" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/shop" ? "text-[#D4AF37]" : ""}`}>SHOP</Link>
              <Link href="/for-her" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/for-her" ? "text-[#D4AF37]" : ""}`}>FOR HER</Link>
              <Link href="/combo-deals" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/combo-deals" ? "text-[#D4AF37]" : ""}`}>COMBO DEALS</Link>
              <Link href="/sale" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/sale" ? "text-red-500" : "text-red-400"}`}>SALE</Link>
              <Link href="/announcements" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/announcements" ? "text-[#D4AF37]" : ""}`}>ANNOUNCEMENTS</Link>
              <Link href="/collections" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/collections" ? "text-[#D4AF37]" : ""}`}>COLLECTIONS</Link>
              <Link href="/b2b" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/b2b" ? "text-[#D4AF37]" : ""}`}>B2B WHOLESALE</Link>
              <Link href="/about" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/about" ? "text-[#D4AF37]" : ""}`}>ABOUT</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/contact" ? "text-[#D4AF37]" : ""}`}>CONTACT US</Link>
              <Link href="/wishlist" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/wishlist" ? "text-[#D4AF37]" : ""}`}>WISHLIST ({mounted ? wishlistCount : 0})</Link>
              <Link href="/cart" onClick={() => setOpen(false)} className={`py-2 border-b border-zinc-900 ${pathname === "/cart" ? "text-[#D4AF37]" : ""}`}>CART ({mounted ? cartCount : 0})</Link>
            </nav>
          </div>
          <div className="text-xs text-zinc-500 text-center border-t border-zinc-900 pt-4">Crafted in Pakistan. Since 2025.</div>
        </div>
      </div>
    </header>
  );
}
