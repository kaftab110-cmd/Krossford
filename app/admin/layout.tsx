"use client";

import { useState, useEffect } from "react";

const PERMANENT_USER = "kaftab110";
const TEMP_USER = "krossford-guest";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const perm = localStorage.getItem("krossford_admin_perm");
    const permTime = localStorage.getItem("krossford_admin_perm_time");
    if (perm === "yes" && permTime) {
      if (Date.now() - Number(permTime) < 30 * 24 * 60 * 60 * 1000) {
        setAuth(true);
        setChecked(true);
        return;
      } else {
        localStorage.removeItem("krossford_admin_perm");
        localStorage.removeItem("krossford_admin_perm_time");
      }
    }
    const temp = sessionStorage.getItem("krossford_admin_ok");
    const tempTime = sessionStorage.getItem("krossford_admin_time");
    if (temp === "yes" && tempTime) {
      if (Date.now() - Number(tempTime) < 30 * 60 * 1000) {
        setAuth(true);
      } else {
        sessionStorage.removeItem("krossford_admin_ok");
        sessionStorage.removeItem("krossford_admin_time");
      }
    }
    setChecked(true);

    const timer = setInterval(() => {
      const t = sessionStorage.getItem("krossford_admin_time");
      const isPerm = localStorage.getItem("krossford_admin_perm");
      if (t && isPerm !== "yes") {
        if (Date.now() - Number(t) > 30 * 60 * 1000) {
          sessionStorage.removeItem("krossford_admin_ok");
          sessionStorage.removeItem("krossford_admin_time");
          window.location.href = "/admin";
        }
      }
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const login = (e: any) => {
    e.preventDefault();
    const saved = localStorage.getItem("krossford_admin_pass") || "krossford2026";
    const u = username.trim();

    if (pass !== saved) {
      alert("Invalid Password!");
      return;
    }

    if (u === PERMANENT_USER) {
      localStorage.setItem("krossford_admin_perm", "yes");
      localStorage.setItem("krossford_admin_perm_time", String(Date.now()));
      sessionStorage.setItem("krossford_admin_ok", "yes");
      sessionStorage.setItem("krossford_admin_time", String(Date.now()));
      setAuth(true);
    } else if (u === TEMP_USER) {
      localStorage.removeItem("krossford_admin_perm");
      localStorage.removeItem("krossford_admin_perm_time");
      sessionStorage.setItem("krossford_admin_ok", "yes");
      sessionStorage.setItem("krossford_admin_time", String(Date.now()));
      setAuth(true);
    } else {
      alert("Invalid Username!");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("krossford_admin_ok");
    sessionStorage.removeItem("krossford_admin_time");
    localStorage.removeItem("krossford_admin_perm");
    localStorage.removeItem("krossford_admin_perm_time");
    window.location.href = "/admin";
  };

  if (!checked) return <div className="min-h-screen bg-black text-white flex items-center justify-center font-serif text-xs">Loading...</div>;

  if (!auth) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <form onSubmit={login} className="bg-zinc-900 p-8 border border-zinc-800 rounded-lg space-y-4 w-80">
          <h2 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-lg">KROSSFORD</h2>
          <p className="font-serif tracking-[0.3em] text- text-zinc-400 text-center uppercase -mt-2">Admin Access</p>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white outline-none focus:border-amber-400" />
          <input type="password" placeholder="Enter Admin Password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 p-2 rounded text-xs text-white outline-none focus:border-amber-400" />
          <button type="submit" className="w-full bg-amber-400 text-black py-2 rounded font-bold text-xs uppercase">Unlock Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-zinc-950 border-b border-zinc-800 p-3 flex justify-between items-center sticky top-0 z-50">
        <span className="font-serif tracking-[0.25em] font-bold text-amber-400 text-base uppercase">KROSSFORD <span className="text- tracking-[0.3em] text-zinc-400">Admin</span></span>
        <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded text- font-bold uppercase">Logout</button>
      </div>
      <div>{children}</div>
    </div>
  );
}