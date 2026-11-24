"use client";

import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const inputClass =
    "w-full min-w-0 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isLogin) {
      if (!fullName.trim()) { setError("Please enter your Full Name."); return; }
      if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
      if (password !== confirmPassword) { setError("Passwords do not match. Please check Confirm Password."); return; }
    }
    // Auth backend is not connected on this page yet - form only validates for now.
    setError("Login / Signup is not connected yet. Please continue as guest via Shop, or contact us on WhatsApp +92303 0006759.");
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError(null);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirm(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-3 min-[400px]:px-4 sm:px-6 pt-[132px] min-[400px]:pt-[138px] sm:pt-[148px] lg:pt-[158px] pb-16 text-white w-full min-w-0 overflow-x-hidden">
      <div className="w-full max-w-md rounded-xl border border-yellow-500/20 bg-zinc-900 p-4 min-[400px]:p-6 sm:p-8 min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500 break-words leading-snug">
          {isLogin ? "Login" : "Create Account"}
        </h1>
        <p className="mt-2 text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest break-words">Handstitched • Customized / On Demand — Made As Per Buyer &amp; Customer Requirement.</p>

        <button
          type="button"
          onClick={switchMode}
          className="mt-2 text-sm text-zinc-400 hover:text-yellow-500 break-words text-left"
        >
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </button>

        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 min-w-0">
          {!isLogin && (
            <input className={inputClass} type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          )}
          <input className={inputClass} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="relative min-w-0">
            <input className={`${inputClass} pr-12`} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-lg leading-none text-zinc-400 hover:text-yellow-500">
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {!isLogin && (
            <div className="relative min-w-0">
              <input className={`${inputClass} pr-12`} type={showConfirm ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-lg leading-none text-zinc-400 hover:text-yellow-500">
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
          )}

          {error && <p role="alert" className="text-xs text-amber-400 text-center break-words leading-relaxed">{error}</p>}

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
