import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[520px] flex items-center justify-center bg-black overflow-hidden px-6 py-20 border-b border-zinc-800">
      {/* Dark Overlay & New Full-Grain Leather Hides Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=90" 
          alt="Stacked Full-Grain Leather Hides"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.38) contrast(1.2)" }}
        />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.55))"
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div 
        className="relative z-10 max-w-[900px] mx-auto text-center space-y-6"
        style={{
          background: "rgba(0, 0, 0, 0.45)",
          padding: "20px",
          backdropFilter: "blur(2px)",
          borderRadius: "12px"
        }}
      >
        {/* Heading */}
        <h1 
          className="font-serif uppercase font-bold text-white tracking-[0.1em]"
          style={{
            fontSize: "clamp(28px, 5vw, 64px)",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
            textShadow: "0px 4px 20px rgba(0,0,0,0.9)"
          }}
        >
          Custom Leather Jackets — Made For Your Brand
        </h1>

        {/* Sub-text */}
        <p 
          className="text-xs sm:text-sm font-light max-w-2xl mx-auto tracking-wider leading-relaxed"
          style={{
            color: "#E5E5E5",
            textAlign: "center",
            textShadow: "0px 2px 10px rgba(0,0,0,0.9)"
          }}
        >
          Architectural craftsmanship built for global wholesale, white-label retail, and custom private-label production.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
          <Link 
            href="/b2b" 
            className="w-full sm:w-auto font-bold text-xs uppercase tracking-[0.2em] transition-all text-center rounded-[4px]"
            style={{
              backgroundColor: "#C9A227",
              color: "#000000",
              padding: "14px 28px"
            }}
          >
            Request Custom Quote
          </Link>
          <Link 
            href="/b2b" 
            className="w-full sm:w-auto font-medium text-xs uppercase tracking-[0.2em] transition-all text-center rounded-[4px]"
            style={{
              backgroundColor: "transparent",
              border: "2px solid #FFFFFF",
              color: "#FFFFFF",
              padding: "14px 28px"
            }}
          >
            B2B Wholesale Portal
          </Link>
        </div>
      </div>
    </section>
  );
}