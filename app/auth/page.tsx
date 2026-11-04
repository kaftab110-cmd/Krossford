"use client";

import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const inputClass =
    "w-full rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500";

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-black px-6 py-20 text-white">
      <div className="w-full max-w-md rounded-xl border border-yellow-500/20 bg-zinc-900 p-8">
        <h1 className="text-3xl font-bold text-yellow-500">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="mt-2 text-sm text-zinc-400 hover:text-yellow-500"
        >
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </button>

        <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-4">
          {!isLogin && (
            <input className={inputClass} type="text" placeholder="Full Name" />
          )}
          <input className={inputClass} type="email" placeholder="Email Address" />
          <input className={inputClass} type="password" placeholder="Password" />

          <button
            type="submit"
            className="w-full rounded-md bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </main>
  );
}