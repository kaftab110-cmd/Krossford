import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
type Item = { name: string; image: string; color: string; size: string; qty: number; price: number; customization: string };
function asRecord(v: unknown): Record<string, unknown> { if (typeof v === "object" && v !== null) return v as Record<string, unknown>; return {}; }
function getStr(v: unknown): string { if (typeof v === "string") return v; if (typeof v === "number") return String(v); return ""; }
function cleanStr(v: unknown): string { const s = getStr(v).trim(); if (s.toUpperCase() === "EMPTY" || s.toUpperCase() === "NULL" || s === "-") return ""; return s; }
function getNum(v: unknown, fallback = 0): number { const n = Number(v); return Number.isFinite(n) ? n : fallback; }
function errMsg(e: unknown): string { if (e instanceof Error) return e.message; return "Server error"; }
function fieldFromMessage(msg: string, label: string): string { const key = label + ":"; const idx = msg.indexOf(key); if (idx < 0) return ""; const rest = msg.slice(idx + key.length); const line = rest.split("\n")[0] || ""; return cleanStr(line.trim()); }
function moneyFromMessage(msg: string, labels: string[]): number { for (let li = 0; li < labels.length; li++) { const label = labels[li]; const key = label + ":"; const idx = msg.toLowerCase().indexOf(key.toLowerCase()); if (idx < 0) continue; const rest = msg.slice(idx + key.length).trim(); const m = rest.match(/([0-9]+(?:\.[0-9]+)?)/); if (m) return getNum(m[1], 0); } return 0; }
function getSupabase() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string); }
// UNIQUE ORDER ID - count pe bharosa nahi, timestamp + random se kabhi duplicate nahi banega
function makeOrderId(): string { const t = Date.now().toString().slice(-7); const r = Math.floor(10 + Math.random() * 90); return `KF-007${t}${r}`; }
export async function GET() {
  try { const supabase = getSupabase(); const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(200); if (error) return NextResponse.json({ leads: [], error: error.message }); return NextResponse.json(data || []); }
  catch (e: unknown) { return NextResponse.json({ leads: [], error: errMsg(e) }); }
}
export async function PATCH(req: Request) {
  try {
    const body = asRecord(await req.json().catch(() => ({})));
    const id = body.id; const orderId = cleanStr(body.order_id || body.orderId);
    const statusRaw = cleanStr(body.status || body.lead_status || "New"); const status = statusRaw.toLowerCase();
    const leadStatus = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1).toLowerCase();
    const supabase = getSupabase(); let q = supabase.from("leads").update({ status, lead_status: leadStatus });
    if (id !== undefined && id !== "" && id !== null) q = q.eq("id", id as number);
    else if (orderId) q = q.eq("order_id", orderId);
    else return NextResponse.json({ ok: false, error: "id or order_id missing" }, { status: 400 });
    const { error } = await q; if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, status, lead_status: leadStatus });
  } catch (e: unknown) { return NextResponse.json({ ok: false, error: errMsg(e) }, { status: 500 }); }
}
export async function POST(req: Request) {
  let orderId = makeOrderId();
  let emailSent = false;
  try {
    const bodyRaw: unknown = await req.json().catch(() => ({}));
    const body = asRecord(bodyRaw); const lead = asRecord(body.lead);
    const hasLead = Object.keys(lead).length > 0; const p: Record<string, unknown> = hasLead ? lead : body;
    const name = cleanStr(p.customerName || p.name || p.fullName);
    const email = cleanStr(p.email);
    const contact = cleanStr(p.contact || p.phone || p.whatsapp || p.phoneNumber);
    const incomingMessage = getStr(p.message || body.message);
    const notes = cleanStr(p.notes || body.notes);
    const sourcePageRaw = cleanStr(p.sourcePage || body.sourcePage || p.source || body.source);
    const sourceLower = sourcePageRaw.toLowerCase();
    const enquiryTypeRaw = cleanStr((p as any).enquiryType || body.enquiryType).toUpperCase();
    const channelRaw = cleanStr(p.channel || body.channel).toUpperCase();
    let channel: "B2B" | "B2C" = "B2C";
    if (channelRaw === "B2B" || enquiryTypeRaw === "B2B" || sourceLower.includes("b2b") || sourceLower.includes("wholesale")) channel = "B2B";
    else if (channelRaw === "B2C" || enquiryTypeRaw === "B2C" || sourceLower.includes("b2c") || sourceLower.includes("checkout")) channel = "B2C";
    const actionRaw = cleanStr(p.action || body.action).toLowerCase();
    let action: "enquiry" | "proceed_order" = "enquiry";
    if (channel === "B2B") action = "enquiry";
    else if (actionRaw === "proceed_order" || actionRaw === "proceed-order" || actionRaw === "order" || actionRaw === "submit" || sourceLower.includes("checkout") || sourceLower.includes("b2c")) action = "proceed_order";
    else action = "enquiry";
    const sourcePage = sourcePageRaw;
    const paymentTerms = cleanStr(p.paymentTerms || body.paymentTerms);
    const shippingMethod = cleanStr(p.shippingMethod || body.shippingMethod || "fastest delivery");
    const hideType = cleanStr((p as any).hideType || body.hideType);
    let country = cleanStr(p.country || p.shippingCountry || body.country);
    let address = cleanStr(p.address || body.address);
    let city = cleanStr(p.city || body.city);
    let zip = cleanStr(p.zip || p.postalCode || body.postalCode);
    if (!country) country = fieldFromMessage(incomingMessage, "Country");
    if (!address) address = fieldFromMessage(incomingMessage, "Address");
    if (!city) city = fieldFromMessage(incomingMessage, "City");
    if (!zip) zip = fieldFromMessage(incomingMessage, "ZIP");
    const rawItems: unknown[] = Array.isArray(p.items) ? (p.items as unknown[]) : [];
    const items: Item[] = rawItems.map((raw) => { const it = asRecord(raw); const nm = getStr(it.name || it.title || it.product) || "Product"; const qty = getNum(it.quantity || it.qty, 1) || 1; return { name: nm, image: getStr(it.image || it.img || it.imageUrl || it.image_url), color: getStr(it.color || it.colorName || it.colour), size: getStr(it.size), qty, price: getNum(it.unitPrice ?? it.unitPriceUsd ?? it.price, 0), customization: getStr(it.customization || (it as any).hideType || hideType) }; });
    const totalQty = items.reduce((s: number, i: Item) => s + (i.qty || 1), 0) || getNum(p.quantity, 1) || 1;
    const subtotalClean = getStr(p.subtotal ?? p.subTotal ?? "").replace(/[^0-9.]/g, "");
    const subtotal = getNum(subtotalClean, 0) || items.reduce((s: number, i: Item) => s + i.price * (i.qty || 1), 0);
    let shipping = getNum(p.shipping ?? p.shippingCharge ?? p.shippingCost ?? p.delivery ?? p.deliveryCharge ?? p.deliveryCost, 0);
    if (!shipping) shipping = moneyFromMessage(incomingMessage, ["Shipping", "Delivery", "Shipping Charge", "Delivery Charge"]);
    const grandClean = getStr(p.grandTotal ?? p.grand_total ?? p.totalAmount ?? p.totalUsd ?? "").replace(/[^0-9.]/g, "");
    let grandTotal = getNum(grandClean, 0); if (!grandTotal) grandTotal = subtotal + shipping; if (!grandTotal) grandTotal = subtotal;
    const total = `$${grandTotal.toFixed(2)}`;
    const productName = cleanStr(p.product) || (items.length === 1 ? items[0].name : items.length > 1 ? `${items[0].name} + ${items.length - 1} more` : "Order");
    const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.krossford.com").replace(/\/$/, "");
    const toFullImage = (raw: string): string => { if (!raw) return ""; const u = raw.trim(); if (u.startsWith("http")) return encodeURI(u); if (u.startsWith("//")) return encodeURI(`https:${u}`); if (u.startsWith("/")) return encodeURI(`${site}${u}`); return encodeURI(`${site}/${u}`); };
    const itemsWithImages: Item[] = items.map((i: Item) => ({ ...i, image: toFullImage(i.image) }));
    const itemsString = JSON.stringify(itemsWithImages);
    const company = cleanStr(p.company || body.company);
    const message = [`Channel: ${channel} - ${action === "proceed_order" ? "Proceed to Order" : "Enquiry"}`, sourcePage ? `Source Page: ${sourcePage}` : "", company ? `Company: ${company}` : "", `Name: ${name}`, `Email: ${email}`, `Phone / WhatsApp: ${contact}`, address ? `Address: ${address}` : "", city ? `City: ${city}` : "", country ? `Country: ${country}` : "", zip ? `ZIP: ${zip}` : "", `Product: ${productName}`, `Quantity: ${totalQty}`, hideType ? `Hide Type: ${hideType}` : "", paymentTerms ? `Payment Terms: ${paymentTerms}` : "", shippingMethod ? `Shipping Method: ${shippingMethod}` : "", `Subtotal: $${subtotal.toFixed(2)}`, `Shipping: $${shipping.toFixed(2)}`, `Total: ${total}`, notes ? `Notes: ${notes}` : "", incomingMessage ? `--- Checkout Details ---\n${incomingMessage}` : "", `Items: ${itemsString}`].filter(Boolean).join("\n");
    // IDEMPOTENCY - Agar isi email + isi message ka order pichhle 2 min me aa chuka hai to dobara insert + dobara email MAT bhejo, purana Order ID wapas bhejo
    try {
      const supabaseDupe = getSupabase();
      const twoMinAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const { data: dupes } = await supabaseDupe.from("leads").select("order_id,message").eq("email", email).gte("created_at", twoMinAgo).order("created_at", { ascending: false }).limit(5);
      const dupe = (dupes || []).find((d: any) => String(d.message || "").includes(incomingMessage.slice(0, 80)) && incomingMessage.length > 20);
      if (dupe?.order_id) { return NextResponse.json({ ok: true, success: true, orderId: dupe.order_id, emailSent: true, duplicate: true, message: "Duplicate request - original order returned" }); }
    } catch { /* dupe check fail ho to bhi order aage badhega */ }
    try {
      const supabase = getSupabase();
      orderId = makeOrderId();
      const fullRow = { order_id: orderId, name, email, phone: contact, whatsapp: contact, country, product: productName, quantity: String(totalQty), total, amount: total, subtotal: `$${subtotal.toFixed(2)}`, shipping: `$${shipping.toFixed(2)}`, delivery_charges: `$${shipping.toFixed(2)}`, total_quantity: totalQty, total_orders: 1, lead_status: "New", status: "new", source: sourcePage || (hasLead ? "b2c-checkout" : channel === "B2B" ? "b2b-enquiry" : "website"), message, items: itemsWithImages };
      const { error } = await supabase.from("leads").insert([fullRow]);
      if (error) { console.error("FULL INSERT FAILED, trying minimal:", error.message); const { error: minErr } = await supabase.from("leads").insert([{ order_id: orderId, name, email, phone: contact, whatsapp: contact, message }]); if (minErr) console.error("MINIMAL INSERT FAILED:", minErr.message); }
    } catch (e: unknown) { console.error("SUPABASE FAILED, order still ok:", errMsg(e)); }
    try {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: process.env.SMTP_SECURE === "true", auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
      const itemsHtml = itemsWithImages.map((i: Item) => `<div style="display:flex;gap:12px;border:1px solid #eee;padding:10px;border-radius:10px;margin-bottom:10px;">${i.image ? `<img src="${i.image}" width="120" height="120" alt="${i.name}" style="object-fit:cover;border-radius:8px;display:block;" />` : ""}<div><b>${i.name}</b><br/>Color: ${i.color || "-"} | Size: ${i.size || "-"} | Qty: ${i.qty}<br/>Price: $${i.price}${i.customization ? `<br/>Custom: ${i.customization}` : ""}</div></div>`).join("");
      const toEmail = process.env.KROSSFORD_BACKUP_EMAIL || "sales@krossford.com";
      const subject = `[${channel} - ${action === "proceed_order" ? "ORDER" : "ENQUIRY"}] New ${channel} ${action === "proceed_order" ? "Order" : "Enquiry"} ${orderId} - ${name}`;
      await transporter.sendMail({ from: process.env.SMTP_FROM, to: toEmail, subject, html: `<h2>New ${channel} ${action === "proceed_order" ? "Order" : "Enquiry"} ${orderId}</h2><p><b>Channel:</b> ${channel} | <b>Type:</b> ${action === "proceed_order" ? "Proceed to Order" : "Enquiry"}<br/><b>Source:</b> ${sourcePage || "-"}<br/><b>Company:</b> ${company || "-"}<br/><b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Phone / WhatsApp:</b> ${contact}<br/><b>Country:</b> ${country}<br/><b>Hide Type:</b> ${hideType || "-"}<br/><b>Payment Terms:</b> ${paymentTerms || "-"}<br/><b>Shipping:</b> ${shippingMethod}<br/><b>Subtotal:</b> $${subtotal.toFixed(2)}<br/><b>Shipping:</b> $${shipping.toFixed(2)}<br/><b>Total:</b> ${total}</p>${itemsHtml}<p>${incomingMessage.replace(/\n/g, "<br/>")}</p>` });
      emailSent = true;
    } catch (e: unknown) { console.error("EMAIL FAILED, order still ok:", errMsg(e)); emailSent = false; }
    return NextResponse.json({ ok: true, success: true, orderId, emailSent, message: "Order received" });
  } catch (e: unknown) { console.error("LEAD API ERROR, still ok:", errMsg(e)); return NextResponse.json({ ok: true, success: true, orderId, emailSent, message: "Order received" }); }
}
