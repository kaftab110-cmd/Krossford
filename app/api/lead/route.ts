import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Item = {
  name: string;
  product: string;
  title: string;
  image: string;
  color: string;
  size: string;
  qty: number;
  quantity: number;
  price: number;
};

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
  try {
    const bodyRaw: unknown = await req.json().catch(() => ({}));
    const body = asRecord(bodyRaw);

    const name = getStr(body.name || body.fullName).trim();
    const email = getStr(body.email).trim();
    const contact = getStr(body.phone || body.whatsapp || body.contact || body.phoneNumber).trim();
    const address = getStr(body.address || body.street || body.shippingAddress).trim();
    const city = getStr(body.city || body.shippingCity).trim();
    const country = getStr(body.country || body.shippingCountry || body.shipping_country || body.addressCountry).trim();
    const zip = getStr(body.zip || body.postalCode || body.shippingZip).trim();
    const notes = getStr(body.notes || body.message).trim();

    const rawItems: unknown[] = Array.isArray(body.items) ? (body.items as unknown[]) : [];
    const items: Item[] = rawItems.map((raw) => {
      const it = asRecord(raw);
      const nm = getStr(it.name || it.title || it.product) || "Product";
      const qty = getNum(it.qty || it.quantity, 1) || 1;
      return {
        name: nm,
        product: nm,
        title: nm,
        image: getStr(it.image || it.img || it.imageUrl || it.image_url),
        color: getStr(it.color || it.colour),
        size: getStr(it.size),
        qty,
        quantity: qty,
        price: getNum(it.price, 0),
      };
    });

    const totalQty = items.reduce((s: number, i: Item) => s + (i.qty || 1), 0) || getNum(body.quantity || body.total_quantity, 1) || 1;
    const totalClean = getStr(body.total || body.grandTotal).replace(/[^0-9.]/g, "");
    const totalNum = getNum(totalClean, 0) || items.reduce((s: number, i: Item) => s + i.price * (i.qty || 1), 0);
    const total = totalNum ? `$${totalNum.toFixed(2)}` : getStr(body.total);
    const productName = items.length === 1 ? items[0].name : items.length > 1 ? `${items[0].name} + ${items.length - 1} more` : getStr(body.product) || "Order";

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
      `Address: ${address}`,
      city ? `City: ${city}` : "",
      country ? `Country: ${country}` : "",
      zip ? `ZIP: ${zip}` : "",
      `Product: ${productName}`,
      `Quantity: ${totalQty}`,
      `Total: ${total}`,
      notes ? `Notes: ${notes}` : "",
      `Items: ${itemsString}`,
    ].filter(Boolean).join("\n");

    let orderId = `KF-007${78611001 + Math.floor(Date.now() / 1000) % 1000}`;
    try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    );

    const { count } = await supabase.from("leads").select("id", { count: "exact", head: true });
    const nextNum = 78611001 + (count || 0);
    orderId = `KF-007${nextNum}`;

    const fullRow: Record<string, unknown> = {
      order_id: orderId,
      name,
      email,
      phone: contact,
      whatsapp: contact,
      country,
      product: productName,
      quantity: String(totalQty),
      total_quantity: totalQty,
      total,
      message,
      items: itemsString,
      source: "website",
      status: "new",
    };

    const { error: fullErr } = await supabase.from("leads").insert([fullRow]);
    if (fullErr) {
      console.error("FULL INSERT FAILED, trying minimal:", fullErr.message);
      const { error: minErr } = await supabase.from("leads").insert([{
        order_id: orderId,
        name,
        email,
        phone: contact,
        whatsapp: contact,
        country,
        message,
      }]);
      if (minErr) console.error("MINIMAL INSERT FAILED:", minErr.message);
    }
    } catch (e: unknown) {
      console.error("SUPABASE FAILED, still returning ok:", errMsg(e));
      // orderId fallback wala hi rahega, checkout fail nahi hoga
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
          <div><b>${i.name}</b><br/>Color: ${i.color || "-"} | Size: ${i.size || "-"} | Qty: ${i.qty}<br/>Price: $${i.price}</div>
        </div>`).join("");
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.KROSSFORD_BACKUP_EMAIL || process.env.SMTP_USER,
        subject: `New Order ${orderId} - ${name}`,
        html: `<h2>New Order ${orderId}</h2><p><b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Phone / WhatsApp:</b> ${contact}<br/><b>Address:</b> ${address}, ${city}, ${country} ${zip}<br/><b>Total:</b> ${total}</p>${itemsHtml}<p>${notes}</p>`,
      });
    } catch (e: unknown) {
      console.error("EMAIL FAILED:", errMsg(e));
    }

    return NextResponse.json({ ok: true, orderId, message: "Order received" });
  } catch (e: unknown) {
    console.error("LEAD API ERROR:", errMsg(e));
    // Checkout kabhi fail nahi hona chahiye - fallback orderId de do, email phir bhi try hogi
    return NextResponse.json({ ok: true, orderId: `KF-007${78611001 + Math.floor(Date.now() / 1000) % 1000}`, message: "Order received" });
  }
}
