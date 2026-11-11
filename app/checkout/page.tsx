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
  customerType: string;
  additionalOption: string;
  customText: string;
  uploadedFileName: string;
  customMade?: { enabled: boolean; type?: string; detail?: string; fileName?: string };
  extraChargesNote?: string;
};

const CHECKOUT_COUNTRIES = [...new Set([...COUNTRIES, "Other"])];

const PAYMENTS = [
  { id: "Bank Wire Transfer - Bank Alfalah", title: "Bank Wire Transfer - Bank Alfalah", badge: "RECOMMENDED FOR BULK", desc: "Account details will be shared securely on WhatsApp after order confirmation. Never share full bank details publicly." },
  { id: "Wise Transfer", title: "Wise Transfer - Fast & Low Fee", badge: "", desc: "Send via Wise to KROSSFORD ENTERPRISES. Details will be shared on WhatsApp after order confirmation." },
  { id: "|| "";
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
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

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("krossford_cart") || "[]") as CartItem[];
    setCart(saved);
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

  const WHATSAPP_NUMBER = "923030006759";

  const handlePlaceOrder = () => {
    const fullName = `${firstName} ${lastName}`.trim();
    if (!firstName.trim() || !lastName.trim() || !country.trim() || !address.trim() || !city.trim() || !state.trim() || !postalCode.trim() || !phone.trim()) {
      alert("Please fill First Name, Last Name, Country, Address, City, State, Postal Code and Phone");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const itemsText = cart.map((it, i) =>
      `${i + 1}. ${it.name} - Color: ${it.colorName} - Type: ${it.customerType} - Qty: ${it.quantity} - $${it.price} - Custom: ${it.additionalOption}${it.customText ? ` (${it.customText})` : ""}${it.uploadedFileName ? ` - File: ${it.uploadedFileName}` : ""}${it.customMade?.enabled ? ` - CUSTOM MADE HAND STITCHED: ${customMadeLabel(it.customMade.type)}${it.customMade.detail ? ` - Detail: ${it.customMade.detail}` : ""}${it.customMade.fileName ? ` - Design Image: ${it.customMade.fileName}` : ""}` : ""}${it.extraChargesNote ? ` - ${it.extraChargesNote}` : ""}`
    ).join("\n");

    const msg = `Hello Krossford! NEW ORDER\n\nName: ${fullName}\nEmail: ${email}\nCountry: ${country}\nPhone: ${phone}${altPhone ? `\nAlternate / Contact Number: ${altPhone}` : ""}\nAddress: ${address}\nCity: ${city}\nState / Province: ${state}\nPostal / ZIP Code: ${postalCode}\n\nITEMS:\n${itemsText}\n\nTOTAL (Product Only): $${total}\nPayment Method: ${paymentMethod}${paymentTerms ? `\nPayment Terms: ${paymentTerms}` : ""}\nDelivery: | {it.customerType} | Qty: {it.quantity}</p>
                    {it.additionalOption !== "none" && (
                      <p className="text-xs text-amber-400">Custom: {it.additionalOption} {it.customText}</p>
                    )}
                    {it.customMade?.enabled && (
                      <div className="mt-1 bg-amber-400/10 border border-amber-400/40 rounded px-2 py-1">
                        <p className="text- text-amber-400 font-bold">Custom Made - Hand Stitched - On Customer Demand</p>
                        {it.customMade.type && <p className="text- text-zinc-200">Kya Customize: {customMadeLabel(it.customMade.type)}</p>}
                        {it.customMade.detail && <p className="text- text-zinc-300">Detail: {it.customMade.detail}</p>}
                        {it.customMade.fileName && <p className="text- text-zinc-400">Design Image: {it.customMade.fileName}</p>}
                        <p className="text- text-amber-300">Rates design ke mutabiq honge - Final price order confirm hone ke baad batayi jayegi.</p>
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
                  <label key={p.id} className={`flex items-start gap-2 bg-zinc-900 border rounded p-3 cursor-pointer ${paymentMethod === p.id ? "border-amber-400" : "border-zinc-800"}`}>
                    <input type="radio" name="payment" checked={paymentMethod === p.id} onChange={() => setPaymentMethod(p.id)} className="mt-1 accent-amber-400" />
                    <span>
                      <span className="block text-sm font-bold">{p.title} {p.badge && <span className="text- bg-amber-400 text-black px-1.5 py-0.5 rounded ml-1">{p.badge}</span>}</span>
                      <span className="block text-xs text-zinc-400 mt-1">{p.desc}</span>
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-3">After placing order, our team will confirm payment details on WhatsApp. Your order will be dispatched after payment confirmation.{paymentTerms ? ` ${paymentTerms}.` : ""}</p>
            </div>

            <button onClick={handlePlaceOrder} className="mt-5 w-full bg-amber-400 text-black py-3.5 rounded text-sm font-bold uppercase hover:bg-amber-300">
              Place Order on WhatsApp →
            </button>
            <Link href="/cart" className="block text-center mt-3 text-xs underline text-zinc-500">Back to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
}