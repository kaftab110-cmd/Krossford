import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, userLanguage, userCountry } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on server." },
        { status: 500 }
      );
    }

    // FIX 1: Pehla Greeting wala message hata do, warna Gemini usi ko copy karega
    const chatMessages = messages.filter((m: any, index: number) => {
      if (index === 0 && m.sender === "ai") return false;
      return true;
    });

    // FIX 2: TimeZone se Country nikaalo - Asia/Karachi = Pakistan
    let countryName = userCountry || "unknown";
    if (userCountry?.includes("Karachi") || userCountry?.includes("Lahore") || userCountry?.includes("Islamabad")) countryName = "Pakistan";
    if (userCountry?.includes("Dubai")) countryName = "UAE";
    if (userCountry?.includes("Riyadh")) countryName = "Saudi Arabia";
    if (userCountry?.includes("Berlin")) countryName = "Germany";
    if (userCountry?.includes("Paris")) countryName = "France";

    // Format messages for Gemini
    const formattedContents = chatMessages.map((m: { sender: string; text: string; image?: string }) => {
      const parts: any[] = [{ text: m.text || (m.image ? "Here is my design photo." : "") }];
      if (m.image) {
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

    // FIX 3: System Prompt ab sahi jagah - systemInstruction field me
    const systemInstruction = {
      parts: [
        {
          text: `You are the official B2B AI Assistant for KROSSFORD (Direct Leather Manufacturer from Pakistan).

          *** GOLDEN RULE - NEVER REPEAT GREETING ***
          - NEVER say "Hello! Welcome to Krossford. Which product are you interested in?" if the customer has ALREADY asked a question.
          - If customer says "I need 50 units of this cap" -> DO NOT ask "Which product?". He ALREADY told you: CAP, 50 units.
          - Directly answer his question. Example: "Absolutely! 50 units of this cap is possible. No MOQ..."
          - Only greet on the VERY FIRST message if customer just says Hi/Hello.

          *** LANGUAGE RULE ***
          - Always reply in clear, professional English, regardless of the customer's language or location.
          2. Location is ONLY a hint for the FIRST message, never override the customer's actual language.
          - Customer Browser Language: ${userLanguage || "unknown"}
          - Customer Country (from timezone): ${countryName}

          *** BRAND RULES ***
          - BRAND NAME: KROSSFORD only. Never use "KF" or "A.H Leather".
          - Never say "I am AI". Say "I am from KROSSFORD Team".
          - Be polite, professional, short replies. B2B tone.

          *** BUSINESS LOGIC ***
          - When user uploads a design image, analyze it professionally, acknowledge style (Cap, Aviator, Biker, Bomber, Tote, Belt, Gloves), and ask for quantity, color, and Email/WhatsApp for wholesale quote.
          - Timelines: Sample takes 7-10 Days. Estimated Bulk Production: 30-45 days after Sample Approval.
          - Always ask: Quantity? Color? Email / WhatsApp for quote?
          - For 50+ units, say wholesale pricing applies, No Fixed MOQ.
          - Do NOT give fixed price in chat. Say "Our team will send you wholesale quote on Email / WhatsApp".
          - Total Price = Product Price + Shipment + Delivery. Shipment/Delivery not included in product price.

          *** EXAMPLES - FOLLOW THIS ***
          - Customer: "I need 50 units of this cap. What is your bulk price?" -> You: "Absolutely! 50 units of this cap is possible. No Fixed MOQ. Which color do you need? Our team will send you wholesale quote on WhatsApp. Shall we start with a Sample?"
          `,
        },
      ],
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          systemInstruction,
          contents: formattedContents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
        }),
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