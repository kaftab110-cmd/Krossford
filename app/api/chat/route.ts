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

    // Format messages for Gemini API supporting text and inline image parts
    const formattedContents = messages.map((m: { sender: string; text: string; image?: string }) => {
      const parts: any[] = [{ text: m.text || (m.image ? "Here is my design photo." : "") }];
      
      if (m.image) {
        // Extract base64 data and mime type from data URL (e.g., data:image/jpeg;base64,...)
        const matches = m.image.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          parts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2],
            },
          });
        }
      }

      return {
        role: m.sender === "user" ? "user" : "model",
        parts,
      };
    });

    const systemInstruction = {
      role: "user",
      parts: [
        {
          text: `You are the official B2B AI Assistant and Lead Qualifier for KROSSFORD (Direct Leather Manufacturer from Pakistan).
          
          RULES:
          1. BRAND NAME: KROSSFORD only. Never use "KF" or "A.H Leather".
          2. When the user uploads a design image, analyze it professionally, acknowledge the style (e.g., Aviator, Biker, Bomber, Tote, Belt), and ask for their required quantity, size breakdown, and Email/WhatsApp to dispatch the wholesale quote.
          3. Timelines: Sample takes 7-10 Days, Bulk production takes 25-35 Days.`,
        },
      ],
    };

    const contents = [systemInstruction, ...formattedContents];

    // Using gemini-2.0-flash which supports multimodal image input
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