"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products } from "@/lib/data/shop";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product: any = products.find((p: any) => (p.slug || p.id) === slug);

  const [selectedColor, setSelectedColor] = useState<any>(
    product?.colors?.[0] || { name: "Dark Brown", code: "#3E2723", image: product?.image }
  );
  const [quantity, setQuantity] = useState(1);
  const [additionalOption, setAdditionalOption] = useState("none");
  const [customText, setCustomText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4">
        <p>Product not found</p>
        <Link href="/shop" className="bg-amber-400 text-black px-5 py-2 rounded text-xs font-bold">Back to Shop</Link>
      </div>
    );
  }

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
      id: `${product.slug || product.id}-${selectedColor.name}-${additionalOption}-${customText}`,
      name: product.name,
      category: product.category,
      price: product.price,
      image: selectedColor.image || product.image,
      leather: product.description,
      quantity: quantity,
      colorName: selectedColor.name,
      colorCode: selectedColor.code,
      additionalOption: additionalOption,
      customText: customText,
      uploadedFileName: uploadedFile ? uploadedFile.name : "",
      extraChargesNote: additionalOption !== "none" ? "Extra charges apply - to be confirmed" : "",
    };
    const existing = JSON.parse(localStorage.getItem("krossford_cart") || "[]");
    existing.push(cartItem);
    localStorage.setItem("krossford_cart", JSON.stringify(existing));
    localStorage.setItem("cart", JSON.stringify(existing));
    window.dispatchEvent(new Event("cartUpdated"));
    window.location.href = "/cart";
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <img src={selectedColor.image || product.image} alt={product.name} className="w-full h-[500px] object-cover rounded-lg" />
          <p className="text-xs text-zinc-500 mt-2">{product.description}</p>
        </div>

        <div>
          <p className="text-[11px] tracking-widest text-amber-600 uppercase">{product.category}</p>
          <h1 className="text-3xl font-bold uppercase mt-2">{product.name}</h1>
          <p className="text-xl font-bold mt-2">${product.price}</p>
          {product.badge && <span className="inline-block mt-2 bg-black text-amber-400 text-[10px] px-2 py-1 uppercase">{product.badge}</span>}

          <div className="mt-6">
            <p className="text-sm font-bold">SELECT COLOUR: {selectedColor.name}</p>
            <div className="flex gap-3 mt-3">
              {product.colors?.map((c: any) => (
                <button key={c.name} onClick={() => setSelectedColor(c)} title={c.name}
                  style={{ background: c.code, width: 32, height: 32, borderRadius: "50%", border: selectedColor.name === c.name ? "3px solid #f59e0b" : "1px solid #ccc", cursor: "pointer" }} />
              ))}
            </div>
          </div>

          {/* ADDITIONAL OPTIONS */}
          <div className="mt-6 bg-zinc-50 border border-zinc-200 rounded-lg p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-800">✦ Additional Options</p>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              * Customization pe extra charges apply honge - final price order confirm hone pe batayi jayegi.
            </p>

            <div className="mt-4 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="radio" name="additional" checked={additionalOption === "engraving"} onChange={() => setAdditionalOption("engraving")} className="mt-1 w-4 h-4 accent-black" />
                <span className="flex-1">
                  <span className="flex justify-between items-center gap-2">
                    <span className="block text-sm font-medium">Custom Name / Initials (Text Engraving)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span>
                  </span>
                  <span className="text-[11px] text-zinc-500">Your name will be engraved</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="radio" name="additional" checked={additionalOption === "image"} onChange={() => setAdditionalOption("image")} className="mt-1 w-4 h-4 accent-black" />
                <span className="flex-1">
                  <span className="flex justify-between items-center gap-2">
                    <span className="block text-sm font-medium">Upload Your Own Image</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span>
                  </span>
                  <span className="text-[11px] text-zinc-500">Upload your logo / design</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="radio" name="additional" checked={additionalOption === "both"} onChange={() => setAdditionalOption("both")} className="mt-1 w-4 h-4 accent-black" />
                <span className="flex-1">
                  <span className="flex justify-between items-center gap-2">
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

            {/* FIX: Input boxes ab Detail se PEHLE hain, taake foran dikhen */}
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

            {additionalOption !== "none" && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
                <p className="text-[11px] text-zinc-700 leading-relaxed">
                  <b>Detail:</b> Aapne <b>{additionalOption === "engraving" ? "Text Engraving" : additionalOption === "image" ? "Image Upload" : "Text + Image"}</b> select kiya hai.
                  Is pe <b>extra charges</b> lagenge jo product ki final price me add nahi hain.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex gap-3 items-center">
            <div className="flex items-center border rounded-md">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2">-</button>
              <span className="px-2 font-bold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">+</button>
            </div>
            <button onClick={handleAddToCart} className="flex-1 bg-black text-white py-3 rounded-md text-sm font-bold uppercase hover:bg-zinc-800">
              Add To Cart - {selectedColor.name}
            </button>
          </div>
          <Link href="/shop" className="block text-center mt-3 text-xs underline text-zinc-500">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}