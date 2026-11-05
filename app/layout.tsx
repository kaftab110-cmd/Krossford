import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChatbot from "@/components/AIChatbot";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-x-hidden max-w-full">
      <body className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden max-w-full antialiased font-mono flex flex-col justify-between selection:bg-amber-500 selection:text-black">
        <div>
          <Navbar />
          <div className="pt-[60px]">
            {children}
          </div>
        </div>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}