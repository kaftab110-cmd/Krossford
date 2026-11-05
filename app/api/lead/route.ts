import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { lead, images, chatHistory, action } = await req.json();

    // 1. Lookup Customer by Email or WhatsApp for Chatbot Instant Recognition
    if (action === "lookup") {
      const email = lead?.contactEmail;
      const phone = lead?.contactPhone;
      
      let query = supabase.from("customers").select("*");
      if (email) query = query.eq("email", email);
      else if (phone) query = query.eq("whatsapp", phone);
      else return NextResponse.json({ customer: null });

      const { data } = await query.single();
      return NextResponse.json({ customer: data || null });
    }

    // 2. Process HOT Lead & Update CRM Database
    const resendApiKey = process.env.RESEND_API_KEY;
    const businessEmail = process.env.BUSINESS_EMAIL || "kaftab110@gmail.com";
    const businessWhatsapp = process.env.BUSINESS_WHATSAPP_NUMBER || "923001234567";

    const email = lead.email;
    const whatsapp = lead.whatsapp || lead.contact;
    const qty = parseInt(lead.quantity || "1", 10);
    const product = lead.product || "Custom Leather Apparel";

    // DB Sync: Check if customer exists
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("*")
      .or(`email.eq.${email},whatsapp.eq.${whatsapp}`)
      .single();

    let isRepeat = false;
    let isVIP = false;
    let customerRecord = null;

    if (existingCustomer) {
      isRepeat = true;
      const newTotalOrders = (existingCustomer.total_orders || 1) + 1;
      const newTotalQty = (existingCustomer.total_quantity || 0) + qty;
      isVIP = newTotalOrders >= 3 || newTotalQty >= 500;

      const { data: updated } = await supabase
        .from("customers")
        .update({
          last_order_date: new Date().toISOString(),
          total_orders: newTotalOrders,
          total_quantity: newTotalQty,
          lead_status: isVIP ? "VIP" : "Repeat",
          priority: "HIGH PRIORITY",
          total_products: Array.from(new Set([...(existingCustomer.total_products || []), product])),
          design_photos: Array.from(new Set([...(existingCustomer.design_photos || []), ...(images || [])])),
        })
        .eq("id", existingCustomer.id)
        .select()
        .single();
        
      customerRecord = updated;
    } else {
      const { data: created } = await supabase
        .from("customers")
        .insert({
          email: email || `guest_${Date.now()}@krossford.com`,
          whatsapp: whatsapp,
          country: lead.country || "Global",
          total_orders: 1,
          total_quantity: qty,
          total_products: [product],
          design_photos: images || [],
          lead_status: "New",
          priority: "Normal",
        })
        .select()
        .single();

      customerRecord = created;
    }

    // Insert Order Record
    await supabase.from("orders").insert({
      customer_email: email,
      product: product,
      quantity: qty,
      details: lead.details || "Custom Specs",
      status: qty >= 100 ? "Bulk" : "Sample",
    });

    // 3. Dispatch Priority Email via Resend
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const subjectTag = isVIP ? "🟢 VIP REPEAT CUSTOMER" : isRepeat ? "🟢 REPEAT CUSTOMER" : "🔵 NEW CUSTOMER";
      const subject = `${subjectTag} - ${product} (${qty} Pcs) - ${lead.country || "Global"}`;

      const emailHtml = `
        <div style="font-family: monospace; background: #000; color: #fff; padding: 20px; border-radius: 8px;">
          <h2 style="color: ${isRepeat ? '#22c55e' : '#3b82f6'}; border-bottom: 1px solid #333; pb: 10px;">
            ${subjectTag} ${isRepeat ? '- HANDLE FIRST!' : ''}
          </h2>
          <p><strong>Total Orders:</strong> ${customerRecord?.total_orders || 1}</p>
          <p><strong>Contact:</strong> ${email || whatsapp}</p>
          <p><strong>Product & Qty:</strong> ${product} (${qty} Pcs)</p>
          <p><strong>Priority:</strong> ${isRepeat ? 'HIGH (Reply within 1 hour)' : 'Standard'}</p>
          <br/>
          <a href="mailto:${email}?subject=KROSSFORD Order Priority Processing" style="background: #C9A227; color: #000; padding: 10px 20px; font-weight: bold; text-decoration: none; border-radius: 4px;">Reply to Customer</a>
        </div>
      `;

      await resend.emails.send({
        from: "KROSSFORD CRM <noreply@krossford.com>",
        to: [businessEmail],
        subject,
        html: emailHtml,
      });
    }

    return NextResponse.json({
      success: true,
      isRepeat,
      isVIP,
      totalOrders: customerRecord?.total_orders || 1,
      message: "Lead processed & CRM updated successfully.",
    });
  } catch (error) {
    console.error("CRM Lead Processing Error:", error);
    return NextResponse.json({ error: "Failed to sync CRM lead data." }, { status: 500 });
  }
}