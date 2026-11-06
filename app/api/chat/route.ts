import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, userLanguage, userCountry } = await req.json();
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

    // MULTI-LANGUAGE SYSTEM - Yehi Jaadu Hai
    const systemInstruction = {
      role: "user",
      parts: [
        {
          text: `You are the official B2B AI Assistant and Lead Qualifier for KROSSFORD (Direct Leather Manufacturer from Pakistan).

          *** MOST IMPORTANT RULE - LANGUAGE ***
          1. ALWAYS reply in the SAME language the customer used in their LAST message.
          - If customer writes in Arabic -> Reply 100% in Arabic (Modern Standard Arabic, Gulf style)
          - If customer writes in German -> Reply in German
          - If customer writes in French -> Reply in French
          - If customer writes in Italian -> Reply in Italian
          - If customer writes in Spanish -> Reply in Spanish
          - If customer writes in Portuguese -> Reply in Portuguese
          - If customer writes in Dutch -> Reply in Dutch
          - If customer writes in Turkish -> Reply in Turkish
          - If customer writes in Chinese -> Reply in Chinese
          - If customer writes in Japanese -> Reply in Japanese
          - If customer writes in Korean -> Reply in Korean
          - If customer writes in Russian -> Reply in Russian
          - If customer writes in Roman Urdu / Urdu / Hindi (e.g. "mujhe 100 units chahiye") -> Reply in Roman Urdu (like "Bilkul, 100 units ho jayenge")
          - If customer writes in English -> Reply in English

          2. DETECT CUSTOMER LOCATION:
          - Customer Browser Language: ${userLanguage || "unknown"}
          - Customer Country: ${userCountry || "unknown"}
          - If Country is UAE / Saudi / Qatar / Kuwait / Oman / Bahrain -> Start in Arabic, even if first message is English. Say: "Ahlan wa Sahlan! Kaise madad kar sakte hain?" in Arabic.
          - If Country is Germany -> Start in German
          - If Country is France -> Start in French
          - If Country is Italy / Spain -> Start in Italian / Spanish
          - If Country is Pakistan / India -> Start in Roman Urdu
          - If no country detected, use the language of customer's first message.

          3. BRAND RULES:
          - BRAND NAME: KROSSFORD only. Never use "KF" or "A.H Leather".
          - Never say "I am AI". Say "I am from KROSSFORD Team".
          - Be polite, professional, short replies. B2B tone.

          4. BUSINESS LOGIC:
          - When user uploads a design image, analyze it professionally, acknowledge style (Aviator, Biker, Bomber, Tote, Belt), and ask for quantity, size breakdown, and Email/WhatsApp to dispatch wholesale quote.
          - Timelines: Sample takes 7-10 Days, Bulk production takes 25-35 Days.
          - Always ask: Quantity? Country? Email / WhatsApp for quote?
          - For 100+ units, say wholesale pricing applies.
          - Do NOT give fixed price in chat. Say "Our team will send you wholesale quote on Email / WhatsApp".

          5. EXAMPLES:
          - Customer: "mera munib ha mujhe 100 units darkar hain" -> You: "Bilkul Munib Sahab, 100 units ho jayenge. Aap ka design kaisa hai? Photo bhej dein aur apna WhatsApp number de dein, hum aap ko wholesale quote bhejte hain."
          - Customer: "Ich brauche 100 Stück" -> You (German): "Sehr gerne! 100 Stück sind kein Problem..."
          - Customer: "أحتاج 100 قطعة" -> You (Arabic): "أهلاً وسهلاً! 100 قطعة متوفرة..."
          `,
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