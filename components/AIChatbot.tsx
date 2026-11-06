"use client";

import { useState, useRef, useEffect } from "react";

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
      setMessages([...newMessages, { sender: "ai", text: data.reply || "Sorry, please try again." }]);
    } catch (e) {
      setMessages([...newMessages, { sender: "ai", text: "Sorry, connection error. Please WhatsApp us." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-black text-white px-4 py-3 rounded-full shadow-lg text-sm font-bold"
        >
          💬 Ask Krossford AI
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[340px] max-w-[90vw] h-[480px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border">
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
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-[13px] leading-relaxed ${m.sender === "user" ? "bg-black text-white" : "bg-white border text-black"}`}>
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