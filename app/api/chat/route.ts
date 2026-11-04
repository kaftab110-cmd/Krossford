import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in environment variables!");
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on server." },
        { status: 500 }
      );
    }

    const formattedContents = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const systemInstruction = {
      role: "user",
      parts: [
        {
          text: `You are the official B2B AI Assistant and Lead Qualifier for KROSSFORD (Direct Leather Manufacturer from Pakistan).
          
          RULES:
          1. BRAND NAME: KROSSFORD only. Never use "KF" or "A.H Leather".
          2. NEVER give a price reply when the user asks about delivery time, sample details, shipping, or payment. Match the exact intent of the user.
          3. Timelines: Sample takes 7-10 Days, Bulk production takes 25-35 Days.
          4. Be professional, direct, and conversational.`,
        },
      ],
    };

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
    
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return NextResponse.json({ error: data.error.message || "Gemini API failed" }, { status: 500 });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json({ error: "No response text from Gemini" }, { status: 500 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API Exception:", error);
    return NextResponse.json(
      { error: "Failed to process chat request." },
      { status: 500 }
    );
  }
}