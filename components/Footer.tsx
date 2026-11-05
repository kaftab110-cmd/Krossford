import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 py-12 px-6 font-mono text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-3">
            KROSSFORD ENTERPRISES
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Crafted in Pakistan. Trusted Worldwide. Since 2025.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase text-[11px] mb-3 tracking-widest">
            Collections & B2B
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/store-policy" className="hover:text-amber-400 transition-colors">Shop</Link></li>
            <li><Link href="/about-us" className="hover:text-amber-400 transition-colors">Wholesale / B2B</Link></li>
            <li><Link href="/our-story" className="hover:text-amber-400 transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase text-[11px] mb-3 tracking-widest">
            Customer Care
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/help-center" className="hover:text-amber-400 transition-colors">Help Center</Link></li>
            <li><Link href="/contact-us" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
            <li><Link href="/faqs" className="hover:text-amber-400 transition-colors">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold uppercase text-[11px] mb-3 tracking-widest">
            Policies
          </h4>
          <ul className="space-y-2 text-[11px]">
            <li><Link href="/terms-of-service" className="hover:text-amber-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-amber-400 transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns-&-refunds" className="hover:text-amber-400 transition-colors">Returns & Refunds</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-zinc-900 text-center space-y-1.5">
        <div className="text-[11px] text-zinc-300 font-bold uppercase tracking-wider">
          © 2025 KROSSFORD ENTERPRISES. All Rights Reserved.
        </div>
        <div className="text-[10px] text-zinc-500">
          Crafted in Pakistan. Trusted Worldwide. Since 2025.
        </div>
      </div>
    </footer>
  );
}