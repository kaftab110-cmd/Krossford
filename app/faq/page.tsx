"use client";

import { useState } from "react";
import Link from "next/link";
import { customerFaqs, buyerFaqs } from "@/lib/faqs";

function FaqList({ items, startOpen }: { items: { question: string; answer: string }[]; startOpen: boolean }) {
  const [open, setOpen] = useState(startOpen ? 0 : -1);
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <div key={i} className="rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
          >
            <span className="text-sm sm:text-base font-semibold text-white">{f.question}</span>
            <span className="text-yellow-500 font-bold shrink-0">{open === i ? "−" : "+"}</span>
          </button>
          {open === i && (
            <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">{f.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FaqPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-4xl px-6 sm:px-10 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-4">FAQs</h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mb-8">Frequently Asked Questions — Retail Customers + Wholesale Buyers</p>
        <h2 className="text-xl font-bold text-white mb-4">For Retail Customers — 1 Piece</h2>
        <FaqList items={customerFaqs} startOpen={true} />
        <h2 className="text-xl font-bold text-white mt-10 mb-4">For Wholesale Buyers — Bulk Orders</h2>
        <FaqList items={buyerFaqs} startOpen={false} />
        <div className="mt-12 rounded-lg border border-amber-400/40 bg-amber-400/10 p-6 text-center">
          <h2 className="text-lg font-semibold text-white mb-2">Still Have A Question?</h2>
          <p className="text-sm text-zinc-300 mb-4">Message us — we reply as soon as possible.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-block rounded-md border border-yellow-500 px-6 py-3 text-sm font-medium text-yellow-500 hover:bg-yellow-500 hover:text-black transition">Contact Us</Link>
            <Link href="/track-order" className="inline-block rounded-md border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-yellow-500 hover:text-yellow-500 transition">Track Your Order</Link>
          </div>
        </div>
      </section>
    </main>
  );
}