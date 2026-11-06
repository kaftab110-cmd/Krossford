"use client";

import Link from "next/link";

const steps = [
  {
    no: "01",
    title: "Leather Selection",
    desc: "Sirf Full-Grain Leather chuna jata hai. Har piece ko haath se check kiya jata hai - texture, thickness, aur natural grain. Jo leather perfect na ho, wo reject.",
    time: "2 Hours",
  },
  {
    no: "02",
    title: "Hand Cutting",
    desc: "Pattern ko haath se kaata jata hai. Machine se nahi, taake leather ka natural grain aur strength barkarar rahe. Ek galti, poora piece dobara.",
    time: "3 Hours",
  },
  {
    no: "03",
    title: "Hand Stitching",
    desc: "Saddle stitch - do suiyon se haath se silai. Ye silai machine se 3x mazboot hoti hai. Agar ek dhaga toote bhi, silai khulti nahi. Yehi KROSSFORD ki pehchan hai.",
    time: "5 Hours",
  },
  {
    no: "04",
    title: "Finishing & Quality Check",
    desc: "Edge burnishing, conditioning, aur final polish haath se. Har bag ko 12-point check se guzara jata hai. Phir jaake uspe KROSSFORD ka stamp lagta hai.",
    time: "2 Hours",
  },
];

export default function CraftsmanshipPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono">
      {/* HERO */}
      <div className="relative px-6 md:px-12 pt-16 pb-12 text-center max-w-4xl mx-auto">
        <p className="text-[11px] tracking-[0.35em] text-amber-400 uppercase">Our Craftsmanship</p>
        <h1 className="text-3xl md:text-5xl font-bold uppercase leading-tight mt-4">
          Haath Se Banta Hai.<br />Machine Se Nahi.
        </h1>
        <p className="text-sm text-zinc-400 mt-5 leading-relaxed max-w-2xl mx-auto">
          Gujrat, Punjab ke workshop me, hamare karigar ek bag pe <span className="text-white font-bold">12+ ghante</span> lagate hain.
          Ye fast fashion nahi hai. Ye wo bag hai jo tumhare saath 20 saal chalega.
        </p>
        <div className="flex gap-3 justify-center mt-7 flex-wrap">
          <Link href="/shop" className="bg-amber-400 text-black px-6 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-amber-300">
            Shop The Collection →
          </Link>
          <Link href="/contact-us" className="border border-white/30 px-6 py-3 rounded text-xs font-bold uppercase tracking-wider hover:border-amber-400">
            B2B Enquiry
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-3 pb-12">
        {[
          { n: "12+", l: "Hours Per Bag" },
          { n: "100%", l: "Hand Stitched" },
          { n: "Full-Grain", l: "Leather Only" },
          { n: "20 Years", l: "Chalne Wala Bag" },
        ].map((s) => (
          <div key={s.l} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-amber-400">{s.n}</p>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1">{s.l}</p>
          </div>
        ))}
      </div>

      {/* WORKSHOP IMAGE - Apni Photo Yahan Lagana */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900">
          {/* Apni workshop ki photo yahan daal dena - /public/images/workshop.jpg */}
          <img src="/images/workshop.jpg" alt="Krossford Workshop Gujrat" className="w-full h-[280px] md:h-[420px] object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
          <div className="p-5 md:p-6">
            <p className="text-[11px] tracking-widest text-amber-400 uppercase">Our Workshop</p>
            <h2 className="text-xl font-bold mt-2">Gujrat, Punjab, Pakistan</h2>
            <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
              Gujrat ko Pakistan ka leather ka sheher kehte hain. Hamare karigaron ko 15-20 saal ka tajurba hai.
              Yahan har bag ek hi karigar shuru se akhir tak banata hai - taake zimmedari ek haath me ho.
            </p>
          </div>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2 text-center">👆 Apni workshop ki photo ko `public / images / workshop.jpg` me daal dena, auto aa jayegi.</p>
      </div>

      {/* PROCESS */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <p className="text-[11px] tracking-[0.3em] text-amber-400 uppercase text-center">The Process</p>
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-center mt-3">Ek Bag Ka Safar</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          {steps.map((s) => (
            <div key={s.no} className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 hover:border-amber-400/50 transition">
              <div className="flex justify-between items-start">
                <span className="text-3xl font-bold text-zinc-700">{s.no}</span>
                <span className="text-[10px] bg-amber-400/10 text-amber-400 px-2 py-1 rounded-full font-bold">⏱ {s.time}</span>
              </div>
              <h3 className="text-lg font-bold mt-3">{s.title}</h3>
              <p className="text-sm text-zinc-400 mt-2 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY HAND STITCHED */}
      <div className="max-w-5xl mx-auto px-6 pb-14">
        <div className="bg-amber-400 text-black rounded-lg p-6 md:p-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase leading-tight">Machine Silai 2 Saal.<br />Haath Ki Silai 20 Saal.</h2>
            <p className="text-sm mt-3 leading-relaxed text-zinc-800">
              Machine ki silai ek dhage se hoti hai - ek jagah se toote, poori silai khul jati hai.
              Hamari saddle stitch do dhagon se hoti hai. Isliye KROSSFORD ka bag tumhare bachon tak chalega.
            </p>
          </div>
          <div className="bg-black text-white rounded-lg p-5">
            <p className="text-[11px] tracking-widest text-zinc-400 uppercase">Krossford Promise</p>
            <ul className="text-sm space-y-2 mt-3">
              <li>✅ Full-Grain Leather - No Split, No Bonded</li>
              <li>✅ Hand Saddle Stitched</li>
              <li>✅ 12-Point Quality Check</li>
              <li>✅ Har Bag Pe Karigar Ka Stamp</li>
            </ul>
            <Link href="/shop" className="block mt-5 bg-amber-400 text-black text-center py-3 rounded text-xs font-bold uppercase">See The Result →</Link>
          </div>
        </div>
      </div>

      {/* B2B CTA */}
      <div className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <h2 className="text-xl font-bold uppercase">Apne Brand Ke Liye Banwana Hai?</h2>
        <p className="text-sm text-zinc-400 mt-2">Private Label + Bulk Production - Tumhara logo, hamari craftsmanship.</p>
        <Link href="/contact-us" className="inline-block mt-5 border border-amber-400 text-amber-400 px-6 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-amber-400 hover:text-black">
          Start B2B Enquiry →
        </Link>
      </div>
    </div>
  );
}