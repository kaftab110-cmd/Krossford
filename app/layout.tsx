import "./globals.css";
import { Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

// KROSSFORD BRAND FONT - ONE VARIABLE, EVERYWHERE SAME
// Kahi bhi KROSSFORD likhna ho to: style={{ fontFamily: "var(--font-brand)" }} ya className="font-brand" use karo
// Font badalna ho to sirf yahan badlo - poori site pe khud badal jayega
const brandFont = Playfair_Display({
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-brand",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.krossford.com"),
  title: "Krossford - Handcrafted Full-Grain Leather Goods | Wallets, Bags, Jackets",
  description: "Krossford - 22 Handcrafted Full-Grain Leather Products. Wallets from $25, Bags, Belts, Jackets. For Her Collection, Custom Logo Engraving. Ships Worldwide via fastest delivery.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.krossford.com",
    siteName: "KROSSFORD",
    title: "Krossford - Handcrafted Full-Grain Leather Goods | Wallets, Bags, Jackets",
    description: "Krossford - 22 Handcrafted Full-Grain Leather Products. Wallets from $25, Bags, Belts, Jackets. For Her Collection, Custom Logo Engraving. Ships Worldwide via fastest delivery.",
    images: [
      {
        url: "/images/leather-duffle-bag.jpg",
        width: 1200,
        height: 630,
        alt: "Krossford Handcrafted Full-Grain Leather Duffle Bag",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krossford - Handcrafted Full-Grain Leather Goods | Wallets, Bags, Jackets",
    description: "Krossford - 22 Handcrafted Full-Grain Leather Products. Wallets from $25, Bags, Belts, Jackets. For Her Collection, Custom Logo Engraving. Ships Worldwide via fastest delivery.",
    images: ["/images/leather-duffle-bag.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${brandFont.variable} overflow-x-hidden overflow-x-clip max-w-full`}>
      <body
        className="bg-black text-white min-h-screen w-full min-w-0 overflow-x-hidden overflow-x-clip max-w-full antialiased flex flex-col justify-between selection:bg-[#D4AF37] selection:text-black"
        style={{ fontFamily: "var(--font-brand), 'Playfair Display', Georgia, serif" }}
      >
        <div className="w-full min-w-0 overflow-x-clip flex-1">
          <Navbar />
          {/* ALL DEVICES SUPPORTED - Navbar ab 2 lines ka hai, is liye padding bhi har device ke hisaab se - warna Hero wala KROSSFORD Navbar ke neeche chhup ke kata hua lagega */}
          {/* Mobile 92px / Tablet 112px / Laptop-Desktop 132px */}
          <div className="w-full min-w-0 overflow-x-clip pt-[92px] sm:pt-[100px] md:pt-[112px] lg:pt-[132px]">
            {children}
          </div>
        </div>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
