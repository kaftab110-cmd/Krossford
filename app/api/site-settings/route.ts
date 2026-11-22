export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!
  );
}

export async function GET() {
  const supabase = getSupabase();
  const { data } = await supabase.from("site_settings").select("key, value");
  const settings: Record<string, string> = {};
  (data || []).forEach((row: { key: string; value: string }) => {
    settings[row.key] = row.value;
  });
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const supabase = getSupabase();
  const { key, value } = await req.json();
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value: String(value) }, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}