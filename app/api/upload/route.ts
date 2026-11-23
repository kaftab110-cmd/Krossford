// app/api/upload/route.ts - Device se image upload → Supabase Storage → Live URL
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `product-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, { contentType: file.type, upsert: true });

    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return NextResponse.json({ ok: true, url: data.publicUrl });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Upload fail" }, { status: 500 });
  }
}