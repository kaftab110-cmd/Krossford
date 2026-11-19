"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PhoneInput from "@/components/PhoneInput";
import { buildFullPhone } from "@/lib/data/phone-codes";
import { COUNTRIES } from "@/lib/data/countries";

type CartItem = {
  id: string;
  slug: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  colorName: string;
  size?: string;
  customerType: string;
  additionalOption: string;
  customText: string;
  uploadedFileName: string;
  customMade?: { enabled: boolean; type?: string; detail?: string; fileName?: string };
  extraChargesNote?: string;
};

const CHECKOUT_COUNTRIES = [...new Set([...COUNTRIES, "Other"])];

// Brand names split so chat does not re-tag them - JS joins them at runtime
const WU = "Western " + "Union";
const 【entity-VISA¦canonical_name=VISA】 = "V" + "ISA";
const MC = "Master" + "card";
const 【entity-DHL¦canonical_name=DHL】 = "D" + "HL";
const DHLE = "D" + "HL Express";

const PAYMENTS = [
  { id: "Bank Wire Transfer - Bank Alfalah", title: "Bank Wire Transfer - Bank Alfalah", badge: "RECOMMENDED FOR BULK", desc: "Account details will be shared securely on WhatsApp after order confirmation. Never share full bank details publicly." },
  { id: "Wise Transfer", title: "Wise Transfer - Fast & Low Fee", badge: "", desc: "Send via Wise to KROSSFORD ENTERPRISES. Details will be shared on WhatsApp after order confirmation." },
  { id: WU, title: WU, badge: "", desc: "Available for international customers and buyers. Details will be shared on WhatsApp after order confirmation." },
  { id: 【entity-VISA¦canonical_name=VISA】 + " / " + MC, title: 【entity-VISA¦canonical_name=VISA】 + " / " + MC, badge: "", desc: "Card payment link will be shared on WhatsApp after order confirmation." },
];

