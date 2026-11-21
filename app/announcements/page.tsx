"use client";
import Link from "next/link";

const posts = [
  { tag: "SALE", date: "November 2026", title: "SALE IS ON - UP TO 22% OFF", desc: "Discount is live on Messenger Bag, Wallet and Leather Vest. Order before stock runs out.", link: "/sale", btn: "VIEW SALE →" },
  { tag: "COMBO", date: "November 2026", title: "NEW COMBO DEALS ARE LIVE", desc: "Buy 2 products together and save more than buying separately. Save $29 on Messenger + Wallet Combo.", link: "/combo-deals", btn: "VIEW COMBOS →" },
  { tag: "DELIVERY", date: "November 2026", title: "PAKISTAN DELIVERY IS FREE", desc: "Delivery inside Pakistan is FREE. International delivery will be confirmed after our courier deal is final.", link: "/shop", btn: "SHOP NOW →" },
  { tag: "NEW", date: "November 2026", title: "NEW PRODUCTS COMING SOON", desc: "New wallets, bags and jackets are coming soon. Follow Announcements for the launch.", link: "/shop", btn: "SHOP NOW →" },
];

export default function AnnouncementsPage() {
  return (
    <main className="bg-black text-white min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-wide text-center">ANNOUNCEMENTS</h1>
        <p className="text-zinc-400 text-sm text-center mt-3">Latest news, sales and updates from Krossford.</p>
        <div className="mt-10 space-y-6">
          {posts.map((p) => (
            <div key={p.title} className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
              <div className="flex items-center gap-3"><span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-1">{p.tag}</span><span className="text-zinc-500 text-xs">{p.date}</span></div>
              <h2 className="font-bold tracking-wide mt-3">{p.title}</h2>
              <p className="text-zinc-400 text-sm mt-2">{p.desc}</p>
              <Link href={p.link} className="text-[#D4AF37] text-sm font-bold mt-3 inline-block">{p.btn}</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
