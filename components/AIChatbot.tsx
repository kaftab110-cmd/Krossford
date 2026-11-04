"use client";

import { useState } from "react";

interface LeadData {
  name?: string;
  contact?: string;
  country?: string;
  product?: string;
  quantity?: string;
  designAndLeather?: string;
  privateLabel?: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; isLeadSummary?: boolean; leadDetails?: LeadData }>>([
    {
      sender: "ai",
      text: "Hello! Welcome to KROSSFORD. I am your AI Assistant. How can I help you with your leather manufacturing order today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lead, setLead] = useState<LeadData>({});

  const parseLeadDetails = (text: string, currentLead: LeadData): LeadData => {
    const updated = { ...currentLead };
    const lower = text.toLowerCase();

    if (lower.includes("jacket")) updated.product = "Jackets";
    else if (lower.includes("bag")) updated.product = "Bags";
    else if (lower.includes("belt")) updated.product = "Belts";
    else if (lower.includes("wallet")) updated.product = "Wallets";
    else if (lower.includes("hide") || lower.includes("raw")) updated.product = "Raw Hides";

    const numMatch = text.match(/\b\d+\b/);
    if (numMatch && !updated.quantity) {
      updated.quantity = numMatch[0] + " Pcs";
    }

    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(\+\d{1,3}[- ]?)?\d{10,13}/);
    if (emailMatch || phoneMatch) {
      updated.contact = (emailMatch ? emailMatch[0] : "") + (phoneMatch ? " / " + phoneMatch[0] : "");
    }

    if (lower.includes("usa") || lower.includes("uk") || lower.includes("canada") || lower.includes("germany") || lower.includes("france") || lower.includes("uae") || lower.includes("australia") || lower.includes("pakistan")) {
      const words = text.split(" ");
      const foundCountry = words.find(w => ["usa", "uk", "canada", "germany", "france", "uae", "australia", "pakistan"].includes(w.toLowerCase().replace(/[^a-z]/g, "")));
      if (foundCountry) updated.country = foundCountry.toUpperCase();
    }

    if (lower.includes("logo") || lower.includes("private label") || lower.includes("my brand") || lower.includes("custom tag")) {
      updated.privateLabel = "Yes";
    }

    return updated;
  };

  const saveLeadToDashboard = (leadDetails: LeadData) => {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("krossford_leads") || "[]");
      const newLeadEntry = {
        ...leadDetails,
        date: new Date().toLocaleString(),
        status: "HOT LEAD",
      };
      existing.push(newLeadEntry);
      localStorage.setItem("krossford_leads", JSON.stringify(existing));
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    const updatedLead = parseLeadDetails(userMsg, lead);
    setLead(updatedLead);

    const lowerMsg = userMsg.toLowerCase();

    setTimeout(async () => {
      let reply = "";

      if (updatedLead.contact || lowerMsg.includes("@") || lowerMsg.includes(".com") || lowerMsg.includes("+")) {
        saveLeadToDashboard(updatedLead);
        reply = `Perfect! Thank you. You are a serious buyer. I have forwarded your details to our KROSSFORD sales team. They will contact you within 24 hours with exact Wholesale Price.`;
        
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: reply },
          {
            sender: "ai",
            text: "NEW LEAD FROM KROSSFORD AI:",
            isLeadSummary: true,
            leadDetails: updatedLead,
          },
        ]);
        setLoading(false);
        return;
      }

      if (lowerMsg.includes("jacket") && (lowerMsg.includes("25") || lowerMsg.includes("50") || lowerMsg.includes("20") || lowerMsg.includes("30"))) {
        reply = "Thanks! For Jackets MOQ is 100 Pcs. 25 is below MOQ. Do you want to start with a sample, or increase to 100? Which design do you like - Biker / Bomber?";
      } 
      else if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("rate") || lowerMsg.includes("quote")) {
        reply = "Price depends on your design and quantity. Please fill the GET QUOTE / ENQUIRY form with your design and quantity, our team will send you Wholesale Price within 24 hours.";
      }
      else {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMsg }),
          });
          const data = await res.json();
          reply = data.reply || "Price depends on your design and quantity. Please fill the GET QUOTE / ENQUIRY form with your design and quantity, our team will send you Wholesale Price within 24 hours.";
        } catch (err) {
          reply = "KROSSFORD is a direct B2B leather manufacturer offering custom OEM Jackets, Bags, Belts, Wallets, and Raw Hides with Private Label support. What product and quantity are you looking for?";
        }
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
      setLoading(false);
    }, 450);
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
                    <p><span className="text-zinc-400">Name:</span> {m.leadDetails?.name || "Valued Buyer"}</p>
                    <p><span className="text-zinc-400">Email / WhatsApp:</span> {m.leadDetails?.contact || "Provided in chat"}</p>
                    <p><span className="text-zinc-400">Country:</span> {m.leadDetails?.country || "International"}</p>
                    <p><span className="text-zinc-400">Product:</span> {m.leadDetails?.product || "Leather Goods"}</p>
                    <p><span className="text-zinc-400">Quantity:</span> {m.leadDetails?.quantity || "Bulk MOQ"}</p>
                    <p><span className="text-zinc-400">Design / Leather / Color:</span> {m.leadDetails?.designAndLeather || "Custom Specification"}</p>
                    <p><span className="text-zinc-400">Private Label:</span> {m.leadDetails?.privateLabel || "Yes"}</p>
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
              placeholder="Ask about products, MOQ, quote..."
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