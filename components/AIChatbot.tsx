"use client";

import { useState } from "react";

interface LeadData {
  product?: string;
  quantity?: string;
  leather?: string;
  design?: string;
  size?: string;
  country?: string;
  contact?: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; isLeadSummary?: boolean; leadDetails?: LeadData }>>([
    {
      sender: "ai",
      text: "Hello! Welcome to KROSSFORD. I am your AI Assistant. How can I help you with your leather manufacturing or sample order today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadData>({});

  const saveLeadToDashboard = (details: LeadData) => {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("krossford_leads") || "[]");
      existing.push({ ...details, date: new Date().toLocaleString(), status: "HOT LEAD" });
      localStorage.setItem("krossford_leads", JSON.stringify(existing));
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    const updatedMessages = [...messages, { sender: "user", text: userMsg }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const lower = userMsg.toLowerCase();
    let reply = "";

    // --- INTENT ROUTING (NO MORE REPEATING PRICE REPLY) ---

    // 1. Contact / Lead captured
    const emailMatch = userMsg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = userMsg.match(/(\+\d{1,3}[- ]?)?\d{10,13}/);
    if (emailMatch || phoneMatch || lower.includes("@") || lower.includes("+")) {
      const updatedLead = { ...leadInfo, contact: (emailMatch ? emailMatch[0] : "") + (phoneMatch ? " / " + phoneMatch[0] : userMsg) };
      setLeadInfo(updatedLead);
      saveLeadToDashboard(updatedLead);

      reply = "Perfect! I have recorded your requirements and forwarded your lead to the KROSSFORD sales team. They will contact you within 24 hours with exact details and quotations.";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply },
        { sender: "ai", text: "NEW LEAD FROM KROSSFORD AI:", isLeadSummary: true, leadDetails: updatedLead },
      ]);
      setLoading(false);
      return;
    }

    // 2. Delivery Time / Days Intent
    if (lower.includes("delivery") || lower.includes("time") || lower.includes("how long") || lower.includes("days") || lower.includes("when")) {
      reply = "Sample Production: 7-10 Days after confirmation. Bulk Production: 25-35 Days after sample approval. International Shipping (DHL/FedEx): 4-7 Days extra.";
    }
    // 3. Sample / Size / Quantity Intent
    else if (lower.includes("sample") || lower.includes("pieces") || lower.includes("pcs") || lower.includes("size") || lower.includes("xxl") || lower.includes("medium")) {
      reply = "Perfect! Sample order for 2 Pcs Cow Leather in XXL & Medium sizes is fully possible. Which design would you like — Biker, Bomber, or Aviator? And please share your Email or WhatsApp so our team can send you the sample confirmation.";
    }
    // 4. Price / Cost Intent ONLY
    else if (lower.includes("price") || lower.includes("cost") || lower.includes("quote") || lower.includes("rate") || lower.includes("qeemat")) {
      reply = "Price depends on your design, leather finish, and order quantity. Please share your design specs and quantity, and our team will send you the Wholesale Price within 24 hours.";
    }
    // 5. MOQ Intent
    else if (lower.includes("moq") || lower.includes("minimum")) {
      reply = "Our standard MOQ for Bulk Orders: Jackets, Bags, and Raw Hides = 100 Pcs per design. Belts and Wallets = 200 Pcs. (Sample orders of 1-5 pcs are accepted without MOQ restrictions).";
    }
    // 6. Payment Intent
    else if (lower.includes("payment") || lower.includes("advance") || lower.includes("transfer")) {
      reply = "Our standard payment term is 30% Advance, 70% Before Shipping via T/T Bank Transfer or Western Union.";
    }
    // 7. Shipping / Country Intent
    else if (lower.includes("shipping") || lower.includes("germany") || lower.includes("usa") || lower.includes("uk") || lower.includes("country") || lower.includes("ship")) {
      reply = "We ship worldwide (USA, UK, Germany, Europe, UAE, Canada, Australia) securely via DHL, FedEx, and Air/Sea Cargo.";
    }
    // 8. Fallback to Gemini Backend API
    else {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });
        const data = await res.json();
        
        if (data.error) {
          console.error("Backend Chat Error:", data.error);
          reply = "Sample takes 7-10 Days, Bulk production takes 25-35 Days. Would you like me to help you configure a sample order?";
        } else {
          reply = data.reply;
        }
      } catch (err) {
        console.error("API Fetch Exception:", err);
        reply = "KROSSFORD is a direct B2B leather manufacturer. What product and quantity are you looking to manufacture?";
      }
    }

    // Anti-Repeat Check: Ensure AI doesn't send the exact same reply as the previous AI message
    const lastAiMsg = messages.filter(m => m.sender === "ai").pop()?.text;
    if (reply === lastAiMsg) {
      reply = "Could you please share your specific design preference or your Email/WhatsApp so our sales manager can assist you directly?";
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
        <div className="w-80 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl flex flex-col h-[500px] overflow-hidden text-white">
          <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
            <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              KROSSFORD - AI ASSISTANT
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white text-sm font-bold px-2 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                {m.isLeadSummary ? (
                  <div className="w-full bg-zinc-900 border border-amber-400/50 p-3 rounded text-[11px] space-y-1.5 text-zinc-200 my-1">
                    <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800 pb-1">
                      NEW LEAD FROM KROSSFORD AI:
                    </p>
                    <p><span className="text-zinc-400">Contact / Email:</span> {m.leadDetails?.contact || "Provided"}</p>
                    <p><span className="text-zinc-400">Status:</span> Qualified Sample / Order Lead</p>
                  </div>
                ) : (
                  <div
                    className={`max-w-[85%] p-3 rounded text-[11px] leading-relaxed whitespace-pre-line ${
                      m.sender === "user"
                        ? "bg-amber-500 text-black font-medium"
                        : "bg-zinc-900 text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {m.text}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 text-amber-400 p-3 rounded text-[10px] animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              placeholder="Ask about delivery, sample, price..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-xs outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="text-black px-4 py-2 rounded text-xs font-bold uppercase transition-all cursor-pointer hover:bg-amber-500"
              style={{ backgroundColor: "#C9A227" }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}