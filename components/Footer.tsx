import Link from "next/link";
import { MessageCircle } from "lucide-react";

const SocialSVG = ({ path, label, href }: { path: string; label: string; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-[32px] h-[32px] inline-flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded hover:border-[#C5A880] transition group"
    title={label}
  >
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" dangerouslySetInnerHTML={{ __html: path }} className="group-hover:scale-110 transition-transform" />
  </a>
);

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "923001234567";

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 py-12 px-6 font-mono text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-3">
            KROSSFORD ENTERPRISES
          </h3>
          <p className="text-[11px] text-zinc-400 leading-relaxed mb-4">
            Crafted in Pakistan. Trusted Worldwide. Since 2025.
          </p>

          {/* Social Icons Row */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <SocialSVG
              label="Instagram"
              href="https://instagram.com/krossfordenterprises"
              path="<rect x='2' y='2' width='20' height='20' rx='5' fill='none' stroke='white' stroke-width='2'/><circle cx='12' cy='12' r='4' fill='none' stroke='white' stroke-width='2'/><circle cx='17.5' cy='6.5' r='1.5' fill='white'/>"
            />
            <SocialSVG
              label="Facebook"
              href="https://facebook.com/krossfordenterprises"
              path="<path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' fill='white'/>"
            />
            <SocialSVG
              label="LinkedIn"
              href="https://linkedin.com/company/krossfordenterprises"
              path="<path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' fill='white'/><rect x='2' y='9' width='4' height='12' fill='white'/><circle cx='4' cy='4' r='2' fill='white'/>"
            />
            <SocialSVG
              label="YouTube"
              href="https://youtube.com/@krossfordenterprises"
              path="<path d='M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.92 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z' fill='white'/><polygon points='9.75 15.02 15.5 11.75 9.75 8.48' fill='black'/>"
            />
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[32px] h-[32px] inline-flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:border-amber-400 transition"
              title="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="https://tiktok.com/@krossfordenterprises"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 h-[32px] inline-flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded text-[10px] font-bold text-zinc-300 hover:border-amber-400 transition"
              title="TikTok"
            >
              TikTok
            </a>
          </div>
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

      {/* Payment Badges Section */}
      <div className="max-w-7xl mx-auto pt-6 pb-6 border-t border-zinc-900 flex flex-col items-center justify-center space-y-3">
        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">WE ACCEPT:</p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span className="bg-white text-[#0A1A2F] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase border border-[#C5A880] shadow">VISA</span>
          <span className="bg-white text-[#0A1A2F] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase border border-[#C5A880] shadow">Mastercard</span>
          <span className="bg-white text-[#0A1A2F] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase border border-[#C5A880] shadow">PayPal</span>
          <span className="bg-white text-[#0A1A2F] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase border border-[#C5A880] shadow">Western Union</span>
          <span className="bg-white text-[#0A1A2F] px-3 py-1.5 rounded-full text-[11px] font-bold uppercase border border-[#C5A880] shadow">Bank Transfer / T/T</span>
        </div>
        
        {/* Corrected B2B Payment Terms Policy Text */}
        <div className="text-center space-y-1 mt-2">
          <p className="text-[12px] font-bold text-[#C5A880]">
            B2B Payment Terms: 50% Advance - 50% After Order Done
          </p>
          <p className="text-[11px] text-zinc-400 flex items-center justify-center gap-2">
            <span>This Payment Plan is for B2B / Wholesale Customers Only. Not for Retail Customers.</span>
            <span className="bg-amber-400 text-black px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">B2B ONLY</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-4 border-t border-zinc-900 text-center space-y-1.5">
        <div className="text-[11px] text-zinc-200 font-bold uppercase tracking-wider">
          © 2025 KROSSFORD ENTERPRISES. All Rights Reserved.
        </div>
        <div className="text-[10px] text-zinc-500">
          Crafted in Pakistan. Trusted Worldwide. Since 2025.
        </div>
      </div>
    </footer>
  );
}