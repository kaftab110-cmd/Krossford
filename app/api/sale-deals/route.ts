import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
// SALE DEALS API - FINAL - ADMIN SE CHALEGA
// GET = sab Sale Items, POST = naya Item, PATCH = edit / live-hide, DELETE = delete
// PRICE ADMIN SE: Old Price + Discount % Admin se likhogi - Sale Price khud banega: Old * (1 - Discount/100)
// Biker / Wallet PENDING - API price ko haath nahi lagati, jo Admin likhegi wahi dikhega.
function supa() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!); }
function norm(c: any) {
  return { id: c.id, cat: c.cat || c.category || "SALE", category: c.cat || c.category || "SALE", title: c.title, desc: c.description || c.desc || "", description: c.description || c.desc || "", old: Number(c.old_price ?? c.old ?? 0), old_price: Number(c.old_price ?? c.old ?? 0), discount: Number(c.discount ?? 0), image: c.image || "/images/leather-duffle-bag.jpg", alt: c.alt || c.title || "", is_active: c.is_active !== false };
}
export async function GET() {
  try {
    const { data, error } = await supa().from("sale_deals").select("*").eq("is_active", true).order("created_at", { ascending: true });
    if (error) return NextResponse.json({ items: [] });
    return NextResponse.json({ items: (data || []).map(norm) });
  } catch { return NextResponse.json({ items: [] }); }
}
export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.title || b.old === undefined && b.old_price === undefined) return NextResponse.json({ error: "Title + Old Price chahiye" }, { status: 400 });
    const { data, error } = await supa().from("sale_deals").insert([{ cat: b.cat || b.category || "SALE", title: String(b.title), description: b.desc || b.description || "", old_price: Number(b.old ?? b.old_price ?? 0), discount: Number(b.discount ?? 0), image: b.image || "/images/leather-duffle-bag.jpg", alt: b.alt || b.title, is_active: b.is_active !== false }]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, item: norm(data) });
  } catch (e: any) { return NextResponse.json({ error: e?.message || "Save fail" }, { status: 500 }); }
}
export async function PATCH(req: Request) {
  try {
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: "id chahiye" }, { status: 400 });
    const patch: any = {};
    if (b.cat !== undefined || b.category !== undefined) patch.cat = b.cat ?? b.category;
    if (b.title !== undefined) patch.title = b.title;
    if (b.desc !== undefined || b.description !== undefined) patch.description = b.desc ?? b.description;
    if (b.old !== undefined || b.old_price !== undefined) patch.old_price = Number(b.old ?? b.old_price);
    if (b.discount !== undefined) patch.discount = Number(b.discount);
    if (b.image !== undefined) patch.image = b.image;
    if (b.alt !== undefined) patch.alt = b.alt;
    if (b.is_active !== undefined) patch.is_active = b.is_active;
    const { data, error } = await supa().from("sale_deals").update(patch).eq("id", b.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, item: norm(data) });
  } catch (e: any) { return NextResponse.json({ error: e?.message || "Update fail" }, { status: 500 }); }
}
export async function DELETE(req: Request) {
  try {
    const b = await req.json().catch(() => ({}));
    const id = b.id || new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id chahiye" }, { status: 400 });
    const { error } = await supa().from("sale_deals").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) { return NextResponse.json({ error: e?.message || "Delete fail" }, { status: 500 }); }
}
