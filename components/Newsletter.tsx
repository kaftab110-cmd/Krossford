"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-zinc-950 border-t border-zinc-900 py-20 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-amber-400 border border-amber-400/30 px-3 py-1 rounded">
          B2B Procurement & Wholesale
        </span>
        
        <h2 className="text-2xl sm:text-3xl font-serif tracking-[0.2em] uppercase text-white">
          JOIN OUR B2B TRADE LIST
        </h2>
        
        <p className="text-xs sm:text-sm text-zinc-400 tracking-wider uppercase font-light max-w-xl mx-auto leading-relaxed">
          Get wholesale price list, new leather samples and private bulk offers for your brand. No retail spam.
        </p>

        {submitted ? (
          <div className="p-4 bg-zinc-900 border border-amber-400/40 text-amber-400 text-xs font-mono tracking-wider uppercase rounded">
            Thank you. Your corporate email has been registered for wholesale trade updates.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter corporate email..."
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded p-3 text-white text-xs tracking-wider focus:border-amber-400 outline-none font-mono"
            />
            <button 
              type="submit"
              className="font-bold text-xs uppercase tracking-[0.2em] px-6 py-3 rounded text-black transition-all hover:bg-amber-500 cursor-pointer"
              style={{ backgroundColor: "#C9A227" }}
            >
              GET WHOLESALE ACCESS
            </button>
          </form>
        )}
      </div>
    </section>
  );
}