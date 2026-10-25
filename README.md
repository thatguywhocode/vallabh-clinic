# VALLABH CLINIC 🌿

> **Healthcare E-Commerce & Doctor-Patient Management Platform**  
> *Initial Project Foundation & Architecture (Milestone 1)*

---

## 📖 Overview

**VALLABH CLINIC** is a modern healthcare e-commerce and doctor-patient management platform built on the MERN stack (MongoDB, Express, React, Node.js). It provides an elegant, serene digital marketplace for non-prescription botanical healthcare essentials alongside a patient portal where doctors can prescribe personalized OTC wellness regimens.

### Official Brand Identity
- **Botanical Green** (Pantone 2411 U): `#49614D` (`bg-[#49614D]`) &mdash; Main navigation header, brand surfaces, primary buttons, footer.
- **Pure White Brand Name**: `#FFFFFF` &mdash; **CRITICAL RULE**: The entire brand name **"VALLABH CLINIC"** (both words) appears in pure white `#FFFFFF` wherever displayed on botanical green. "CLINIC" is never red.
- **Vermilion Red** (Pantone 2347 U): `#E83F35` &mdash; Controlled accent only (emblem leaf motif, cart button, badges).
- **Warm Off-White** (Pantone P 179-1 U): `#F7F5EF` &mdash; Main page canvas background.
- **Typography**: Classical serif headings (*Cormorant Garamond*) paired with crisp, accessible sans-serif body copy (*Plus Jakarta Sans*).

---

## 🛍️ Platform Core Capabilities (Milestone 1)

1. **Healthcare E-Commerce Homepage**:
   - Hero banner: *"Thoughtful Care. Everyday Wellness."*
   - Interactive hero product showcase: *The Daily Equilibrium Care Kit (₹1,299)* with 1-click cart addition.
   - Featured category cards (Immunity, Digestion, Stress & Sleep, Dermal Care, Joint Comfort).
   - Filterable product grid with prices in Indian Rupees (₹ INR), ratings, volume, and stock status.
2. **Product Catalog & Search**:
   - Dedicated `/products` shop with real-time text search, category filtering, and sorting.
   - Dedicated `/categories` browse page.
3. **Interactive Wellness Cart**:
   - Slide-over `CartDrawer` with quantity adjustments, subtotal calculation, free shipping threshold (₹499), and milestone checkout notice.
4. **Doctor Recommendations Architecture**:
   - Dedicated section and `/account` preview explaining the doctor-patient recommendation workflow.
5. **Backend Health Check**:
   - Independent `GET /api/health` endpoint for operational developer diagnostics.

---

## 🛒 Customer-First Shopping & Demo Checkout (Milestone 6)

The platform features an unconstrained guest shopping experience with on-demand authentication at checkout:

| Feature / Flow | Route | Description |
|---|---|---|
| **Guest Browsing & Cart** | `/`, `/products`, `/categories` | Visitors browse, search, and add botanical formulations to cart freely without requiring prior login. |
| **Demo Checkout Process** | `/checkout` | 3-step checkout: Account identification (select demo patient or 1-click register new customer), delivery details (with 1-click auto-fill sample address), and simulated order review with free shipping over ₹499. |
| **Order Confirmation** | `/order-confirmation/:orderId` | Displays order reference ID, delivery address, ordered formulations, totals, tracking number, and real-time fulfillment timeline. |
| **Inventory Stock Decrement** | Live synchronization | Submitting a demo order immediately deducts product quantities from inventory in `DemoDataContext` and reflects across Storefront and Admin dashboards. |
| **Doctor Recommendations Isolation** | `/patient/dashboard` | Unlinked shoppers see an educational empty state: *"No doctor connected yet — You are shopping independently. When you consult a clinic physician in the future, your personalized botanical care recommendations will appear here."* |
| **Product SVG Mockups** | `/products/*.svg` | 8 bespoke, apothecary-grade SVG product mockups in `client/public/products/` with transparent glass, herbal gradients, and brand emblems. |
| **Session Header State** | Navbar | Dynamic "My Account" and "Sign Out" actions when logged in, preserving guest cart across session changes. |

---

## 🔐 Professional Authentication & Demo Access (Milestone 5)

The platform provides an authentic healthcare platform authentication experience across two dedicated routes:

| Route | Role / Feature | Description |
|---|---|---|
| `/login` | **Unified Login Portal** | Professional sign-in with Patient, Doctor, and Admin account type selector, password recovery notice, and 1-click **Explore Demo Personas** presentation launcher. |
| `/register` | **Registration Gateway** | Dedicated tabs for **Patient Registration**, **Practitioner Verification Request** (credential & license capture), and internal admin provisioning notices. |
| `/products/:id` | **Product Detail Page** | Detailed botanical showcase with ingredient breakdown, verified usage directions, traditional Ayurvedic context, precautions, live stock, and related formulations. |
| `/demo-access` | **Role Switcher** | Preserved for demonstration evaluations; also accessible via `/login` and `/account`. |

