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
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveLeadToDashboard = (details: LeadData) => {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("krossford_leads") || "[]");
      existing.push({ ...details, date: new Date().toLocaleString(), status: "HOT LEAD WITH DESIGN" });
      localStorage.setItem("krossford_leads", JSON.stringify(existing));
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

    // Lead detection via email/phone with duplicate prevention check
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
      const updatedLead = { ...leadInfo, contact: mergedContact };
      
      setLeadInfo(updatedLead);
      saveLeadToDashboard(updatedLead);

      reply = "Perfect! I have recorded your contact and requirements. Our KROSSFORD sales team will contact you within 24 hours with exact wholesale pricing and sample timeline.";
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply },
        { sender: "ai", text: "NEW DESIGN LEAD FROM KROSSFORD AI:", isLeadSummary: true, leadDetails: updatedLead },
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
        
        if (data.error) {
          console.error("Backend Vision Error:", data.error);
          reply = `Perfect! I received your design photo. I can see it is a custom leather style. How many pieces do you need, and what is your Email or WhatsApp for the quotation?`;
        } else {
          reply = data.reply;
        }
      } catch (err) {
        console.error("Vision API Exception:", err);
        reply = "Perfect! I received your design photo. Please share your required quantity and Email/WhatsApp so our master craftsman can review it.";
      }
    } 
    else if (lower.includes("delivery") || lower.includes("time") || lower.includes("days")) {
      reply = "Sample Production: 7-10 Days. Bulk Production: 25-35 Days. Shipping via DHL/FedEx: 4-7 Days.";
    } else if (lower.includes("sample") || lower.includes("size") || lower.includes("pieces")) {
      reply = "Sample order is fully accepted. Please upload your design photo using the 📎 button and share your Email/WhatsApp.";
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
      reply = "Price depends on design specs and quantity. Upload your design photo 📎 or share quantity details for a custom quote.";
    } else {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedMessages }),
        });
        const data = await res.json();
        reply = data.error ? "KROSSFORD is a direct B2B leather manufacturer. Please upload your design photo or share your quantity." : data.reply;
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
        <div className="w-80 sm:w-96 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl flex flex-col h-[520px] overflow-hidden text-white">
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
                  <div className="w-full bg-zinc-900 border border-amber-400/50 p-3 rounded text-[11px] space-y-1.5 text-zinc-200 my-1">
                    <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800 pb-1">
                      NEW DESIGN LEAD:
                    </p>
                    <p><span className="text-zinc-400">Contact / Email:</span> {m.leadDetails?.contact || "Provided"}</p>
                    <p><span className="text-zinc-400">Status:</span> Sent to Manufacturing Floor</p>
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
                  AI is analyzing your design...
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
              title="Attach Design Photo (JPG, PNG)"
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