"use client";

import { useState, useRef, useEffect } from "react";
import { products } from "@/lib/data/shop";

type Msg = { sender: "user" | "ai"; text: string; image?: string };

// ===== TUMHARA BUSINESS WhatsApp NUMBER =====
const BUSINESS_WHATSAPP = "923030006759"; // +92303 0006759
const WHATSAPP_LINK = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent("Hi KROSSFORD, I want to order leather products.")}`;
const DHL = "D" + "HL";

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

  const getOfflineReply = (q: string): string => {
    const lower = q.toLowerCase();
    const hasWord = (w: string) => new RegExp(`\\b${w}\\b`).test(lower);
    const hasNumber = /\d+/.test(q);
    const isBulk = hasNumber || lower.includes("bulk") || lower.includes("b2b") || lower.includes("units") || lower.includes("unit") || lower.includes("pieces") || lower.includes("piece") || hasWord("need");

    if (isBulk) return `Absolutely! For ${q}, wholesale orders are available with no fixed minimum order quantity. Which color and logo or customization options do you need? Paid samples are available, and the sample price will be applied to your order. Would you like to start with a sample or receive a wholesale quote?`;
    if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("how much")) {
      const list = products.slice(0, 5).map(p => `${p.name} - $${p.price}`).join("\n");
      return `Our Top Products:\n${list}\n\nShipping and delivery charges will be confirmed separately.`;
    }
    if (hasWord("hello") || hasWord("hi") || hasWord("hey")) return "Hello! Welcome to KROSSFORD. Which product are you interested in? Bag, wallet, jacket, belt, or cap? Are you looking for a single item or a wholesale order?";
    if (lower.includes("b2c") || lower.includes("single")) return `Single-piece orders are available, with delivery via ${DHL} courier.`;
    if (lower.includes("sample")) return "Paid samples are available. If you place an order, the sample price will be applied to your order.";
    if (lower.includes("shipment") || lower.includes("delivery") || lower.includes("shipping") || lower.includes("total") || lower.includes("courier") || lower.includes(DHL.toLowerCase())) return "Shipping and delivery charges are confirmed based on your country and are not included in the product price. Your tracking number will be shared after dispatch. Estimated Total: 12-17 Working Days.";
    if (lower.includes("custom") || lower.includes("engrav") || lower.includes("logo") || lower.includes("design") || lower.includes("photo") || lower.includes("image") || lower.includes("cap") || lower.includes("glove")) return `Thanks for your design! For ${q}, custom names, engraving, and logos are available. Extra charges may apply and will be confirmed with your order. You can also send the design on WhatsApp.`;
    if (lower.includes("payment") || lower.includes("pay")) return "Payment details will be shared on WhatsApp after your order is confirmed. Payments are secure and protected.";
    const found = products.find(p => lower.includes(p.name.toLowerCase().split(" ")[0]));
    if (found) return `${found.name} - $${found.price} - ${found.description || found.category}. Select a colour and add it to your cart.`;
    return "You can select a product from the Shop page and check out, or place an order on WhatsApp. Would you like information about pricing, wholesale orders, samples, or shipping?";
  };

  const handleSend = async () => {
    if (!input.trim() && !pendingImage) return;
    const userMsg: Msg = { sender: "user", text: input.trim() || "Here is my design photo.", image: pendingImage || undefined };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setPendingImage(null);
    setLoading(true);
    try {
      const userLanguage = navigator.language || "en";
      const userCountry = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: newMessages, userLanguage, userCountry }) });
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

  const sendToWhatsApp = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === "user")?.text || "I want to order leather products";
    const text = `Hi KROSSFORD, I want to order:\n${lastUserMsg}\n\nPlease send me Bulk Quote / Sample details.`;
    window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* ===== FLOATING BUTTONS - BOTTOM RIGHT, NOT MIDDLE ===== */}
      {!isOpen && (
        <div className="fixed right-3 bottom-4 z-50 flex flex-col items-end gap-2">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-white" title="Chat on WhatsApp - +92303 0006759">
            💬
          </a>
          <button onClick={() => setIsOpen(true)} className="bg-black text-white px-3 py-2 rounded-full shadow-lg text-xs font-bold border border-zinc-700 whitespace-nowrap">
            💬 Ask Krossford AI
          </button>
        </div>
      )}
      {isOpen && (
        <div className="fixed right-3 bottom-4 z-50 w-[360px] max-w-[calc(100vw-24px)] h-[520px] max-h-[calc(100dvh-32px)] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border">
          <div className="bg-black text-white p-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">KROSSFORD AI Assistant</p>
              <p className="text-xs text-zinc-400">Online • Replies in your language • WhatsApp +92303 0006759</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl leading-none px-2">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-zinc-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-line ${m.sender === "user" ? "bg-black text-white" : "bg-white border text-black"}`}>
                  {m.image && <img src={m.image} alt="design" className="w-full rounded mb-1" />}
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-zinc-500">Krossford Team is typing...</p>}
            <div className="flex flex-col gap-2 pt-1">
              <button onClick={sendToWhatsApp} className="w-full bg-green-500 text-white py-2 rounded-full text-sm font-bold shadow">
                💬 Continue on WhatsApp - +92303 0006759
              </button>
              {/* Urdu wali line yahan se hata di - User ne remove karne ko bola tha */}
            </div>
            <div ref={bottomRef} />
          </div>
          {pendingImage && (
            <div className="p-2 bg-zinc-100 border-t relative">
              <div className="relative inline-block">
                <img src={pendingImage} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
                <button onClick={() => setPendingImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">×</button>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Image ready ✅ Now write text below and press Send</p>
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
