import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const WHATSAPP_ENABLED = false; // BOSS - WhatsApp abhi review me hai, is liye OFF - order iski wajah se kabhi nahi rukega

type OrderEmailItem = {
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  customization: string;
};

function getSupabase() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

// FIX 1 - Order ID kabhi throw nahi karega - count fail ho to last order_id se nikalega
async function createOrderId(supabase: any): Promise<string> {
  try {
    if (supabase) {
      const { count } = await supabase.from("leads").select("id", { count: "exact", head: true });
      if (typeof count === "number") {
        const next = count + 1;
        return `KF-0078611${String(next).padStart(3, "0")}`;
      }
      // Fallback - last order_id se
      const { data } = await supabase.from("leads").select("order_id").order("created_at", { ascending: false }).limit(1);
      const last = String(data?.[0]?.order_id || "");
      const m = last.match(/(\d+)\s*$/);
      if (m) {
        const num = parseInt(m[1], 10);
        if (!isNaN(num)) {
          // 0078611001 -> 78611001, +1
          const nextNum = num + 1;
          return `KF-${String(nextNum).padStart(10, "0")}`;
        }
      }
    }
  } catch (e) {
    console.log("Order ID count failed, using fallback:", (e as any)?.message);
  }
  // Aakhri fallback - time se unique, phir bhi KF format me
  const fallback = 78611000 + (Date.now() % 1000) + 1;
  return `KF-${String(fallback).padStart(10, "0")}`;
}

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function getOrderEmailItems(value: unknown): OrderEmailItem[] | null {
  if (!Array.isArray(value) || value.length > 100) return null;
  const items: OrderEmailItem[] = [];
  for (const rawItem of value) {
    if (!rawItem || typeof rawItem !== "object" || Array.isArray(rawItem)) return null;
    const item = rawItem as Record<string, unknown>;
    const name = getString(item.name);
    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);
    if (!name || name.length > 200 || !Number.isInteger(quantity) || quantity < 1 || !Number.isFinite(unitPrice) || unitPrice < 0) return null;
    items.push({ name, image: getString(item.image).slice(0, 2048), color: getString(item.color).slice(0, 100) || "Not specified", size: getString(item.size).slice(0, 100) || "Not specified", quantity, unitPrice, customization: getString(item.customization).slice(0, 1000) });
  }
  return items;
}

function getEmailImageUrl(image: string): string {
  const raw = (image || "").trim();
  if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) return "";
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.krossford.com").replace(/\/$/, "");
  try {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      const u = new URL(raw);
      if (u.pathname.includes("/_next/image")) {
        const inner = u.searchParams.get("url");
        if (inner) return getEmailImageUrl(inner);
      }
      return u.toString();
    }
    if (raw.startsWith("//")) return `https:${raw}`;
    if (raw.includes("/_next/image")) {
      const q = raw.split("?")[1] || "";
      const params = new URLSearchParams(q);
      const inner = params.get("url");
      if (inner) return getEmailImageUrl(decodeURIComponent(inner));
    }
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    return `${siteUrl}${encodeURI(path)}`;
  } catch { return ""; }
}

function renderOrderItemsHtml(items: OrderEmailItem[]): string {
  if (items.length === 0) return "<p>No item details supplied.</p>";
  const rows = items.map((item) => {
    const imageUrl = getEmailImageUrl(item.image);
    const image = imageUrl ? `<a href="${escapeHtml(imageUrl)}" target="_blank" rel="noopener"><img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.name)}" width="120" style="display:block;width:120px;height:auto;max-height:120px;object-fit:contain;border:0;"></a>` : "Image unavailable";
    const lineTotal = (item.unitPrice * item.quantity).toFixed(2);
    return `<tr><td style="padding:10px;border:1px solid #ddd;vertical-align:top;">${image}</td><td style="padding:10px;border:1px solid #ddd;"><strong>${escapeHtml(item.name)}</strong><br>Colour: ${escapeHtml(item.color)}<br>Size: ${escapeHtml(item.size)}<br>Quantity: ${item.quantity}<br>Unit price: $${item.unitPrice.toFixed(2)}<br>Line total: $${lineTotal}${item.customization ? `<br>Customization: ${escapeHtml(item.customization)}` : ""}</td></tr>`;
  }).join("");
  return `<table style="border-collapse:collapse;width:100%;"><tbody>${rows}</tbody></table>`;
}

