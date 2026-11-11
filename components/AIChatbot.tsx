"use client";

import { useState, useRef, useEffect } from "react";
import { products } from "@/lib/data/shop";

type Msg = { sender: "user" | "ai"; text: string; image?: string };

// ===== TUMHARA BUSINESS WhatsApp NUMBER =====
const BUSINESS_WHATSAPP = "923030006759"; // +92303 0006759
const WHATSAPP_LINK = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent("Hi KROSSFORD, I want to order leather products.")}`;

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { sender: "ai", text: "Hello! Welcome to KROSSFORD. How can I help you with your leather order today? You can also upload your design photo." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, pendingImage]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPendingImage(reader.result as string);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // LANGUAGE DETECT - 8 Languages
  const detectLanguage = (q: string): string => {
    if (/[ےٹڈڑںھ]/.test(q)) return "ur";
    if (q.includes("مجھے") || q.includes("چاہیے") || q.includes("کتنے") || q.includes("چمڑے")) return "ur";
    if (/[\u0600-\u06FF]/.test(q)) return "ar";
    const lower = q.toLowerCase();
    const hasWord = (w: string) => new RegExp(`\\b${w}\\b`).test(lower);
    if (["ich", "brauche", "stück", "stuck", "leder", "lederjacken", "wieviel", "wie viel", "preis", "bitte", "benötige", "benotige"].some(w => lower.includes(w))) return "de";
    if (["je veux", "j'ai besoin", "besoin", "cuir", "combien", "prix", "s'il vous", "bonjour"].some(w => lower.includes(w))) return "fr";
    if (["necesito", "quiero", "cuero", "precio", "cuanto", "cuánto", "hola"].some(w => lower.includes(w))) return "es";
    if (["voglio", "ho bisogno", "pelle", "prezzo", "quanto", "ciao"].some(w => lower.includes(w))) return "it";
    if (["istiyorum", "lazım", "lazim", "deri", "fiyat", "kaç", "merhaba"].some(w => lower.includes(w))) return "tr";
    const urduWords = ["aap", "mujhe", "chahiye", "kitne", "kya", "kaunsa", "kaisa", "kab", "kahan", "kitna", "hai", "hain", "batao", "samajh", "salam", "assalam", "bhai", "bata", "kro", "karo", "chahye", "maal"];
    if (urduWords.some(w => hasWord(w))) return "ur";
    return "en";
  };

  const getOfflineReply = (q: string): string => {
    const lower = q.toLowerCase();
    const lang = detectLanguage(q);
    const urdu = lang === "ur";
    const arabic = lang === "ar";
    const hasWord = (w: string) => new RegExp(`\\b${w}\\b`).test(lower);
    const hasNumber = /\d+/.test(q);
    const isBulk = hasNumber || lower.includes("bulk") || lower.includes("b2b") || lower.includes("units") || lower.includes("unit") || lower.includes("pieces") || lower.includes("piece") || lower.includes("stück") || lower.includes("stuck") || lower.includes("brauche") || lower.includes("necesito") || lower.includes("veux") || lower.includes("voglio") || lower.includes("istiyorum") || q.includes("أحتاج") || q.includes("احتاج") || hasWord("need") || hasWord("chahiye");

    if (lang === "de") {
      if (isBulk) return `Sehr gerne! ${q} - Großhandelsbestellung ist möglich. Es gibt keine feste Mindestbestellmenge (No Fixed MOQ). Welche Farbe benötigen Sie? Benötigen Sie Logo / Individualisierung? Ein bezahltes Muster ist verfügbar, der Musterpreis wird in Ihrer Bestellung verrechnet. Sollen wir mit einem Muster starten oder soll ich Ihnen ein Großhandelsangebot schicken?`;
      if (lower.includes("preis") || lower.includes("kosten")) {
        const list = products.slice(0, 5).map(p => `${p.name} - $${p.price}`).join("\n");
        return `Unsere Top-Produkte:\n${list}\n\nVersand + Lieferkosten werden separat bestätigt.`;
      }
      if (lower.includes("muster")) return "Ja! Ein bezahltes Muster ist verfügbar. Wenn Sie eine Bestellung aufgeben, wird der Musterpreis in Ihrer Bestellung verrechnet.";
      if (lower.includes("versand") || lower.includes("lieferung") || lower.includes("gesamt")) return "Gesamtpreis = Produktpreis + Versand (Verpackung) + Lieferung (Kurier). Versand- und Lieferkosten werden je nach Ihrem Land bestätigt, sie sind nicht im Produktpreis enthalten. Tracking-Nummer wird nach dem Versand geteilt.";
      return `Hallo! Willkommen bei KROSSFORD. Welches Produkt benötigen Sie? Tasche, Geldbörse, Jacke, Gürtel oder Cap? Möchten Sie ein Einzelstück oder eine Großhandelsbestellung?`;
    }
    if (lang === "fr") {
      if (isBulk) return `Avec plaisir! ${q} - Commande en gros possible. Pas de MOQ fixe. Quelle couleur voulez-vous? Avez-vous besoin d'un Logo / Personnalisation? Échantillon payant disponible, le prix de l'échantillon sera déduit de votre commande. On commence par un échantillon ou je vous envoie un devis gros?`;
      return `Bonjour! Bienvenue chez KROSSFORD. Quel produit voulez-vous? Sac, Portefeuille, Veste, Ceinture ou Casquette? Vous voulez une seule pièce ou une commande en gros?`;
    }
    if (lang === "es") {
      if (isBulk) return `¡Claro que sí! ${q} - Pedido al por mayor disponible. No hay MOQ fijo. ¿Qué color necesitas? ¿Necesitas Logo / Personalización? Muestra pagada disponible, el precio de la muestra se descontará de tu pedido. ¿Empezamos con una muestra o te envío una cotización mayorista?`;
      return `¡Hola! Bienvenido a KROSSFORD. ¿Qué producto necesitas? ¿Bolso, Cartera, Chaqueta, Cinturón o Gorra? ¿Quieres una sola pieza o un pedido al por mayor?`;
    }
    if (lang === "it") {
      if (isBulk) return `Certamente! ${q} - Ordine all'ingrosso disponibile. Nessun MOQ fisso. Quale colore ti serve? Ti serve Logo / Personalizzazione? Campione a pagamento disponibile, il prezzo del campione verrà scalato dal tuo ordine. Iniziamo con un campione o ti mando un preventivo all'ingrosso?`;
      return `Ciao! Benvenuto in KROSSFORD. Quale prodotto ti serve? Borsa, Portafoglio, Giacca, Cintura o Cappello? Vuoi un singolo pezzo o un ordine all'ingrosso?`;
    }
    if (lang === "tr") {
      if (isBulk) return `Tabii ki! ${q} - Toptan sipariş mümkün. Sabit MOQ yok. Hangi renk istiyorsunuz? Logo / Özelleştirme lazım mı? Ücretli numune mevcut, numune fiyatı siparişinizden düşülecek. Numune ile başlayalım mı yoksa toptan fiyat teklifi göndereyim mi?`;
      return `Merhaba! KROSSFORD'a hoş geldiniz. Hangi ürün lazım? Çanta, Cüzdan, Ceket, Kemer veya Şapka? Tek parça mı yoksa toptan sipariş mi istiyorsunuz?`;
    }
    if (arabic) {
      if (q.includes("أحتاج") || q.includes("احتاج") || q.includes("اريد") || q.includes("أريد") || q.includes("قطعة") || q.includes("حقيبة") || hasNumber) {
        return `أهلاً وسهلاً! ${q} - طلب الجملة متوفر. لا يوجد حد أدنى للطلب. ما هو اللون الذي تريده؟ هل تحتاج شعار / تخصيص؟ العينة المدفوعة متوفرة، وسيتم خصم سعر العينة من طلبك. هل نبدأ بالعينة أم أرسل لك عرض سعر الجملة؟`;
      }
      if (q.includes("سعر") || q.includes("السعر") || q.includes("كم")) {
        const list = products.slice(0, 5).map(p => `${p.name} - $${p.price}`).join("\n");
        return `منتجاتنا المميزة:\n${list}\n\nسيتم تأكيد رسوم الشحن والتوصيل بشكل منفصل.`;
      }
      if (q.includes("عينة") || q.includes("نموذج")) return "نعم! العينة المدفوعة متوفرة. إذا قمت بتقديم طلب، سيتم خصم سعر العينة من طلبك.";
      if (q.includes("شحن") || q.includes("توصيل") || q.includes("الإجمالي")) return "السعر الإجمالي = سعر المنتج + الشحن (التغليف) + التوصيل (الكورير). سيتم تأكيد رسوم الشحن والتوصيل حسب بلدك، وهي غير مشمولة في سعر المنتج. سيتم مشاركة رقم التتبع بعد الشحن.";
      return `أهلاً وسهلاً بك في KROSSFORD! كيف يمكنني مساعدتك في طلبك الجلدي؟ هل تريد حقيبة، محفظة، جاكيت، حزام أم قبعة؟ هل تريد قطعة واحدة أم طلب بالجملة؟`;
    }
    if (lang === "ur" && /[\u0600-\u06FF]/.test(q)) {
      if (hasNumber || q.includes("چاہیے") || q.includes("مجھے")) return `بالکل ہو جائے گا! ${q} - B2B بلک آرڈر کے لیے کوئی فکس MOQ نہیں ہے۔ آپ کو کونسا کلر چاہیے؟ لوگو / کسٹمائزیشن چاہیے؟ پیڈ سیمپل دستیاب ہے، سیمپل کی قیمت آپ کے آرڈر میں ایڈجسٹ ہو جائے گی۔ سیمپل سے شروع کریں یا بلک کوٹ دوں؟`;
      return `السلام علیکم! KROSSFORD میں خوش آمدید۔ آپ کو کونسا پروڈکٹ چاہیے؟ بیگ، والٹ، جیکٹ، بیلٹ یا کیپ؟ سنگل پیس چاہیے یا بلک آرڈر؟`;
    }
    if (isBulk) {
      return urdu
        ? `Bilkul ho jayega! ${q} - B2B Bulk Order ke liye No Fixed MOQ hai. Aapko kaunsa Color chahiye aur Logo / Customization chahiye? Paid Sample available hai, order pe sample price adjust ho jayega. Batao, Sample se start karein ya Bulk Quote dun?`
        : `Absolutely! For ${q} - B2B Bulk Order, there is No Fixed MOQ. Which Color do you need and do you need Logo / Customization? Paid Sample is available, sample price will be adjusted in your order. Shall we start with a Sample or should I give you a Bulk Quote?`;
    }
    if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || hasWord("kitne")) {
      const list = products.slice(0, 5).map(p => `${p.name} - $${p.price}`).join("\n");
      return urdu ? `Hamari Top Products:\n${list}\n\nShipment + Delivery charges alag se confirm honge.` : `Our Top Products:\n${list}\n\nShipment + Delivery charges will be confirmed separately.`;
    }
    if (hasWord("hello") || hasWord("hi") || hasWord("hey") || lower.includes("salam") || lower.includes("assalam")) {
      return urdu ? "Hello! Krossford me Welcome. Aapko kaunsa product chahiye? Bag, Wallet, Jacket, Belt ya Cap? B2C single piece chahiye ya B2B bulk?" : "Hello! Welcome to Krossford. Which product are you interested in? Bag, Wallet, Jacket, Belt or Cap? Are you looking for a single piece (B2C) or a bulk order (B2B)?";
    }
    if (lower.includes("b2c") || lower.includes("single")) return urdu ? "B2C - Single Piece: 1. Single Packing, 【entity-DHL¦canonical_name=DHL】 Courier se delivery hogi." : "B2C - Single Piece: Starts from 1 Piece. Single Packing, delivery via 【entity-DHL¦canonical_name=DHL】 Courier.";
    if (lower.includes("sample")) return urdu ? "Ji! Paid Sample available hai. Agar aap order place karte ho to sample price aapke order me adjust kar di jayegi." : "Yes! Paid Sample is available. If you place an order, the sample price will be adjusted in your order.";
    if (lower.includes("shipment") || lower.includes("delivery") || lower.includes("shipping") || lower.includes("total") || lower.includes("courier") || lower.includes("【entity-dhl¦canonical_name=DHL】")) return urdu ? "Total Price = Product Price + Shipment (Packing) + Delivery (Courier). Shipment aur Delivery charges aapke country ke hisaab se confirm honge, wo product price me shamil nahi hain. Tracking number dispatch ke baad share hoga. Handcrafted To Order - Crafting 7-10 Working Days + 【entity-DHL¦canonical_name=DHL】 Express 5-7 Working Days = Total 12-17 Working Days. Ships from Pakistan." : "Total Price = Product Price + Shipment (Packing) + Delivery (Courier). Shipment and Delivery charges will be confirmed according to your country, they are not included in the product price. Tracking number will be shared after dispatch. Handcrafted To Order - Crafting 7-10 Working Days + DHL Express Delivery 5-7 Working Days = Total 12-17 Working Days. Full tracking. Ships from Pakistan.";
    if (lower.includes("custom") || lower.includes("engrav") || lower.includes("logo") || lower.includes("design") || lower.includes("photo") || lower.includes("image") || lower.includes("cap") || lower.includes("glove")) return urdu ? `Shukriya! Aapka design mil gaya ✅ ${q} ke liye Custom Name / Engraving aur Logo ho sakta hai. Is pe extra charges lagenge jo order confirm hone pe bataye jayenge. Aap is design ko WhatsApp pe bhi bhej sakte ho.` : `Thanks for your design! ✅ For ${q}, Custom Name / Engraving and Logo is available. Extra charges will apply for customization and will be confirmed when your order is confirmed. You can also send this design on WhatsApp.`;
    if (lower.includes("payment") || lower.includes("pay")) return urdu ? "Payment order confirm hone pe WhatsApp pe discuss hogi. Secure & Protected Payments hain." : "Payment will be discussed on WhatsApp after your order is confirmed. Secure & Protected Payments.";
    const found = products.find(p => lower.includes(p.name.toLowerCase().split(" ")[0]));
    if (found) return urdu ? `${found.name} - $${found.price} - ${found.description || found.category}. Colour select karke Add To Cart kar sakte ho.` : `${found.name} - $${found.price} - ${found.description || found.category}. Please select colour and Add To Cart.`;
    return urdu ? "Aapka sawal samajh aa gaya. Aap Shop page se product select karke Checkout kar sakte ho, ya WhatsApp pe order kar sakte ho. Kya aapko Price, B2B, Sample ya Shipment ke baare me jaanna hai?" : "Got it. You can select a product from the Shop page and Checkout, or order on WhatsApp. Would you like to know about Price, B2B, Sample or Shipment?";
  };

  const handleSend = async () => {
    if (!input.trim() && !pendingImage) return;
    const userMsg: Msg = { sender: "user", text: input.trim() || "Here is my design photo.", image: pendingImage || undefined };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setPendingImage(null);
    setLoading(true);
    try {
      const userLanguage = navigator.language || "en";
      const userCountry = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: newMessages, userLanguage, userCountry }) });
      const data = await res.json();
      if (!data.reply || data.reply.includes("Sorry, please try again")) {
        setMessages([...newMessages, { sender: "ai", text: getOfflineReply(userMsg.text) }]);
      } else {
        setMessages([...newMessages, { sender: "ai", text: data.reply }]);
      }
    } catch (e) {
      setMessages([...newMessages, { sender: "ai", text: getOfflineReply(userMsg.text) }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendToWhatsApp = () => {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === "user")?.text || "I want to order leather products";
    const text = `Hi KROSSFORD, I want to order:\n${lastUserMsg}\n\nPlease send me Bulk Quote / Sample details.`;
    window.open(`https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      {/* ===== FLOATING BUTTONS - RIGHT MIDDLE, NOT BOTTOM ===== */}
      {!isOpen && (
        <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-white" title="Chat on WhatsApp - +92303 0006759">
            💬
          </a>
          <button onClick={() => setIsOpen(true)} className="bg-black text-white px-3 py-2 rounded-full shadow-lg text-xs font-bold border border-zinc-700">
            💬 Ask Krossford AI
          </button>
        </div>
      )}
      {isOpen && (
        <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 w- max-w-[calc(100vw-24px)] h- max-h- bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border">
          <div className="bg-black text-white p-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold">KROSSFORD AI Assistant</p>
              <p className="text-xs text-zinc-400">Online • Replies in your language • WhatsApp +92303 0006759</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl leading-none px-2">×</button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-zinc-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-line ${m.sender === "user" ? "bg-black text-white" : "bg-white border text-black"}`}>
                  {m.image && <img src={m.image} alt="design" className="w-full rounded mb-1" />}
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-zinc-500">Krossford Team is typing...</p>}
            <div className="flex flex-col gap-2 pt-1">
              <button onClick={sendToWhatsApp} className="w-full bg-green-500 text-white py-2 rounded-full text-sm font-bold shadow">
                💬 Continue on WhatsApp - +92303 0006759
              </button>
              <p className="text-xs text-center text-zinc-500">Click karke apna order seedha WhatsApp pe bhejo</p>
            </div>
            <div ref={bottomRef} />
          </div>
          {pendingImage && (
            <div className="p-2 bg-zinc-100 border-t relative">
              <div className="relative inline-block">
                <img src={pendingImage} alt="preview" className="w-20 h-20 object-cover rounded-lg border" />
                <button onClick={() => setPendingImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">×</button>
              </div>
              <p className="text-xs text-zinc-500 mt-1">Image ready ✅ Now write text below and press Send</p>
            </div>
          )}
          <div className="p-2 border-t flex gap-2 items-center bg-white">
            <button onClick={() => fileRef.current?.click()} className="text-lg px-1 shrink-0" title="Upload design photo">📷</button>
            <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleImageSelect} />
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }} placeholder="Type in any language..." autoFocus className="flex-1 border rounded-full px-3 py-2 text-sm outline-none bg-white text-black min-w-0" />
            <button onClick={handleSend} className="bg-black text-white px-3 py-2 rounded-full text-sm font-bold shrink-0">➤</button>
          </div>
        </div>
      )}
    </>
  );
}