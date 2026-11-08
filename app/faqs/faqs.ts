export type Faq = {
  question: string;
  answer: string;
};

export const customerFaqs: Faq[] = [
  {
    question: "How do I order as a customer?",
    answer: "Go to Shop, select your product, choose colour, Add to Cart and Checkout. Retail customers order 1 piece at a time. Payment is 100% Advance - VISA, Mastercard, Western Union or Bank Transfer.",
  },
  {
    question: "How much is delivery for a customer?",
    answer: "Delivery is via DHL Express. Processing: 7-10 Days + DHL Delivery: 7-10 Days = Total 18-24 Days. Tracking is provided. We aim to deliver earlier than estimated.",
  },
  {
    question: "Can a customer return or exchange?",
    answer: "Yes. If product is damaged or wrong item received, contact us within 7 days with photos. We will arrange return / exchange or refund for retail customers.",
  },
  {
    question: "Is the leather 100% real?",
    answer: "Yes. 100% Real Leather Guarantee. We use vegetable-tanned full-grain leather. Every piece is handcrafted in Gujrat, Pakistan. Sample Before Bulk is available for wholesale buyers.",
  },
];

export const buyerFaqs: Faq[] = [
  {
    question: "What is MOQ for buyers?",
    answer: "MOQ for wholesale buyers is: Jackets 50+ Units, Biker Suits 25+ Units, Small Items like Wallets / Card Holders / Keychains 100+ Units. For less quantity, please contact us for a Sample Order.",
  },
  {
    question: "How do I order as a buyer?",
    answer: "Go to Wholesale / B2B page, fill the form with Company Name, Quantity, and Design / Logo. We will send Wholesale Quotation within 24 Hours. Do NOT use Cart for bulk orders.",
  },
  {
    question: "What is payment for wholesale buyers?",
    answer: "For wholesale buyers: 50% Advance - 50% Before Dispatch. Payment via Western Union or Bank Transfer / T/T. Sample Before Bulk is available so you can check quality first.",
  },
  {
    question: "Can buyers add Custom Logo / Private Label?",
    answer: "Yes. Custom Logo Available for wholesale buyers. We can engrave / emboss your logo, add your brand label, and do custom packaging. Send your logo on WhatsApp / Email.",
  },
  {
    question: "What is delivery time for bulk orders?",
    answer: "Bulk production time depends on quantity. After sample approval, production is 15-25 days + DHL Delivery 7-10 Days. Tracking is provided for buyers.",
  },
];

export const faqs: Faq[] = [...customerFaqs, ...buyerFaqs];