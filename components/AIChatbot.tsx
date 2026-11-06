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
  // WHATSAPP STYLE: Image will be saved here after select, will NOT auto send
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

  // Image select will only show PREVIEW, will not send
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    reader.readAsDataURL(file);
    e.target.value = ""; // so same image can be selected again
  };

  // OFFLINE BACKUP - 100% ENGLISH ONLY - Will never say Sorry
  const getOfflineReply = (q: string): string => {
    const t = q.toLowerCase();
    if (t.includes("hello") || t.includes("hi") || t.includes("salam")) return "Hello! Welcome to Krossford. Which product are you interested in? Bag, Wallet, Jacket, Belt or Cap? Are you looking for a single piece (B2C) or a bulk order (B2B)?";
    if (t.includes("price") || t.includes("cost") || t.includes("rate")) {
      const list = products.slice(0, 5).map(p => `${p.name} - $${p.price}`).join("\n");
      return `Our Top Products:\n${list}\n\nShipment + Delivery charges will be confirmed separately.`;
    }
    if (t.includes("b2b") || t.includes("bulk")) return "B2B - Bulk Order: As Per Your Need - No Fixed MOQ. Bulk Pallet Packing, Freight Insured delivery. Paid Sample available, sample price will be adjusted in your order.";
    if (t.includes("b2c") || t.includes("single")) return "B2C - Single Piece: Starts from 1 Piece. Single Packing, delivery via DHL Courier.";
    if (t.includes("sample")) return "Yes! Paid Sample is available. If you place an order, the sample price will be adjusted in your order.";
    if (t.includes("shipment") || t.includes("delivery") || t.includes("shipping") || t.includes("total") || t.includes("courier") || t.includes("dhl")) return "Total Price = Product Price + Shipment (Packing) + Delivery (Courier). Shipment and Delivery charges will be confirmed according to your country, they are not included in the product price. Tracking number will be shared after dispatch.";
    if (t.includes("custom") || t.includes("engrav") || t.includes("logo") || t.includes("design") || t.includes("photo") || t.includes("image") || t.includes("cap")) return "Thanks for your design photo! ✅ Custom Name / Engraving and Logo upload is available. Extra charges will apply for customization and will be confirmed when your order is confirmed. You can also send this design on WhatsApp.";
    if (t.includes("payment") || t.includes("pay")) return "Payment will be discussed on WhatsApp after your order is confirmed. Secure & Protected Payments.";
    const found = products.find(p => t.includes(p.name.toLowerCase().split(" ")[0]));
    if (found) return `${found.name} - $${found.price} - ${found.description || found.category}. Please select colour and Add To Cart.`;
    return "Got it. You can select a product from the Shop page and Checkout, or order on WhatsApp. Would you like to know about Price, B2B, Sample or Shipment?";
  };

  // Send button - Text + Image both go together
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
      const userLanguage = "en";
      const userCountry = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, userLanguage, userCountry }),
      });
      const data = await res.json();
      // FIX: If API says Sorry, give offline answer
      if (!data.reply || data.reply.includes("Sorry, please try again")) {
        setMessages([...newMessages, { sender: "ai", text: getOfflineReply(userMsg.text) }]);
      } else {
        setMessages([...newMessages, { sender: "ai", text: data.reply }]);
      }
    } catch (e) {
      // FIX: On connection fail also give offline answer, not Sorry
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
              <p className="text-[11px] text-zinc-400">Online • Replies in English</p>
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

          {/* WHATSAPP STYLE PREVIEW - Image will show here after select */}
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
              <p className="text-[11px] text-zinc-500 mt-1">Image ready ✅ Now write text below and press Send</p>
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
              placeholder={pendingImage ? "Write about this design..." : "Type your message..."}
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