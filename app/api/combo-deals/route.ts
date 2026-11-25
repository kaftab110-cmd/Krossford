import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// COMBO DEALS API - FINAL
// GET = sab Deals, POST = nayi Deal, PATCH = edit / live-hide, DELETE = delete
// FIX: "desc" Postgres ka reserved word hai - isliye column ka naam "description" hai.
// Page dono ko samajhta hai: desc || description, isliye purani Deals bhi chalengi.
function supa() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
}
function norm(c: any) {
  return {
    id: c.id,
    title: c.title,
    tag: c.tag || "COMBO",
    desc: c.description || c.desc || "",
    description: c.description || c.desc || "",
    detail: c.detail || "",
    oldPrice: Number(c.old_price ?? c.oldPrice ?? 0),
    old_price: Number(c.old_price ?? c.oldPrice ?? 0),
    price: Number(c.price || 0),
    image: c.image || "/images/messenger-bag.jpg",
    alt: c.alt || c.title || "",
    is_active: c.is_active !== false,
  };
}
export async function GET() {
  try {
    const { data, error } = await supa().from("combo_deals").select("*").eq("is_active", true).order("created_at", { ascending: true });
    if (error) return NextResponse.json({ combos: [] });
    return NextResponse.json({ combos: (data || []).map(norm) });
  } catch { return NextResponse.json({ combos: [] }); }
}
export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.title || b.price === undefined) return NextResponse.json({ error: "Title + Price chahiye" }, { status: 400 });
    const { data, error } = await supa().from("combo_deals").insert([{
      title: String(b.title), tag: b.tag || "COMBO",
      description: b.desc || b.description || "", detail: b.detail || "",
      old_price: Number(b.oldPrice ?? b.old_price ?? 0), price: Number(b.price),
      image: b.image || "/images/messenger-bag.jpg", alt: b.alt || b.title,
      is_active: b.is_active !== false,
    }]).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, combo: norm(data) });
  } catch (e: any) { return NextResponse.json({ error: e?.message || "Save fail" }, { status: 500 }); }
}
export async function PATCH(req: Request) {
  try {
    const b = await req.json();
    if (!b.id) return NextResponse.json({ error: "id chahiye" }, { status: 400 });
    const patch: any = {};
    if (b.title !== undefined) patch.title = b.title;
    if (b.tag !== undefined) patch.tag = b.tag;
    if (b.desc !== undefined || b.description !== undefined) patch.description = b.desc ?? b.description;
    if (b.detail !== undefined) patch.detail = b.detail;
    if (b.oldPrice !== undefined || b.old_price !== undefined) patch.old_price = Number(b.oldPrice ?? b.old_price);
    if (b.price !== undefined) patch.price = Number(b.price);
    if (b.image !== undefined) patch.image = b.image;
    if (b.alt !== undefined) patch.alt = b.alt;
    if (b.is_active !== undefined) patch.is_active = b.is_active;
    const { data, error } = await supa().from("combo_deals").update(patch).eq("id", b.id).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, combo: norm(data) });
  } catch (e: any) { return NextResponse.json({ error: e?.message || "Update fail" }, { status: 500 }); }
}
export async function DELETE(req: Request) {
  try {
    const b = await req.json().catch(() => ({}));
    const id = b.id || new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id chahiye" }, { status: 400 });
    const { error } = await supa().from("combo_deals").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) { return NextResponse.json({ error: e?.message || "Delete fail" }, { status: 500 }); }
}
