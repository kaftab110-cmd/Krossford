import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const WHATSAPP_ENABLED = true;

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
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co").trim();
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key").trim();
  return createClient(url, key);
}

async function createOrderId(supabase: ReturnType<typeof getSupabase>): Promise<string> {
  try {
    const { count, error } = await supabase.from("leads").select("id", { count: "exact", head: true });
    if (!error && typeof count === "number") {
      const next = count + 1;
      return `KF-00786110${String(next).padStart(2, "0")}`;
    }
  } catch {}
  const stamp = Date.now().toString().slice(-6);
  return `KF-00786110${stamp}`.slice(0, 16);
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
    // Agar image pehle se pura link hai — usko waisa hi rakho
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      const u = new URL(raw);
      // /_next/image?url=/images/xxx.jpg — isko seedha image me badlo
      if (u.pathname.includes("/_next/image")) {
        const inner = u.searchParams.get("url");
        if (inner) return getEmailImageUrl(inner);
      }
      return u.toString();
    }
    if (raw.startsWith("//")) return `https:${raw}`;
    // Agar /_next/image?url=... aaya to andar wala image nikalo
    if (raw.includes("/_next/image")) {
      const q = raw.split("?")[1] || "";
      const params = new URLSearchParams(q);
      const inner = params.get("url");
      if (inner) return getEmailImageUrl(decodeURIComponent(inner));
    }
    // Relative path — jaise /images/belt.jpg — isko pura banao
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

