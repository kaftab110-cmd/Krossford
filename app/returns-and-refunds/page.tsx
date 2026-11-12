import LegalNav from "@/components/LegalNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | KROSSFORD Enterprises",
  description: "Review the privacy practices, data collection categories, and customer rights for KROSSFORD Enterprises, operating from Punjab, Pakistan.",
};

// PRIVACY POLICY - FINAL - ONE TIME ALL FIXES
// 1. Purani galat lines HATA di - Pehle likha tha ke checkout / storage / payment / logistics kuch nahi hai - Ye galat tha
//    Asal me site pe hai: Cart + Wishlist (localStorage), WhatsApp order, DHL Tracking, VISA / MASTERCARD / WESTERN UNION / BANK TRANSFER
// 2. LocalStorage saaf likh diya - krossford_cart + krossford_wishlist - Sirf browser me rehta hai, hamare server pe account nahi banta
// 3. Payment / Logistics saaf likh diya - Payment ka data hamare paas save nahi hota, bank / Western Union / card provider ke paas hota hai
// 4. Baaki structure same rakha - LegalNav + headings same hain

const privacyContent = {
  title: "Privacy Policy",
  lastUpdated: "November 12, 2026",
  sections: [
    {
      heading: "1. Who We Are and How to Contact Us",
      paragraphs: [
        "KROSSFORD Enterprises operates as a business from Punjab, Pakistan, serving domestic and international B2B and B2C customers.",
        "For any privacy enquiries, questions regarding our data practices, or to exercise your privacy rights, please contact KROSSFORD directly through the website's Contact Us page."
      ]
    },
    {
      heading: "2. Personal Information We May Collect",
      paragraphs: [
        "We collect personal information that users voluntarily enter into enquiry or contact forms, such as names, contact details, and messages. Actual receipt and processing depend on the website's functioning and available communication arrangements.",
        "When you place an order or enquiry through WhatsApp, the details you share on WhatsApp (name, address, order details) are processed to fulfil your order.",
        "Technical request information, such as IP address and browser information, may be processed by hosting infrastructure as part of standard web delivery.",
        "Cart and Wishlist are saved in your own browser using local storage (krossford_cart and krossford_wishlist). This stays on your device. We do not create a customer account for you and we do not keep an order database on our server for this.",
        "We do not collect or store your card numbers, bank passwords, or payment PINs on this website. Payment is completed through your bank, card provider, Western Union, or bank transfer - as per the payment method you choose."
      ]
    },
    {
      heading: "3. How We Use Personal Information",
      paragraphs: [
        "We use personal information for purposes reasonably necessary to operate our business and provide our services, including:"
      ],
      bullets: [
        "Handling enquiries where received and communicating with prospective customers.",
        "Confirming orders, crafting details, delivery address, and dispatch updates on WhatsApp.",
        "Operating the website and troubleshooting technical issues.",
        "Maintaining infrastructure security and supporting basic site functionality.",
        "Meeting applicable legal obligations."
      ]
    },
    {
      heading: "4. Legal Grounds for Processing",
      paragraphs: [
        "Where required by applicable privacy law, appropriate legal grounds will depend on the specific processing activity and the legal framework applicable to the individual. We do not make blanket GDPR or other jurisdiction-specific compliance claims."
      ]
    },
    {
      heading: "5. Cookies and Similar Technologies",
      paragraphs: [
        "We do not use a cookie-consent banner or analytics trackers in our own code. Your Cart and Wishlist use browser local storage (not cookies) so your cart does not disappear when you change pages.",
        "You can clear your Cart and Wishlist anytime by clearing your browser storage / site data. Hosting infrastructure or browser technologies may involve technical mechanisms necessary to deliver the website, subject to the relevant provider's practices."
      ]
    },
    {
      heading: "6. Sharing Personal Information",
      paragraphs: [
        "We share personal information only as reasonably necessary with hosting and infrastructure providers - such as Vercel, the provider used for actual deployment - or when required to meet applicable legal obligations.",
        "For delivery, we share your name, address, phone number, and order details with DHL Express so your parcel can be shipped and tracked. For payment, your payment details go to your chosen payment provider (bank / card provider / Western Union) - not to us.",
        "We do not sell personal information."
      ]
    },
    {
      heading: "7. International Data Transfers",
      paragraphs: [
        "Hosting infrastructure may process or route technical information across jurisdictions depending on network routing. We do not promise specific locations, Standard Contractual Clauses, adequacy decisions, or safeguards that have not been verified, nor do we imply that all customer data is necessarily transferred internationally."
      ]
    },
    {
      heading: "8. Data Retention and Security",
      paragraphs: [
        "Information should be retained only as long as reasonably necessary for its purpose and applicable legal requirements. We do not invent fixed retention periods. WhatsApp chats are kept as per WhatsApp's own system.",
        "We rely on the security measures provided by our hosting infrastructure and take reasonable care when operating the website. However, no method of electronic transmission or storage can be guaranteed to be completely secure."
      ]
    },
    {
      heading: "9. Privacy Rights and Choices",
      paragraphs: [
        "Available privacy rights depend on applicable law and individual circumstances. You may submit privacy requests through our website's Contact Us page.",
        "We do not promise universal rights or unverified response deadlines."
      ]
    },
    {
      heading: "10. Children's Privacy",
      paragraphs: [
        "The website is not intended for children, and KROSSFORD does not knowingly seek to collect children's personal information. If you believe a child has provided personal information through the website, please contact us through the Contact Us page."
      ]
    },
    {
      heading: "11. Changes to This Privacy Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time to reflect operational, legal, or regulatory changes. The revised policy will be posted on this page with the latest revision date."
      ]
    }
  ]
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-gray-300 px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="space-y-4 border-b border-gray-800 pb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#d4af37] tracking-wide">
            {privacyContent.title}
          </h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            Last Updated: {privacyContent.lastUpdated}
          </p>
        </div>

        {/* Legal Navigation Bar */}
        <LegalNav currentSlug="privacy-policy" />

        {/* Policy Content Sections */}
        <div className="space-y-10">
          {privacyContent.sections.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-wide">
                {section.heading}
              </h2>
              <div className="space-y-3 text-sm text-gray-400 leading-relaxed">
                {section.paragraphs.map((p, pIndex) => (
                  <p key={`${section.heading}-p-${pIndex}`}>{p}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc list-inside space-y-1.5 pl-2 pt-1">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={`${section.heading}-bullet-${bIndex}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
