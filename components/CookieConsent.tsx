"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getConsentSnapshot,
  getConsentServerSnapshot,
  subscribeConsent,
  setConsent,
} from "@/lib/consent";

export default function CookieConsent() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-800 bg-[#0b0e17] text-gray-200"
    >
      <div className="mx-auto max-w-5xl px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies, including Google Analytics and Meta Pixel, to
          improve your experience and measure our marketing. You can accept
          or reject non-essential cookies. Read our{" "}
          <Link href="/privacy-policy" className="underline hover:text-white">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => setConsent("rejected")}
            className="rounded-md border border-gray-700 px-4 py-2 text-sm hover:border-gray-500 transition"
          >
            Reject
          </button>
          <button
            onClick={() => setConsent("accepted")}
            className="rounded-md bg-[#c9a227] px-4 py-2 text-sm font-semibold text-black hover:bg-[#b8931f] transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}