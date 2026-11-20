"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminSettings() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [msg, setMsg] = useState("");

  const changePassword = (e: any) => {
    e.preventDefault();
    const current = localStorage.getItem("krossford_admin_pass") || "krossford2026";
    if (oldPass !== current) {
      setMsg("Purana password galat hai!");
      return;
    }
    if (newPass.length < 6) {
      setMsg("Naya password kam se kam 6 letters ka rakho!");
      return;
    }
    localStorage.setItem("krossford_admin_pass", newPass);
    setMsg("Password change ho gaya! Ab naya password use hoga.");
    setOldPass("");
    setNewPass("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">Settings</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Settings</h1>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3 text-xs">
          <p className="font-bold text-white">Admin Info</p>
          <p className="text-zinc-400">Dashboard: <span className="text-white">/admin</span></p>
        </div>

        <form onSubmit={changePassword} className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3">
          <p className="font-bold text-white text-sm">Change Admin Password</p>
          <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="Purana Password" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Naya Password - Kam se kam 6 letters" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <button className="bg-amber-400 text-black px-4 py-2 rounded font-bold text-xs uppercase w-full">Change Password</button>
          {msg && <p className="text-xs text-amber-400">{msg}</p>}
        </form>
      </div>
    </div>
  );
}