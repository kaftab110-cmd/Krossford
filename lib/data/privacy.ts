// lib/data/privacy.ts - FINAL - ONE TIME ALL FIXES
// 1. Date update - October 30, 2025 se November 12, 2026 kiya
// 2. Cookies wali galat line HATA di - Pehle likha tha "cookies only to remember your cart" - Asal me Cart / Wishlist cookies se nahi, browser localStorage (krossford_cart + krossford_wishlist) se chalta hai - Ab sahi likh diya
// 3. Bullets saaf kiye - Pehle bullets paragraphs ke andar "•" se likhe the, is liye page pe list sahi nahi banti thi - Ab bullets alag array me hain
// 4. DHL + Hosting saaf likh diya - Order deliver karne ke liye DHL ko naam / address / phone jata hai, site Vercel pe host hai
// 5. Payment list same rakhi - VISA / MASTERCARD / WESTERN UNION / BANK TRANSFER - Koi PayPal / Stripe nahi
// 6. Tone same rakha - "Your Trust Is Our Craft" wala style rakha hua hai, legal wali boring language nahi ki

export const privacyContent = {
  title: "Privacy Policy",
  lastUpdated: "November 12, 2026",
  sections: [
    {
      heading: "Your Trust Is Our Craft.",
      paragraphs: [
        "At KROSSFORD, we handcraft leather goods that last for years. We treat your privacy the same way - with care, honesty, and respect.",
        "This policy is simple: We collect only what we need to deliver your order perfectly. Nothing more. We never sell your data. Never.",
      ],
    },
    {
      heading: "1. What We Collect - And Why",
      paragraphs: [
        "We only ask for what is needed to serve you:",
      ],
      bullets: [
        "Your Name & Contact - So we can confirm your order and update you on WhatsApp / Email.",
        "Your Shipping Address - So your bag reaches you safely, anywhere in the world.",
        "Your Order Details - Including your custom engraving or logo, so we make exactly what you asked for.",
        "For wholesale buyers, this may also include Company Name and business contact details for quotation and invoicing.",
      ],
    },
    {
      heading: "2. Your Payment Is Always Safe",
      paragraphs: [
        "When you pay, your payment details go directly to your chosen payment provider - VISA, MASTERCARD, WESTERN UNION, or BANK TRANSFER.",
        "We never see, store, or save your card number, CVV, or bank details. Your money is protected by bank-level security.",
        "For our B2B partners, we follow a fair and transparent system: 50% Advance to start production, 50% Before Dispatch. You always know where your money is. Retail orders are 100% advance payment.",
      ],
    },
    {
      heading: "3. We Never Sell Your Data",
      paragraphs: [
        "This is our promise, in writing.",
        "Your information is shared ONLY with the people who need it to deliver your order - like DHL Express for shipping, and your payment provider for payment. No one else. Not for ads. Not for money. Never.",
        "Your custom logo designs and personal engravings are 100% yours. We will never reuse or share them without your permission.",
      ],
    },
    {
      heading: "4. You Are In Control",
      paragraphs: [
        "You own your data. You can at any time:",
      ],
      bullets: [
        "Ask us what information we have about you.",
        "Ask us to correct it or delete it.",
        "Ask us to stop contacting you.",
      ],
    },
    {
      heading: "5. A Small Note On Cart, Wishlist & Cookies",
      paragraphs: [
        "Your Cart and Wishlist are saved in your own browser using local storage (krossford_cart and krossford_wishlist) - not cookies - so your cart does not disappear when you change pages. This stays on your device.",
        "We do not use analytics trackers or a cookie-consent banner in our own code. You can clear your Cart and Wishlist anytime by clearing your browser storage / site data.",
        "Our site is hosted on Vercel. Hosting infrastructure may process technical information like IP address and browser information as part of standard web delivery.",
      ],
    },
    {
      heading: "Our Commitment",
      paragraphs: [
        "100% Genuine Leather - Hide As Confirmed In Writing (Cow / Buffalo / Sheep / Goat / Camel) | Sample Before Bulk | Custom Logo Available",
        "If you ever feel your privacy was not respected, tell us directly. We will fix it. Because for KROSSFORD, a customer / buyer is not an order number - you are part of our story.",
        "Questions? hello@krossford.com - A real person will reply within 48 hours, not a robot.",
      ],
    },
  ],
};
