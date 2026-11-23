// app/api/products/route.ts - FINAL - Fast GET + slug support + Fallback
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
}

const FALLBACK = [
  { id: 2, name: "Wallet", price: 69, category: "For Him", image: "/images/wallet.jpg", slug: "admin-2", stock: 100, description: "rfid wallet", is_active: true },
];

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    const all = url.searchParams.get("all") === "true";

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (slug) {
        const one = FALLBACK.find((p) => p.slug === slug);
        return NextResponse.json({ products: one ? [one] : FALLBACK });
      }
      return NextResponse.json({ products: FALLBACK });
    }

    // FIX 1 - TUMHARI FILE ME YE MISSING THA: Pehle hamesha is_active=true lag raha tha,
    // is liye Admin me HIDDEN wale product dikhte hi nahi the.
    // Ab: Admin (?all=true) ko LIVE + HIDDEN dono milenge, Shop ko sirf LIVE.
    let query: any = supabase().from("products").select("*");
    if (!all) query = query.eq("is_active", true);
    if (slug) query = query.eq("slug", slug);
    else query = query.order("created_at", { ascending: false });

    const timeout = new Promise((resolve) => setTimeout(() => resolve({ data: null, error: { message: "timeout" } }), 5000));
    const { data, error }: any = await Promise.race([query, timeout]);

    // FIX 2 - TUMHARI FILE ME YE MASLA THA: Supabase se khaali aata tha to FALLBACK wapas
    // admin-2 ko zinda kar deta tha - is liye Delete ke baad bhi Wallet wapas aa jata tha.
    // Ab: Supabase chal raha hai to khaali matlab khaali - FALLBACK nahi bhejenge.
    if (error) {
      if (slug) return NextResponse.json({ products: [] });
      return NextResponse.json({ products: [] });
    }
    if (!data || data.length === 0) {
      return NextResponse.json({ products: [] });
    }
    return NextResponse.json({ products: data });
  } catch {
    return NextResponse.json({ products: FALLBACK });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as { name?: string; price?: number; category?: string; image?: string; stock?: number; description?: string; slug?: string; forHer?: boolean };
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
      slug: body.slug || null,
      forHer: !!body.forHer,
      is_active: true,
    }]).select().single();
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    if (data?.id && !body.slug) {
      await supabase().from("products").update({ slug: `admin-${data.id}` }).eq("id", data.id);
    }
    return NextResponse.json({ ok: true, product: data });
  } catch {
    return NextResponse.json({ ok: false, error: "Save nahi hua" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    // FIX 3a - TUMHARI FILE ME YE MISSING THA: PATCH sirf price/stock update karta tha,
    // is_active ko ignore karta tha - is liye HIDE / Make Live ka button kaam nahi karta tha.
    const body = await req.json() as { id?: number; price?: number; stock?: number; is_active?: boolean };
    if (!body.id) return NextResponse.json({ ok: false, error: "ID missing" }, { status: 400 });
    const patch: any = {};
    if (body.price !== undefined) patch.price = body.price;
    if (body.stock !== undefined) patch.stock = body.stock;
    if (body.is_active !== undefined) patch.is_active = body.is_active;
    const { error } = await supabase().from("products").update(patch).eq("id", body.id);
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
    // FIX 3b - TUMHARI FILE ME DELETE SIRF is_active=false karta tha (soft delete),
    // is liye product Admin me rehta tha. Ab pakka delete hoga.
    const { error } = await supabase().from("products").delete().eq("id", body.id);
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Delete nahi hua" }, { status: 500 });
  }
}
