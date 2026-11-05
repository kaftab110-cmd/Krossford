"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    paymentMethod: "bank",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [finalSubtotal, setFinalSubtotal] = useState(0);

  useEffect(() => {
    const loadCart = () => {
      const saved = localStorage.getItem("krossford_cart");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCartItems(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };
    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);
    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.phone) {
      setErrorMsg("Please fill in all required fields (Name, Email, Address, City, Phone).");
      return;
    }
    if (cartItems.length === 0) {
      setErrorMsg("Your cart is currently empty!");
      return;
    }
    const currentSubtotal = subtotal;
    const randomId = "KF-" + Math.floor(1000 + Math.random() * 9000);
    localStorage.removeItem("krossford_cart");
    localStorage.setItem("krossford_cart", JSON.stringify([]));
    setCartItems([]);
    setOrderId(randomId);
    setFinalSubtotal(currentSubtotal);
    setOrderPlaced(true);
    window.dispatchEvent(new Event("storage"));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleContinueShopping = () => {
    router.push('/shop');
  };

  if (orderPlaced) {
    return (
      <main className="bg-black text-white min-h-screen w-full px-6 py-20 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase border border-amber-400/30 px-3 py-1 rounded">
            Official B2B Purchase Order
          </span>
          <h1 className="text-3xl font-serif tracking-[0.2em] uppercase text-white mt-2">Order Confirmed & Received</h1>
          <p className="text-sm text-zinc-300">
            {formData.paymentMethod === "2checkout" 
              ? "Your 2Checkout invoice link has been generated and dispatched to your email." 
              : "Below are the verified corporate banking details for international SWIFT / IBAN wire transfer."}
          </p>
        </div>

        <div className="bg-zinc-950 p-8 border border-zinc-800 rounded-lg space-y-6 shadow-2xl w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-4 border-b border-zinc-900 pb-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500 uppercase block">Order Reference:</span>
              <span className="text-amber-400 font-bold text-sm">{orderId}</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-500 uppercase block">Total Value:</span>
              <span className="text-amber-400 font-bold text-sm">${finalSubtotal} USD</span>
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <h3 className="text-xs uppercase font-serif tracking-widest text-amber-400">
              {formData.paymentMethod === "2checkout" ? "2Checkout Gateway Order Status" : "Corporate International Wire Transfer (SWIFT)"}
            </h3>
            
            <div className="bg-zinc-900 p-6 rounded border border-zinc-800 text-xs space-y-3 text-zinc-300 font-mono">
              {formData.paymentMethod === "2checkout" ? (
                <>
                  <p>Payment Partner: <span className="text-white font-bold">2Checkout / Verifone Global</span></p>
                  <p>Transaction Status: <span className="text-amber-400 font-bold">Encrypted Checkout Sent</span></p>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mt-2">
                    A secure card payment link has been dispatched to <span className="text-white">{formData.email}</span>. You may pay using Visa, Mastercard, American Express, or Discover.
                  </p>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                    <p>Beneficiary Name: <span className="text-white font-bold block">KROSSFORD ENTERPRISES</span></p>
                    <p>Bank Name: <span className="text-white font-bold block">MCB Bank Limited</span></p>
                    <p>Account IBAN: <span className="text-amber-400 font-bold block">PK35MCB0000123456789012</span></p>
                    <p>SWIFT / BIC Code: <span className="text-amber-400 font-bold block">MUCBPKKAXXX</span></p>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3 mt-2">
                    Kindly forward your bank payment advise / SWIFT receipt to <span className="text-white">hello@krossford.com</span>. Production scheduling begins immediately upon swift verification.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={handleContinueShopping}
            className="font-bold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-[4px] text-black transition-all hover:bg-amber-500 cursor-pointer"
            style={{ backgroundColor: "#C9A227" }}
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen w-full px-6 py-16 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">Enterprise Procurement</span>
          <h1 className="text-3xl font-serif tracking-[0.2em] uppercase text-white mt-1">
            Checkout & Settlement
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[10px] font-mono text-zinc-400">
          <span>🔒 256-BIT ENCRYPTED</span>
          <span>🌐 GLOBAL WIRE ACCEPTED</span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-400 text-xs rounded uppercase tracking-wider font-mono">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-950 p-8 border border-zinc-800 rounded-lg">
          <h2 className="text-sm font-serif tracking-widest uppercase text-amber-400 mb-4">Client & Shipping Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Full Name *</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white text-sm focus:border-amber-400 outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Company / Entity Name</label>
              <input 
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white text-sm focus:border-amber-400 outline-none"
                placeholder="Luxury Goods Ltd."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Corporate Email Address *</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white text-sm focus:border-amber-400 outline-none"
              placeholder="procurement@company.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Delivery Address *</label>
            <input 
              type="text" 
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white text-sm focus:border-amber-400 outline-none"
              placeholder="Street address, Suite, Building"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">City *</label>
              <input 
                type="text" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white text-sm focus:border-amber-400 outline-none"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2">Phone / WhatsApp *</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-zinc-900 border border-zinc-800 rounded p-3 text-white text-sm focus:border-amber-400 outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <h3 className="text-xs font-serif tracking-widest uppercase text-amber-400 mb-2">Preferred Settlement Method</h3>
            
            <label className={`flex items-center justify-between p-4 rounded border cursor-pointer transition-all ${formData.paymentMethod === 'bank' ? 'border-amber-400 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={formData.paymentMethod === 'bank'}
                  onChange={() => setFormData({...formData, paymentMethod: 'bank'})}
                  className="accent-amber-400"
                />
                <div>
                  <span className="text-xs text-white uppercase font-medium block">Direct International Bank Wire Transfer</span>
                  <span className="text-[10px] text-zinc-400 font-mono">SWIFT / IBAN Verified Corporate Account</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-mono font-bold">RECOMMENDED B2B</span>
            </label>

            <label className={`flex items-center justify-between p-4 rounded border cursor-pointer transition-all ${formData.paymentMethod === '2checkout' ? 'border-amber-400 bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50'}`}>
              <div className="flex items-center gap-3">
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  checked={formData.paymentMethod === '2checkout'}
                  onChange={() => setFormData({...formData, paymentMethod: '2checkout'})}
                  className="accent-amber-400"
                />
                <div>
                  <span className="text-xs text-white uppercase font-medium block">2Checkout / Global Credit & Debit Cards</span>
                  <span className="text-[10px] text-zinc-400 font-mono">Visa, Mastercard, Amex, Apple Pay</span>
                </div>
              </div>
              <span className="text-[10px] text-amber-400 font-mono">SECURE GATEWAY</span>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-[4px] text-black cursor-pointer transition-all hover:bg-amber-500"
            style={{ backgroundColor: "#C9A227" }}
          >
            Authorize Purchase Order (${subtotal} USD)
          </button>
        </form>

        <div className="bg-zinc-950 p-8 border border-zinc-800 rounded-lg h-fit space-y-6">
          <h2 className="text-sm font-serif tracking-widest uppercase text-amber-400">Order Manifest</h2>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-xs text-zinc-500">Your order manifest is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div>
                      <h4 className="text-xs uppercase font-semibold text-white">{item.name}</h4>
                      <p className="text-[10px] text-zinc-400">Quantity: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-mono text-amber-400 text-xs">${item.price * (item.quantity || 1)}</span>
                </div>
              ))
            )}
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-2">
            <div className="flex justify-between text-xs text-zinc-400">
              <span>Subtotal</span>
              <span className="font-mono text-white">${subtotal} USD</span>
            </div>
            <div className="flex justify-between text-xs text-zinc-400">
              <span>B2B Freight Insured</span>
              <span className="font-mono text-amber-400">INCLUDED</span>
            </div>
            <div className="flex justify-between text-sm font-mono font-bold pt-2 border-t border-zinc-900">
              <span>Total Payable</span>
              <span className="text-amber-400">${subtotal} USD</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}