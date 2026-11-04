import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krossford — Architectural Leather Works",
  description: "Bespoke luxury leather goods, briefcases, wallets, and accessories.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-amber-700 selection:text-white min-h-screen flex flex-col justify-between`}>
        <div>
          <Navbar />
          {children}
        </div>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}