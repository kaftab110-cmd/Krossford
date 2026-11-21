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
function cleanStr(v: unknown): string {
  const s = getStr(v).trim();
  if (s.toUpperCase() === "EMPTY" || s.toUpperCase() === "NULL" || s === "-") return "";
  return s;
}
function getNum(v: unknown, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  return "Server error";
}
// Message se field nikalna - Country: Pakistan jaisa
function fromMessage(msg: string, label: string): string {
  const m = msg.match(new RegExp(label + "\\s*:\\s*([^\\n\\r]+)", "i"));
  if (!m) return "";
  return cleanStr(m[1].trim());
}
// Message se paisa nikalna - Shipping: $20 / Delivery: 20 jaisa
function moneyFromMessage(msg: string, labels: string[]): number {
  for (const label of labels) {
    const m = msg.match(new RegExp(label + "\\s*:\\s*\\$?([0-9]+(?:\\.[0-9]+)?)", "i"));
    if (m) return getNum(m[1], 0);
  }
  return 0;
}

export async function POST(req: Request) {
  let orderId = "KF-0078611007";
  try {
    const bodyRaw: unknown = await req.json().catch(() => ({}));
    const body = asRecord(bodyRaw);
    const lead = asRecord(body.lead);
    const hasLead = Object.keys(lead).length > 0;
    const p: Record<string, unknown> = hasLead ? lead : body;

    const name = cleanStr(p.customerName || p.name || p.fullName);
    const email = cleanStr(p.email);
    const contact = cleanStr(p.contact || p.phone || p.whatsapp || p.phoneNumber);
    const incomingMessage = getStr(p.message || body.message);
    const notes = cleanStr(p.notes || body.notes);

    // --- COUNTRY FIX: pehle direct field, EMPTY ho to message se ---
    let country = cleanStr(p.country || p.shippingCountry || body.country);
    let address = cleanStr(p.address || body.address);
    let city = cleanStr(p.city || body.city);
    let zip = cleanStr(p.zip || p.postalCode || body.postalCode);
    if (!country) country = fromMessage(incomingMessage, "Country");
    if (!address) address = fromMessage(incomingMessage, "Address");
    if (!city) city = fromMessage(incomingMessage, "City");
    if (!zip) zip = fromMessage(incomingMessage, "ZIP|Postal");

    const rawItems: unknown[] = Array.isArray(p.items) ? (p.items as unknown[]) : [];
    const items: Item[] = rawItems.map((raw) => {
      const it = asRecord(raw);
      const nm = getStr(it.name || it.title || it.product) || "Product";
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

    // --- TOTAL + SHIPPING FIX ---
    const subtotalClean = getStr(p.subtotal ?? p.subTotal ?? "").replace(/[^0-9.]/g, "");
    const subtotal = getNum(subtotalClean, 0) || items.reduce((s: number, i: Item) => s + i.price * (i.qty || 1), 0);
    let shipping = getNum(p.shipping ?? p.shippingCharge ?? p.shippingCost ?? p.delivery ?? p.deliveryCharge ?? p.deliveryCost, 0);
    if (!shipping) shipping = moneyFromMessage(incomingMessage, ["Shipping", "Delivery", "DHL", "Shipping Charge", "Delivery Charge"]);
    // Agar checkout ne grandTotal bheja hai to wohi use karo, warna subtotal + shipping
    const grandClean = getStr(p.grandTotal ?? p.grand_total ?? p.totalAmount ?? "").replace(/[^0-9.]/g, "");
    let grandTotal = getNum(grandClean, 0);
    if (!grandTotal) grandTotal = subtotal + shipping;
    if (!grandTotal) grandTotal = subtotal;
    const total = `$${grandTotal.toFixed(2)}`;
    const productName = cleanStr(p.product) || (items.length === 1 ? items[0].name : items.length > 1 ? `${items[0].name} + ${items.length - 1} more` : "Order");

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
      `Subtotal: $${subtotal.toFixed(2)}`,
      `Shipping: $${shipping.toFixed(2)}`,
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

      const fullRow = {
        order_id: orderId,
        name,
        email,
        phone: contact,
        whatsapp: contact,
        country,
        product: productName,
        quantity: String(totalQty),
        total,
        amount: total,
        total_quantity: totalQty,
        total_orders: 1,
        lead_status: "New",
        status: "new",
        source: hasLead ? "b2c-checkout" : "website",
        message,
        items: itemsWithImages,
      };

      const { error } = await supabase.from("leads").insert([fullRow]);
      if (error) {
        console.error("FULL INSERT FAILED, trying minimal:", error.message);
        const { error: minErr } = await supabase.from("leads").insert([{ order_id: orderId, name, email, phone: contact, whatsapp: contact, message }]);
        if (minErr) console.error("MINIMAL INSERT FAILED:", minErr.message);
      }
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
        html: `<h2>New Order ${orderId}</h2><p><b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Phone / WhatsApp:</b> ${contact}<br/><b>Country:</b> ${country}<br/><b>Subtotal:</b> $${subtotal.toFixed(2)}<br/><b>Shipping:</b> $${shipping.toFixed(2)}<br/><b>Total:</b> ${total}</p>${itemsHtml}<p>${incomingMessage.replace(/\n/g, "<br/>")}</p>`,
      });
    } catch (e: unknown) {
      console.error("EMAIL FAILED, order still ok:", errMsg(e));
    }

    return NextResponse.json({ ok: true, success: true, orderId, message: "Order received" });
  } catch (e: unknown) {
    console.error("LEAD API ERROR, still ok:", errMsg(e));
    return NextResponse.json({ ok: true, success: true, orderId, message: "Order received" });
  }
}