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

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // SMART LANGUAGE DETECT - Samne wala kis language me hai?
  const isRomanUrdu = (q: string): boolean => {
    const t = q.toLowerCase();
    const urduWords = ["aap", "mujhe", "chahiye", "kitne", "kya", "kaunsa", "kaisa", "kab", "kahan", "kitna", "hai", "hain", "kar", "do", "batao", "samajh", "price kya", "rate kya", "piece", "salam", "assalam", "bhai", "bata", "kro", "karo", "chahye", "maal", "leather ka"];
    // Agar Urdu lafz mile ya Urdu script ho to Roman Urdu samjho
    if (/[\u0600-\u06FF]/.test(q)) return true;
    return urduWords.some(w => t.includes(w));
  };

  // OFFLINE BACKUP - SMART: JIS LANGUAGE ME SAWAL, USI ME JAWAB
  const getOfflineReply = (q: string): string => {
    const t = q.toLowerCase();
    const urdu = isRomanUrdu(q);

    // GREETING
    if (t.includes("hello") || t.includes("hi") || t.includes("salam")) {
      return urdu
        ? "Hello! Krossford me Welcome. Aapko kaunsa product chahiye? Bag, Wallet, Jacket, Belt ya Cap? B2C single piece chahiye ya B2B bulk?"
        : "Hello! Welcome to Krossford. Which product are you interested in? Bag, Wallet, Jacket, Belt or Cap? Are you looking for a single piece (B2C) or a bulk order (B2B)?";
    }
    // PRICE
    if (t.includes("price") || t.includes("cost") || t.includes("rate") || t.includes("kitne")) {
      const list = products.slice(0, 5).map(p => `${p.name} - $${p.price}`).join("\n");
      return urdu
        ? `Hamari Top Products:\n${list}\n\nShipment + Delivery charges alag se confirm honge.`
        : `Our Top Products:\n${list}\n\nShipment + Delivery charges will be confirmed separately.`;
    }
    // B2B / BULK / UNITS - YEHI TUMHARA WALA CASE HAI
    if (t.includes("b2b") || t.includes("bulk") || t.includes("units") || t.includes("unit") || t.includes("pieces") || t.includes("piece")) {
      return urdu
        ? `Bilkul ho jayega! ${q} - B2B Bulk Order ke liye No Fixed MOQ hai. Aapko kaunsa Color chahiye aur Logo / Customization chahiye? Paid Sample available hai, order pe sample price adjust ho jayega. Batao, Sample se start karein ya Bulk Quote dun?`
        : `Absolutely! For ${q} - B2B Bulk Order, there is No Fixed MOQ. Which Color do you need and do you need Logo / Customization? Paid Sample is available, sample price will be adjusted in your order. Shall we start with a Sample or should I give you a Bulk Quote?`;
    }
    if (t.includes("b2c") || t.includes("single")) return urdu ? "B2C - Single Piece: 1 Piece se start. Single Packing, DHL Courier se delivery hogi." : "B2C - Single Piece: Starts from 1 Piece. Single Packing, delivery via DHL Courier.";
    if (t.includes("sample")) return urdu ? "Ji! Paid Sample available hai. Agar aap order place karte ho to sample price aapke order me adjust kar di jayegi." : "Yes! Paid Sample is available. If you place an order, the sample price will be adjusted in your order.";
    if (t.includes("shipment") || t.includes("delivery") || t.includes("shipping") || t.includes("total") || t.includes("courier") || t.includes("dhl")) return urdu ? "Total Price = Product Price + Shipment (Packing) + Delivery (Courier). Shipment aur Delivery charges aapke country ke hisaab se confirm honge, wo product price me shamil nahi hain. Tracking number dispatch ke baad share hoga." : "Total Price = Product Price + Shipment (Packing) + Delivery (Courier). Shipment and Delivery charges will be confirmed according to your country, they are not included in the product price. Tracking number will be shared after dispatch.";
    if (t.includes("custom") || t.includes("engrav") || t.includes("logo") || t.includes("design") || t.includes("photo") || t.includes("image") || t.includes("cap") || t.includes("glove") || t.includes("gloves")) return urdu ? `Shukriya! Aapka design mil gaya ✅ ${q} ke liye Custom Name / Engraving aur Logo ho sakta hai. Is pe extra charges lagenge jo order confirm hone pe bataye jayenge. Aap is design ko WhatsApp pe bhi bhej sakte ho.` : `Thanks for your design! ✅ For ${q}, Custom Name / Engraving and Logo is available. Extra charges will apply for customization and will be confirmed when your order is confirmed. You can also send this design on WhatsApp.`;
    if (t.includes("payment") || t.includes("pay")) return urdu ? "Payment order confirm hone pe WhatsApp pe discuss hogi. Secure & Protected Payments hain." : "Payment will be discussed on WhatsApp after your order is confirmed. Secure & Protected Payments.";
    const found = products.find(p => t.includes(p.name.toLowerCase().split(" ")[0]));
    if (found) return urdu ? `${found.name} - $${found.price} - ${found.description || found.category}. Colour select karke Add To Cart kar sakte ho.` : `${found.name} - $${found.price} - ${found.description || found.category}. Please select colour and Add To Cart.`;
    return urdu
      ? "Aapka sawal samajh aa gaya. Aap Shop page se product select karke Checkout kar sakte ho, ya WhatsApp pe order kar sakte ho. Kya aapko Price, B2B, Sample ya Shipment ke baare me jaanna hai?"
      : "Got it. You can select a product from the Shop page and Checkout, or order on WhatsApp. Would you like to know about Price, B2B, Sample or Shipment?";
  };

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
      // SMART: User ki asli language bhejo, force English nahi
      const userLanguage = navigator.language || "en";
      const userCountry = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userLanguage, userCountry }),
      });
      const data = await res.json();
      if (!data.reply || data.reply.includes("Sorry, please try again")) {
        setMessages([...newMessages, { sender: "ai", text: getOfflineReply(userMsg.text) }]);
      } else {
        setMessages([...newMessages, { sender: "ai", text: data.reply }]);
      }
    } catch (e) {
      setMessages([...newMessages, { sender: "ai", text: getOfflineReply(userMsg.text) }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-24 right-5 z-50 bg-black text-white px-4 py-3 rounded-full shadow-lg text-sm font-bold border border-zinc-700">
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
          {pendingImage && (
            <div className="p-2 bg-zinc-100 border-t relative">
              <div className="relative inline-block">
                <img src={pendingImage} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
                <button onClick={() => setPendingImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">×</button>
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">Image ready ✅ Now write text below and press Send</p>
            </div>
          )}
          <div className="p-2 border-t flex gap-2 items-center bg-white">
            <button onClick={() => fileRef.current?.click()} className="text-lg px-1 shrink-0" title="Upload design photo">📷</button>
            <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleImageSelect} />
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }} placeholder="Type in any language..." autoFocus className="flex-1 border rounded-full px-3 py-2 text-sm outline-none bg-white text-black min-w-0" />
            <button onClick={handleSend} className="bg-black text-white px-3 py-2 rounded-full text-sm font-bold shrink-0">➤</button>
          </div>
        </div>
      )}
    </>
  );
}