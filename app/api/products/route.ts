import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
}

export async function GET() {
  try {
    const { data, error } = await supabase()
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ products: [] });
    return NextResponse.json({ products: data || [] });
  } catch {
    return NextResponse.json({ products: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as { name?: string; price?: number; category?: string; image?: string; stock?: number; description?: string };
    if (!body.name || !body.price) {
      return NextResponse.json({ ok: false, error: "Name aur Price zaroori hai" }, { status: 400 });
    }
    const { data, error } = await supabase().from("products").insert([{
      name: body.name,
      price: body.price,
      category: body.category || "General",
      image: body.image || "",
      stock: body.stock ?? 0,
      description: body.description || "",
      is_active: true,
    }]).select().single();
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, product: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Save nahi hua" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json() as { id?: number; price?: number; stock?: number };
    if (!body.id) return NextResponse.json({ ok: false, error: "ID missing" }, { status: 400 });
    const { error } = await supabase().from("products").update({ price: body.price, stock: body.stock }).eq("id", body.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Update nahi hua" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json() as { id?: number };
    if (!body.id) return NextResponse.json({ ok: false, error: "ID missing" }, { status: 400 });
    const { error } = await supabase().from("products").update({ is_active: false }).eq("id", body.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Delete nahi hua" }, { status: 500 });
  }
}