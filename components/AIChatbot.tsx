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
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; image?: string; isLeadSummary?: boolean; leadDetails?: LeadData }>>([
    {
      sender: "ai",
      text: "Hello! Welcome to KROSSFORD. You can type your query or click 📎 Attach to upload your jacket/leather design photo.",
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<LeadData>({});
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const businessWhatsapp = process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP || "923001234567";

  const saveLeadToDashboard = async (details: LeadData, currentImages: string[], history: any[]) => {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("krossford_leads") || "[]");
      existing.push({ ...details, date: new Date().toLocaleString(), status: "HOT LEAD WITH DESIGN" });
      localStorage.setItem("krossford_leads", JSON.stringify(existing));
    }

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lead: details, images: currentImages, chatHistory: history }),
      });
    } catch (err) {
      console.error("Failed to dispatch lead to backend API:", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = Math.min(files.length, 3 - selectedImages.length);
    for (let i = 0; i < maxFiles; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedImages((prev) => [...prev, reader.result as string].slice(0, 3));
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && selectedImages.length === 0) return;

    const userMsg = input.trim();
    const currentImgs = [...selectedImages];

    const newMsgEntry = {
      sender: "user",
      text: userMsg || (currentImgs.length > 0 ? "Here is my design photo attachment." : ""),
      image: currentImgs[0],
    };

    const updatedMessages = [...messages, newMsgEntry];
    setMessages(updatedMessages);
    setInput("");
    setSelectedImages([]);
    setLoading(true);

    const lower = userMsg.toLowerCase();
    let reply = "";

    // Lead detection with strict duplicate prevention check
    const emailMatch = userMsg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = userMsg.match(/(\+\d{1,3}[- ]?)?\d{10,13}/);
    
    if (emailMatch || phoneMatch || lower.includes("@") || lower.includes("+")) {
      const foundEmail = emailMatch ? emailMatch[0] : "";
      const foundPhone = phoneMatch ? phoneMatch[0] : "";
      
      let existingContact = leadInfo.contact || "";
      let parts = existingContact ? existingContact.split(" / ").map(p => p.trim()) : [];

      if (foundEmail && !parts.includes(foundEmail)) {
        parts.push(foundEmail);
      }
      if (foundPhone && !parts.includes(foundPhone)) {
        parts.push(foundPhone);
      }
      if (!foundEmail && !foundPhone && userMsg && !parts.includes(userMsg)) {
        parts.push(userMsg);
      }

      const mergedContact = parts.join(" / ");
      const updatedLead = { ...leadInfo, contact: mergedContact, product: "Leather Apparel / Goods" };
      
      setLeadInfo(updatedLead);
      setLeadSubmitted(true);
      await saveLeadToDashboard(updatedLead, currentImgs, updatedMessages);

      reply = "Perfect! Your request and design have been recorded and instantly dispatched to the KROSSFORD Business Email and WhatsApp. Our team will contact you within 24 hours.";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply },
        { sender: "ai", text: "NEW DESIGN LEAD:", isLeadSummary: true, leadDetails: updatedLead },
      ]);
      setLoading(false);
      return;
    }

    if (currentImgs.length > 0) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });
        const data = await res.json();
        reply = data.error ? "Perfect! I received your design photo. Please share your required quantity and Email or WhatsApp so our team can send your wholesale quote." : data.reply;
      } catch (err) {
        reply = "Perfect! I received your design photo. Please share your Email or WhatsApp.";
      }
    } else if (lower.includes("delivery") || lower.includes("time")) {
      reply = "Sample Production: 7-10 Days. Bulk Production: 25-35 Days. Shipping via DHL/FedEx: 4-7 Days.";
    } else if (lower.includes("sample") || lower.includes("size")) {
      reply = "Sample order is fully accepted. Please upload your design photo using 📎 and share your Email/WhatsApp.";
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
      reply = "Price depends on design specs and quantity. Upload your design photo 📎 or share your details for a custom quote.";
    } else {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });
        const data = await res.json();
        reply = data.error ? "KROSSFORD is a direct B2B leather manufacturer. Please upload your design photo or share your specifications." : data.reply;
      } catch (err) {
        reply = "Please upload your jacket/leather design photo 📎 or share your specifications.";
      }
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
              KROSSFORD - AI DESIGN ASSISTANT
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
                  <div className="w-full bg-zinc-900 border border-amber-400/50 p-3 rounded text-[11px] space-y-2 text-zinc-200 my-1">
                    <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800 pb-1">
                      NEW LEAD DISPATCHED:
                    </p>
                    <p><span className="text-zinc-400">Contact:</span> {m.leadDetails?.contact || "Provided"}</p>
                    <p><span className="text-zinc-400">Status:</span> Sent to Business Email ✅ + Sent to WhatsApp ✅</p>
                    
                    {/* Owner Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <a
                        href={`mailto:${m.leadDetails?.contact}?subject=KROSSFORD Wholesale Quote`}
                        className="flex-1 bg-amber-500 text-black text-center py-1.5 rounded font-bold uppercase text-[10px] hover:bg-amber-400 transition-colors"
                      >
                        Reply by Email
                      </a>
                      <a
                        href={`https://wa.me/${businessWhatsapp}?text=Hi KROSSFORD, received lead for ${m.leadDetails?.contact}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 text-white text-center py-1.5 rounded font-bold uppercase text-[10px] hover:g-green-500 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`max-w-[85%] p-3 rounded text-[11px] leading-relaxed space-y-2 ${
                      m.sender === "user"
                        ? "bg-amber-500 text-black font-medium"
                        : "bg-zinc-900 text-zinc-200 border border-zinc-800"
                    }`}
                  >
                    {m.image && (
                      <div className="rounded overflow-hidden border border-black/20 max-w-[200px]">
                        <img src={m.image} alt="Uploaded Design" className="w-full h-auto object-cover" />
                      </div>
                    )}
                    <p className="whitespace-pre-line">{m.text}</p>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-zinc-900 text-amber-400 p-3 rounded text-[10px] animate-pulse">
                  AI is analyzing design & notifying KROSSFORD team...
                </div>
              </div>
            )}
          </div>

          {selectedImages.length > 0 && (
            <div className="px-3 py-2 bg-zinc-900 border-t border-zinc-800 flex gap-2 overflow-x-auto">
              {selectedImages.map((img, i) => (
                <div key={i} className="relative w-12 h-12 rounded border border-amber-500 overflow-hidden flex-shrink-0">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeSelectedImage(i)}
                    className="absolute top-0 right-0 bg-red-600 text-white text-[9px] w-4 h-4 flex items-center justify-center font-bold"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleSend} className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-zinc-400 hover:text-amber-400 p-2 text-xs flex items-center gap-1 cursor-pointer transition-colors border border-zinc-700 rounded bg-zinc-950"
              title="Attach Design Photo"
            >
              📎 <span className="hidden sm:inline text-[10px]">Attach</span>
            </button>

            <input
              type="text"
              placeholder="Type message or attach photo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white text-xs outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="text-black px-3 py-2 rounded text-xs font-bold uppercase transition-all cursor-pointer hover:bg-amber-500"
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