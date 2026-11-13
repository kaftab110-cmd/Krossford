import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

export const metadata = {
  metadataBase: new URL("https://www.krossford.com"),
  title: "Krossford - Handcrafted Full-Grain Leather Goods | Wallets, Bags, Jackets",
  description: "Krossford - 22 Handcrafted Full-Grain Leather Products. Wallets from $25, Bags, Belts, Jackets. For Her Collection, Custom Logo Engraving. Ships Worldwide via DHL Express.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.krossford.com",
    siteName: "KROSSFORD",
    title: "Krossford - Handcrafted Full-Grain Leather Goods | Wallets, Bags, Jackets",
    description: "Krossford - 22 Handcrafted Full-Grain Leather Products. Wallets from $25, Bags, Belts, Jackets. For Her Collection, Custom Logo Engraving. Ships Worldwide via DHL Express.",
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
    description: "Krossford - 22 Handcrafted Full-Grain Leather Products. Wallets from $25, Bags, Belts, Jackets. For Her Collection, Custom Logo Engraving. Ships Worldwide via DHL Express.",
    images: ["/images/leather-duffle-bag.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden max-w-full">
      <body className="bg-black text-white min-h-screen overflow-x-hidden max-w-full antialiased font-mono flex flex-col justify-between selection:bg-amber-500 selection:text-black">
        <div>
          <Navbar />
          <div className="pt-16">
            {children}
          </div>
        </div>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
