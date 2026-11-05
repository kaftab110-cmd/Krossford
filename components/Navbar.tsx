import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50 font-mono">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-amber-400 font-bold uppercase tracking-wider text-sm">
          KROSSFORD ENTERPRISES
        </Link>
        <div className="flex gap-6 text-xs text-zinc-300">
          <Link href="/store-policy" className="hover:text-amber-400 transition-colors">Shop</Link>
          <Link href="/about-us" className="hover:text-amber-400 transition-colors">Wholesale / B2B</Link>
          <Link href="/contact-us" className="hover:text-amber-400 transition-colors">Contact</Link>
        </div>
      </div>
    </header>
  );
}