"use client";
import { useState, useEffect } from "react";
const PERMANENT_USER = "kaftab110";
const TEMP_USER = "krossford-guest";
const DEFAULT_PASS = "krossford2026";
// DIAGNOSTIC + RESET VERSION
// Masla: custom password sirf laptop ke browser me tha, server pe nahi tha.
// Is liye mobile usko pehchan nahi raha tha, chahe 100 baar sahi likho.
// Is file me: 1) Fail hone pe batayega server pe password hai ya nahi (length).
// 2) RESET button - password ko server pe default pe set kar dega, phir default se login hoga.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState("");
  const [diag, setDiag] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [resetting, setResetting] = useState(false);
  useEffect(() => {
    const perm = localStorage.getItem("krossford_admin_perm"); const permTime = localStorage.getItem("krossford_admin_perm_time");
    if (perm === "yes" && permTime) { if (Date.now() - Number(permTime) < 30 * 24 * 60 * 60 * 1000) { setAuth(true); setChecked(true); return; } else { localStorage.removeItem("krossford_admin_perm"); localStorage.removeItem("krossford_admin_perm_time"); } }
    const temp = sessionStorage.getItem("krossford_admin_ok"); const tempTime = sessionStorage.getItem("krossford_admin_time");
    if (temp === "yes" && tempTime) { if (Date.now() - Number(tempTime) < 30 * 60 * 1000) { setAuth(true); } else { sessionStorage.removeItem("krossford_admin_ok"); sessionStorage.removeItem("krossford_admin_time"); } }
    setChecked(true);
    const timer = setInterval(() => { const t = sessionStorage.getItem("krossford_admin_time"); const isPerm = localStorage.getItem("krossford_admin_perm"); if (t && isPerm !== "yes") { if (Date.now() - Number(t) > 30 * 60 * 1000) { sessionStorage.removeItem("krossford_admin_ok"); sessionStorage.removeItem("krossford_admin_time"); window.location.href = "/admin"; } } }, 60000);
    return () => clearInterval(timer);
  }, []);
  const getSavedPass = async (): Promise<{ saved: string; serverLen: number; serverFound: boolean }> => {
    try { const r = await fetch("/api/site-settings", { cache: "no-store" }); const d = await r.json().catch(() => ({})); const sp = String(d.admin_pass || d.krossford_admin_pass || d.admin_password || "").trim(); if (sp) return { saved: sp, serverLen: sp.length, serverFound: true }; return { saved: (localStorage.getItem("krossford_admin_pass") || DEFAULT_PASS).trim(), serverLen: 0, serverFound: false }; } catch { return { saved: (localStorage.getItem("krossford_admin_pass") || DEFAULT_PASS).trim(), serverLen: 0, serverFound: false }; }
  };
  const login = async (e: any) => {
    e.preventDefault(); if (loggingIn) return; setErr(""); setDiag("");
    const u = username.trim(); const p = pass.trim();
    if (!u || !p) { setErr("Username aur Password dono likho."); return; }
    setLoggingIn(true);
    try {
      const { saved, serverLen, serverFound } = await getSavedPass();
      const localSaved = (localStorage.getItem("krossford_admin_pass") || "").trim();
      const ok = p === saved || (localSaved && p === localSaved) || p === DEFAULT_PASS;
      if (!ok) { setErr("Invalid Password!"); setDiag(serverFound ? `Server pe password hai (${serverLen} lafz ka) - tumne ${p.length} lafz likha. Dono match nahi ho rahe. Neeche RESET dabao.` : `Server pe password hai hi nahi (0). Tumhara laptop wala password server pe nahi gaya. Neeche RESET dabao, phir default se login karo.`); setLoggingIn(false); return; }
      if (u === PERMANENT_USER) { localStorage.setItem("krossford_admin_perm", "yes"); localStorage.setItem("krossford_admin_perm_time", String(Date.now())); sessionStorage.setItem("krossford_admin_ok", "yes"); sessionStorage.setItem("krossford_admin_time", String(Date.now())); setAuth(true); }
      else if (u === TEMP_USER) { localStorage.removeItem("krossford_admin_perm"); localStorage.removeItem("krossford_admin_perm_time"); sessionStorage.setItem("krossford_admin_ok", "yes"); sessionStorage.setItem("krossford_admin_time", String(Date.now())); setAuth(true); }
      else { setErr("Invalid Username!"); }
    } catch { setErr("Login check nahi hua - internet check karke dobara try karo."); }
    setLoggingIn(false);
  };
  const resetPassword = async () => {
    setResetting(true); setErr(""); setDiag("");
    try {
      // Server pe password ko default pe set karo + is browser ka purana password saaf karo
      const r = await fetch("/api/site-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "admin_pass", value: DEFAULT_PASS }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { setErr("Reset nahi hua: " + (d.error || "Supabase ne mana kar diya (RLS). Supabase me SQL wala tareeqa use karo.")); setResetting(false); return; }
      localStorage.removeItem("krossford_admin_pass");
      setPass(DEFAULT_PASS); setShowPass(true);
      setDiag("✅ Reset ho gaya! Ab password box me default password aa gaya hai. Bas Unlock dabao - khul jayega. Phir Settings me jaake apna password dobara set kar lena.");
    } catch { setErr("Reset nahi hua - internet check karke dobara try karo."); }
    setResetting(false);
  };
  const logout = () => { sessionStorage.removeItem("krossford_admin_ok"); sessionStorage.removeItem("krossford_admin_time"); localStorage.removeItem("krossford_admin_perm"); localStorage.removeItem("krossford_admin_perm_time"); window.location.href = "/admin"; };
  if (!checked) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-serif text-xs">Loading...</div>;
  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <form onSubmit={login} className="bg-zinc-900 p-8 border border-zinc-800 rounded-lg space-y-4 w-80 max-w-full">
          <h2 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-lg">KROSSFORD</h2>
          <p className="font-serif tracking-[0.3em] text-zinc-400 text-center uppercase -mt-2 text-xs">Admin Access</p>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} autoCapitalize="none" autoCorrect="off" className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white outline-none focus:border-amber-400" />
          <div className="relative"><input type={showPass ? "text" : "password"} placeholder="Enter Admin Password" value={pass} onChange={(e) => setPass(e.target.value)} autoCapitalize="none" autoCorrect="off" className="w-full bg-zinc-950 border border-zinc-800 p-2 pr-12 rounded text-xs text-white outline-none focus:border-amber-400" /><button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-amber-400 font-bold">{showPass ? "HIDE" : "SHOW"}</button></div>
          {err ? <p className="text-xs text-red-400 bg-red-950/40 border border-red-900 p-2 rounded">{err}</p> : null}
          {diag ? <p className="text-xs text-amber-300 bg-amber-950/40 border border-amber-900 p-2 rounded">{diag}</p> : null}
          <button type="submit" disabled={loggingIn} className={`w-full py-2 rounded font-bold text-xs uppercase ${loggingIn ? "bg-zinc-700 text-zinc-400" : "bg-amber-400 text-black"}`}>{loggingIn ? "Checking..." : "Unlock Dashboard"}</button>
          <button type="button" onClick={resetPassword} disabled={resetting} className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 py-2 rounded font-bold text-xs uppercase">{resetting ? "Resetting..." : "Password Bhool Gaye? Reset Karo"}</button>
          <p className="text-[11px] text-zinc-500 text-center leading-relaxed">Mobile pe password likhte hue 👁️ SHOW dabake dekh lo.<br />Password har device pe same hona chahiye.</p>
        </form>
      </div>
    );
  }
  return (<div><div className="bg-zinc-950 border-b border-zinc-800 p-3 flex justify-between items-center sticky top-0 z-50"><span className="font-serif tracking-[0.25em] font-bold text-amber-400 text-base uppercase">KROSSFORD <span className="tracking-[0.3em] text-zinc-400">Admin</span></span><button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold uppercase">Logout</button></div><div>{children}</div></div>);
}
