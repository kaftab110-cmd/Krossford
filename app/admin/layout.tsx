"use client";

import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const ok = sessionStorage.getItem("krossford_admin_ok");
    if (ok === "yes") setAuth(true);
    setChecked(true);
  }, []);

  const login = (e: any) => {
    e.preventDefault();
    const saved = localStorage.getItem("krossford_admin_pass") || "krossford2026";
    if (pass === saved) {
      sessionStorage.setItem("krossford_admin_ok", "yes");
      setAuth(true);
    } else {
      alert("Invalid Security Password!");
    }
  };

  if (!checked) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono text-xs">Loading...</div>;

  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
        <form onSubmit={login} className="bg-zinc-900 p-8 border border-zinc-800 rounded-lg space-y-4 w-80">
          <h2 className="text-amber-400 font-bold uppercase text-center">KROSSFORD ADMIN ACCESS</h2>
          <input type="password" placeholder="Enter Admin Password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white outline-none focus:border-amber-400" />
          <button type="submit" className="w-full bg-amber-400 text-black py-2 rounded font-bold text-xs uppercase">Unlock Dashboard</button>
          <p className="text- text-zinc-500 text-center">Password Settings se badal sakte ho</p>
        </form>
      </div>
    );
  }

  return <div>{children}</div>;
}