async function sendWhatsAppNotification(notificationType: "order" | "enquiry", orderId: string, name: string, phone: string, total: string): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN?.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID?.trim();
  const ownerNumber = process.env.WHATSAPP_OWNER_NUMBER?.replace(/\D/g, "");
  if (!token || !phoneNumberId || !ownerNumber) throw new Error("WhatsApp API configuration is missing.");
  const whatsappMessage = [notificationType === "order" ? "Naya Order Aaya Hai" : "Nayi Enquiry Aayi Hai", `Order ID: ${orderId}`, `Naam: ${name.replace(/[\r\n]+/g, " ").slice(0, 120)}`, `Phone: ${phone.replace(/[\r\n]+/g, " ").slice(0, 80) || "Not provided"}`, `Total: ${total}`].join("\n");
  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ messaging_product: "whatsapp", to: ownerNumber, type: "text", text: { body: whatsappMessage } }), signal: AbortSignal.timeout(15000) });
  if (!response.ok) {
    let detail = "";
    try { detail = await response.text(); } catch { detail = "No response body from WhatsApp API."; }
    throw new Error(`WhatsApp API returned status ${response.status}. Detail: ${detail.slice(0, 500)}`);
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
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
        let query = supabase.from("leads").select("*");
        if (email && phone) query = query.or(`email.eq.${email},whatsapp.eq.${phone}`);
        else if (email) query = query.eq("email", email);
        else query = query.eq("whatsapp", phone);
        const { data, error } = await query.maybeSingle();
        if (error) {
          console.error("Supabase customer lookup error:", error);
          return NextResponse.json({ error: "Customer lookup failed." }, { status: 500 });
        }
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
    const smtpSecure = process.env.SMTP_SECURE?.trim().toLowerCase() === "true";
    const backupEmail = process.env.KROSSFORD_BACKUP_EMAIL?.trim();
    const senderEmail = "hello@krossford.com";
    if (!smtpHost || !Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535 || !smtpUser || !smtpPassword || smtpUser.toLowerCase() !== senderEmail || smtpFrom?.toLowerCase() !== senderEmail || !smtpSecure || !backupEmail || !isValidEmail(backupEmail)) {
      console.error("Order notification service is missing required Zoho SMTP configuration.");
      return NextResponse.json({ error: "Order notifications are temporarily unavailable." }, { status: 503 });
    }
    const sourceLabel = source === "b2b-contact" ? "New B2B Enquiry" : "New B2C Order";
    const safeCustomerName = customerName.replace(/[\r\n]+/g, " ").slice(0, 120);
    let orderId: string;
    try { orderId = await createOrderId(getSupabase()); } catch (error) {
      console.error("Could not allocate a persistent order ID. Database error:", error);
      return NextResponse.json({ error: "Orders are temporarily unavailable. Please try again." }, { status: 503 });
    }
    const totalText = source === "b2c-checkout" ? `$${Number(total).toFixed(2)} USD` : "Not provided";
    const emailText = [sourceLabel, `Order ID: ${orderId}`, `Name: ${customerName}`, `Email: ${email || "Not provided"}`, `Contact: ${contact || "Not provided"}`, `Product / Items: ${product || "Not provided"}`, `Quantity: ${quantity || "Not provided"}`, "", source === "b2c-checkout" && orderItems ? formatOrderItemsText(orderItems) : message].join("\n");
    const itemsHtml = source === "b2c-checkout" && orderItems ? renderOrderItemsHtml(orderItems) : `<pre>${escapeHtml(message)}</pre>`;
    const ownerEmailHtml = `<h2>${escapeHtml(sourceLabel)}</h2><p><strong>Order ID:</strong> ${escapeHtml(orderId)}<br><strong>Name:</strong> ${escapeHtml(customerName)}<br><strong>Email:</strong> ${escapeHtml(email)}<br><strong>Phone:</strong> ${escapeHtml(contact || "Not provided")}<br><strong>Total:</strong> ${escapeHtml(totalText)}</p><h3>Products</h3>${itemsHtml}<h3>Full submission</h3><pre>${escapeHtml(message)}</pre>`;
    const transporter = nodemailer.createTransport({ host: smtpHost, port: smtpPort, secure: smtpSecure, auth: { user: smtpUser, pass: smtpPassword } });
    const subject = `${sourceLabel} - ${safeCustomerName}`;
    const [ownerEmailResults, whatsappResult] = await Promise.all([
      Promise.allSettled([
        transporter.sendMail({ from: senderEmail, to: "info@krossford.com", subject, text: emailText, html: ownerEmailHtml }),
        transporter.sendMail({ from: senderEmail, to: backupEmail, subject, text: emailText, html: ownerEmailHtml }),
      ]),
      WHATSAPP_ENABLED ? sendWhatsAppNotification(source === "b2c-checkout" ? "order" : "enquiry", orderId, customerName, contact, totalText).then(() => ({ status: "fulfilled" as const }), (error) => ({ status: "rejected" as const, reason: error })) : Promise.resolve({ status: "skipped" as const }),
    ]);
    const [primaryResult, backupResult] = ownerEmailResults;
    if (whatsappResult.status === "rejected") console.error("WhatsApp order notification failed.", whatsappResult.reason instanceof Error ? whatsappResult.reason.message : whatsappResult.reason);
    else if (whatsappResult.status === "fulfilled") console.log("WhatsApp order notification sent.");
    if (primaryResult?.status === "rejected") console.error("Primary order notification email failed.", primaryResult.reason instanceof Error ? primaryResult.reason.message : primaryResult.reason);
    if (backupResult?.status === "rejected") console.error("Backup order notification email failed.", backupResult.reason instanceof Error ? backupResult.reason.message : backupResult.reason);
    const bothEmailsFailed = primaryResult?.status === "rejected" && backupResult?.status === "rejected";
    if (bothEmailsFailed) return NextResponse.json({ error: "The enquiry could not be sent. Please try again." }, { status: 502 });
    if (source === "b2c-checkout") {
      try {
        await transporter.sendMail({ from: senderEmail, to: email, subject: "Aap Ka Order Mil Gaya Hai — Shukriya", text: `Aap Ka Order Mil Gaya Hai — Shukriya.\n\nOrder ID: ${orderId}\n\n${formatOrderItemsText(orderItems || [])}\n\nTotal: ${totalText}\n\nKROSSFORD team aap se order details ke hawale se rabta karegi.`, html: `<h2>Aap Ka Order Mil Gaya Hai — Shukriya</h2><p>Your order has been received.</p><p><strong>Order ID:</strong> ${escapeHtml(orderId)}<br><strong>Total:</strong> ${escapeHtml(totalText)}</p><h3>Order details</h3>${renderOrderItemsHtml(orderItems || [])}<p>KROSSFORD team aap se order details ke hawale se rabta karegi.</p>` });
      } catch (error) { console.error("Customer confirmation email failed.", error instanceof Error ? error.message : error); }
    }
    const supabase = getSupabase();
    const totalQty = orderItems ? orderItems.reduce((a, b) => a + b.quantity, 0) : (Number(quantity) || 0);
    const { error: dbError } = await supabase.from("leads").insert([{ order_id: orderId, name: customerName, email: email || null, whatsapp: contact || null, phone: contact || null, country: "", total_orders: 1, total_quantity: totalQty, lead_status: source === "b2c-checkout" ? "New" : "New", priority: "Normal", total: totalText, amount: totalText, quantity: quantity || String(totalQty), created_at: new Date().toISOString() }]);
    if (dbError) console.error("Supabase lead insert error after notification email was sent:", dbError);
    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Lead API handler failed.", error instanceof Error ? error.name : "Unknown error");
    return NextResponse.json({ error: "The enquiry could not be processed. Please try again." }, { status: 500 });
  }
}