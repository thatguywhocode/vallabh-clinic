# VALLABH CLINIC &mdash; System Architecture & Technical Specifications

## 1. Executive Overview
**VALLABH CLINIC** is a modern, botanical-inspired healthcare web application designed to deliver an elevated, trustworthy, and serene digital experience. The system intentionally departs from sterile, generic "blue medical portal" designs in favor of warm, botanical aesthetics, refined typography, and solid MERN-stack architecture.

---

## 2. Technology Stack

### Frontend Architecture
- **Framework & Runtime**: React 18 with Vite
- **Styling**: Tailwind CSS v3 with custom design tokens
- **Routing**: React Router DOM (v6.28)
- **Icons**: Lucide React
- **Animations**: Motion for React (`motion/react`)
- **HTTP Client**: Native Fetch API service abstraction

### Backend Architecture
- **Runtime**: Node.js (v22+)
- **Server Framework**: Express.js (v4.21+) with ES Modules (`type: "module"`)
- **Middleware**: CORS, Morgan (HTTP request logging), centralized JSON error handling
- **Database Driver**: Mongoose (v8.9+) &mdash; connection prepared for MongoDB Atlas in Milestone 2

---

## 3. Design System & Tokens

### Palette (Official Brand Reference)
- **Botanical Green** (Pantone 2411 U): `#49614D` &mdash; Navigation header, primary brand surfaces, footer, key elements.
- **Vermilion Red** (Pantone 2347 U): `#E83F35` &mdash; Controlled accent only (decorative botanical motif, alert badges, cart action).
- **Warm Off-White** (Pantone P 179-1 U): `#F7F5EF` &mdash; Primary page canvas background and card contrast.
- **Pure White**: `#FFFFFF` &mdash; **CRITICAL BRAND RULE**: The entire brand name "VALLABH CLINIC" (both words) MUST appear in pure white `#FFFFFF` wherever displayed on botanical green. "CLINIC" is never red.

| Role | Token | Hex / Reference | Application |
|---|---|---|---|
| **Brand Primary** | `botanical-500` | `#49614D` (Pantone 2411 U) | Navigation header, brand surfaces, key CTAs |
| **Brand Text (on Green)** | `white` | `#FFFFFF` | Complete "VALLABH CLINIC" brand typography |
| **Brand Accent** | `vermilion-500` | `#E83F35` (Pantone 2347 U) | Controlled decorative accent, emblem leaf, Cart CTA |
| **Warm Canvas** | `warm-100` | `#F7F5EF` (Pantone P 179-1 U) | Page canvas background |
| **Primary Deep** | `botanical-900` | `#1C251E` | Contrast footer background |
| **Body Text** | `earth-800` | `#41382E` | Accessible, readable warm body text |

### Typography
- **Headings**: *Cormorant Garamond* (Google Fonts) &mdash; serif, classic, dignified, authoritative.
- **Body & Controls**: *Plus Jakarta Sans* / *Inter* &mdash; clean, highly legible grotesque sans-serif.

---

## 4. Project Directory Structure

```text
vallabh_clinic/
├── client/                     # Vite + React Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI component library
│   │   │   ├── common/         # Button, Badge, Card, Container, Logo
│   │   │   └── navigation/     # Navbar, Footer
│   │   ├── layouts/            # MainLayout with header, outlet, footer
│   │   ├── pages/              # Route pages (HomePage, NotFoundPage)
│   │   ├── routes/             # AppRoutes configuration
│   │   ├── services/           # api.js client service layer
│   │   ├── styles/             # index.css with Tailwind & custom classes
│   │   ├── App.jsx             # Root React component
│   │   └── main.jsx            # React 18 DOM mount point
│   ├── .env.example            # Frontend environment variable template
│   ├── index.html              # HTML shell with Google Fonts & metadata
│   ├── package.json            # Client dependencies & scripts
│   ├── postcss.config.js       # PostCSS config
│   ├── tailwind.config.js      # Custom theme, colors, typography
│   └── vite.config.js          # Vite build config
├── server/                     # Node.js + Express Backend
│   ├── src/
│   │   ├── config/             # Environment & DB configurations
│   │   ├── controllers/        # Route controllers (healthController)
│   │   ├── middleware/         # Error handler & request logging
│   │   ├── models/             # Mongoose schemas (Milestone 2)
│   │   ├── routes/             # Express API routing (healthRoutes, index)
│   │   ├── app.js              # Express application setup
│   │   └── server.js           # Server listen & lifecycle entry
│   ├── .env.example            # Server environment variable template
│   └── package.json            # Server dependencies & scripts
├── docs/                       # Project documentation & guides
│   └── ARCHITECTURE.md         # Technical architecture documentation
├── .gitignore                  # Git ignore rules for node_modules, build & env
├── package.json                # Root monorepo runner with concurrently
└── README.md                   # Setup guide and instructions
```

---

## 5. API Specification (Milestone 1)

### `GET /api/health`
Checks API server operational readiness and environment status.

**Response `200 OK`**:
```json
{
  "status": "ok",
  "service": "Vallabh Clinic API",
  "version": "1.0.0",
  "timestamp": "2026-10-25T11:45:23.894Z",
  "uptime": "12s",
  "environment": "development",
  "database": {
    "status": "standby",
    "target": "MongoDB Atlas",
    "note": "Database connection scheduled for next milestone"
  }
}
```

---

## 6. Milestone Roadmap
- [x] **Milestone 1: Project Foundation & Design Architecture**
  - Project directory setup, dependencies, Tailwind CSS, React Router, Lucide icons, Motion, Express healthcheck API, live frontend status indicator, comprehensive docs.
- [x] **Milestone 2: Healthcare E-Commerce Storefront**
  - Public catalog `/products`, categories `/categories`, CartContext with slide-over `CartDrawer`, search filtering, INR pricing, and official brand palette.
- [x] **Milestone 3: Connected Role-Based Dashboards**
  - Unified demo store with localStorage persistence (`DemoDataContext`), `/demo-access` role switcher, `/patient/dashboard`, `/doctor/dashboard` with doctor-patient link filtering, `/admin/dashboard` inventory & stock management, and verified doctor recommendation reflection.
- [x] **Milestone 5: Professional Auth Experience & Product-Focused Homepage**
  - Dedicated `/login` and `/register` views with Patient, Doctor, and Admin flows; prominent demo persona launcher; product detail pages at `/products/:id` with factual botanical descriptions, ingredients, traditional usage, and precautions; responsive 4-column product grid on homepage without invented star ratings or discounts.
- [ ] **Milestone 6: Production Database & Payments**
  - MongoDB Atlas persistent connection, JWT authentication, production role authorization, Razorpay/Stripe checkout.