---

## 👥 Connected Role-Based Dashboards (Milestone 3)

The platform provides a connected, role-based demonstration architecture across four active routes:

| Route | Role | Description |
|---|---|---|
| `/demo-access` | **Role Switcher** | Role launcher to enter as Patient, Doctor, or Admin with instant persona switching and factory reset. |
| `/patient/dashboard` | **Patient Portal** | Profile, linked doctor details, **doctor recommendations filtered by patient ID**, direct 1-click addition to `CartContext`, and order delivery timeline. |
| `/doctor/dashboard` | **Doctor Desk** | KPI cards, **strictly lists patients linked to the active doctor**, clinical disease records, catalog recommendation engine with custom dosage notes, and edit/withdraw tools. |
| `/admin/dashboard` | **Operations Console** | Product inventory table with inline stock editing, add/archive catalog items, order fulfillment status updater, doctor verification table, and master disease taxonomies. |

### Doctor-Patient Recommendation Isolation:
- When a doctor prescribes a formulation for a selected patient, that recommendation **immediately appears** when switching to that patient's dashboard.
- The recommendation **does not appear** in any other patient's dashboard.
- Recommendations remain distinct from purchases and **never automatically become orders**.

---

## 🌿 Premium UI/UX Transformation (Milestone 7)

Milestone 7 elevates the platform into a serene, editorial-grade luxury botanical wellness and healthcare marketplace:

| Phase / Feature | Component / Route | Design & Experience Enhancement |
|---|---|---|
| **Phase 1 — Editorial Hero** | `HomePage.jsx` | Headline *"Thoughtful Care. Everyday Wellness."* with staggered word animations via `motion/react`, vermilion accent brush underline, layered botanical pedestal featuring 3 bespoke SVGs, warm radial studio glow, and dual CTAs. |
| **Phase 2 — Brand Navigation** | `Navbar.jsx` | Sticky botanical green `#49614D` header, pure white `#FFFFFF` "VALLABH CLINIC" typography, active tab spring underlines (`layoutId="activeNavIndicator"`), animated pop cart counter, and responsive drawer. |
| **Phase 3 — Category Collections** | `HomePage.jsx` | 5 interactive editorial collection tiles with real product SVG thumbnails, benefit previews, and hover sliding arrow transitions. |
| **Phase 4 — Product Cards & Quick View** | `ProductCard.jsx`, `QuickViewModal.jsx` | Hover quick-view trigger, animated "Added ✓" micro-interaction, and full modal inspection with herbal formulation details, pack volume, and 1-click cart addition. |
| **Phase 6 — Connected Care Narrative** | `HomePage.jsx` | 3-step visual storytelling timeline (01 Independent Exploration, 02 Optional Clinical Link, 03 Doorstep Dispatch) clarifying customer freedom. |
| **Phase 7 — Polish across Dashboards** | Patient, Doctor & Admin | Real SVG thumbnails inside prescriptions, orders, and inventory tables; live prescription product preview in doctor prescribe form; 4 KPI metric cards; refined borders and badges. |
| **Phase 8 — 3-Step Checkout Flow** | `CheckoutPage.jsx` | Numbered progress stepper (Account Identification, Delivery Details, Review & Confirm), clear sample auto-fill, and live order summary. |

### Visual Documentation (Screenshots in `docs/screenshots/`):
- `homepage.png`: Editorial botanical hero and interactive category showcase.
- `shop-catalog.png`: 8 apothecary formulations with category filters and active search.
- `product-detail-triphala.png`: Detailed formulation view with traditional Ayurvedic indications.
- `checkout-active-cart.png`: 3-step checkout with cart breakdown and live free-delivery calculation.
- `patient-dashboard.png`: Personalized care regimen with doctor recommendations and delivery timeline.
- `doctor-dashboard.png`: Clinician consultation desk with live product preview prescription engine.
- `admin-dashboard.png`: Central operations with product SVG inventory table and stock editor.

---

## 🎬 Cinematic Brand Intro & 3D Product Experience (Milestone 8)

Milestone 8 adds three restrained, high-performance animation experiences built with `motion/react` and hardware-accelerated CSS transforms:

