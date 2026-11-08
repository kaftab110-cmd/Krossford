"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products, type ProductColor } from "@/lib/data/shop";

const normalize = (s: string | number | null | undefined): string =>
  String(s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function ProductPage() {
  const params = useParams();
  const rawSlug = params.slug as string;
  const slug = decodeURIComponent(rawSlug || "").trim();

  const product = products.find((p) => {
    const target = normalize(slug);
    const candidates: (string | number)[] = [p.slug, p.id, p.name, ...(p.aliases || [])];
    return candidates.some((c) => normalize(c) === target);
  });

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    product?.colors?.[0] || { name: "Dark Brown", code: "#3E2723", image: product?.image || "" }
  );
  // NEW - DESIGN SELECTION - Price Is Se Nahi Badlegi!
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerType, setCustomerType] = useState<"B2C" | "B2B">("B2C");
  const [additionalOption, setAdditionalOption] = useState("none");
  const [customText, setCustomText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // FIX: Product badle to Color / Design / Quantity reset ho
  useEffect(() => {
    setSelectedColor(product?.colors?.[0] || { name: "Dark Brown", code: "#3E2723", image: product?.image || "" });
    setSelectedDesign(0);
    setQuantity(1);
    setAdditionalOption("none");
    setCustomText("");
    setUploadedFile(null);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4 p-6 text-center">
        <p className="text-xl font-bold">Product not found</p>
        <p className="text-xs text-zinc-400">Slug: {slug}</p>
        <Link href="/shop" className="bg-amber-400 text-black px-5 py-2 rounded text-xs font-bold">Back to Shop</Link>
        <button
          onClick={() => { localStorage.removeItem("krossford_cart"); localStorage.removeItem("cart"); window.location.href = "/shop"; }}
          className="border border-zinc-600 px-5 py-2 rounded text-xs"
        >
          Clear Old Cart & Go To Shop
        </button>
      </div>
    );
  }

  const WHATSAPP_NUMBER = "923030006759";

  // Gallery - Agar shop.ts me gallery nahi hai to image hi use hogi - Error nahi aayega!
  const gallery: string[] = (product as any).gallery?.length ? (product as any).gallery : [product.image];
  const mainImage = gallery[selectedDesign] || selectedColor.image || product.image;

  // PRICE FIXED HAI - Design / Colour Se Nahi Badlegi!
  const finalPrice = product.price;

  const handleSampleRequest = () => {
    const msg = `Hello Krossford! I want a PAID SAMPLE of ${product.name} - Design: Design ${selectedDesign + 1}, Color: ${selectedColor.name}, Type: ${customerType}. Please confirm Sample Price + Shipment + Delivery Charges. I understand if I place order, sample price will be adjusted.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleAddToCart = () => {
    if ((additionalOption === "engraving" || additionalOption === "both") && !customText.trim()) {
      alert("Please enter your Name / Initials for engraving");
      return;
    }
    if ((additionalOption === "image" || additionalOption === "both") && !uploadedFile) {
      alert("Please upload your image");
      return;
    }
    const cartItem = {
      id: `${product.slug || product.id}-design${selectedDesign + 1}-${selectedColor.name}-${additionalOption}-${customText}`,
      slug: product.slug || product.id,
      name: product.name,
      category: product.category,
      price: finalPrice,
      image: mainImage,
      leather: product.description,
      quantity: quantity,
      colorName: selectedColor.name,
      colorCode: selectedColor.code,
      design: `Design ${selectedDesign + 1}`,
      customerType: customerType,
      additionalOption: additionalOption,
      customText: customText,
      uploadedFileName: uploadedFile ? uploadedFile.name : "",
      extraChargesNote: additionalOption !== "none" ? "Extra charges apply - to be confirmed" : "",
      shipmentNote: "Shipment + Delivery Charges To Be Confirmed After Destination Check",
    };
    const existing = JSON.parse(localStorage.getItem("krossford_cart") || "[]") as typeof cartItem[];
    const foundIndex = existing.findIndex((it) => it.id === cartItem.id);
    if (foundIndex > -1) {
      existing[foundIndex].quantity = Number(existing[foundIndex].quantity || 1) + Number(quantity);
    } else {
      existing.push(cartItem);
    }
    localStorage.setItem("krossford_cart", JSON.stringify(existing));
    localStorage.setItem("cart", JSON.stringify(existing));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("storage"));
    window.location.href = "/cart";
  };

  // Related - Pehle Same Category, Phir Baaki - LOW TO HIGH SORTED: $29 -> $39 -> $49...
  const related = [...products]
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const aSame = a.category === product.category ? 0 : 1;
      const bSame = b.category === product.category ? 0 : 1;
      if (aSame !== bSame) return aSame - bSame;
      return a.price - b.price;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-6 md:p-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-[11px] text-zinc-500 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-black">Home</Link> / <Link href="/shop" className="hover:text-black">Shop</Link> / <span className="text-black font-semibold">{product.name}</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <div className="min-w-0">
            <img src={mainImage} alt={product.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg" />
            <p className="text-xs text-zinc-500 mt-2">{product.description}</p>

            {/* NEW - DESIGN SELECTION - YAHAN SE DESIGN BADLEGA, PRICE NAHI! */}
            {gallery.length > 1 && (
              <div className="mt-5">
                <p className="text-sm font-bold">SELECT DESIGN: Design {selectedDesign + 1} <span className="text-[11px] font-normal text-zinc-500">• Price Same Rahegi - ${finalPrice}</span></p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {gallery.map((g, i) => (
                    <button key={i} onClick={() => setSelectedDesign(i)} title={`Design ${i + 1}`}
                      className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${selectedDesign === i ? "ring-[3px] ring-amber-500" : "ring-1 ring-zinc-300"}`}>
                      <img src={g} alt={`Design ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">👆 Kisi Bhi Design Pe Click Karo - Upar Badi Photo Badal Jayegi - Price Wahi Rahegi!</p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full">✓ 100% Real Leather</span>
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full">✓ Hand-Stitched</span>
              <span className="bg-zinc-100 px-3 py-1.5 rounded-full">✓ Sample Before Bulk</span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-[11px] tracking-widest text-amber-600 uppercase">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase mt-2 break-words">{product.name}</h1>
            <p className="text-xl font-bold mt-2">${finalPrice} <span className="text-xs font-normal text-zinc-500">• Total: ${finalPrice * quantity} for {quantity} {quantity > 1 ? "pcs" : "pc"}</span></p>
            <p className="text-[11px] text-green-600 font-medium mt-1">✅ Price Fixed Hai - Design / Colour Badalne Se Price Nahi Badlegi! • Selected: Design {selectedDesign + 1} • Colour: {selectedColor.name}</p>
            {product.badge && <span className="inline-block mt-2 bg-black text-amber-400 text-[10px] px-2 py-1 uppercase">{product.badge}</span>}

            <div className="mt-6 bg-zinc-50 border border-zinc-200 rounded-lg p-4 sm:p-5 w-full overflow-hidden">
              <p className="text-xs font-bold tracking-widest uppercase">Order Type - International Only</p>
              <div className="flex flex-col gap-2 mt-3 w-full">
                <button onClick={() => setCustomerType("B2C")} className={`p-3 rounded border text-left w-full ${customerType === "B2C" ? "border-black bg-white" : "border-zinc-200 bg-white/50"}`}>
                  <span className="text-xs font-bold block">B2C - Single Piece</span>
                </button>
                <button onClick={() => setCustomerType("B2B")} className={`p-3 rounded border text-left w-full ${customerType === "B2B" ? "border-black bg-white" : "border-zinc-200 bg-white/50"}`}>
                  <span className="text-xs font-bold block">B2B - Bulk Order</span>
                </button>
              </div>

              {customerType === "B2C" ? (
                <div className="mt-4 pt-4 border-t border-zinc-200 space-y-1">
                  <p className="text-xs font-bold">B2C - Simple Order</p>
                  <p className="text-xs">Simple Order - 1 Piece Se Start</p>
                  <p className="text-[11px] text-zinc-500">Just Select Your Piece And Checkout.</p>
                  <p className="text-[11px] text-zinc-500">Shipment (Packing): <span className="text-amber-600 font-bold">To Be Confirmed</span> (Single Packing)</p>
                  <p className="text-[11px] text-zinc-500">Delivery (Courier): <span className="text-amber-600 font-bold">To Be Confirmed</span> (DHL Courier)</p>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-zinc-200 space-y-1">
                  <p className="text-xs"><b>Minimum Quantity:</b> Jacket 50 Pcs • Biker Suit 25 Sets • Small Items (Card Holder / Keychain / Wallet) 100 Pcs</p>
                  <p className="text-xs"><b>Shipment (Packing):</b> <span className="text-amber-600 font-bold">To Be Confirmed</span> (Bulk Pallet Packing)</p>
                  <p className="text-xs"><b>Delivery (Courier / Freight):</b> <span className="text-amber-600 font-bold">To Be Confirmed</span> (Freight Insured)</p>
                  <p className="text-[11px] text-zinc-500">Delivery Schedule Will Be Confirmed After Order. Tracking Number Will Be Shared After Dispatch.</p>
                  <Link href="/b2b" className="inline-block mt-2 text-xs font-bold underline">Go To B2B Wholesale Form →</Link>
                  <div className="pt-3 border-t border-zinc-200 mt-3">
                    <p className="text-xs font-bold">Sample Available - Paid Sample</p>
                    <p className="text-[11px] text-zinc-500 mt-1">Sample Price Will Be Paid By Buyer. Charges To Be Confirmed.</p>
                    <p className="text-[11px] text-green-600 font-medium mt-1">✅ If You Place Order, Sample Price Will Be Adjusted In Your Order.</p>
                    <button onClick={handleSampleRequest} className="mt-3 w-full border border-black text-black text-xs uppercase font-bold py-2.5 rounded hover:bg-black hover:text-white transition-all">
                      Request Paid Sample →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <p className="text-sm font-bold">SELECT COLOUR: {selectedColor.name}</p>
              <div className="flex gap-3 mt-3 flex-wrap">
                {product.colors?.map((c) => (
                  <button key={c.name} onClick={() => setSelectedColor(c)} title={c.name}
                    style={{ background: c.code, width: 32, height: 32, borderRadius: "50%", border: selectedColor.name === c.name ? "3px solid #f59e0b" : "1px solid #ccc", cursor: "pointer" }} />
                ))}
              </div>
              <p className="text-[11px] text-zinc-500 mt-2">Colour Badalne Se Bhi Price Same Rahegi!</p>
            </div>

            <div className="mt-6 bg-zinc-50 border border-zinc-200 rounded-lg p-4 sm:p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-zinc-800">✦ Additional Options</p>
              <p className="text-[11px] text-amber-600 font-medium mt-1">
                * Customization pe extra charges apply honge - final price order confirm hone pe batayi jayegi.
              </p>
              <div className="mt-4 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "none"} onChange={() => setAdditionalOption("none")} className="mt-1 w-4 h-4 accent-black shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-medium">No Additional Option</span>
                    <span className="text-[11px] text-zinc-500">Simple order without customization</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "engraving"} onChange={() => setAdditionalOption("engraving")} className="mt-1 w-4 h-4 accent-black shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="flex justify-between items-start gap-2 flex-wrap">
                      <span className="block text-sm font-medium">Custom Name / Initials (Text Engraving)</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span>
                    </span>
                    <span className="text-[11px] text-zinc-500">Your name will be engraved</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "image"} onChange={() => setAdditionalOption("image")} className="mt-1 w-4 h-4 accent-black shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="flex justify-between items-start gap-2 flex-wrap">
                      <span className="block text-sm font-medium">Upload Your Own Image</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span>
                    </span>
                    <span className="text-[11px] text-zinc-500">Upload your logo / design</span>
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "both"} onChange={() => setAdditionalOption("both")} className="mt-1 w-4 h-4 accent-black shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="flex justify-between items-start gap-2 flex-wrap">
                      <span className="block text-sm font-medium">Custom Text + Upload Image</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span>
                    </span>
                    <span className="text-[11px] text-zinc-500">Both text and image</span>
                  </span>
                </label>
                {additionalOption !== "none" && (
                  <button onClick={() => { setAdditionalOption("none"); setCustomText(""); setUploadedFile(null); }} className="text-[11px] underline text-zinc-500">✕ Clear Selection</button>
                )}
              </div>
              {(additionalOption === "engraving" || additionalOption === "both") && (
                <div className="mt-4 bg-white border border-black rounded-md p-3">
                  <label className="text-xs font-bold uppercase text-zinc-600">Enter Your Name / Initials *</label>
                  <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="e.g. A. Khan / AK" maxLength={20} className="mt-1 w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-black bg-white" />
                  <p className="text-[11px] text-zinc-400 mt-1">{customText.length} / 20 - Ye naam product pe engrave hoga</p>
                </div>
              )}
              {(additionalOption === "image" || additionalOption === "both") && (
                <div className="mt-4 bg-white border border-black rounded-md p-3">
                  <label className="text-xs font-bold uppercase text-zinc-600">Upload Your Image / Logo *</label>
                  <label className="mt-1 w-full border-2 border-dashed border-zinc-300 rounded-md px-3 py-5 text-center block cursor-pointer hover:border-black bg-white">
                    <span className="text-sm text-zinc-600">{uploadedFile ? `✅ ${uploadedFile.name}` : "📁 Click to Upload Image (JPG / PNG)"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3 items-center flex-wrap">
              <div className="flex items-center border rounded-md shrink-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2">-</button>
                <span className="px-2 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 min-w-[200px] bg-black text-white py-3 px-3 rounded-md text-sm font-bold uppercase hover:bg-zinc-800">
                Add To Cart - {selectedColor.name} • Design {selectedDesign + 1} • ${finalPrice * quantity}
              </button>
            </div>
            <Link href="/shop" className="block text-center mt-3 text-xs underline text-zinc-500">Continue Shopping</Link>
          </div>
        </div>

        {/* YOU MAY ALSO LIKE - LOW TO HIGH */}
        <div className="mt-14 border-t border-zinc-200 pt-8">
          <h2 className="text-lg font-bold uppercase tracking-widest">You May Also Like - Low To High</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            {related.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="border border-zinc-200 rounded-lg overflow-hidden group hover:border-black transition-colors">
                <div className="h-48 bg-zinc-100 overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-amber-600 uppercase tracking-widest">{p.category}</p>
                  <h3 className="text-sm font-semibold uppercase mt-1">{p.name}</h3>
                  <p className="text-sm font-bold mt-1">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}