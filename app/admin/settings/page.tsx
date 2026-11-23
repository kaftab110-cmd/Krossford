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
  // FIX - Eye buttons: 3 password boxes me dekhne ke liye
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [msg, setMsg] = useState("");
  const [savedMsg, setSavedMsg] = useState("");
  const [savingPass, setSavingPass] = useState(false);

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
    // Server se Site Info bhi le aao - taake har device pe same dikhe
    (async () => {
      try {
        const r = await fetch("/api/site-settings", { cache: "no-store" });
        const d = await r.json().catch(() => ({}));
        if (d.site_name) setSiteName(String(d.site_name));
        if (d.support_email) setSupportEmail(String(d.support_email));
        if (d.whatsapp) setWhatsapp(String(d.whatsapp));
        if (d.delivery_note) setDeliveryNote(String(d.delivery_note));
      } catch {}
    })();
  }, []);

  const saveToServer = async (key: string, value: string) => {
    const r = await fetch("/api/site-settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, value: String(value) }) });
    if (!r.ok) throw new Error("Server save fail");
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { siteName, supportEmail, whatsapp, deliveryNote };
    try {
      localStorage.setItem("krossford_settings", JSON.stringify(data));
      // FIX - Server pe bhi save karo, taake har device pe same dikhe
      await saveToServer("site_name", siteName);
      await saveToServer("support_email", supportEmail);
      await saveToServer("whatsapp", whatsapp);
      await saveToServer("delivery_note", deliveryNote);
      setSavedMsg("✅ Settings save ho gayi!");
    } catch {
      setSavedMsg("Browser me save ho gayi, server pe nahi gayi - dobara try karo.");
    }
    setTimeout(() => setSavedMsg(""), 3000);
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const oldP = oldPass.trim();
    const newP = newPass.trim();
    const confP = confirmPass.trim();
    if (!oldP || !newP || !confP) { setMsg("Teeno boxes bharo."); return; }
    if (newP.length < 6) { setMsg("Naya password kam se kam 6 letters ka rakho!"); return; }
    if (newP !== confP) { setMsg("Naya password aur Confirm password same nahi hai!"); return; }
    setSavingPass(true);
    try {
      // FIX - Purana password pehle SERVER se check karo, phir is browser se, phir default se.
      // Pehle sirf is browser se check hota tha - Mobile pe purana password galat batata tha.
      let current = "";
      try {
        const r = await fetch("/api/site-settings", { cache: "no-store" });
        const d = await r.json().catch(() => ({}));
        current = String(d.admin_pass || d.krossford_admin_pass || d.admin_password || "").trim();
      } catch {}
      if (!current) current = (localStorage.getItem("krossford_admin_pass") || "krossford2026").trim();
      const localSaved = (localStorage.getItem("krossford_admin_pass") || "").trim();
      const oldOk = oldP === current || (localSaved && oldP === localSaved) || oldP === "krossford2026";
      if (!oldOk) { setMsg("Purana password galat hai! 👁️ dabake dekh ke dobara likho."); setSavingPass(false); return; }
      // FIX - Naya password 2 jagah save karo: Server (sab devices) + is browser (backup)
      await saveToServer("admin_pass", newP);
      localStorage.setItem("krossford_admin_pass", newP);
      setMsg("✅ Password change ho gaya! Ab ye naya password Laptop + Mobile dono pe chalega.");
      setOldPass(""); setNewPass(""); setConfirmPass("");
      setShowOld(false); setShowNew(false); setShowConfirm(false);
    } catch {
      setMsg("❌ Password server pe save nahi hua - internet / Supabase check karo, dobara try karo. (Browser me bhi nahi badla)");
    }
    setSavingPass(false);
  };

  const eyeBtn = (show: boolean, setShow: (v: boolean) => void) => (
    <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 text-base" title={show ? "Chhupao" : "Dekho"}>{show ? "🙈" : "👁️"}</button>
  );

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
          <p className="text-zinc-400">NOTE: Ab Settings + Password server pe bhi save hote hain, taake har device pe same dikhe.</p>
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
            <p className="text-xs text-zinc-500 mt-1">Ye naam Dashboard aur Admin pe dikhega.</p>
          </div>
          <div>
            <label className="text-xs text-zinc-400">Support Email</label>
            <input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full mt-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
            <p className="text-xs text-zinc-500 mt-1">Customer isi email pe contact karega - hello@krossford.com</p>
          </div>
          <div>
            <label className="text-xs text-zinc-400">WhatsApp Number</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full mt-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
            <p className="text-xs text-zinc-500 mt-1">Ye tumhara business WhatsApp number hai.</p>
          </div>
          <div>
            <label className="text-xs text-zinc-400">Delivery Note</label>
            <textarea value={deliveryNote} onChange={(e) => setDeliveryNote(e.target.value)} rows={2} className="w-full mt-1 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded text-xs outline-none focus:border-amber-400" />
            <p className="text-xs text-zinc-500 mt-1">Ye note Checkout / Orders me kaam aayega.</p>
          </div>
          <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs uppercase w-full">Save Settings</button>
          {savedMsg ? <p className="text-xs text-green-400">{savedMsg}</p> : null}
        </form>

        <form onSubmit={changePassword} className="bg-zinc-900 border border-zinc-800 p-5 rounded space-y-3">
          <p className="font-bold text-white text-sm">Change Admin Password</p>
          <p className="text-xs text-zinc-400">Yahan se: Admin ka password badlo. Purana password pata hona zaroori hai.</p>
          <div className="relative"><input type={showOld ? "text" : "password"} value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder="Purana Password" autoCapitalize="none" autoCorrect="off" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 pr-10 rounded text-xs outline-none focus:border-amber-400" />{eyeBtn(showOld, setShowOld)}</div>
          <div className="relative"><input type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Naya Password - Kam se kam 6 letters" autoCapitalize="none" autoCorrect="off" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 pr-10 rounded text-xs outline-none focus:border-amber-400" />{eyeBtn(showNew, setShowNew)}</div>
          <div className="relative"><input type={showConfirm ? "text" : "password"} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Naya Password Dobara Likho" autoCapitalize="none" autoCorrect="off" className="w-full bg-zinc-950 border border-zinc-800 px-3 py-2 pr-10 rounded text-xs outline-none focus:border-amber-400" />{eyeBtn(showConfirm, setShowConfirm)}</div>
          <button disabled={savingPass} className={`px-4 py-2 rounded-full font-bold text-xs uppercase w-full ${savingPass ? "bg-zinc-700 text-zinc-400" : "bg-amber-400 text-black"}`}>{savingPass ? "Saving..." : "Change Password"}</button>
          {msg ? <p className="text-xs text-amber-400">{msg}</p> : null}
        </form>
      </div>
    </div>
  );
}