| Experience | Component | Implementation Highlights |
|---|---|---|
| **1. Cinematic Morphing Intro** | `BrandIntro.jsx` | Full-screen botanical green `#49614D` background revealing pure white `#FFFFFF` "VALLABH CLINIC" typography, swirling local apothecary SVG orbiters converging into a circular crest, morphing expanding portal wipe, discreet Skip Intro button, and once-per-session playback (`sessionStorage`). |
| **2. Auto-Rotating 3D Hero Carousel** | `RotatingProductShowcase.jsx` | Layered 3D-perspective carousel rotating every 4 seconds. Center active item is prominent (scale 1.0, drop shadow, active details card with price and direct link), while side items appear angled (`rotateY: ±20°`, scale 0.74, soft blur). Click any side item to spotlight. Pauses on hover, keyboard focus, and when the browser tab is hidden. |
| **3. Interactive 3D Product Cards** | `ProductCard.jsx` | Micro-perspective tilt tracking cursor coordinates (max 5.5° `rotateX`/`rotateY`), gentle elevation (`y: -5px`), elevated product SVG layer (`translateZ(16px)`), realistic depth shadows, touch-device bypass, and 100% preservation of shopping/cart logic. |

---

## 🌟 Cinematic Intro Refinement, Navigation & UX Fixes (Milestone 9)

Milestone 9 delivers refined brand presentation, deterministic navigation ergonomics, and fluid hero interactivity:

| Enhancement | Components Involved | Technical & UX Highlights |
|---|---|---|
| **1. Premium Botanical & Medical Wellness Intro** | `BrandIntro.jsx`, `BrandIntroContext.jsx` | 5-stage cinematic sequence: (1) Ambient lighting & botanical particles (0–0.7s), (2) Tulsi, Amla, Ashwagandha silhouettes & pure white Cormorant Garamond typography reveal (0.7–1.5s), (3) 3D apothecary bottles, hexagonal bio-molecular lattice, and vital pulse waveform (1.5–2.5s), (4) Centripetal convergence into central leaf crest (2.5–3.5s), and (5) Smooth circular portal wipe transition (3.5–4.0s). Features accessible "Skip Intro ✕" button and `prefers-reduced-motion` immediate bypass. |
| **2. Controlled Intro Triggering** | `BrandIntroContext.jsx`, `Navbar.jsx`, `Footer.jsx` | Intro **only plays when explicitly triggered by clicking the brand logo / name in the navbar** (or "Replay Brand Intro" in the footer). Does **NOT** auto-play on initial load, page refresh, or route transitions. Navigates cleanly to `/` without page reloads. |
| **3. Permanent Product Detail Scroll Fix** | `ScrollToTop.jsx`, `ProductDetailPage.jsx` | Disables browser coordinate retention (`window.history.scrollRestoration = 'manual'`). Enforces instant `(0, 0)` window positioning whenever clicking "View Details", product cards, or related items. Intentionally preserves in-page hash anchors (e.g., `/#about`, `/#categories`). |
| **4. Continuous Auto-Rotating Hero Carousel** | `RotatingProductShowcase.jsx` | Automated 3.5-second rotation timer operating without requiring user clicks. Smooth 3D carousel scaling and perspective. Active product info card synchronizes directly with current formulation. Gracefully pauses on hover, keyboard focus, and when tab visibility changes (`visibilitychange`). |
| **5. Consolidated "Login / Register" Button** | `Navbar.jsx` | Replaces separate "Login" and "Register" text links with a single compact, elegant **Login / Register** button with a user icon, white text, and subtle translucent border (`bg-white/10 hover:bg-white/15`). Directs unauthenticated visitors to `/login` (with accessible switch to `/register`). Existing authenticated state continues displaying role portal badge and "Sign Out". |
| **6. Refined Brand Logo Edge Alignment** | `Navbar.jsx`, `Logo.jsx` | Reduced left padding from `px-4 sm:px-6 lg:px-8` to `px-2.5 sm:px-4 lg:px-6` with tight flex alignment, moving the "VALLABH CLINIC" brand mark subtly toward the left margin while maintaining vertical centering and mobile responsiveness. |

### Milestone 9 Verification Captures (`docs/screenshots/`):
- `milestone-9-homepage-initial.png`: Initial homepage render showing navbar alignment, unified Login / Register button, and zero auto-played intro on load.
- `milestone-9-mobile-navbar.png`: Responsive mobile navbar layout with compact brand spacing and clean drawer menu.
- `milestone-9-intro-on-click.png`: Opening animation displaying botanical leaves, apothecary bottles, molecular lattice, and white brand typography triggered upon clicking navbar logo.
- `milestone-9-carousel-rot1.png`: Hero carousel after automated rotation step to Ashwagandha & Brahmi with synchronized card details.
- `milestone-9-carousel-rot2.png`: Hero carousel after second rotation step to Kumkumadi Radiance Face Oil with synchronized card details.
- `milestone-9-product-detail-top.png`: Product detail page (`/products/vc-prod-001`) opening deterministically at the top of the viewport (`scrollY === 0`).

