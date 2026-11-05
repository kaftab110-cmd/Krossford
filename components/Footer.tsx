import Link from "next/link";
import { Instagram, Facebook, Linkedin, MessageCircle, Youtube, Video } from "lucide-react";

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
          <div className="flex items-center gap-3 mt-4">
            <a href="https://instagram.com/krossfordenterprises" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition-all" title="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com/krossfordenterprises" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition-all" title="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://linkedin.com/company/krossfordenterprises" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition-all" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition-all" title="WhatsApp">
              <MessageCircle size={18} />
            </a>
            <a href="https://tiktok.com/@krossfordenterprises" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition-all" title="TikTok">
              <Video size={18} />
            </a>
            <a href="https://youtube.com/@krossfordenterprises" target="_blank" rel="noopener noreferrer" className="p-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-300 hover:text-amber-400 hover:border-amber-400 transition-all" title="YouTube">
              <Youtube size={18} />
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
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="bg-white text-zinc-950 px-3 py-1 rounded text-[10px] font-bold shadow">VISA</span>
          <span className="bg-white text-zinc-950 px-3 py-1 rounded text-[10px] font-bold shadow">Mastercard</span>
          <span className="bg-white text-zinc-950 px-3 py-1 rounded text-[10px] font-bold shadow">PayPal</span>
          <span className="bg-white text-zinc-950 px-3 py-1 rounded text-[10px] font-bold shadow">Western Union</span>
          <span className="bg-white text-zinc-950 px-3 py-1 rounded text-[10px] font-bold shadow">Bank Transfer / T/T</span>
        </div>
        <p className="text-[10px] text-zinc-500">
          30% Advance - 70% Before Shipping | Secure & Protected Payments
        </p>
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