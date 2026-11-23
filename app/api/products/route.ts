import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function client() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

// GET /api/products?all=true -> Admin ko LIVE + HIDDEN dono, warna sirf LIVE
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";
  const supabase = client();
  let q = supabase.from("products").select("*").order("id", { ascending: false });
  if (!all) q = q.eq("is_active", true);
  const { data, error } = await q;
  if (error) return NextResponse.json({ products: [], error: error.message });
  return NextResponse.json({ products: data || [] });
}

// POST - naya product
export async function POST(req: Request) {
  const b = await req.json();
  const supabase = client();
  const { data, error } = await supabase.from("products").insert([{
    name: b.name, slug: b.slug, price: b.price, category: b.category,
    image: b.image || "", stock: b.stock ?? 10, description: b.description || "",
    forHer: !!b.forHer, is_active: true,
  }]).select().single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, product: data });
}

// PATCH - price / stock / Live-Hide
export async function PATCH(req: Request) {
  const b = await req.json();
  const supabase = client();
  const patch: any = {};
  if (b.price !== undefined) patch.price = b.price;
  if (b.stock !== undefined) patch.stock = b.stock;
  if (b.is_active !== undefined) patch.is_active = b.is_active;
  const { error } = await supabase.from("products").update(patch).eq("id", b.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE - product pakka delete
export async function DELETE(req: Request) {
  const b = await req.json().catch(() => ({}));
  if (!b.id) return NextResponse.json({ ok: false, error: "id nahi mila" }, { status: 400 });
  const supabase = client();
  const { error } = await supabase.from("products").delete().eq("id", b.id);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
