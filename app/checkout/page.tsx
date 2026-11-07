"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
};

const COUNTRIES = ["United States", "United Kingdom", "Germany", "United Arab Emirates", "Canada", "Australia", "France", "Netherlands", "Pakistan", "Other"];

const PAYMENTS = [
  { id: "Bank Wire Transfer - Bank Alfalah", title: "Bank Wire Transfer - Bank Alfalah", badge: "RECOMMENDED FOR BULK", desc: "Account details will be shared securely on WhatsApp after order confirmation. Never share full bank details publicly." },
  { id: "Wise Transfer", title: "Wise Transfer - Fast & Low Fee", badge: "", desc: "Send via Wise to KROSSFORD ENTERPRISES. Details will be shared on WhatsApp after order confirmation." },
  { id: "Western Union", title: "Western Union", badge: "", desc: "Available for international customers. Details will be shared on WhatsApp after order confirmation." },
  { id: "VISA / Mastercard", title: "VISA / Mastercard", badge: "", desc: "Card payment link will be shared on WhatsApp after order confirmation." },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("United States");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Wire Transfer - Bank Alfalah");
  const [orderSent, setOrderSent] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("krossford_cart") || "[]") as CartItem[];
    setCart(saved);
  }, []);

  const total = cart.reduce((sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 1), 0);

  const WHATSAPP_NUMBER = "923030006759";

  const handlePlaceOrder = () => {
    if (!name.trim() || !country.trim() || !address.trim() || !phone.trim()) {
      alert("Please fill Name, Country, Address and Phone");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const itemsText = cart.map((it, i) =>
      `${i + 1}. ${it.name} - Color: ${it.colorName} - Type: ${it.customerType} - Qty: ${it.quantity} - $${it.price} - Custom: ${it.additionalOption}${it.customText ? ` (${it.customText})` : ""}${it.uploadedFileName ? ` - File: ${it.uploadedFileName}` : ""}`
    ).join("\n");

    const msg = `Hello Krossford! NEW ORDER\n\nName: ${name}\nEmail: ${email}\nCountry: ${country}\nPhone: ${phone}\nAddress: ${address}\n\nITEMS:\n${itemsText}\n\nTOTAL (Product Only): $${total}\nPayment Method: ${paymentMethod}\nPayment Terms: 50% Advance - 50% After Order Ready\nShipment + Delivery: To Be Confirmed\nExtra Customization Charges: To Be Confirmed`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");

    localStorage.removeItem("krossford_cart");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
    setOrderSent(true);
  };

  if (orderSent) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4 p-6 text-center font-mono">
        <div className="w-14 h-14 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center text-2xl">✓</div>
        <p className="text-2xl font-bold">Order Sent!</p>
        <p className="text-xs text-zinc-400 max-w-md leading-relaxed">Your order has been opened in WhatsApp. Please press Send there. Our team will confirm Shipment + Payment details in 24 hours. 50% Advance - 50% After Order Ready.</p>
        <Link href="/shop" className="bg-amber-400 text-black px-6 py-3 rounded text-sm font-bold">Continue Shopping</Link>
        <Link href="/b2b" className="text-xs underline text-zinc-400">Need Bulk? Go To B2B →</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center gap-4 p-6 text-center font-mono">
        <p className="text-2xl font-bold">Your cart is empty</p>
        <Link href="/shop" className="bg-amber-400 text-black px-6 py-3 rounded text-sm font-bold">Go To Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* LEFT - FORM */}
        <div>
          <h1 className="text-3xl font-bold uppercase">Checkout</h1>
          <p className="text-xs text-zinc-400 mt-1">Fill details - Your order will be sent via WhatsApp</p>
          <p className="text-[11px] text-amber-400 mt-2 tracking-wide">✓ 100% Real Leather • 50% Advance - 50% After Order Ready • Sample Before Bulk</p>

          <div className="mt-6 space-y-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name *" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-amber-400 placeholder:text-zinc-500 text-white" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-amber-400 placeholder:text-zinc-500 text-white" />
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone / WhatsApp *" className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-amber-400 placeholder:text-zinc-500 text-white" />
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-amber-400 text-white">
              {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full Address *" rows={3} className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-3 text-sm outline-none focus:border-amber-400 placeholder:text-zinc-500 text-white resize-none" />
          </div>

          <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded p-3">
            <p className="text-[11px] text-zinc-400">Shipping & delivery charges, plus any extra customization charges, will be confirmed after your order is confirmed. They are not included in the product price.</p>
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-300">Order Summary</p>
            <div className="mt-4 space-y-4">
              {cart.map((it) => (
                <div key={it.id} className="flex gap-3">
                  <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-bold leading-tight">{it.name}</p>
                    <p className="text-[11px] text-zinc-400">Color: {it.colorName} | {it.customerType} | Qty: {it.quantity}</p>
                    {it.additionalOption !== "none" && (
                      <p className="text-[11px] text-amber-400">Custom: {it.additionalOption} {it.customText}</p>
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
            <p className="text-[11px] text-zinc-500 mt-1">+ Shipment / Delivery - To Be Confirmed</p>

            {/* PAYMENT METHOD - KROSSFORD ENTERPRISES */}
            <div className="mt-5 bg-zinc-950 border border-zinc-800 rounded p-4">
              <p className="text-xs font-bold tracking-widest uppercase text-zinc-300">Payment Method - International Only</p>
              
              <div className="mt-3 space-y-2">
                {PAYMENTS.map((p) => (
                  <label key={p.id} className={`flex items-start gap-2 bg-zinc-900 border rounded p-3 cursor-pointer ${paymentMethod === p.id ? "border-amber-400" : "border-zinc-800"}`}>
                    <input type="radio" name="payment" checked={paymentMethod === p.id} onChange={() => setPaymentMethod(p.id)} className="mt-1 accent-amber-400" />
                    <span>
                      <span className="block text-sm font-bold">{p.title} {p.badge && <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.5 rounded ml-1">{p.badge}</span>}</span>
                      <span className="block text-[11px] text-zinc-400 mt-1">{p.desc}</span>
                    </span>
                  </label>
                ))}
              </div>

              <p className="text-[11px] text-zinc-500 mt-3">After placing order, our team will confirm payment details on WhatsApp. Your order will be dispatched after payment confirmation. 50% Advance - 50% After Order Ready.</p>
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