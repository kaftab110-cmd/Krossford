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
  customerName?: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; image?: string; isLeadSummary?: boolean; leadDetails?: LeadData; isVipWelcome?: boolean }>>([
    {
      sender: "ai",
      text: "Welcome to KROSSFORD ENTERPRISES 🌍 - A New-Generation International Leather Brand, Since 2025. We prove our quality with Sample Before Bulk. We offer: Sample Before Bulk, 100% Real Leather Guarantee, On-Time Delivery. You can see our 4.9★ reviews on Google and our Website. How can I help you today? Do you have a design photo?",
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
    const phoneMatch = userMsg.match(/(\+\d{1,3}[\s-]?)?\d{10,13}/);

    if (emailMatch || phoneMatch || lower.includes("@") || lower.includes("+")) {
      const foundEmail = emailMatch ? emailMatch[0] : "";
      const foundPhone = phoneMatch ? phoneMatch[0] : "";
      
      let existingContact = leadInfo.contact || "";
      let parts = existingContact ? existingContact.split(" / ").map(p => p.trim()) : [];
      if (foundEmail && !parts.includes(foundEmail)) parts.push(foundEmail);
      if (foundPhone && !parts.includes(foundPhone)) parts.push(foundPhone);
      const mergedContact = parts.join(" / ");

      let isRepeatCustomer = false;
      let orderCount = 1;
      let customerName = "Valued Partner";
      let lastProduct = "Custom Leather Goods";

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
          customerName = lookupData.customer.name || "Kaftab";
          lastProduct = lookupData.customer.total_products?.[0] || "Duffle Bag";
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

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: { ...updatedLead, email: foundEmail, whatsapp: foundPhone }, images: currentImgs, chatHistory: updatedMessages }),
      });

      let aiReply = "";
      if (isRepeatCustomer) {
        const isGold = orderCount >= 3;
        aiReply = `❤️ Welcome Back, ${customerName}!\n\nYou are our ${isGold ? '🏆 GOLD VIP MEMBER' : '⭐ VIP FAMILY MEMBER'}. Your trust built KROSSFORD ENTERPRISES internationally. Thank you!\n\nYour last order (${lastProduct}) was crafted with pride. Your new order gets FIRST PRIORITY in our factory.\n\n✨ VIP Perks Unlocked:\n• 1st Sample Absolutely FREE\n• 5% Discount on Bulk\n• Free Private Label / Logo\n• Direct WhatsApp with Master Craftsman`;
      } else {
        aiReply = "Welcome to KROSSFORD ENTERPRISES 🌍 - Crafted with Precision. Trusted Worldwide. Your inquiry has been dispatched to our international sales team.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiReply, isVipWelcome: isRepeatCustomer },
        { sender: "ai", text: "KROSSFORD ENTERPRISES LEAD RECORDED:", isLeadSummary: true, leadDetails: updatedLead },
      ]);
      setLoading(false);
      return;
    }

    let reply = "KROSSFORD ENTERPRISES is an international leather manufacturer (Since 2025). Upload your design photo 📎 or share your quantity for wholesale pricing.";
    if (lower.includes("delivery") || lower.includes("time")) {
      reply = "Sample Production: 7-10 Days (VIP: 5-7 Days). Bulk Production: 25-35 Days. Shipping via DHL/FedEx to 15+ countries.";
    }

    setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    setLoading(false);
  };

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[20px] right-[16px] z-50 w-[56px] h-[56px] bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold shadow-lg cursor-pointer border-2 border-amber-300 font-mono"
          aria-label="Open AI Assistant"
        >
          AI
        </button>
      ) : (
        <div className="fixed bottom-[90px] right-3 w-[calc(100vw-24px)] max-w-[380px] h-[70vh] max-h-[550px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white z-[60] font-mono">
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              KROSSFORD ENTERPRISES - AI ASSISTANT
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white text-sm font-bold px-2">✕</button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.isLeadSummary ? (
                  <div className="w-full bg-zinc-900 border border-amber-400/50 p-3 rounded text-[11px] space-y-2 text-zinc-200">
                    <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800 pb-1 flex justify-between">
                      <span>{m.leadDetails?.isRepeat ? `🟢 VIP REPEAT - ORDER #${m.leadDetails.totalOrders}` : `🔵 NEW INTERNATIONAL LEAD`}</span>
                      <span className="text-amber-300">★ ★ ★ ★ ★</span>
                    </p>
                    <p><span className="text-zinc-400">Contact:</span> {m.leadDetails?.contact || "Provided"}</p>
                    <p><span className="text-zinc-400">Status:</span> Dispatched to Email & WhatsApp ✅</p>
                    <div className="flex gap-2 pt-1">
                      <a href={`mailto:${m.leadDetails?.contact}?subject=KROSSFORD ENTERPRISES Quotation`} className="flex-1 bg-amber-500 text-black text-center py-1 rounded font-bold text-[9px]">Email Client</a>
                      <a href={`https://wa.me/${businessWhatsapp}?text=Hi VIP Customer, regarding your lead.`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-600 text-white text-center py-1 rounded font-bold text-[9px]">WhatsApp</a>
                    </div>
                  </div>
                ) : (
                  <div className={`max-w-[85%] p-3 rounded text-[11px] leading-relaxed whitespace-pre-line relative ${m.sender === "user" ? "bg-amber-500 text-black font-medium" : "bg-zinc-900 text-zinc-200 border border-zinc-800"}`}>
                    {m.isVipWelcome && (
                      <div className="absolute -top-3 -right-2 bg-amber-400 text-black font-bold px-2 py-0.5 rounded text-[9px] shadow uppercase border border-amber-200">
                        🎉 VIP Gold Member
                      </div>
                    )}
                    {m.image && <img src={m.image} alt="Design" className="w-full h-auto rounded mb-2" />}
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-amber-400 text-[10px] animate-pulse">Syncing with KROSSFORD CRM & Manufacturing...</div>}
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
            <button type="submit" className="text-black px-3 py-2 rounded text-xs font-bold uppercase cursor-pointer" style={{ backgroundColor: "#C9A227" }}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}