"use client";
// components/PhoneInput.tsx - KROSSFORD FINAL - SINGLE PHONE INPUT FOR ALL FORMS
// Reuse this phone input for Checkout, B2B, Contact, Bespoke / Custom, and Product Enquiry forms.
// Selecting a country automatically adds its calling code.
// Enter a local number such as 3001234567; the country calling code is added automatically.
// A leading zero is removed from local numbers, and pasted international numbers are not prefixed twice.

import { getDialCode, buildFullPhone, getLocalPart } from "@/lib/data/phone-codes";

type Props = {
  country: string;
  value: string; // Full phone number such as "+923001234567", saved with the order.
  onChange: (fullPhone: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
};

export default function PhoneInput({ country, value, onChange, label = "Phone / WhatsApp *", placeholder = "3001234567", required = true, name = "phone" }: Props) {
  const dial = getDialCode(country);
  const local = getLocalPart(country, value);

  return (
    <div>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">{label}</label>
      )}
      <div className="flex overflow-hidden rounded bg-zinc-800 border border-zinc-700 focus-within:border-amber-400">
        {/* Country Code - auto, user change nahi kar sakta - country select se badlega */}
        <span className="flex items-center px-3 bg-zinc-900 text-amber-400 font-bold text-sm border-r border-zinc-700 shrink-0">
          {dial}
        </span>
        <input
          name={name}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required={required}
          value={local}
          placeholder={placeholder}
          onChange={(e) => onChange(buildFullPhone(country, e.target.value))}
          className="flex-1 min-w-0 bg-transparent px-3 py-3 text-sm text-white placeholder:text-zinc-500 outline-none"
        />
      </div>
      {/* User ko dikhane ke liye full number - taake confirm ho jaye */}
      {value && (
        <p className="mt-1 text-[11px] text-zinc-500">Full number: <span className="text-amber-400 font-bold">{value}</span> • WhatsApp isi number pe hoga</p>
      )}
    </div>
  );
}
