"use client";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Announcement = {
  id: string;
  date: string;
  title: string;
  desc: string;
  tag: string;
  link: string;
  linkText: string;
};

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-sale",
    date: "November 2026",
    title: "Sale Is On - Up To 22% OFF",
    desc: "Messenger Bag, Wallet aur Leather Vest pe discount chal raha hai. Stock khatam hone se pehle order karo.",
    tag: "SALE",
    link: "/sale",
    linkText: "View Sale →",
  },
  {
    id: "ann-combo",
    date: "November 2026",
    title: "New Combo Deals Live Hain",
    desc: "Ab 2 products ek saath lo to alag lene se sasta parega. Messenger + Wallet Combo pe $29 ki bachat.",
    tag: "COMBO",
    link: "/combo-deals",
    linkText: "View Combos →",
  },
  {
    id: "ann-pakistan",
    date: "November 2026",
    title: "Pakistan Delivery FREE Hai",
    desc: "Pakistan ke liye delivery charge FREE hai. International delivery courier deal ke baad final hogi.",
    tag: "DELIVERY",
    link: "/shop",
    linkText: "Shop Now →",
  },
  {
    id: "ann-new",
    date: "November 2026",
    title: "Naye Products Aa Rahe Hain",
    desc: "Jald hi Krossford pe naye designs aayenge. Admin se roz naye products add hote rahenge, Shop pe khud aa jayenge.",
    tag: "NEW",
    link: "/shop",
    linkText: "View Shop →",
  },
];

export default function AnnouncementsPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="bg-[#D4AF37] text-black text-center text-xs font-black uppercase tracking-widest py-2 px-4">
        Announcements - Krossford Ki Saari Khabrein Ek Jagah
      </div>

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-brand)" }}>Announcements</h1>
        <p className="text-xs text-zinc-400 tracking-widest uppercase mt-2">Sale - Combo - Delivery - New Launch - Sab Kuch Yahan</p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16 space-y-4">
        {ANNOUNCEMENTS.map((a) => (
          <div key={a.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-[#D4AF37]">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 uppercase">{a.tag}</span>
              <span className="text-xs text-zinc-500">{a.date}</span>
            </div>
            <h3 className="text-base font-semibold uppercase">{a.title}</h3>
            <p className="text-sm text-zinc-400 mt-2">{a.desc}</p>
            <Link href={a.link} className="inline-block mt-3 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white">{a.linkText}</Link>
          </div>
        ))}
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 text-center flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/sale" className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full">View Sale →</Link>
        <Link href="/combo-deals" className="inline-block bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full">View Combos →</Link>
        <Link href="/shop" className="inline-block bg-zinc-900 border border-zinc-700 text-xs font-bold uppercase tracking-widest px-8 py-3 rounded-full hover:border-[#D4AF37]">Shop Now →</Link>
      </div>
    </main>
  );
}