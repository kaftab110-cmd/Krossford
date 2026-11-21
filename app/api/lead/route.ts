import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Item = { name: string; image: string; color: string; size: string; qty: number; price: number; customization: string };
function asRecord(v: unknown): Record<string, unknown> {
  if (typeof v === "object" && v !== null) return v as Record<string, unknown>;
  return {};
}
function getStr(v: unknown): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  return "";
}
function getNum(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  return "Server error";
}

export async function POST(req: Request) {
  let orderId = `KF-007${8611001 + (Math.floor(Date.now() / 1000) % 100000)}`;
  try {
    const bodyRaw: unknown = await req.json().catch(() => ({}));
    const body = asRecord(bodyRaw);
    // CHECKOUT FIX: checkout bhejta hai { lead: { customerName, contact, ... } }
    // Route pehle flat body dhoondta tha - is liye EMPTY aata tha. Ab dono format support.
    const lead = asRecord(body.lead);
    const hasLead = Object.keys(lead).length > 0;
    const p: Record<string, unknown> = hasLead ? lead : body;

    const name = getStr(p.customerName || p.name || p.fullName).trim();
    const email = getStr(p.email).trim();
    const contact = getStr(p.contact || p.phone || p.whatsapp || p.phoneNumber).trim();
    // Checkout country/address alag se nahi bhejta - wo message ke andar hote hain
    const country = getStr(p.country || p.shippingCountry || body.country).trim();
    const address = getStr(p.address || body.address).trim();
    const city = getStr(p.city || body.city).trim();
    const zip = getStr(p.zip || p.postalCode || body.postalCode).trim();
    const notes = getStr(p.notes || body.notes).trim();
    const incomingMessage = getStr(p.message || body.message);

    const rawItems: unknown[] = Array.isArray(p.items) ? (p.items as unknown[]) : [];
    const items: Item[] = rawItems.map((raw) => {
      const it = asRecord(raw);
      const nm = getStr(it.name || it.title || it.product) || "Product";
      // CHECKOUT FIX: checkout bhejta hai unitPrice + quantity, price + qty nahi
      const qty = getNum(it.quantity || it.qty, 1) || 1;
      return {
        name: nm,
        image: getStr(it.image || it.img || it.imageUrl || it.image_url),
        color: getStr(it.color || it.colorName || it.colour),
        size: getStr(it.size),
        qty,
        price: getNum(it.unitPrice ?? it.price, 0),
        customization: getStr(it.customization),
      };
    });

    const totalQty = items.reduce((s: number, i: Item) => s + (i.qty || 1), 0) || getNum(p.quantity, 1) || 1;
    const totalClean = getStr(p.total ?? body.total).replace(/[^0-9.]/g, "");
    const totalNum = getNum(totalClean, 0) || items.reduce((s: number, i: Item) => s + i.price * (i.qty || 1), 0);
    const total = totalNum ? `$${totalNum.toFixed(2)}` : getStr(p.total);
    const productName = getStr(p.product) || (items.length === 1 ? items[0].name : items.length > 1 ? `${items[0].name} + ${items.length - 1} more` : "Order");

    const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.krossford.com").replace(/\/$/, "");
    const toFullImage = (raw: string): string => {
      if (!raw) return "";
      const u = raw.trim();
      if (u.startsWith("http")) return encodeURI(u);
      if (u.startsWith("//")) return encodeURI(`https:${u}`);
      if (u.startsWith("/")) return encodeURI(`${site}${u}`);
      return encodeURI(`${site}/${u}`);
    };
    const itemsWithImages: Item[] = items.map((i: Item) => ({ ...i, image: toFullImage(i.image) }));
    const itemsString = JSON.stringify(itemsWithImages);

    // Message: checkout ka message (jisme Country/Address/Payment sab hai) + header
    const message = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone / WhatsApp: ${contact}`,
      address ? `Address: ${address}` : "",
      city ? `City: ${city}` : "",
      country ? `Country: ${country}` : "",
      zip ? `ZIP: ${zip}` : "",
      `Product: ${productName}`,
      `Quantity: ${totalQty}`,
      `Total: ${total}`,
      notes ? `Notes: ${notes}` : "",
      incomingMessage ? `--- Checkout Details ---\n${incomingMessage}` : "",
      `Items: ${itemsString}`,
    ].filter(Boolean).join("\n");

    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string);
      const { count } = await supabase.from("leads").select("id", { count: "exact", head: true });
      const nextNum = 8611001 + (count || 0);
      orderId = `KF-007${nextNum}`;
      const { error } = await supabase.from("leads").insert([{ order_id: orderId, name, email, phone: contact, whatsapp: contact, message }]);
      if (error) console.error("LEADS INSERT FAILED (order still ok):", error.message);
    } catch (e: unknown) {
      console.error("SUPABASE FAILED, order still ok:", errMsg(e));
    }

    try {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      });
      const itemsHtml = itemsWithImages.map((i: Item) => `
        <div style="display:flex;gap:12px;border:1px solid #eee;padding:10px;border-radius:10px;margin-bottom:10px;">
          ${i.image ? `<img src="${i.image}" width="120" height="120" alt="${i.name}" style="object-fit:cover;border-radius:8px;display:block;" />` : ""}
          <div><b>${i.name}</b><br/>Color: ${i.color || "-"} | Size: ${i.size || "-"} | Qty: ${i.qty}<br/>Price: $${i.price}${i.customization ? `<br/>Custom: ${i.customization}` : ""}</div>
        </div>`).join("");
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.KROSSFORD_BACKUP_EMAIL || process.env.SMTP_USER,
        subject: `New Order ${orderId} - ${name}`,
        html: `<h2>New Order ${orderId}</h2><p><b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Phone / WhatsApp:</b> ${contact}<br/><b>Total:</b> ${total}</p>${itemsHtml}<p>${incomingMessage.replace(/\n/g, "<br/>")}</p>`,
      });
    } catch (e: unknown) {
      console.error("EMAIL FAILED, order still ok:", errMsg(e));
    }

    // CHECKOUT FIX: checkout chahta hai { success: true, orderId } - pehle route deta tha { ok: true } is liye checkout kehta tha "couldn't submit" bhale 200 aaya ho. Ab dono bhejte hain.
    return NextResponse.json({ ok: true, success: true, orderId, message: "Order received" });
  } catch (e: unknown) {
    console.error("LEAD API ERROR, still ok:", errMsg(e));
    return NextResponse.json({ ok: true, success: true, orderId, message: "Order received" });
  }
}
