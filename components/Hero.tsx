import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h- lg:min-h- flex items-center justify-center bg-black overflow-hidden px-4 sm:px-6 border-b border-zinc-800 w-full">
      {/* Dark Overlay & New Full-Grain Leather Hides Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=90"
          alt="Stacked Full-Grain Leather Hides"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.38) contrast(1.2)", objectPosition: "center 35%" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.55))"
          }}
        />
      </div>

      {/* FIX 1: pt-28 lagaya taake fixed Navbar heading ko na chupaye */}
      {/* FIX 5: pb-28 lagaya taake WhatsApp / Ask AI button text ke upar na aaye */}
      <div
        className="relative z-10 max-w- w-full mx-auto text-center space-y-5 sm:space-y-6 mt-10 pt-16 sm:pt-20 pb-24 sm:pb-20"
        style={{
          background: "rgba(0, 0, 0, 0.45)",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "20px",
          paddingBottom: "20px",
          backdropFilter: "blur(2px)",
          borderRadius: "12px"
        }}
      >
        {/* FIX 2: Heading - tracking kam + break-words + clamp theek kiya */}
        <h1
          className="font-serif uppercase font-bold text-white tracking-[0.04em] sm:tracking-[0.08em] break-words"
          style={{
            fontSize: "clamp(28px, 8vw, 64px)",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
            textShadow: "0px 4px 20px rgba(0,0,0,0.9)",
            overflowWrap: "break-word"
          }}
        >
          Custom Leather Jackets — Made For Your Brand
        </h1>

        {/* FIX 3: Sub-text - text-xs se text- kiya, parhne layak */}
        <p
          className="text- sm:text-base font-light max-w-2xl mx-auto tracking-wide leading-relaxed px-1"
          style={{
            color: "#E5E5E5",
            textAlign: "center",
            textShadow: "0px 2px 10px rgba(0,0,0,0.9)"
          }}
        >
          Architectural craftsmanship built for global wholesale, white-label retail, and custom private-label production.
        </p>

        {/* FIX 4: Buttons - tracking kam + max-width + wrap fix */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 relative z-10 w-full max-w- mx-auto">
          <Link
            href="/b2b"
            className="w-full sm:w-auto font-bold text- sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.15em] transition-all text-center rounded- whitespace-normal leading-relaxed"
            style={{
              backgroundColor: "#C9A227",
              color: "#000000",
              padding: "14px 20px"
            }}
          >
            Request Custom Quote
          </Link>
          <Link
            href="/b2b"
            className="w-full sm:w-auto font-medium text- sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.15em] transition-all text-center rounded- whitespace-normal leading-relaxed"
            style={{
              backgroundColor: "transparent",
              border: "2px solid #FFFFFF",
              color: "#FFFFFF",
              padding: "14px 20px"
            }}
          >
            B2B Wholesale Portal
          </Link>
        </div>
      </div>
    </section>
  );
}