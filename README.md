# Vihar Vivaha — Matrimony Event Registration Portal
> **"your comfort our care"**

A modern, responsive, mobile-first registration portal for the **North Karnataka Matrimony Meet & Biodata Sammelana** organized by **Vihar Vivaha**.

Designed specifically for an Indian matrimonial audience: trustworthy, culturally respectful, featuring the official Vihar Vivaha brand aesthetic (Ocean Teal `#157F95`, Fresh Emerald Green `#36A36E`, Soft Silk Ivory `#F8FBFA`, and Auspicious Warm Gold `#C28F28`), with an intuitive 3-step registration flow.

---

## 🌟 Key Features

1. **Official Vihar Vivaha Branding & Visual Identity:**
   - Official brand logo featuring the soaring winged emblem and tagline: *"your comfort our care"*.
   - Modern, harmonious color palette: Teal (`#157F95`) and Emerald Green (`#36A36E`) gradients with champagne gold accents.
   - Clean typography using Google Fonts *Playfair Display* (luxury editorial serif) and *Plus Jakarta Sans* (modern UI sans-serif).
   - High-contrast, touch-optimized UI (48px+ touch targets, mobile sticky registration bar).

2. **Streamlined 3-Step Candidate Journey:**
   - **Step 1:** Candidate fills basic details (Full Name, 10-digit WhatsApp Mobile, Email, Gender, Age).
   - **Step 2:** Secure one-click transition to official Razorpay payment page (₹3,000 registration fee).
   - **Step 3:** Prominent post-payment CTA directing candidate to the detailed Google Biodata Form.

3. **Standalone Single HTML Build:**
   - Run `npm run build` to generate `dist/index.html` and `matrimony-registration-single-build.html`.
   - 100% self-contained single-file build with inlined CSS, JS, and embedded Base64 logo.
   - Zero external folder dependencies: ready for immediate deployment on GitHub Pages, Netlify, Vercel, Cloudflare Pages, Firebase, or shared hosting.

4. **Compliant & Transparent Architecture:**
   - **No fake payment-success pages** or false payment verification claims.
   - **Zero banking/card data collection**: all financial handling is offloaded to Razorpay's PCI-DSS compliant checkout.
   - Local state preservation (`localStorage`) ensures candidate details aren't lost if the page reloads.

---

## 📁 Project Structure

```
matrimony-event-registration/
│
├── index.html                               # Source semantic HTML5 application
├── css/
│   └── styles.css                           # Vihar Vivaha Design System & responsive styling
├── js/
│   ├── config.js                            # Central brand, event details, fees & URLs
│   └── app.js                               # Form validation, local storage & modal logic
├── images/
│   ├── vihari-logo.png                      # Official high-resolution brand logo
│   └── favicon.png                          # Site favicon
├── dist/
│   └── index.html                           # 🚀 Bundled Single-File HTML build (ready to deploy)
├── matrimony-registration-single-build.html # Standalone offline / direct share build
├── build.js                                 # Automated single HTML bundler script
├── server.js                                # Zero-dependency local Node.js preview server
├── package.json                             # NPM scripts and metadata
└── README.md                                # Project documentation
```

---

## 🔗 Integrated External Links

- **Razorpay Payment Page:** [https://pages.razorpay.com/pl_TkiLJXbjFdODnH/view](https://pages.razorpay.com/pl_TkiLJXbjFdODnH/view)
- **Detailed Biodata Google Form:** [https://docs.google.com/forms/d/e/1FAIpQLScRCZmPoBXhXcD40til16FLtkMhsgwOcsPWTtJb7_jG8bpowQ/viewform](https://docs.google.com/forms/d/e/1FAIpQLScRCZmPoBXhXcD40til16FLtkMhsgwOcsPWTtJb7_jG8bpowQ/viewform)
- **WhatsApp Support Link:** [https://wa.me/919986111169](https://wa.me/919986111169)

---

## 🚀 How to Run Locally

### Option 1: Node.js (Built-in server)
```bash
npm start
# or
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Python HTTP Server
```bash
python -m http.server 8080
```
Open `http://localhost:8080` in your browser.

### Option 3: Double-Click Standalone Build
Simply double-click `matrimony-registration-single-build.html` or `dist/index.html` to open directly in any browser with zero setup!

---

## 📦 How to Build the Single HTML Deployment

To generate the single-file HTML bundle:
```bash
npm run build
# or
node build.js
```
This produces:
- `dist/index.html` — Deployable on GitHub Pages, Netlify Drop, Vercel, etc.
- `matrimony-registration-single-build.html` — Portable file with embedded Base64 logo.

---

## 🐙 Git & GitHub Versioning

### Initialized Git Repository & Version:
```bash
# Check status
git status

# Add remote (if not already added)
git remote add origin https://github.com/hyperzealminds/matrimony-event-registration.git

# Push main branch
git push -u origin main

# Push version tag
git push origin v1.0.0
```

---

## ⚙️ Configuration & Customization

Event text, fees, dates, and contact numbers can be updated in `js/config.js`:

```javascript
const EVENT_CONFIG = {
  brand: {
    name: "Vihar Vivaha",
    tagline: "your comfort our care",
    phone: "+91 99861 11169",
    email: "hello@viharvivaha.com",
    address: "#73, 18th Cross, Rajajinagar 1st Block, Bengaluru, Karnataka – 560010"
  },
  event: {
    title: "North Karnataka Matrimony Meet & Biodata Sammelana",
    fee: "₹3,000",
    date: "Sunday, 26th October 2026",
    venue: "Hotel Naveen Lakeside Convention Center, Hubballi / Virtual Access Available"
  },
  links: {
    razorpayPage: "https://pages.razorpay.com/pl_TkiLJXbjFdODnH/view",
    googleForm: "https://docs.google.com/forms/d/e/1FAIpQLScRCZmPoBXhXcD40til16FLtkMhsgwOcsPWTtJb7_jG8bpowQ/viewform"
  }
};
```
