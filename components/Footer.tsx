import Link from "next/link";

export default function Footer() {
  const businessWhatsapp = "923030006759"; // +92303 0006759
  const businessEmail = "hello@krossford.com";
  const facebookUrl = "https://www.facebook.com/share/1J4YQYNhz1/";
  const instagramUrl = "https://www.instagram.com/krossford.enterprises";

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-amber-400 font-bold tracking-widest text-sm">KROSSFORD ENTERPRISES</h3>
          <p className="text-xs mt-3 leading-relaxed text-zinc-400">
            A New-Generation International Leather Brand, Since 2025.
            Sample Before Bulk. 100% Real Leather Guarantee. On-Time Delivery.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Quick Links</h4>
          <div className="flex flex-col gap-2 mt-3 text-xs">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <Link href="/shop" className="hover:text-amber-400">Products</Link>
            <Link href="/our-story" className="hover:text-amber-400">About</Link>
            <Link href="/contact-us" className="hover:text-amber-400">Contact</Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Contact</h4>
          <div className="flex flex-col gap-2 mt-3 text-xs">
            <a href={`mailto:${businessEmail}`} className="hover:text-amber-400">
              Email: {businessEmail}
            </a>
            <a href={`https://wa.me/${businessWhatsapp}?text=${encodeURIComponent("Hi KROSSFORD, I want to order leather products.")}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 text-[#25D366] font-bold">
              WhatsApp: +92303 0006759 💬 Chat Now
            </a>
            <a href={`https://wa.me/${businessWhatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              Phone: +92303 0006759
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest">Follow Us</h4>
          <div className="flex flex-col gap-2 mt-3 text-xs">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              Facebook - Krossford Enterprises
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
              Instagram - @krossford.enterprises
            </a>
          </div>
        </div>
      </div>

      {/* WE ACCEPT - PayPal Khatam Kar Diya */}
      <div className="border-t border-zinc-800 py-8 text-center px-4 bg-black">
        <p className="text-sm font-bold tracking-[0.3em] text-white">WE ACCEPT:</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <span className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black tracking-wider">VISA</span>
          <span className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black tracking-wider">MASTERCARD</span>
          <span className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black tracking-wider">WESTERN UNION</span>
          <span className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black tracking-wider">BANK TRANSFER / T/T</span>
        </div>
        <p className="text-zinc-300 text-xs mt-4">
          50% Advance - 50% After Order Ready | Secure & Protected Payments | Pakistan Local Bank Transfer Available
        </p>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-[11px] text-zinc-500">
        © 2025 KROSSFORD ENTERPRISES. All Rights Reserved.
      </div>
    </footer>
  );
}