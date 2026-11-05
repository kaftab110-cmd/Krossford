"use client";

import { useState, useRef, useEffect } from "react";

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
  customerName?: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; image?: string; isLeadSummary?: boolean; leadDetails?: LeadData; isVipWelcome?: boolean }>>([
    {
      sender: "ai",
      text: "Hello! Welcome to KROSSFORD. You can type your query or attach your design photo 📎.",
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

      // Lookup customer in database
      let isRepeatCustomer = false;
      let orderCount = 1;
      let customerName = "Kaftab";
      let lastProduct = "Duffle Bag, 50 Pcs";

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
          customerName = lookupData.customer.name || "Valued Family Member";
          lastProduct = lookupData.customer.total_products?.[0] || "Custom Leather Goods";
        }
      } catch (err) {
        console.error("CRM Lookup error:", err);
      }

      const updatedLead: LeadData = {
        ...leadInfo,
        contact: mergedContact,
        isRepeat: isRepeatCustomer,
        totalOrders: orderCount,
        customerName: customerName,
        product: leadInfo.product || "Leather Apparel / Goods",
      };

      setLeadInfo(updatedLead);

      // Save Lead to CRM
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: { ...updatedLead, email: foundEmail, whatsapp: foundPhone }, images: currentImgs, chatHistory: updatedMessages }),
      });

      let aiReply = "";
      if (isRepeatCustomer) {
        const isGold = orderCount >= 3;
        aiReply = `❤️ Welcome Back, ${customerName}!\n\nWe missed you! You are not just a customer, you are part of the KROSSFORD Family.\n\nYour last order (${lastProduct}) was an absolute pleasure to craft for you.\n\nBecause you trusted us again, you are now our ${isGold ? '🏆 GOLD VIP MEMBER' : '⭐ VIP MEMBER'}. Your order will go FIRST in our factory production line with zero waiting time!\n\n✨ Special Perks Unlocked For You:\n• 1st Sample Absolutely FREE\n• 5% Discount on Bulk Order\n• Free Logo / Private Label Printing\n• Direct WhatsApp connection with our Master Craftsman`;
      } else {
        aiReply = "Welcome to KROSSFORD! We are thrilled to welcome you. Your inquiry has been dispatched to our manufacturing floor.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiReply, isVipWelcome: isRepeatCustomer },
        { sender: "ai", text: "CRM LEAD RECORDED:", isLeadSummary: true, leadDetails: updatedLead },
      ]);
      setLoading(false);
      return;
    }

    // Standard fallback replies
    let reply = "KROSSFORD is a direct B2B leather manufacturer. Upload your design photo 📎 or share your quantity.";
    if (lower.includes("delivery") || lower.includes("time")) {
      reply = "Sample: 7-10 Days | Bulk: 25-35 Days. (VIP Family Members get Express 5-7 Days sample turnaround).";
    } else if (lower.includes("review") || lower.includes("rating")) {
      reply = "We love our customers! If you'd like to share feedback or a 5-star review, you can reply directly here or on WhatsApp.";
    }

    setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-mono">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full font-bold text-sm text-black flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer border-2 border-amber-300 animate-pulse"
          style={{ backgroundColor: "#C9A227" }}
        >
          AI
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl flex flex-col h-[560px] overflow-hidden text-white">
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <span>👑 KROSSFORD VIP FAMILY</span>
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white text-sm font-bold px-2">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.isLeadSummary ? (
                  <div className="w-full bg-zinc-900 border border-amber-400/50 p-3 rounded text-[11px] space-y-2 text-zinc-200">
                    <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800 pb-1 flex justify-between">
                      <span>{m.leadDetails?.isRepeat ? `🌟 VIP FAMILY MEMBER - ORDER #${m.leadDetails.totalOrders}` : `🔴 NEW CUSTOMER`}</span>
                      <span className="text-amber-300">★ ★ ★ ★ ★</span>
                    </p>
                    <p><span className="text-zinc-400">Contact:</span> {m.leadDetails?.contact || "Provided"}</p>
                    <p><span className="text-zinc-400">Status:</span> Priority Factory Queue Assigned ✅</p>
                    <div className="flex gap-2 pt-1">
                      <a href={`mailto:${m.leadDetails?.contact}?subject=KROSSFORD VIP Priority Support`} className="flex-1 bg-amber-500 text-black text-center py-1 rounded font-bold text-[9px]">Email Client</a>
                      <a href={`https://wa.me/${businessWhatsapp}?text=Hi VIP Customer, regarding your repeat order.`} target="_blank" className="flex-1 bg-green-600 text-white text-center py-1 rounded font-bold text-[9px]">WhatsApp VIP</a>
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-[85%] p-3 rounded text-[11px] leading-relaxed whitespace-pre-line relative ${m.sender === "user" ? "bg-amber-500 text-black font-medium" : "bg-zinc-900 text-zinc-200 border border-zinc-800"}`}>
                    {m.isVipWelcome && (
                      <div className="absolute -top-3 -right-2 bg-amber-400 text-black font-bold px-2 py-0.5 rounded text-[9px] shadow uppercase border border-amber-200 animate-bounce">
                        🎉 VIP Gold Badge
                      </div>
                    )}
                    {m.image && <img src={m.image} alt="Design" className="w-full h-auto rounded mb-2" />}
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-amber-400 text-[10px] animate-pulse">Recognizing Customer & Loading VIP Perks...</div>}
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
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-zinc-400 hover:text-amber-400 p-2 text-xs border border-zinc-700 rounded bg-zinc-950" title="Attach Design">📎</button>
            <input type="text" placeholder="Type message or email..." value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-xs outline-none focus:border-amber-400" />
            <button type="submit" className="text-black px-3 py-2 rounded text-xs font-bold uppercase" style={{ backgroundColor: "#C9A227" }}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}