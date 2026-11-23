import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// POST /api/upload - Admin se device photo upload
// Supabase Storage bucket "product-images" me save hoga
// Agar bucket nahi bana to saaf error dega, "upload nahi hui" wala andhera nahi
export async function POST(req: Request) {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      return NextResponse.json({ error: "Supabase env missing - Vercel me NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY lagao" }, { status: 500 });
    }
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Koi file nahi mili" }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Photo 5MB se badi hai - chhoti photo try karo" }, { status: 400 });

    const supabase = createClient(url, key);
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());

    const { error } = await supabase.storage.from("product-images").upload(name, buf, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
    if (error) {
      // Sab se common wajah: bucket bana hi nahi
      return NextResponse.json({ error: `Upload fail: ${error.message} - Supabase me "product-images" naam ka PUBLIC bucket banao` }, { status: 500 });
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(name);
    return NextResponse.json({ ok: true, url: data.publicUrl, image: data.publicUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Upload fail" }, { status: 500 });
  }
}