---

## 🌪️ Cinematic Botanical Tornado & Navbar Correction (Milestone 10)

Milestone 10 transforms the brand introduction into a luxury commercial-grade 3D botanical tornado and delivers the definitive navbar edge alignment fix:

| Phase / Feature | Component / Assets | Technical & Cinematic Implementation |
|---|---|---|
| **Scene 1 — Nature Awakens (0–1.2s)** | `BrandIntro.jsx`, `client/public/botanicals/*.svg` | Dark botanical green canvas (`#49614D` with deep vignette `#121C14`), volumetric directional god rays, and realistic botanicals emerging from depth: **Tulsi leaves, Ashwagandha roots, Amla fruits, Brahmi leaves, Chamomile flowers, and Saffron strands**. |
| **Scene 2 — The Botanical Tornado (1.2–3.5s)** | `BrandIntro.jsx`, HTML5 Canvas | 3D logarithmic conical spiral whirlwind with dynamic perspective projection ($f_{persp} = D / (D + Z)$), convective updraft ($y(t)$), realistic 3D pitch/yaw/roll tumbling, and 140+ shimmering golden, emerald, and vermilion micro-particles leaving luminous vortex trails. |
| **Scene 3 — Botanical Transformation (3.5–4.5s)** | `BrandIntro.jsx` | Centripetal contraction pulling all ingredients toward the central axis into a luminous golden-vermilion form. Transforms into the **VALLABH CLINIC botanical leaf insignia** with the vermilion red accent (`#E83F35`) and radiating circular shockwaves. |
| **Scene 4 — Brand Reveal (4.5–5.5s)** | `BrandIntro.jsx` | Reveal of **VALLABH CLINIC** in pure white (`#FFFFFF`) *Cormorant Garamond* typography on a single elegant horizontal line (`whitespace-nowrap`), accompanied by *"Healthcare • Everyday Wellness"* in warm ivory and a subtle gold divider bar. |
| **Scene 5 — Seamless Homepage Transition (5.5–6.2s)** | `BrandIntro.jsx` | Circular portal wipe (`clip-path: circle()`) expanding smoothly from the central emblem into the warm ivory homepage (`#F7F5EF`), naturally revealing the hero formulations without jarring cuts. |
| **Navbar Edge Alignment Correction** | `Navbar.jsx` | Removed the centered `max-w-7xl` constraint on the header, replacing it with a full-width responsive container (`w-full px-4 sm:px-6 md:px-8 lg:px-10`). Restructured into 3 clear layout zones: **Left** (Brand Logo ~32–40px from edge), **Center** (Search bar & primary navigation), and **Right** (Login/Register & Cart). |
| **Bespoke Botanical Assets** | `client/public/botanicals/` | 6 bespoke, photorealistic botanical SVG illustrations: `tulsi-leaf.svg`, `ashwagandha-root.svg`, `amla-fruit.svg`, `brahmi-leaf.svg`, `chamomile-flower.svg`, and `saffron-threads.svg`. |

### Milestone 10 Visual Documentation (`docs/screenshots/`):
- `milestone-10-desktop-navbar.png`: Desktop homepage showing brand logo and "VALLABH CLINIC" positioned 32–40px from left viewport edge with 3-zone navbar.
- `milestone-10-tornado-widest.png`: Scene 2 Botanical Tornado at its widest whirlwind point with 3D spiral ingredients and atmospheric god rays.
- `milestone-10-ingredient-convergence.png`: Scene 3 Convergence into the luminous leaf emblem with vermilion red accent (`#E83F35`) and expanding shockwaves.
- `milestone-10-brand-reveal.png`: Scene 4 Pure White "VALLABH CLINIC" typography reveal in Cormorant Garamond on a single centered line.
- `milestone-10-homepage-transition.png`: Scene 5 Circular portal wipe transitioning into the warm ivory homepage.
- `milestone-10-trigger-from-shop.png`: Shop catalog view (`/products`) showing left navbar logo alignment and trigger readiness.
- `milestone-10-skip-button.png`: Accessible "Skip Intro ✕" button and immediate clean exit to storefront.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, React Router DOM 6, Lucide React, Motion for React (`motion/react`).
- **Backend**: Node.js (v22+), Express.js (v4.21+) with ES Modules, Mongoose 8 (integration prepared for Milestone 2).
- **Currency**: Indian Rupee (`₹ INR`).

---

## 💻 Running Locally

```bash
# Start both server and client concurrently
npm run dev
```

* **Frontend E-Commerce Store**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:5000](http://localhost:5000)
* **Developer API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
