"use client";

import { useState, useRef } from "react";

interface LeadData {
  product?: string;
  quantity?: string;
  leather?: string;
  design?: string;
  size?: string;
  country?: string;
  contact?: string;
  isRepeat?: boolean;
  totalOrders?: number;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; image?: string; isLeadSummary?: boolean; leadDetails?: LeadData }>>([
    {
      sender: "ai",
      text: "Hello! Welcome to KROSSFORD. Type your query or click 📎 Attach to upload your jacket/leather design photo.",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadData>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const businessWhatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "923001234567";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && selectedImages.length === 0) return;

    const userMsg = input.trim();
    const currentImgs = [...selectedImages];

    const updatedMessages = [...messages, { sender: "user", text: userMsg, image: currentImgs[0] }];
    setMessages(updatedMessages);
    setInput("");
    setSelectedImages([]);
    setLoading(true);

    const lower = userMsg.toLowerCase();
    const emailMatch = userMsg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = userMsg.match(/(\+\d{1,3}[- ]?)?\d{10,13}/);

    if (emailMatch || phoneMatch || lower.includes("@") || lower.includes("+")) {
      const foundEmail = emailMatch ? emailMatch[0] : "";
      const foundPhone = phoneMatch ? phoneMatch[0] : "";
      
      let existingContact = leadInfo.contact || "";
      let parts = existingContact ? existingContact.split(" / ").map(p => p.trim()) : [];
      if (foundEmail && !parts.includes(foundEmail)) parts.push(foundEmail);
      if (foundPhone && !parts.includes(foundPhone)) parts.push(foundPhone);
      const mergedContact = parts.join(" / ");

      // Lookup customer repeat status in CRM
      let isRepeatCustomer = false;
      let orderCount = 1;
      try {
        const lookupRes = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "lookup", lead: { contactEmail: foundEmail, contactPhone: foundPhone } }),
        });
        const lookupData = await lookupRes.json();
        if (lookupData?.customer) {
          isRepeatCustomer = true;
          orderCount = (lookupData.customer.total_orders || 1) + 1;
        }
      } catch (err) {
        console.error("CRM Lookup error:", err);
      }

      const updatedLead: LeadData = {
        ...leadInfo,
        contact: mergedContact,
        isRepeat: isRepeatCustomer,
        totalOrders: orderCount,
        product: leadInfo.product || "Leather Apparel / Goods",
      };

      setLeadInfo(updatedLead);

      // Save to Database
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: { ...updatedLead, email: foundEmail, whatsapp: foundPhone }, images: currentImgs, chatHistory: updatedMessages }),
      });

      let aiReply = "";
      if (isRepeatCustomer) {
        aiReply = `🌟 Welcome Back! We found your record in our system. You are our REPEAT CUSTOMER (Order #${orderCount}) and receive VIP PRIORITY!\n\nYour Exclusive VIP Perks:\n1. ⚡ Fast-Track Manufacturing (Production queue skip)\n2. 🚚 Express 5-7 Days Sample Time\n3. 🏷️ Free Logo & Label Printing\n4. 💰 5% Discount on Bulk Quantity\n5. 📱 Direct Contact with Production Manager`;
      } else {
        aiReply = "Welcome to KROSSFORD! Your request has been sent to our sales team. We will send your wholesale quote within 24 hours.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiReply },
        { sender: "ai", text: "CRM LEAD RECORDED:", isLeadSummary: true, leadDetails: updatedLead },
      ]);
      setLoading(false);
      return;
    }

    // Fallback Intent Logic
    let reply = "KROSSFORD direct B2B leather manufacturer. Upload your design 📎 or share quantity.";
    if (lower.includes("delivery") || lower.includes("time")) {
      reply = "Standard Sample: 7-10 Days | Bulk: 25-35 Days. (VIP Repeat Customers get 5-7 Days express sample time).";
    } else if (lower.includes("sample") || lower.includes("size")) {
      reply = "Sample orders (1-5 pcs) are fully accepted. Please upload your design 📎 and share your Email/WhatsApp.";
    }

    setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full font-bold text-sm text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer border-2 border-amber-300"
          style={{ backgroundColor: "#C9A227" }}
        >
          AI
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl flex flex-col h-[540px] overflow-hidden text-white">
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              KROSSFORD - AI VIP ASSISTANT
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white text-sm font-bold px-2">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.isLeadSummary ? (
                  <div className="w-full bg-zinc-900 border border-amber-400/50 p-3 rounded text-[11px] space-y-2 text-zinc-200">
                    <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800 pb-1">
                      {m.leadDetails?.isRepeat ? `🟢 REPEAT CUSTOMER - ORDER #${m.leadDetails.totalOrders} - VIP PRIORITY` : `🔴 NEW CUSTOMER LEAD`}
                    </p>
                    <p><span className="text-zinc-400">Contact:</span> {m.leadDetails?.contact || "Provided"}</p>
                    <p><span className="text-zinc-400">Pipeline:</span> Sent to Email ✅ & Database Sync ✅</p>
                    <div className="flex gap-2 pt-1">
                      <a href={`mailto:${m.leadDetails?.contact}`} className="flex-1 bg-amber-500 text-black text-center py-1 rounded font-bold text-[9px]">Reply Email</a>
                      <a href={`https://wa.me/${businessWhatsapp}?text=Hi KROSSFORD, regarding lead: ${m.leadDetails?.contact}`} target="_blank" className="flex-1 bg-green-600 text-white text-center py-1 rounded font-bold text-[9px]">WhatsApp</a>
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-[85%] p-3 rounded text-[11px] leading-relaxed whitespace-pre-line ${m.sender === "user" ? "bg-amber-500 text-black font-medium" : "bg-zinc-900 text-zinc-200 border border-zinc-800"}`}>
                    {m.image && <img src={m.image} alt="Design" className="w-full h-auto rounded mb-2" />}
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-amber-400 text-[10px] animate-pulse">Checking CRM Database & VIP Perks...</div>}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input type="file" ref={fileInputRef} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setSelectedImages([reader.result as string]);
                reader.readAsDataURL(file);
              }
            }} accept="image/*" className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-zinc-400 hover:text-amber-400 p-2 text-xs border border-zinc-700 rounded bg-zinc-950">📎</button>
            <input type="text" placeholder="Type message or email..." value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-xs outline-none focus:border-amber-400" />
            <button type="submit" className="text-black px-3 py-2 rounded text-xs font-bold uppercase" style={{ backgroundColor: "#C9A227" }}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}