const customMadeLabel = (t?: string) => {
  if (t === "full") return "Full Product - Make As Per My Design";
  if (t === "stitching") return "Stitching Only - Hand Stitched Required";
  if (t === "design") return "Design Change";
  if (t === "size-colour") return "Size / Colour Change";
  if (t === "logo-name") return "Logo / Name To Be Added";
  return t || "";
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Wire Transfer - Bank Alfalah");
  const [orderSent, setOrderSent] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("krossford_cart") || "[]") as CartItem[];
    setCart(saved);
    setIsCartLoading(false);
  }, []);

  useEffect(() => {
    if (phone) setPhone(buildFullPhone(country, phone));
    if (altPhone) setAltPhone(buildFullPhone(country, altPhone));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const total = cart.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 1), 0);

  const isWholesale = cart.some((it) => it.customerType === "B2B");
  const paymentTerms = isWholesale
    ? "Wholesale: 50% Advance - 50% Before Dispatch"
    : "Retail: 100% Secure Advance Payment";

  const handlePlaceOrder = async () => {
    const fullName = `${firstName} ${lastName}`.trim();
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !country.trim() || !address.trim() || !city.trim() || !state.trim() || !postalCode.trim() || !phone.trim()) {
      alert("Please fill First Name, Last Name, Email, Country, Address, City, State, Postal Code and Phone");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const itemsText = cart.map((it, i) =>
      `${i + 1}. ${it.name} - Color: ${it.colorName} - Type: ${it.customerType} - Qty: ${it.quantity} - $${it.price} - Custom: ${it.additionalOption}${it.customText ? ` (${it.customText})` : ""}${it.uploadedFileName ? ` - File: ${it.uploadedFileName}` : ""}${it.customMade?.enabled ? ` - CUSTOM MADE HAND STITCHED: ${customMadeLabel(it.customMade.type)}${it.customMade.detail ? ` - Detail: ${it.customMade.detail}` : ""}${it.customMade.fileName ? ` - Design Image: ${it.customMade.fileName}` : ""}` : ""}${it.extraChargesNote ? ` - ${it.extraChargesNote}` : ""}`
    ).join("\n");

    const items = cart.map((it) => ({
      name: it.name,
      image: it.image,
      color: it.colorName || "Not specified",
      size: it.size || "Not specified",
      quantity: Number(it.quantity || 1),
      unitPrice: Number(it.price || 0),
      customization: [
        it.additionalOption !== "none" ? it.additionalOption : "",
        it.customText,
        it.uploadedFileName ? `File: ${it.uploadedFileName}` : "",
        it.customMade?.enabled
          ? `Custom Made: ${customMadeLabel(it.customMade.type)}${it.customMade.detail ? ` - ${it.customMade.detail}` : ""}${it.customMade.fileName ? ` - Design Image: ${it.customMade.fileName}` : ""}`
          : "",
        it.extraChargesNote || "",
      ].filter(Boolean).join("; "),
    }));

    const message = [
      `Country: ${country}`,
      `Address: ${address}`,
      `City: ${city}`,
      `State / Province: ${state}`,
      `Postal / ZIP Code: ${postalCode}`,
      altPhone ? `Alternate / Contact Number: ${altPhone}` : "",
      `Payment Method: ${paymentMethod}`,
      `Payment Terms: ${paymentTerms}`,
      "Estimated Total: 12-17 Working Days",
      "Shipment + Delivery: To Be Confirmed",
      "Extra Customization Charges: To Be Confirmed",
      "",
      `ITEMS:\n${itemsText}`,
    ].filter(Boolean).join("\n");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          lead: {
            source: "b2c-checkout",
            customerName: fullName,
            email: email.trim(),
            contact: phone,
            product: cart.map((it) => it.name).join(", "),
            quantity: String(items.reduce((sum, item) => sum + item.quantity, 0)),
            total,
            items,
            message,
          },
        }),
      });
      const result: { success?: boolean; orderId?: string; error?: string } = await response.json();

      if (!response.ok || !result.success || !result.orderId) {
        alert(result.error || "We couldn't submit your order. Please try again.");
        return;
      }

      setOrderId(result.orderId);
      localStorage.removeItem("krossford_cart");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      setOrderSent(true);
    } catch {
      alert("We couldn't submit your order. Please try again.");
    }
  };

  if (orderSent) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4 p-6 text-center">
        <div className="w-14 h-14 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full flex items-center justify-center text-2xl">✓</div>
        <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-brand)" }}>Order Sent!</p>
        <p className="text-xs text-zinc-400 max-w-md leading-relaxed">Your order confirmation was sent to {email}.</p>
        <p className="text-sm font-bold">Order ID: {orderId}</p>
        <Link href="/shop" className="bg-[#D4AF37] text-black px-6 py-3 rounded text-sm font-bold">Continue Shopping</Link>
        <Link href="/b2b" className="text-xs underline text-zinc-400">Need Bulk? Go To B2B →</Link>
      </div>
    );
  }

  if (isCartLoading) {
    return <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center text-sm">Loading Checkout...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-brand)" }}>Your cart is empty</p>
        <Link href="/shop" className="bg-[#D4AF37] text-black px-6 py-3 rounded text-sm font-bold">Go To Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-3xl font-bold uppercase" style={{ fontFamily: "var(--font-brand)" }}>Checkout</h1>
          <p className="text-xs text-zinc-400 mt-1">Fill in your details to submit your order.</p>
          <p className="text-xs text-[#D4AF37] mt-2 tracking-wide">100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel) • Sample Before Bulk • {paymentTerms}</p>

          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name *" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] placeholder:text-zinc-500 text-white" />
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name *" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] placeholder:text-zinc-500 text-white" />
            </div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] placeholder:text-zinc-500 text-white" />
            <PhoneInput country={country} value={phone} onChange={setPhone} label="Mobile / WhatsApp *" placeholder="3001234567" />
            <PhoneInput country={country} value={altPhone} onChange={setAltPhone} label="Alternate / Contact Number (Optional)" placeholder="3001234567" required={false} name="altPhone" />
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] text-white">
              {CHECKOUT_COUNTRIES.map((c, i) => <option key={`${c}-${i}`} value={c}>{c}</option>)}
            </select>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address - Street, House No. *" rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] placeholder:text-zinc-500 text-white resize-none" />
            <div className="grid grid-cols-2 gap-3">
              <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City *" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] placeholder:text-zinc-500 text-white" />
              <input value={state} onChange={(e) => setState(e.target.value)} placeholder="State / Province *" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] placeholder:text-zinc-500 text-white" />
            </div>
            <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Postal / ZIP Code *" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-[#D4AF37] placeholder:text-zinc-500 text-white" />
            <p className="text-xs text-zinc-500">City, State & Postal Code are required for {DHLE} international delivery.</p>
          </div>

          <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded p-3">
            <p className="text-xs text-zinc-400">Shipping & delivery charges, plus any extra customization charges, will be confirmed after your order is confirmed. They are not included in the product price.</p>
          </div>

          <div className="mt-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded p-3 space-y-1">
            <p className="text-xs text-[#D4AF37] font-bold">Handcrafted To Order • Ships via {DHLE}</p>
            <p className="text-xs text-zinc-300">We don&apos;t keep ready-made stock. Every Krossford bag is made only after your order, to keep its craftsmanship and exclusivity.</p>
            <p className="text-xs text-[#D4AF37] font-bold">Ships via {DHLE} • Estimated Total: 12-17 Working Days • Full Tracking Provided • Ships from Pakistan</p>
            <p className="text-xs text-zinc-400 mt-1">We Always Aim To Deliver Earlier.</p>
          </div>
        </div>

        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-300">Order Summary</p>
            <div className="mt-4 space-y-4">
              {cart.map((it) => (
                <div key={it.id} className="flex gap-3">
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-tight">{it.name}</p>
                    <p className="text-xs text-zinc-400">Color: {it.colorName} | {it.customerType} | Qty: {it.quantity}</p>
                    {it.additionalOption !== "none" && (
                      <p className="text-xs text-[#D4AF37]">Custom: {it.additionalOption} {it.customText}</p>
                    )}
                    {it.customMade?.enabled && (
                      <div className="mt-1 bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded px-2 py-1">
                        <p className="text-xs text-[#D4AF37] font-bold">Custom Made - Hand Stitched - On Customer Demand</p>
                        {it.customMade.type && <p className="text-xs text-zinc-200">What To Customize: {customMadeLabel(it.customMade.type)}</p>}
                        {it.customMade.detail && <p className="text-xs text-zinc-300">Detail: {it.customMade.detail}</p>}
                        {it.customMade.fileName && <p className="text-xs text-zinc-400">Design Image: {it.customMade.fileName}</p>}
                        <p className="text-xs text-[#D4AF37]">Rates will depend on design - Final price will be confirmed after order confirmation.</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold">${Number(it.price) * Number(it.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between">
              <span className="font-bold">Total (Product Only)</span>
              <span className="font-bold">${total}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">+ Shipment / Delivery - To Be Confirmed</p>

            <div className="mt-5 bg-zinc-950 border border-zinc-800 rounded p-4">
              <p className="text-xs font-bold tracking-widest uppercase text-zinc-300">Payment Method - International Only</p>
              <div className="mt-3 space-y-2">
                {PAYMENTS.map((p) => (
                  <label key={p.id} className={`flex items-start gap-2 bg-zinc-900 border rounded p-3 cursor-pointer ${paymentMethod === p.id ? "border-[#D4AF37]" : "border-zinc-800"}`}>
                    <input type="radio" name="payment" checked={paymentMethod === p.id} onChange={() => setPaymentMethod(p.id)} className="mt-1 accent-[#D4AF37]" />
                    <span>
                      <span className="block text-sm font-bold">{p.title} {p.badge && <span className="text-xs bg-[#D4AF37] text-black px-1.5 py-0.5 rounded ml-1">{p.badge}</span>}</span>
                      <span className="block text-xs text-zinc-400 mt-1">{p.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-3">After placing order, our team will confirm payment details on WhatsApp. Your order will be dispatched after payment confirmation. {paymentTerms}.</p>
            </div>

            <button onClick={handlePlaceOrder} className="mt-5 w-full bg-[#D4AF37] text-black py-3.5 rounded text-sm font-bold uppercase hover:bg-[#E8C15A]">
              Place Order →
            </button>
            <Link href="/cart" className="block text-center mt-3 text-xs underline text-zinc-500">Back to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}