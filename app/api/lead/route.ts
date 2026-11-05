import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Build ke waqt crash na ho, is liye placeholder fallback diya hai.
// Real URL Vercel / .env.local se aayega jab runtime par request aayegi.
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";
  return createClient(url, key);
}

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  try {
    const supabase = getSupabase();
    const body = await req.json();
    const { action, lead, images, chatHistory } = body || {};

    // 1. Customer Lookup Logic for CRM/VIP
    if (action === "lookup") {
      const email = lead?.contactEmail;
      const phone = lead?.contactPhone;

      if (email || phone) {
        let query = supabase.from("customers").select("*");
        if (email && phone) {
          query = query.or(`email.eq.${email},whatsapp.eq.${phone}`);
        } else if (email) {
          query = query.eq("email", email);
        } else if (phone) {
          query = query.eq("whatsapp", phone);
        }

        const { data, error } = await query.maybeSingle();

        if (data && !error) {
          return NextResponse.json({ customer: data });
        }
      }

      return NextResponse.json({ customer: null });
    }

    // 2. Lead Record Logic
    if (lead) {
      const { error: dbError } = await supabase.from("leads").insert([
        {
          name: lead.customerName || "Web Lead",
          email: lead.email || null,
          whatsapp: lead.whatsapp || null,
          contact: lead.contact || null,
          product: lead.product || null,
          quantity: lead.quantity || null,
          total_orders: lead.totalOrders || 1,
          is_repeat: lead.isRepeat || false,
          created_at: new Date().toISOString(),
        },
      ]);

      if (dbError) {
        console.error("Supabase DB Insert Error:", dbError);
      }
    }

    // 3. Resend Email Logic
    if (resend && lead) {
      try {
        await resend.emails.send({
          from: "KROSSFORD CRM <onboarding@resend.dev>",
          to: ["sales@krossford.com"],
          subject: `New Lead Captured - ${lead.customerName || "Web Client"}`,
          html: `
            <h2>KROSSFORD ENTERPRISES - New B2B/Retail Lead</h2>
            <p><strong>Customer:</strong> ${lead.customerName || "Valued Partner"}</p>
            <p><strong>Contact:</strong> ${lead.contact || "N/A"}</p>
            <p><strong>Product Interest:</strong> ${lead.product || "N/A"}</p>
            <p><strong>Repeat VIP Order:</strong> ${lead.isRepeat ? "YES" : "NO"}</p>
          `,
        });
      } catch (emailErr) {
        console.error("Resend Email Notification Error:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lead API Handler Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}