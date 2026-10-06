/**
 * Vihar Vivaha - Matrimony Event Registration Configuration
 * Brand: Vihar Vivaha ("your comfort our care")
 */
const EVENT_CONFIG = {
  brand: {
    name: "Vihar Vivaha",
    altName: "Vihar Vivaha",
    tagline: "your comfort our care",
    serviceName: "Matrimonial Services",
    fullTitle: "Vihar Vivaha — your comfort our care",
    logoPath: "images/vihari-logo.png",
    address: "#73, 18th Cross, Rajajinagar 1st Block, Bengaluru, Karnataka – 560010",
    phone: "+91 99861 11169",
    displayPhone: "+91 99861 11169",
    whatsapp: "+919986111169",
    email: "hello@viharvivaha.com",
    hours: "10:00 AM – 7:00 PM (Mon – Sat)"
  },
  event: {
    title: "North Karnataka Matrimony Meet & Biodata Sammelana",
    shortBadge: "Exclusive In-Person & Digital Meet",
    subtitle: "A dignified, caring, and culturally rooted matrimonial gathering connecting verified North Karnataka families and eligible brides & grooms.",
    fee: "₹3,000",
    feeAmount: 3000,
    feeNote: "Per Profile Registration (Valid for Meet Entry & Curated Profile Book)",
    date: "Sunday, 26th October 2026",
    time: "10:00 AM – 5:00 PM IST",
    venue: "Hotel Naveen Lakeside Convention Center, Hubballi / Virtual Access Available",
    city: "Hubballi & Bengaluru",
    audience: "North Karnataka families, Lingayat, Brahmin, Maratha, Kuruba, Vaishya, and all community professionals (Engineers, Doctors, CA, Govt & Business families)",
    maxAttendees: "Limited Seats for Quality Introductions"
  },
  links: {
    // Official Razorpay Payment Page URL
    razorpayPage: "https://pages.razorpay.com/pl_TkiLJXbjFdODnH/view",
    // Official Detailed Google Biodata Form URL
    googleForm: "https://docs.google.com/forms/d/e/1FAIpQLScRCZmPoBXhXcD40til16FLtkMhsgwOcsPWTtJb7_jG8bpowQ/viewform",
    // Support WhatsApp link generator
    get whatsappSupport() {
      const msg = encodeURIComponent("Hello Vihar Vivaha team, I have a query regarding North Karnataka Matrimony Event registration.");
      return `https://wa.me/919986111169?text=${msg}`;
    }
  },
  // Future backend / webhook expansion hooks
  integration: {
    enableBackendApi: false, // Set to true when backend API is deployed
    apiEndpoint: "/api/register",
    webhookConfigured: false
  }
};

// Export for module systems if needed, else attach to window
if (typeof module !== "undefined" && module.exports) {
  module.exports = EVENT_CONFIG;
} else {
  window.EVENT_CONFIG = EVENT_CONFIG;
}
