// app/api/products/route.ts - FINAL - Fast GET + slug + Live/Hide + Admin all
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";
export const revalidate = 0;
function supabase() { return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""); }
// FIX: Khali Supabase = khali list. Jhootha Wallet kabhi nahi dikhega.
const slugify = (s: string) => String(s || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    const showAll = url.searchParams.get("all") === "true" || url.searchParams.get("admin") === "true";
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return NextResponse.json({ products: [] });
    // FIX: Admin (?all=true) ko LIVE + HIDDEN dono dikhenge. Shop ko sirf LIVE.
    let query: any = supabase().from("products").select("*");
    if (!showAll) query = query.eq("is_active", true);
    if (slug) query = query.eq("slug", slug);
    else query = query.order("created_at", { ascending: false });
    const timeout = new Promise((resolve) => setTimeout(() => resolve({ data: null, error: { message: "timeout" } }), 5000));
    const { data, error }: any = await Promise.race([query, timeout]);
    if (error || !data) return NextResponse.json({ products: [] });
    return NextResponse.json({ products: data });
  } catch { return NextResponse.json({ products: [] }); }
}
export async function POST(req: Request) {
  try {
    const body = await req.json() as { name?: string; price?: number; category?: string; image?: string; stock?: number; description?: string; slug?: string; forHer?: boolean; is_active?: boolean };
    if (!body.name || !body.price) return NextResponse.json({ ok: false, error: "Name aur Price zaroori hai" }, { status: 400 });
    // FIX: Admin ka bheja slug use hoga. Na ho to naam se banega. Duplicate slug ho to -2, -3 lag jayega.
    let finalSlug = slugify(body.slug || body.name);
    const { data: existing } = await supabase().from("products").select("id").eq("slug", finalSlug).maybeSingle();
    if (existing) { let n = 2; while (true) { const cand = `${finalSlug}-${n}`; const { data: e2 } = await supabase().from("products").select("id").eq("slug", cand).maybeSingle(); if (!e2) { finalSlug = cand; break; } n++; } }
    const { data, error } = await supabase().from("products").insert([{ name: body.name, slug: finalSlug, price: body.price, category: body.category || "Wallets", image: body.image || "", stock: body.stock ?? 10, description: body.description || "", forHer: body.forHer === true, is_active: body.is_active !== false }]).select().single();
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, product: data });
  } catch { return NextResponse.json({ ok: false, error: "Save nahi hua" }, { status: 500 }); }
}
export async function PATCH(req: Request) {
  try {
    // FIX: PATCH ab sirf price/stock nahi - jo field aayega wahi update hoga, khaas kar is_active (Live/Hide)
    const body = await req.json() as { id?: number; price?: number; stock?: number; is_active?: boolean; name?: string; category?: string; description?: string; image?: string; slug?: string; forHer?: boolean };
    if (!body.id) return NextResponse.json({ ok: false, error: "ID missing" }, { status: 400 });
    const update: Record<string, any> = {};
    if (body.price !== undefined) update.price = body.price;
    if (body.stock !== undefined) update.stock = body.stock;
    if (body.is_active !== undefined) update.is_active = body.is_active;
    if (body.name !== undefined) update.name = body.name;
    if (body.category !== undefined) update.category = body.category;
    if (body.description !== undefined) update.description = body.description;
    if (body.image !== undefined) update.image = body.image;
    if (body.slug !== undefined) update.slug = slugify(body.slug);
    if (body.forHer !== undefined) update.forHer = body.forHer;
    if (Object.keys(update).length === 0) return NextResponse.json({ ok: false, error: "Kuch update karne ke liye nahi bheja" }, { status: 400 });
    const { error } = await supabase().from("products").update(update).eq("id", body.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false, error: "Update nahi hua" }, { status: 500 }); }
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json() as { id?: number };
    if (!body.id) return NextResponse.json({ ok: false, error: "ID missing" }, { status: 400 });
    const { error } = await supabase().from("products").update({ is_active: false }).eq("id", body.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ ok: false, error: "Delete nahi hua" }, { status: 500 }); }
}
