"use client";

import Link from "next/link";
import { useId } from "react";
import { getOtherLegalPages } from "@/lib/legal";

export interface LegalNavProps {
  currentSlug: string;
}

export default function LegalNav({ currentSlug }: LegalNavProps) {
  const headingId = useId();
  const otherPages = getOtherLegalPages(currentSlug);

  return (
    <aside aria-labelledby={headingId} className="border-t border-gray-800 pt-12 mt-12">
      <h2 id={headingId} className="text-xl font-serif text-white mb-6">
        Related Policies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherPages.map((page) => (
          <Link
            key={page.slug}
            href={page.href}
            className="block p-5 bg-zinc-900/50 border border-zinc-800 hover:border-[#d4af37]/50 focus-visible:outline-none focus-visible:border-[#d4af37] focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg transition-colors group"
          >
            <h3 className="font-medium text-white group-hover:text-[#d4af37] transition-colors mb-1">
              {page.title}
            </h3>
            <p className="text-xs text-gray-400 line-clamp-2">
              {page.shortDescription}
            </p>
          </Link>
        ))}
      </div>
    </aside>
  );
}