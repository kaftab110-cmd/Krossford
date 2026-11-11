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
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerType, setCustomerType] = useState<"B2C" | "B2B">("B2C");
  const [additionalOption, setAdditionalOption] = useState("none");
  const [customText, setCustomText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [customMadeEnabled, setCustomMadeEnabled] = useState(false);
  const [customMadeType, setCustomMadeType] = useState("");
  const [customMadeDetail, setCustomMadeDetail] = useState("");
  const [customMadeFile, setCustomMadeFile] = useState<File | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const markFailed = (src: string) => {
    setFailedImages((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  const [hoverId, setHoverId] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState(0);
  const hoverProduct = hoverId !== null ? products.find((p) => p.id === hoverId) : undefined;
  const hoverImagesRaw = hoverProduct ? [...new Set([hoverProduct.image, ...(hoverProduct.gallery || [])].filter(Boolean))] : [];
  const hoverImages = hoverImagesRaw.filter((img) => !failedImages.has(img));
  const HOVER_SLIDE_DELAY = 1800;

  useEffect(() => {
    if (hoverId === null || hoverImages.length <= 1) return;
    const timer = setInterval(() => {
      setHoverIndex((prev) => (prev + 1) % hoverImages.length);
    }, HOVER_SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [hoverId, hoverImages.length]);

  useEffect(() => {
    try {
      const wl = JSON.parse(localStorage.getItem("krossford_wishlist") || "[]") as any[];
      const found = wl.find((w: any) => String(w.slug) === String(product?.slug || product?.id));
      setIsLiked(!!found);
    } catch { setIsLiked(false); }
    setSelectedColor(product?.colors?.[0] || { name: "Dark Brown", code: "#3E2723", image: product?.image || "" });
    setSelectedDesign(0);
    setQuantity(1);
    setAdditionalOption("none");
    setCustomText("");
    setUploadedFile(null);
    setCustomMadeEnabled(false);
    setCustomMadeType("");
    setCustomMadeDetail("");
    setCustomMadeFile(null);
    setHoverId(null);
    setHoverIndex(0);
    setFailedImages(new Set());
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
          Clear Old Cart &amp; Go To Shop
        </button>
      </div>
    );
  }

  const WHATSAPP_NUMBER = "923030006759";
  const fullGallery: string[] = (product as any).gallery?.length ? (product as any).gallery : [product.image];
  const gallery: string[] = fullGallery.filter((g) => !failedImages.has(g));
  const safeGallery = gallery.length > 0 ? gallery : [product.image];
  const safeDesign = Math.min(selectedDesign, safeGallery.length - 1);
  const mainImage = safeGallery[safeDesign] || selectedColor.image || product.image;
  const finalPrice = product.price;

  const handleSampleRequest = () => {
    const msg = `Hello Krossford! I want a PAID SAMPLE of ${product.name} - Design: Design ${safeDesign + 1}, Color: ${selectedColor.name}, Type: ${customerType === "B2C" ? "Single Piece" : "Bulk Order"}. Please confirm Sample Price + Shipment + Delivery Charges. I understand if I place order, sample price will be adjusted.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleToggleWishlist = () => {
    const existing = JSON.parse(localStorage.getItem("krossford_wishlist") || "[]") as any[];
    const foundIndex = existing.findIndex((it: any) => String(it.slug) === String(product.slug || product.id));
    if (foundIndex > -1) {
      const next = existing.filter((_: any, i: number) => i !== foundIndex);
      localStorage.setItem("krossford_wishlist", JSON.stringify(next));
      setIsLiked(false);
    } else {
      const wishItem = {
        id: `${product.slug || product.id}-design${safeDesign + 1}-${selectedColor.name}-wishlist`,
        slug: product.slug || product.id,
        name: product.name,
        category: product.category,
        price: finalPrice,
        image: mainImage,
        leather: product.description,
        quantity: quantity,
        colorName: selectedColor.name,
        colorCode: selectedColor.code,
        design: `Design ${safeDesign + 1}`,
        customerType: customerType,
        additionalOption: additionalOption,
        customText: customText,
        uploadedFileName: uploadedFile ? uploadedFile.name : "",
        customMade: customMadeEnabled ? { enabled: true, type: customMadeType, detail: customMadeDetail, fileName: customMadeFile ? customMadeFile.name : "" } : { enabled: false },
        savedAt: Date.now(),
      };
      localStorage.setItem("krossford_wishlist", JSON.stringify([...existing, wishItem]));
      setIsLiked(true);
    }
    window.dispatchEvent(new Event("wishlistUpdated"));
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
    if (customMadeEnabled && !customMadeType) {
      alert("Please select - Customer kya customize karwana chahta hai?");
      return;
    }
    if (customMadeEnabled && !customMadeDetail.trim() && !customMadeFile) {
      alert("Please apna design detail likhein ya apni image upload karein");
      return;
    }
    const cartItem = {
      id: `${product.slug || product.id}-design${safeDesign + 1}-${selectedColor.name}-${additionalOption}-${customText}`,
      addedAt: Date.now(),
      slug: product.slug || product.id,
      name: product.name,
      category: product.category,
      price: finalPrice,
      image: mainImage,
      leather: product.description,
      quantity: quantity,
      colorName: selectedColor.name,
      colorCode: selectedColor.code,
      design: `Design ${safeDesign + 1}`,
      customerType: customerType,
      additionalOption: additionalOption,
      customText: customText,
      uploadedFileName: uploadedFile ? uploadedFile.name : "",
      customMade: customMadeEnabled ? { enabled: true, type: customMadeType, detail: customMadeDetail, fileName: customMadeFile ? customMadeFile.name : "" } : { enabled: false },
      extraChargesNote: customMadeEnabled || additionalOption !== "none"
        ? "Extra charges apply for customization - final price will be confirmed after order confirmation."
        : "",
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

  const sameCategory = [...products]
    .filter((p) => p.id !== product.id && p.category === product.category)
    .sort((a, b) => Number(a.price) - Number(b.price));
  const otherCategory = [...products]
    .filter((p) => p.id !== product.id && p.category !== product.category)
    .sort((a, b) => Number(a.price) - Number(b.price));
  const related = [...sameCategory, ...otherCategory].slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-amber-400">Home</Link> / <Link href="/shop" className="hover:text-amber-400">Shop</Link> / <span className="text-amber-400 font-semibold">{product.name}</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <div className="min-w-0">
            <img src={mainImage} alt={product.name} onError={() => markFailed(mainImage)} className="w-full h-auto object-cover rounded-lg border border-zinc-800" />
            <p className="text-xs text-zinc-400 mt-2">{product.description}</p>
            {safeGallery.length > 1 && (
              <div className="mt-5">
                <p className="text-sm font-bold">SELECT DESIGN: Design {safeDesign + 1}</p>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {safeGallery.map((g, i) => (
                    <button key={g} onClick={() => setSelectedDesign(i)} title={`Design ${i + 1}`}
                      className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${safeDesign === i ? "ring-2 ring-amber-400" : "ring-1 ring-zinc-700"}`}>
                      <img src={g} alt={`Design ${i + 1}`} onError={() => markFailed(g)} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">✓ 100% Real Leather</span>
              <span className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">✓ Handicraft</span>
              <span className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">✓ Sample Before Bulk</span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs tracking-widest text-amber-400 uppercase">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl font-bold uppercase mt-2 break-words">{product.name}</h1>
            <p className="text-xl font-bold mt-2 text-amber-400">${finalPrice} <span className="text-xs font-normal text-zinc-400">• Total: ${finalPrice * quantity} for {quantity} {quantity > 1 ? "pcs" : "pc"}</span></p>
            <p className="text-xs text-zinc-400 mt-1">Selected: Design {safeDesign + 1} • Colour: {selectedColor.name}</p>
            {product.badge && <span className="inline-block mt-2 bg-zinc-900 border border-amber-400/30 text-amber-400 text-xs px-2 py-1 uppercase">{product.badge}</span>}

            <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-lg p-4 sm:p-5 w-full overflow-hidden">
              <p className="text-xs font-bold tracking-widest uppercase text-zinc-200">Order Type - International Only</p>
              <div className="flex flex-col gap-2 mt-3 w-full">
                <button onClick={() => setCustomerType("B2C")} className={`p-3 rounded border text-left w-full ${customerType === "B2C" ? "border-amber-400 bg-zinc-900" : "border-zinc-800 bg-black"}`}>
                  <span className="text-xs font-bold block">Single Piece</span>
                </button>
                <button onClick={() => setCustomerType("B2B")} className={`p-3 rounded border text-left w-full ${customerType === "B2B" ? "border-amber-400 bg-zinc-900" : "border-zinc-800 bg-black"}`}>
                  <span className="text-xs font-bold block">Bulk Order</span>
                </button>
              </div>
              {customerType === "B2C" ? (
                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-1">
                  <p className="text-xs font-bold text-white">Simple Order</p>
                  <p className="text-xs text-zinc-300">Simple Order - 1</p>
                  <p className="text-xs text-zinc-400">Just Select Your Piece And Checkout.</p>
                  <p className="text-xs text-zinc-400">Shipment (Packing): <span className="text-amber-400 font-bold">To Be Confirmed</span> (Single Packing)</p>
                  <p className="text-xs text-zinc-400">Delivery (Courier): <span className="text-amber-400 font-bold">To Be Confirmed</span> (Courier)</p>
                  <p className="text-xs text-zinc-300 mt-2">Handcrafted To Order - No Ready-Made Stock. Crafting 7-10 Working Days + Pakistan.</p>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-1">
                  <p className="text-xs text-zinc-300"><b className="text-white">Minimum Quantity:</b> Jacket 50 Pcs • Biker Suit 25 Sets • Small Items (Card Holder / Keychain / Wallet) 100 Pcs</p>
                  <p className="text-xs text-zinc-300"><b className="text-white">Shipment (Packing):</b> <span className="text-amber-400 font-bold">To Be Confirmed</span> (Bulk Pallet Packing)</p>
                  <p className="text-xs text-zinc-300"><b className="text-white">Delivery (Courier / Freight):</b> <span className="text-amber-400 font-bold">To Be Confirmed</span> (Freight Insured)</p>
                  <p className="text-xs text-zinc-400">Delivery Schedule Will Be Confirmed After Order. Tracking Number Will Be Shared After Dispatch.</p>
                  <p className="text-xs text-zinc-300 mt-1">Handcrafted To Order - No Ready-Made Stock. Ships from Pakistan. Single Piece Total 12-17 Working Days (Crafting 7-10 + DHL Express 5-7).</p>
                  <Link href="/b2b" className="inline-block mt-2 text-xs font-bold underline text-amber-400 hover:text-amber-300">Go To B2B Wholesale Form →</Link>
                  <div className="pt-3 border-t border-zinc-800 mt-3">
                    <p className="text-xs font-bold text-white">Sample Available - Paid Sample</p>
                    <p className="text-xs text-zinc-400 mt-1">Sample Price Will Be Paid By Buyer. Charges To Be Confirmed.</p>
                    <p className="text-xs text-green-400 font-medium mt-1">If You Place Order, Sample Price Will Be Adjusted In Your Order.</p>
                    <button onClick={handleSampleRequest} className="mt-3 w-full border border-amber-400 text-amber-400 text-xs uppercase font-bold py-2.5 rounded hover:bg-amber-400 hover:text-black transition-all">
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
                    style={{ background: c.code, width: 32, height: 32, borderRadius: "50%", border: selectedColor.name === c.name ? "3px solid #fbbf24" : "1px solid #3f3f46", cursor: "pointer" }} />
                ))}
              </div>
            </div>

            <div className="mt-6 bg-zinc-950 border border-zinc-800 rounded-lg p-4 sm:p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-zinc-200">Additional Options</p>
              <p className="text-xs text-amber-400 font-medium mt-1">Extra charges apply for customization - final price will be confirmed after order confirmation.</p>
              <div className="mt-4 space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "none"} onChange={() => setAdditionalOption("none")} className="mt-1 w-4 h-4 accent-amber-400 shrink-0" />
                  <span className="flex-1 min-w-0"><span className="block text-sm font-medium">No Additional Option</span><span className="text-xs text-zinc-400">Simple order without customization</span></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "engraving"} onChange={() => setAdditionalOption("engraving")} className="mt-1 w-4 h-4 accent-amber-400 shrink-0" />
                  <span className="flex-1 min-w-0"><span className="flex justify-between items-start gap-2 flex-wrap"><span className="block text-sm font-medium">Custom Name / Initials (Text Engraving)</span><span className="text-xs bg-amber-400/20 border border-amber-400/30 text-amber-400 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span></span><span className="text-xs text-zinc-400">Your name will be engraved</span></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "image"} onChange={() => setAdditionalOption("image")} className="mt-1 w-4 h-4 accent-amber-400 shrink-0" />
                  <span className="flex-1 min-w-0"><span className="flex justify-between items-start gap-2 flex-wrap"><span className="block text-sm font-medium">Upload Your Own Image</span><span className="text-xs bg-amber-400/20 border border-amber-400/30 text-amber-400 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span></span><span className="text-xs text-zinc-400">Upload your logo / design</span></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="radio" name="additional" checked={additionalOption === "both"} onChange={() => setAdditionalOption("both")} className="mt-1 w-4 h-4 accent-amber-400 shrink-0" />
                  <span className="flex-1 min-w-0"><span className="flex justify-between items-start gap-2 flex-wrap"><span className="block text-sm font-medium">Custom Text + Upload Image</span><span className="text-xs bg-amber-400/20 border border-amber-400/30 text-amber-400 px-2 py-0.5 rounded-full font-bold whitespace-nowrap">+ Extra Charges</span></span><span className="text-xs text-zinc-400">Both text and image</span></span>
                </label>
                {additionalOption !== "none" && (
                  <button onClick={() => { setAdditionalOption("none"); setCustomText(""); setUploadedFile(null); }} className="text-xs underline text-zinc-400">Clear Selection</button>
                )}
              </div>
              {(additionalOption === "engraving" || additionalOption === "both") && (
                <div className="mt-4 bg-black border border-amber-400/30 rounded-md p-3">
                  <label className="text-xs font-bold uppercase text-zinc-400">Enter Your Name / Initials *</label>
                  <input type="text" value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="e.g. A. Khan / AK" maxLength={20} className="mt-1 w-full border border-zinc-700 rounded-md px-3 py-2.5 text-sm outline-none focus:border-amber-400 bg-zinc-950 text-white" />
                  <p className="text-xs text-zinc-400 mt-1">{customText.length} / 20 - Ye naam product pe engrave hoga</p>
                </div>
              )}
              {(additionalOption === "image" || additionalOption === "both") && (
                <div className="mt-4 bg-black border border-amber-400/30 rounded-md p-3">
                  <label className="text-xs font-bold uppercase text-zinc-400">Upload Your Image / Logo *</label>
                  <label className="mt-1 w-full border-2 border-dashed border-zinc-700 rounded-md px-3 py-5 text-center block cursor-pointer hover:border-amber-400 bg-zinc-950">
                    <span className="text-sm text-zinc-400">{uploadedFile ? `✅ ${uploadedFile.name}` : "Click to Upload Image (JPG / PNG)"}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
              )}
            </div>

            <div className="mt-6 bg-zinc-950 border border-amber-400/30 rounded-lg p-4 sm:p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-zinc-200">Custom Made - Hand Stitched</p>
              <p className="text-xs text-amber-400 font-medium mt-1">On Customer Demand - Extra charges apply, final price will be confirmed after order confirmation.</p>
              <label className="flex items-start gap-3 cursor-pointer mt-4">
                <input type="checkbox" checked={customMadeEnabled} onChange={(e) => setCustomMadeEnabled(e.target.checked)} className="mt-1 w-4 h-4 accent-amber-400 shrink-0" />
                <span className="flex-1 min-w-0"><span className="block text-sm font-medium">I Want Custom Made Hand Stitched Product</span><span className="text-xs text-zinc-400">Tick karein agar apna design banwana hai</span></span>
              </label>
              {customMadeEnabled && (
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-zinc-400">Customer Kya Customize Karwana Chahta Hai *</p>
                    <div className="mt-2 space-y-2">
                      {[
                        { v: "full", l: "Full Product - Mere Design Pe Banao", d: "Poora product aapke design pe banega" },
                        { v: "stitching", l: "Stitching Only - Hand Stitched Chahiye", d: "Sirf hand stitching hogi, design same rahega" },
                        { v: "design", l: "Design Change", d: "Is product ka design badalna hai" },
                        { v: "size-colour", l: "Size / Colour Change", d: "Size ya colour apne hisaab se" },
                        { v: "logo-name", l: "Logo / Name Add Karna Hai", d: "Logo, naam ya initials add karne hain" },
                      ].map((o) => (
                        <label key={o.v} className="flex items-start gap-3 cursor-pointer">
                          <input type="radio" name="customMadeType" checked={customMadeType === o.v} onChange={() => setCustomMadeType(o.v)} className="mt-1 w-4 h-4 accent-amber-400 shrink-0" />
                          <span className="flex-1 min-w-0"><span className="block text-sm font-medium">{o.l}</span><span className="text-xs text-zinc-400">{o.d}</span></span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-zinc-400">Apna Design / Image Upload Karein</label>
                    <label className="mt-1 w-full border-2 border-dashed border-zinc-700 rounded-md px-3 py-5 text-center block cursor-pointer hover:border-amber-400 bg-black">
                      <span className="text-sm text-zinc-400">{customMadeFile ? `✅ ${customMadeFile.name}` : "Click to Upload Design Image (JPG / PNG)"}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => setCustomMadeFile(e.target.files?.[0] || null)} />
                    </label>
                    <p className="text-xs text-zinc-400 mt-1">Apna design, photo ya reference image yahan lagayein</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-zinc-400">Detail Likhein *</label>
                    <textarea value={customMadeDetail} onChange={(e) => setCustomMadeDetail(e.target.value)} placeholder="e.g. Mujhe is wallet pe hand stitching chahiye, thread colour black ho, mera naam A. Khan likha ho..." maxLength={500} rows={4} className="mt-1 w-full border border-zinc-700 rounded-md px-3 py-2.5 text-sm outline-none focus:border-amber-400 bg-black text-white" />
                    <p className="text-xs text-zinc-400 mt-1">{customMadeDetail.length} / 500 - Apna design detail yahan likhein</p>
                  </div>
                  <div className="bg-black border border-amber-400/30 rounded-md p-3">
                    <p className="text-xs text-amber-400 font-medium">Extra charges apply for customization - final price will be confirmed after order confirmation.</p>
                  </div>
                  <button onClick={() => { setCustomMadeEnabled(false); setCustomMadeType(""); setCustomMadeDetail(""); setCustomMadeFile(null); }} className="text-xs underline text-zinc-400">Clear Custom Made Selection</button>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3 items-center flex-wrap">
              <div className="flex items-center border border-zinc-700 rounded-md shrink-0 bg-zinc-950">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-white hover:text-amber-400">-</button>
                <span className="px-2 font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-white hover:text-amber-400">+</button>
              </div>
              <button onClick={handleAddToCart} className="flex-1 min-w-0 bg-amber-400 text-black py-3 px-3 rounded-md text-sm font-bold uppercase hover:bg-amber-300">
                Add To Cart - {selectedColor.name} • Design {safeDesign + 1} • ${finalPrice * quantity}
              </button>
            </div>
            <button onClick={handleToggleWishlist} className="mt-4 w-full border border-amber-400 text-amber-400 text-xs uppercase font-bold py-3 rounded hover:bg-amber-400 hover:text-black transition-all">
              {isLiked ? "♥ Saved in Wishlist" : "♡ Add to Wishlist"}
            </button>
            <Link href="/shop" className="block text-center mt-3 text-xs underline text-zinc-400 hover:text-amber-400">Continue Shopping</Link>
          </div>
        </div>

        <div className="mt-14 border-t border-zinc-800 pt-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-white">You May Also Like</h2>
          <p className="text-xs text-zinc-400 mt-1">{related.length > 0 ? `$${related[0].price} - $${related[related.length - 1].price}` : ""}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
            {related.map((p) => {
              const cardImagesRaw = [...new Set([p.image, ...(p.gallery || [])].filter(Boolean))];
              const cardImages = cardImagesRaw.filter((img) => !failedImages.has(img));
              const safeCardImages = cardImages.length > 0 ? cardImages : [p.image];
              const isHovering = hoverId === p.id;
              const currentImage = isHovering && safeCardImages.length > 1 ? safeCardImages[hoverIndex % safeCardImages.length] : p.image;
              return (
              <Link key={p.id} href={`/product/${p.slug}`} className="border border-zinc-800 bg-zinc-950 rounded-lg overflow-hidden group hover:border-amber-400 transition-colors">
                <div
                  className="relative h-48 bg-zinc-900 overflow-hidden"
                  onMouseEnter={() => { setHoverId(p.id); setHoverIndex(0); }}
                  onMouseLeave={() => { setHoverId(null); setHoverIndex(0); }}
                  onTouchStart={() => { setHoverId(p.id); setHoverIndex(0); }}
                  onTouchEnd={() => { setTimeout(() => { setHoverId(null); setHoverIndex(0); }, 6000); }}
                >
                  <img src={currentImage} alt={p.name} onError={() => markFailed(currentImage)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {isHovering && safeCardImages.length > 1 && (
                    <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">{(hoverIndex % safeCardImages.length) + 1} / {safeCardImages.length}</span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-amber-400 uppercase tracking-widest">{p.category}</p>
                  <h3 className="text-sm font-semibold uppercase mt-1 text-white">{p.name}</h3>
                  <p className="text-sm font-bold mt-1 text-amber-400">${p.price}</p>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}