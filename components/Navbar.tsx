"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
        setCartCount(cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0));
      } catch { setCartCount(0); }
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("storage", updateCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  const cls = (h: string) => pathname === h ? "text-amber-400" : "text-zinc-300 hover:text-amber-400 transition-colors";

  return (
    <header className="bg-zinc-950 border-b border-zinc-800 fixed top-0 left-0 right-0 z-50 font-mono w-full px-4 py-2 flex justify-between items-center">
      <Link href="/" className="flex items-center gap-3 group">
        <Logo className="w-10 h-10 shrink-0" />
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold uppercase tracking-[0.15em] text-base md:text-lg">KROSSFORD</span>
          <span className="text- text-amber-400/80 tracking-[0.4em] uppercase mt-1">Enterprises</span>
        </div>
      </Link>
      <nav className="hidden lg:flex items-center gap-6 text-xs font-bold tracking-wider">
        <Link href="/" className={pathname === "/" ? "text-amber-400" : "text-white hover:text-amber-400"}>HOME</Link>
        <Link href="/shop" className={cls("/shop")}>SHOP</Link>
        <Link href="/shop" className={cls("/shop")}>COLLECTIONS</Link>
        <Link href="/b2b" className={cls("/b2b")}>B2B WHOLESALE</Link>
        <Link href="/about" className={cls("/about")}>ABOUT</Link>
        <Link href="/contact" className={cls("/contact")}>CONTACT</Link>
      </nav>
      <div className="hidden lg:flex items-center gap-5 text-xs font-bold tracking-wider">
        <Link href="/contact" className="text-zinc-300 hover:text-white">ENQUIRY</Link>
        <Link href="/cart" className="text-zinc-300 hover:text-white">CART ({cartCount})</Link>
      </div>
      <div className="flex lg:hidden items-center gap-3">
        <Link href="/cart" className="text-xs text-white border border-white/40 px-2.5 py-1 rounded">CART ({cartCount})</Link>
        <button onClick={() => setOpen(true)} className="text-white p-1.5" aria-label="Open Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-end">
          <div className="w-[80%] max-w-xs bg-zinc-950 h-full p-6 flex flex-col justify-between border-l border-zinc-800 text-white font-mono">
            <div>
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Logo className="w-8 h-8" />
                  <span className="text-white font-bold uppercase text-sm tracking-widest">KROSSFORD</span>
                </div>
                <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white p-2 text-lg font-bold">✕</button>
              </div>
              <nav className="flex flex-col space-y-4 text-xs font-bold tracking-wider">
                <Link href="/" onClick={() => setOpen(false)} className="py-1 border-b border-zinc-900">HOME</Link>
                <Link href="/shop" onClick={() => setOpen(false)} className="py-1 border-b border-zinc-900">SHOP</Link>
                <Link href="/shop" onClick={() => setOpen(false)} className="py-1 border-b border-zinc-900">COLLECTIONS</Link>
                <Link href="/b2b" onClick={() => setOpen(false)} className="py-1 border-b border-zinc-900">B2B WHOLESALE</Link>
                <Link href="/about" onClick={() => setOpen(false)} className="py-1 border-b border-zinc-900">ABOUT</Link>
                <Link href="/contact" onClick={() => setOpen(false)} className="py-1 border-b border-zinc-900">CONTACT</Link>
              </nav>
            </div>
            <div className="text-xs text-zinc-500 text-center border-t border-zinc-900 pt-4">Crafted in Pakistan. Since 2025.</div>
          </div>
        </div>
      )}
    </header>
  );
}