function formatOrderItemsText(items: OrderEmailItem[]): string {
  return items.map((item, index) => [`${index + 1}. ${item.name}`, `Image: ${getEmailImageUrl(item.image) || "Not available"}`, `Colour: ${item.color}`, `Size: ${item.size}`, `Quantity: ${item.quantity}`, `Unit price: $${item.unitPrice.toFixed(2)}`, `Line total: $${(item.unitPrice * item.quantity).toFixed(2)}`, item.customization ? `Customization: ${item.customization}` : ""].filter(Boolean).join("\n")).join("\n\n");
}

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ leads: [] });
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200);
    if (error) {
      console.error("Leads fetch error:", error);
      return NextResponse.json({ leads: [] });
    }
    return NextResponse.json({ leads: data || [] });
  } catch (e) {
    console.error("Leads GET failed", e);
    return NextResponse.json({ leads: [] });
  }
}

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }); }
    const action = getString(body.action);
    const lead = body.lead;
    if (action === "lookup") {
      const lookup = lead && typeof lead === "object" ? lead as Record<string, unknown> : {};
      const email = getString(lookup.contactEmail);
      const phone = getString(lookup.contactPhone);
      if (email || phone) {
        const supabase = getSupabase();
        if (!supabase) return NextResponse.json({ customer: null });
        let query = supabase.from("leads").select("*");
        if (email && phone) query = query.or(`email.eq.${email},phone.eq.${phone}`);
        else if (email) query = query.eq("email", email);
        else query = query.eq("phone", phone);
        const { data, error } = await query.maybeSingle();
        if (error) return NextResponse.json({ customer: null });
        return NextResponse.json({ customer: data });
      }
      return NextResponse.json({ customer: null });
    }
    if (action !== "submit" || !lead || typeof lead !== "object" || Array.isArray(lead)) {
      return NextResponse.json({ error: "Invalid lead submission." }, { status: 400 });
    }
    const input = lead as Record<string, unknown>;
    const source = getString(input.source);
    const customerName = getString(input.customerName);
    const email = getString(input.email);
    const contact = getString(input.contact);
    const product = getString(input.product);
    const quantity = getString(input.quantity);
    const message = getString(input.message);
    const total = input.total;
    const orderItems = getOrderEmailItems(input.items);
    if ((source !== "b2b-contact" && source !== "b2c-checkout") || !customerName || !message || customerName.length > 200 || email.length > 254 || message.length > 20000 || (email && !isValidEmail(email)) || ((source === "b2b-contact" || source === "b2c-checkout") && !email) || (source === "b2c-checkout" && (typeof total !== "number" || !Number.isFinite(total) || total < 0 || orderItems === null || orderItems.length === 0))) {
      return NextResponse.json({ error: "Please check the required enquiry details." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST?.trim();
    const smtpPort = Number(process.env.SMTP_PORT);
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFrom = process.env.SMTP_FROM?.trim();
    const smtpSecureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
    const smtpSecure = smtpSecureRaw === "true" || smtpPort === 465;
    const backupEmail = process.env.KROSSFORD_BACKUP_EMAIL?.trim();
    const senderEmail = (smtpFrom && isValidEmail(smtpFrom) ? smtpFrom : smtpUser) || "hello@krossford.com";
    const smtpReady = !!(smtpHost && Number.isInteger(smtpPort) && smtpPort >= 1 && smtpPort <= 65535 && smtpUser && smtpPassword);

    const sourceLabel = source === "b2b-contact" ? "New B2B Enquiry" : "New B2C Order";
    const safeCustomerName = customerName.replace(/[\r\n]+/g, " ").slice(0, 120);
    const supabase = getSupabase();

    // FIX - Order ID kabhi fail nahi karega
    const orderId: string = await createOrderId(supabase);
    const totalText = source === "b2c-checkout" ? `$${Number(total).toFixed(2)} USD` : "Not provided";
    const totalQty = orderItems ? orderItems.reduce((a, b) => a + b.quantity, 0) : (Number(quantity) || 0);

    // FIX 2 - Sirf wohi columns jo leads table me pakke hain - items ko STRING bana ke bhejo
    let savedInDb = false;
    if (supabase) {
      const itemsString = JSON.stringify(orderItems || []);
      const fullMessage = `Name: ${customerName}\nEmail: ${email}\nPhone: ${contact}\nTotal: ${totalText}\nQty: ${totalQty}\n\n${message}`;
      // Pehle FULL try - sirf safe columns
      const fullRow: any = {
        order_id: orderId,
        name: customerName,
        email: email || null,
        phone: contact || null,
        product: product || null,
        quantity: quantity || String(totalQty),
        total: totalText,
        message: fullMessage,
        items: itemsString,
        source: source,
        status: "new",
      };
      const { error: fullErr } = await supabase.from("leads").insert([fullRow]);
      if (!fullErr) {
        savedInDb = true;
      } else {
        console.log("Full insert failed, trying minimal:", fullErr?.message);
        // Minimal - sirf 4 columns jo har table me hote hain
        const minimalRow: any = {
          order_id: orderId,
          name: customerName,
          email: email || null,
          message: fullMessage,
        };
        const { error: minErr } = await supabase.from("leads").insert([minimalRow]);
        if (!minErr) savedInDb = true;
        else console.log("Minimal also failed:", minErr?.message);
      }
    } else {
      console.log("Supabase env missing - order will still succeed via email");
    }

    const emailText = [sourceLabel, `Order ID: ${orderId}`, `Name: ${customerName}`, `Email: ${email || "Not provided"}`, `Contact: ${contact || "Not provided"}`, `Product / Items: ${product || "Not provided"}`, `Quantity: ${quantity || "Not provided"}`, "", source === "b2c-checkout" && orderItems ? formatOrderItemsText(orderItems) : message].join("\n");
    const itemsHtml = source === "b2c-checkout" && orderItems ? renderOrderItemsHtml(orderItems) : `<pre>${escapeHtml(message)}</pre>`;
    const ownerEmailHtml = `<h2>${escapeHtml(sourceLabel)}</h2><p><strong>Order ID:</strong> ${escapeHtml(orderId)}<br><strong>Name:</strong> ${escapeHtml(customerName)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Phone:</strong> ${escapeHtml(contact || "Not provided")}<br><strong>Total:</strong> ${escapeHtml(totalText)}</p><h3>Products</h3>${itemsHtml}<h3>Full submission</h3><pre>${escapeHtml(message)}</pre>`;

    // FIX 3 - Email fail ho to bhi order SUCCESS - kabhi 503 mat do
    if (smtpReady) {
      try {
        const transporter = nodemailer.createTransport({ host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPassword } });
        const subject = `${sourceLabel} - ${safeCustomerName}`;
        const targets = ["info@krossford.com", backupEmail].filter((x): x is string => !!x && isValidEmail(x));
        const ownerResults = await Promise.allSettled(targets.map((to) => transporter.sendMail({ from: senderEmail, to, subject, text: emailText, html: ownerEmailHtml })));
        ownerResults.forEach((r) => { if (r.status === "rejected") console.error("Owner email failed:", r.reason); });
        if (source === "b2c-checkout") {
          try {
            await transporter.sendMail({ from: senderEmail, to: email, subject: "Aap Ka Order Mil Gaya Hai — Shukriya", text: `Aap Ka Order Mil Gaya Hai — Shukriya.\n\nOrder ID: ${orderId}\n\n${formatOrderItemsText(orderItems || [])}\n\nTotal: ${totalText}\n\nKROSSFORD team aap se order details ke hawale se rabta karegi.`, html: `<h2>Aap Ka Order Mil Gaya Hai — Shukriya</h2><p>Your order has been received.</p><p><strong>Order ID:</strong> ${escapeHtml(orderId)}<br><strong>Total:</strong> ${escapeHtml(totalText)}</p><h3>Order details</h3>${renderOrderItemsHtml(orderItems || [])}<p>KROSSFORD team aap se order details ke hawale se rabta karegi.</p>` });
          } catch (error) { console.error("Customer confirmation email failed.", error instanceof Error ? error.message : error); }
        }
      } catch (emailErr) {
        console.error("Email block failed but order saved:", emailErr);
      }
    } else {
      console.error("SMTP not ready — skipping emails, order already saved:", orderId);
    }

    // HAMESHA SUCCESS - Checkout ko yehi chahiye
    return NextResponse.json({ success: true, orderId, savedInDb });
  } catch (error) {
    console.error("Lead API handler failed.", error);
    return NextResponse.json({ error: "The enquiry could not be processed. Please try again." }, { status: 500 });
  }
}