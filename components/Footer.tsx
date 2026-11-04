import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-900 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand */}
        <div className="space-y-4">
          <Link href="/" className="text-xl font-serif tracking-widest uppercase text-white">
            <span className="font-bold">KF</span> KROSSFORD
          </Link>
          <p className="text-xs text-zinc-500 leading-relaxed font-light">
            Uncompromising leather goods sculpted for modern professionals.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="space-y-4">
          <h4 className="text-xs font-serif tracking-[0.2em] uppercase text-white font-semibold">Navigation</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/shop" className="hover:text-amber-400 transition-colors">Shop</Link></li>
            <li><Link href="/collections" className="hover:text-amber-400 transition-colors">Collections</Link></li>
            <li><Link href="/b2b" className="hover:text-amber-400 transition-colors">Wholesale / B2B</Link></li>
            <li><Link href="/about-us" className="hover:text-amber-400 transition-colors">About Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Policies */}
        <div className="space-y-4">
          <h4 className="text-xs font-serif tracking-[0.2em] uppercase text-white font-semibold">Policies</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/terms-of-service" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-amber-400 transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns-&-refunds" className="hover:text-amber-400 transition-colors">Returns & Refunds</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Connect & Payments */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-xs font-serif tracking-[0.2em] uppercase text-white font-semibold">Connect</h4>
            <div className="flex gap-4 text-xs font-mono">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">LinkedIn</a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-serif tracking-[0.2em] uppercase text-white font-semibold">Accepted Payments</h4>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-300">
              <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded uppercase tracking-wider">Visa</span>
              <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded uppercase tracking-wider">Mastercard</span>
              <span className="bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded uppercase tracking-wider">Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 text-center text-[10px] text-zinc-600 font-mono tracking-wider">
        {currentYear} Krossford. All Rights Reserved.
      </div>
    </footer>
  );
}