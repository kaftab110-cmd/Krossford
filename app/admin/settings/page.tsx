"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminSettings() {
  const [siteName, setSiteName] = useState("KROSSFORD");
  const [supportEmail, setSupportEmail] = useState("hello@krossford.com");
  const [whatsapp, setWhatsapp] = useState("+923001234567");
  const [deliveryNote, setDeliveryNote] = useState("Pakistan: 3-5 working days | International: 7-12 working days");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("krossford_settings");
      if (saved) {
        const p = JSON.parse(saved) as { siteName?: string; supportEmail?: string; whatsapp?: string; deliveryNote?: string };
        if (p.siteName) setSiteName(p.siteName);
        if (p.supportEmail) setSupportEmail(p.supportEmail);
        if (p.whatsapp) setWhatsapp(p.whatsapp);
        if (p.deliveryNote) setDeliveryNote(p.deliveryNote);
      }
    } catch {
      // ignore
    }
  }, []);

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { siteName, supportEmail, whatsapp, deliveryNote };
    try {
      localStorage.setItem("krossford_settings", JSON.stringify(data));
      setSavedMsg("✅ Settings save ho gayi!");
    } catch {
      setSavedMsg("Save nahi hui, dobara try karo.");
    }
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const changePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const current = localStorage.getItem("krossford_admin_pass") || "krossford2026";
    if (oldPass !== current) {
      setMsg("Purana password galat hai!");
      return;
    }
    if (newPass.length < 6) {
      setMsg("Naya password kam se kam 6 letters ka rakho!");
      return;
    }
    if (newPass !== confirmPass) {
      setMsg("Naya password aur Confirm password same nahi hai!");
      return;
    }
    localStorage.setItem("krossford_admin_pass", newPass);
    setMsg("Password change ho gaya! Ab naya password use hoga.");
    setOldPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <Link href="/admin" className="bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded text-xs font-bold hover:border-amber-400">← Back to Dashboard</Link>
          <span className="text-xs text-zinc-400">Settings</span>
        </div>

        <h1 className="font-serif tracking-[0.25em] font-bold text-amber-400 uppercase text-center text-2xl">KROSSFORD Settings</h1>

        <div className="bg-amber-400/10 border border-amber-400/40 rounded p-4 text-xs leading-relaxed text-zinc-200">
          <p className="font-bold text-amber-400">📋 YE PAGE KIS KAAM KE LIYE HAI?</p>
          <p className="text-zinc-400 mt-1">Yahan se: Site ka naam, Email, WhatsApp number aur Delivery ka note badlo. Aur Admin ka password badlo.</p>
          <p className="text-zinc-400">NOTE: Abhi ye Settings sirf is browser me save hoti hai. Agle step me isko Supabase se jorenge taake har device pe same dikhe.</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3 text-xs">
          <p className="font-bold text-white">Admin Info</p>
          <p className="text-zinc-400">Dashboard: <span className="text-white">/admin</span></p>
          <p className="text-zinc-400">Default Password (pehli dafa): <span className="text-white">krossford2026</span> - Pehli dafa isi se login hoga, phir neeche se badal do.</p>
        </div>

        {/* Site Info */}
        <form onSubmit={saveSettings} className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3">
          <p className="font-bold text-white text-sm">Site Info - Kahan Se Kya Badlega</p>
          <div>
            <label className="text-xs text-zinc-400">Site Name</label>
            <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full mt-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
            <p className="text- text-zinc-500 mt-1">Ye naam Dashboard aur Admin pe dikhega.</p>
          </div>
          <div>
            <label className="text-xs text-zinc-400">Support Email</label>
            <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full mt-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
            <p className="text- text-zinc-500 mt-1">Customer isi email pe contact karega - hello@krossford.com</p>
          </div>
          <div>
            <label className="text-xs text-zinc-400">WhatsApp Number</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full mt-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
            <p className="text- text-zinc-500 mt-1">Ye tumhara business WhatsApp number hai.</p>
          </div>
          <div>
            <label className="text-xs text-zinc-400">Delivery Note</label>
            <textarea value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} rows={2} className="w-full mt-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
            <p className="text- text-zinc-500 mt-1">Ye note Checkout / Orders me kaam aayega.</p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs uppercase w-full">Save Settings</button>
          {savedMsg ? <p className="text-xs text-green-400">{savedMsg}</p> : null}
        </form>

        <form onSubmit={changePassword} className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3">
          <p className="font-bold text-white text-sm">Change Admin Password</p>
          <p className="text-xs text-zinc-400">Yahan se: Admin ka password badlo. Purana password pata hona zaroori hai.</p>
          <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="Purana Password" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Naya Password - Kam se kam 6 letters" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Naya Password Dobara Likho" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
          <button className="bg-amber-400 text-black px-4 py-2 rounded-full font-bold text-xs uppercase w-full">Change Password</button>
          {msg ? <p className="text-xs text-amber-400">{msg}</p> : null}
        </form>
      </div>
    </div>
  );
}