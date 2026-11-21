import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = String(body.name || body.fullName || "").trim();
    const email = String(body.email || "").trim();
    const contact = String(body.phone || body.whatsapp || body.contact || "").trim();
    const address = String(body.address || "").trim();
    const city = String(body.city || "").trim();
    const country = String(body.country || "").trim();
    const zip = String(body.zip || body.postalCode || "").trim();
    const notes = String(body.notes || body.message || "").trim();

    const rawItems = Array.isArray(body.items) ? body.items : [];
    const items = rawItems.map((it: any) => ({
      name: String(it?.name || it?.title || it?.product || "Product"),
      product: String(it?.name || it?.title || it?.product || "Product"),
      title: String(it?.name || it?.title || it?.product || "Product"),
      image: String(it?.image || it?.img || ""),
      color: String(it?.color || it?.colour || ""),
      size: String(it?.size || ""),
      qty: Number(it?.qty || it?.quantity || 1),
      quantity: Number(it?.qty || it?.quantity || 1),
      price: Number(it?.price || 0),
    }));

    const totalQty = items.reduce((s, i) => s + (i.qty || 1), 0) || Number(body.quantity || 1) || 1;
    const totalNum = Number(body.total || body.grandTotal || 0) || items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    const total = totalNum ? `$${totalNum.toFixed(2)}` : String(body.total || "");
    const productName = items.length === 1 ? items[0].name : items.length > 1 ? `${items[0].name} + ${items.length - 1} more` : String(body.product || "Order");

    const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.krossford.com").replace(/\/$/, "");
    const itemsWithImages = items.map((i) => ({
      ...i,
      image: i.image ? (i.image.startsWith("http") ? i.image : `${site}${i.image.startsWith("/") ? "" : "/"}${i.image}`) : "",
    }));
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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Sequential Order ID: KF-0078611001, 1002, 1003...
    const { count } = await supabase.from("leads").select("id", { count: "exact", head: true });
    const nextNum = 78611001 + (count || 0);
    const orderId = `KF-007${nextNum}`;

    // FULL INSERT - phone + whatsapp DONO me same number, country bhi
    const fullRow: any = {
      order_id: orderId,
      name,
      email,
      phone: contact,
      whatsapp: contact,
      country,
      product: productName,
      quantity: String(totalQty),
      total,
      message,
      items: itemsString,
      source: "website",
      status: "new",
    };

    const { error: fullErr } = await supabase.from("leads").insert([fullRow]);

    if (fullErr) {
      console.error("FULL INSERT FAILED, trying minimal:", fullErr.message);
      // MINIMAL fallback - taake order kabhi miss na ho
      const { error: minErr } = await supabase.from("leads").insert([{
        order_id: orderId,
        name,
        email,
        phone: contact,
        whatsapp: contact,
        message,
      }]);
      if (minErr) {
        console.error("MINIMAL INSERT FAILED:", minErr.message);
        // Phir bhi email bhej do, order fail mat karo
      }
    }

    // Email - admin ko
    try {
      const nodemailer = (await import("nodemailer")).default;
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 465),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      });
      const itemsHtml = itemsWithImages.map((i) => `
        <div style="display:flex;gap:12px;border:1px solid #eee;padding:10px;border-radius:10px;margin-bottom:10px;">
          ${i.image ? `<img src="${i.image}" width="80" height="80" style="object-fit:cover;border-radius:8px;" />` : ""}
          <div><b>${i.name}</b><br/>Color: ${i.color || "-"} | Size: ${i.size || "-"} | Qty: ${i.qty}<br/>Price: $${i.price}</div>
        </div>`).join("");
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: process.env.KROSSFORD_BACKUP_EMAIL || process.env.SMTP_USER,
        subject: `New Order ${orderId} - ${name}`,
        html: `<h2>New Order ${orderId}</h2><p><b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Phone / WhatsApp:</b> ${contact}<br/><b>Address:</b> ${address}, ${city}, ${country} ${zip}<br/><b>Total:</b> ${total}</p>${itemsHtml}<p>${notes}</p>`,
      });
    } catch (e: any) {
      console.error("EMAIL FAILED:", e?.message);
    }

    return NextResponse.json({ ok: true, orderId, message: "Order received" });
  } catch (e: any) {
    console.error("LEAD API ERROR:", e?.message);
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}
