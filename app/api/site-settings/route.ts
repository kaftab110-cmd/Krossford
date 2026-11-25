export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const SENSITIVE_KEYS = ["admin_pass", "krossford_admin_pass", "admin_password"];

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
    if (SENSITIVE_KEYS.includes(row.key)) return;
    settings[row.key] = row.value;
  });
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const supabase = getSupabase();
  const body = await req.json().catch(() => ({}));
  const { key, value, oldPass } = body as { key?: string; value?: unknown; oldPass?: string };

  if (!key) return NextResponse.json({ error: "key missing" }, { status: 400 });

  // VERIFY - Purana password sahi hai ya nahi, bina password dikhaye
  if (key === "verify_admin_pass") {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "admin_pass").maybeSingle();
    const stored = String((data as { value?: string } | null)?.value || "").trim();
    const envPass = String(process.env.KROSSFORD_ADMIN_PASS || "").trim();
    const expected = stored || envPass;
    if (!expected) return NextResponse.json({ ok: false });
    const finalOk = String(value || "").trim() === expected;
    return NextResponse.json({ ok: finalOk });
  }

  // admin_pass badalne ke liye PURANA password zaroori hai, warna 403
  if (SENSITIVE_KEYS.includes(key)) {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "admin_pass").maybeSingle();
    const stored = String((data as { value?: string } | null)?.value || "").trim();
    const envPass = String(process.env.KROSSFORD_ADMIN_PASS || "").trim();
    const expected = stored || envPass;
    if (!expected) return NextResponse.json({ error: "Admin password set nahi hai" }, { status: 403 });
    if (String(oldPass || "").trim() !== expected) {
      return NextResponse.json({ error: "Purana password galat hai" }, { status: 403 });
    }
    const { error } = await supabase.from("site_settings").upsert({ key: "admin_pass", value: String(value) }, { onConflict: "key" });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  }

  const { error } = await supabase
    .from("site_settings")
    .upsert({ key, value: String(value) }, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
