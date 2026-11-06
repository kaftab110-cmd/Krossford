"use client";

import { useState, useRef, useEffect } from "react";
import { products } from "@/lib/data/shop";

type Msg = { sender: "user" | "ai"; text: string; image?: string };

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { sender: "ai", text: "Hello! Welcome to KROSSFORD. How can I help you with your leather order today? You can also upload your design photo." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // WHATSAPP WALA FEATURE: Image select hone ke baad yahan save hogi, auto send NAHI hogi
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, pendingImage]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // Image select karne pe sirf PREVIEW dikhayega, send nahi karega
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // taake dobara same image bhi select ho sake
  };

  // OFFLINE BACKUP - Agar /api/chat fail ho to ye jawab dega, Sorry nahi bolega
  const getOfflineReply = (q: string): string => {
    const t = q.toLowerCase();
    if (t.includes("hello") || t.includes("hi") || t.includes("salam")) return "Hello! Welcome to Krossford. Aapko kaunsa product chahiye? Bag, Wallet, Jacket ya Belt? B2C single piece ya B2B bulk?";
    if (t.includes("price") || t.includes("cost") || t.includes("rate")) {
      const list = products.slice(0, 5).map(p => `${p.name} - $${p.price}`).join("\n");
      return `Our Top Products:\n${list}\n\nShipment + Delivery charges alag se confirm honge.`;
    }
    if (t.includes("b2b") || t.includes("bulk")) return "B2B - Bulk Order: As Per Your Need - No Fixed MOQ. Bulk Pallet Packing, Freight Insured delivery. Paid Sample milega, order pe sample price adjust ho jayega.";
    if (t.includes("b2c") || t.includes("single")) return "B2C - Single Piece: 1 Piece se start. Single Packing, DHL Courier se delivery hogi.";
    if (t.includes("sample")) return "Yes! Paid Sample available hai. Agar aap order place karte ho to sample price aapke order me adjust kar di jayegi.";
    if (t.includes("shipment") || t.includes("delivery") || t.includes("shipping") || t.includes("total") || t.includes("courier") || t.includes("dhl")) return "Total Price = Product Price + Shipment (Packing) + Delivery (Courier). Shipment aur Delivery charges aapke country ke hisaab se confirm honge, wo product price me shamil nahi hain. Tracking number dispatch ke baad share hoga.";
    if (t.includes("custom") || t.includes("engrav") || t.includes("logo") || t.includes("design") || t.includes("photo") || t.includes("image")) return "Thanks for your design photo! ✅ Custom Name / Engraving aur Logo upload ho sakta hai. Is pe extra charges lagenge jo order confirm hone pe bataye jayenge. Aap is design ko WhatsApp pe bhi bhej sakte ho.";
    if (t.includes("payment") || t.includes("pay")) return "Payment order confirm hone pe WhatsApp pe discuss hogi. Secure & Protected Payments hain.";
    const found = products.find(p => t.includes(p.name.toLowerCase().split(" ")[0]));
    if (found) return `${found.name} - $${found.price} - ${found.description || found.category}. Colour select karke Add To Cart kar sakte ho.`;
    return "Aapka sawal samajh aa gaya. Aap Shop page se product select karke Checkout kar sakte ho, ya WhatsApp pe order kar sakte ho. Kya aapko Price, B2B, Sample ya Shipment ke baare me jaanna hai?";
  };

  // Send button - Text + Image dono ek sath jayenge
  const handleSend = async () => {
    if (!input.trim() && !pendingImage) return;

    const userMsg: Msg = {
      sender: "user",
      text: input.trim() || "Here is my design photo.",
      image: pendingImage || undefined,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setPendingImage(null);
    setLoading(true);

    try {
      const userLanguage = navigator.language || "en";
      const userCountry = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userLanguage, userCountry }),
      });
      const data = await res.json();
      // FIX: Agar API se Sorry aaye to offline jawab do
      if (!data.reply || data.reply.includes("Sorry, please try again")) {
        setMessages([...newMessages, { sender: "ai", text: getOfflineReply(userMsg.text) }]);
      } else {
        setMessages([...newMessages, { sender: "ai", text: data.reply }]);
      }
    } catch (e) {
      // FIX: Connection fail hone pe bhi Sorry nahi, offline jawab
      setMessages([...newMessages, { sender: "ai", text: getOfflineReply(userMsg.text) }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-5 z-50 bg-black text-white px-4 py-3 rounded-full shadow-lg text-sm font-bold border border-zinc-700"
        >
          💬 Ask Krossford AI
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-3 z-50 w-[340px] max-w-[calc(100vw-24px)] h-[480px] max-h-[75vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border">
          <div className="bg-black text-white p-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">KROSSFORD AI Assistant</p>
              <p className="text-[11px] text-zinc-400">Online • Replies in your language 🌍</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl leading-none px-2">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-zinc-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-[13px] leading-relaxed whitespace-pre-line ${m.sender === "user" ? "bg-black text-white" : "bg-white border text-black"}`}>
                  {m.image && <img src={m.image} alt="design" className="w-full rounded mb-1" />}
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-[11px] text-zinc-500">Krossford Team is typing...</p>}
            <div ref={bottomRef} />
          </div>

          {/* WHATSAPP JESA PREVIEW - Image select karne pe yahan dikhegi */}
          {pendingImage && (
            <div className="p-2 bg-zinc-100 border-t relative">
              <div className="relative inline-block">
                <img src={pendingImage} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
                <button
                  onClick={() => setPendingImage(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Image ready ✅ Ab neeche text likho aur Send dabao</p>
            </div>
          )}

          <div className="p-2 border-t flex gap-2 items-center bg-white">
            <button onClick={() => fileRef.current?.click()} className="text-lg px-1 shrink-0" title="Upload design photo">
              📷
            </button>
            <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleImageSelect} />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder={pendingImage ? "Is design ke baare me likho..." : "Type in any language..."}
              autoFocus
              className="flex-1 border rounded-full px-3 py-2 text-sm outline-none bg-white text-black min-w-0"
            />
            <button onClick={handleSend} className="bg-black text-white px-3 py-2 rounded-full text-sm font-bold shrink-0">➤</button>
          </div>
        </div>
      )}
    </>
  );
}