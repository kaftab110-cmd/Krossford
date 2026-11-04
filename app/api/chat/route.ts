import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on server." },
        { status: 500 }
      );
    }

    // Format chat history for Gemini 2.0 Flash / 1.5 Flash
    const formattedContents = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const systemInstruction = {
      role: "user",
      parts: [
        {
          text: `You are the official B2B AI Assistant and Lead Qualifier for KROSSFORD (Direct Leather Manufacturer from Pakistan, B2B Factory).
          
          CORE RULES & KNOWLEDGE:
          1. BRAND NAME: KROSSFORD only. Never use "KF" or "A.H Leather".
          2. CONVERSATION MEMORY: Look at the full chat history. NEVER ask for information the user has already provided (such as Country, Leather, Quantity, Sizes, Product).
          3. SAMPLE ORDER LOGIC (CRITICAL):
             - Sample quantity allowed: 1 to 5 Pcs (EVEN IF below MOQ 100, samples are FULLY ALLOWED).
             - Do NOT lecture about MOQ 100 when user asks for samples.
             - Sample Timelines: 7-10 Days. Sample charges are adjusted in future bulk orders.
          4. DYNAMIC QUESTIONING: Only ask for what is MISSING step-by-step:
             - If Product/Quantity/Leather/Sizes/Country are already given, do NOT ask them again.
             - If Design is missing, ask ONLY: "Which design do you want for the sample — Biker, Bomber, or Aviator?"
             - If Email or WhatsApp is missing, ask ONLY: "What is your Email or WhatsApp so our team can send the formal sample quotation?"
          5. If user provides Email or WhatsApp, acknowledge them as a serious buyer and confirm lead forwarding.
          6. Tone: Professional, concise, helpful B2B salesman style.`,
        },
      ],
    };

    // Prepend system prompt or instruction if using standard contents
    const contents = [systemInstruction, ...formattedContents];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Which specific design do you prefer (Biker, Bomber, or Aviator) for your sample order?";

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process chat request." },
      { status: 500 }
    );
  }
}