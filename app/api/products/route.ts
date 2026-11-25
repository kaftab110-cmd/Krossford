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

// POST - naya product - For Her + For Him dono save honge
export async function POST(req: Request) {
  const b = await req.json();
  const supabase = client();
  const { data, error } = await supabase.from("products").insert([{
    name: b.name, slug: b.slug, price: b.price, category: b.category,
    image: b.image || "", stock: b.stock ?? 10, description: b.description || "",
    forHer: !!b.forHer, forHim: !!b.forHim, is_active: true,
  }]).select().single();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, product: data });
}

// PATCH - poora Edit: price / stock / Live-Hide / naam / category / photo / description / For Her / For Him
export async function PATCH(req: Request) {
  const b = await req.json();
  const supabase = client();
  const patch: any = {};
  if (b.name !== undefined) patch.name = b.name;
  if (b.price !== undefined) patch.price = b.price;
  if (b.stock !== undefined) patch.stock = b.stock;
  if (b.category !== undefined) patch.category = b.category;
  if (b.image !== undefined) patch.image = b.image;
  if (b.description !== undefined) patch.description = b.description;
  if (b.forHer !== undefined) patch.forHer = !!b.forHer;
  if (b.forHim !== undefined) patch.forHim = !!b.forHim;
  if (b.is_active !== undefined) patch.is_active = b.is_active;
  if (b.slug !== undefined) patch.slug = b.slug;
  const id = b.id ?? new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ ok: false, error: "id nahi mila" }, { status: 400 });
  const { error } = await supabase.from("products").update(patch).eq("id", Number(id));
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE - product pakka delete - id URL + body + header teenon se lega
export async function DELETE(req: Request) {
  const b = await req.json().catch(() => ({}));
  const urlId = new URL(req.url).searchParams.get("id");
  const headerId = req.headers.get("x-product-id");
  const id = b.id ?? urlId ?? headerId;
  if (!id) return NextResponse.json({ ok: false, error: "id nahi mila" }, { status: 400 });
  const supabase = client();
  const { error } = await supabase.from("products").delete().eq("id", Number(id));
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
