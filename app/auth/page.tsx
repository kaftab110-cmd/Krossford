"use client";

import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const inputClass =
    "w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500";

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-3 min-[400px]:px-4 sm:px-6 pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 text-white w-full min-w-0 overflow-x-hidden">
      <div className="w-full max-w-md rounded-xl border border-yellow-500/20 bg-zinc-900 p-4 min-[400px]:p-6 sm:p-8 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 break-words leading-snug">
          {isLogin ? "Login" : "Create Account"}
        </h1>
        <p className="mt-2 text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest break-words">Handstitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-2 text-sm text-zinc-400 hover:text-yellow-500 break-words text-left"
        >
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </button>

        <form onSubmit={(e) => e.preventDefault()} className="mt-6 sm:mt-8 space-y-4 min-w-0">
          {!isLogin && (
            <input className={inputClass} type="text" placeholder="Full Name" />
          )}
          <input className={inputClass} type="email" placeholder="Email Address" />
          <input className={inputClass} type="password" placeholder="Password" />

          <button
            type="submit"
            className="w-full rounded-md bg-[#E8C15A] border-2 border-[#E8C15A] px-4 py-4 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-[#D4AF37] shadow-md"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
