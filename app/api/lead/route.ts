import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { lead, images, chatHistory } = await req.json();
    const resendApiKey = process.env.RESEND_API_KEY;
    const businessEmail = process.env.BUSINESS_EMAIL || "kaftab110@gmail.com";
    const businessWhatsapp = process.env.BUSINESS_WHATSAPP_NUMBER || "923001234567";

    // 1. Send Email via Resend if API key exists
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      
      const emailHtml = `
        <div style="font-family: monospace; background: #121212; color: #fff; padding: 20px; border-radius: 8px;">
          <h2 style="color: #C9A227; border-bottom: 1px solid #333; padding-bottom: 10px;">🔥 NEW HOT LEAD - KROSSFORD B2B</h2>
          <p><strong>Customer Contact:</strong> ${lead.contact || "Not provided"}</p>
          <p><strong>Product / Specs:</strong> ${lead.product || "Custom Leather Order"}</p>
          <p><strong>Quantity:</strong> ${lead.quantity || "Not specified"}</p>
          <p><strong>Leather / Design:</strong> ${lead.leather || "Cow Leather"} / ${lead.design || "Custom Design"}</p>
          <p><strong>Country:</strong> ${lead.country || "International"}</p>
          <br/>
          <h3 style="color: #C9A227;">Chat Summary:</h3>
          <div style="background: #1a1a1a; padding: 10px; border-left: 3px solid #C9A227; font-size: 12px;">
            ${Array.isArray(chatHistory) ? chatHistory.map((m: any) => `<p><b>${m.sender.toUpperCase()}:</b> ${m.text}</p>`).join("") : "No history"}
          </div>
          <br/>
          <a href="mailto:${lead.contact}?subject=KROSSFORD Wholesale Quote & Inquiry" style="background: #C9A227; color: #000; padding: 10px 20px; text-decoration: none; font-weight: bold; display: inline-block; border-radius: 4px;">Reply to Customer by Email</a>
          <br/><br/>
          <a href="https://wa.me/${businessWhatsapp}?text=Hello KROSSFORD Team, regarding lead: ${lead.contact}" style="background: #25D366; color: #fff; padding: 10px 20px; text-decoration: none; font-weight: bold; display: inline-block; border-radius: 4px; margin-top: 10px;">Open WhatsApp Lead</a>
        </div>
      `;

      // Prepare attachments if images are present
      const attachments = Array.isArray(images) ? images.map((img: string, idx: number) => {
        const matches = img.match(/^data:(image\/[a-zA-Z+.-]+);base64,(.+)$/);
        if (matches) {
          return {
            filename: `design-photo-${idx + 1}.${matches[1].split('/')[1] || 'jpg'}`,
            content: Buffer.from(matches[2], 'base64'),
          };
        }
        return null;
      }).filter(Boolean) : [];

      await resend.emails.send({
        from: "KROSSFORD AI <noreply@krossford.com>",
        to: [businessEmail],
        subject: `🔥 NEW HOT LEAD - ${lead.product || "Leather Goods"} - ${lead.quantity || "Bulk"} - ${lead.country || "Global"}`,
        html: emailHtml,
        attachments: attachments.length > 0 ? (attachments as any) : undefined,
      });
    }

    return NextResponse.json({ success: true, message: "Lead sent successfully to Business Email & WhatsApp pipeline." });
  } catch (error) {
    console.error("Lead API Error:", error);
    return NextResponse.json({ error: "Failed to dispatch business lead notification." }, { status: 500 });
  }
}