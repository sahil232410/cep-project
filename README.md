# 🌿 EcoTrack – Waste Management Tracking System for Local Communities

EcoTrack is a responsive, lightweight web application built as a **Community Engagement Project (CEP)** for the BSc IT curriculum (**Topic #44: "Waste Management Tracking System for Local Bodies"**).

The platform bridges local citizens and municipal ward coordinators by providing a serverless channel to report garbage dumping issues with photographic proof, track cleanup timelines dynamically, search household segregation categories, take educational quizzes, and enable coordinators to manage complaint resolution workflows with visual analytics.

---

## 💻 Tech Stack & Architecture

To keep the platform fast, lightweight, serverless, and easy to explain during a Viva presentation:
1. **React 19 (Frontend Framework):** Component-based architecture using functional components, hooks (`useState`, `useEffect`), and lifted state management.
2. **Vite (Build Tool & Dev Server):** High-speed bundling with multi-page Rollup routing (`/` citizen app and `/admin/` portal).
3. **Vanilla CSS (Styling & Theming):** Clean design system utilizing CSS custom properties (`:root` variables) for Light and Dark modes. No heavy third-party CSS frameworks (like Tailwind or Bootstrap) were used, keeping the codebase transparent and fully explainable.
4. **Lucide React (Icons):** Modern, SVG vector icons.
5. **HTML5 APIs:**
   * **`FileReader` + `<canvas>` API:** Automatically downscales and compresses uploaded waste photos into compact Base64 strings (~40KB) to ensure `localStorage` storage quotas are never exceeded.
   * **`localStorage` API:** Persists complaint tickets and user theme preferences with real-time cross-tab synchronization (`storage` and `focus` events).
   * **`sessionStorage` API:** Gated authentication session for coordinator/admin access (`admin123`).

---

## 🚀 Getting Started

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm**

### Installation & Launch
```bash
# 1. Navigate into the project folder
cd cep-project

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev
```

### Access URLs
* **Citizen Portal:** [http://localhost:5173/](http://localhost:5173/)
* **Admin Portal:** [http://localhost:5173/admin/](http://localhost:5173/admin/) *(Passcode: `admin123`)*
* *(Alternatively, access the Admin Dashboard directly from the "Waste Dashboard" card on the Home page)*

---

## 📂 Project Directory Structure

```text
cep-project/
├── admin/                     # Multi-page Admin Portal entry point
│   └── index.html             # Dedicated HTML template for /admin/
├── public/                    # Static public assets (icons, favicons)
├── src/
│   ├── assets/                # App images & background backdrops (hero_bg.jpg)
│   ├── components/            # Modular UI components
│   │   ├── About.jsx          # Project objectives and 3-member team roles
│   │   ├── AdminDashboard.jsx # Passcode gate, ticket manager, charts & CSV parser
│   │   ├── Categories.jsx     # Waste categories guide (Wet, Dry, Plastic, E-Waste)
│   │   ├── EcoTips.jsx        # Category-filtered sustainable habit recommendations
│   │   ├── FindWaste.jsx      # Search engine across 52 household items with disposal modals
│   │   ├── Footer.jsx         # Bottom links and municipal advisory notice
│   │   ├── Gallery.jsx        # Field survey photos and community campaign proofs
│   │   ├── Home.jsx           # Hero banner, core pillar cards, and workflow explanation
│   │   ├── Navbar.jsx         # Header navigation with inline Light/Dark theme toggle
│   │   ├── Quiz.jsx           # Interactive waste segregation quiz with score badges
│   │   ├── ReportWaste.jsx    # Complaint form with photo upload and auto-ID generator
│   │   ├── Scanner.jsx        # Simulated AI smart waste detection scanner
│   │   └── TrackReport.jsx    # Live complaint status visualizer with progress timeline
│   ├── data/                  # Static reference datasets (mock database)
│   │   ├── ecoTips.js         # Curated eco-friendly tips by category
│   │   ├── quizQuestions.js   # Multiple choice segregation questions
│   │   └── wasteData.js       # Complete database of 52 household disposal items
│   ├── admin.jsx              # Mount script for dedicated Admin Portal (/admin/)
│   ├── AdminApp.jsx           # Standalone Admin App wrapper with cross-tab local storage sync
│   ├── App.jsx                # Citizen app router, state lifter & cross-tab sync engine
│   ├── index.css              # Master stylesheet (colors, variables, responsive rules)
│   └── main.jsx               # Mount script for public citizen application
├── google_form_responses.csv  # Sample community survey CSV for Admin parser testing
├── package.json               # Dependencies and build scripts
├── vite.config.js             # Vite configuration with multi-page rollup inputs
├── viva_prep_guide.md         # Comprehensive viva cheat sheet & examiner Q&A
└── README.md                  # Project documentation report (this file)
```

---

## 🌟 Key Features & Functionalities

### 1. Public Waste Reporting (`ReportWaste.jsx`)
* **Incident Submission:** Captures reporter name (optional), location, waste category, date, and description.
* **Smart Image Compression:** Converts uploaded photos into Base64 using `FileReader`, scaling and compressing them via `<canvas>` to ~40KB to avoid browser `QuotaExceededError`.
* **Sequential ID Generator:** Automatically scans existing tickets and generates clean incremental ticket IDs (e.g. `ET-1001`, `ET-1002`, `ET-1003`).

### 2. Live Complaint Tracking (`TrackReport.jsx`)
* **Dynamic Progress Timeline:** Displays a 4-phase status tracker (**Reported ➔ Under Review ➔ In Progress ➔ Resolved**) complete with visual progress nodes and active pulse indicators.
* **Instant Auto-Search:** Automatically loads the complaint details immediately after the user submits a ticket.

### 3. Secure Admin Portal (`AdminDashboard.jsx` & `AdminApp.jsx`)
* **Passcode Protection:** Gated behind passcode `admin123` with session persistence in `sessionStorage`. Accessible at `/admin/` or via the Home page's Waste Dashboard card.
* **Ticket Management:** Filter by status or waste type, search by reporter or location, review uploaded photo proofs, and update status from *Reported* to *Resolved*.
* **One-Click Controls:** Includes **"Clear All Reports"** to wipe demo data for a fresh start, and **"Restore Sample Data"** to restore seed entries before a viva.
* **Real-Time Cross-Tab Sync:** Automatically syncs ticket updates across multiple browser windows/tabs using `storage` and `focus` events without needing manual reloads.

### 4. Google Form CSV Parser (`AdminDashboard.jsx`)
* **Field Survey Integration:** Import Google Sheets responses exported as `.csv` from public survey forms.
* **RFC-4180 Compliant:** Handles quotes, multi-line descriptions, UTF-8 BOM (`\ufeff`), and dynamic column header keyword detection (`timestamp`, `reporter`, `location`, `type`, `description`, `photo`).
* **Duplicate Prevention:** Validates incoming rows against existing tickets by location and description before importing.

### 5. Educational Awareness Tools
* **Waste Finder (`FindWaste.jsx`):** Instant search bar over 52 common household items showing bin color, segregation category, and disposal advice.
* **Waste Quiz (`Quiz.jsx`):** Interactive scenario-based test with immediate visual feedback, answer explanations, and final eco-rank badges.
* **Eco Tips (`EcoTips.jsx`):** Actionable daily habits filtered by waste reduction, composting, and plastic alternatives.
* **AI Scanner Simulator (`Scanner.jsx`):** Simulated camera/image scanner demonstrating future automated waste classification.

---

## 👥 Three-Member Project Division

* **Sahil (Frontend & UI/UX):** Layout architecture, custom organic theme, responsive overrides, and inline Light/Dark theme switcher.
* **Atul (Citizen Reporting & Tracking):** Report Waste form, canvas photo compression, sequential ticket generator, and dynamic status timeline.
* **Shezad (Admin Portal & Data Integration):** Passcode-secured Admin Portal, Google Form RFC-4180 CSV parser, ticket management drawer, and hotspot analytics.

---

## 🎓 Viva Cheat Sheet

For examiner questions, technical architecture breakdowns, and domain answers regarding Topic #44 (*Waste Management Tracking System for Local Bodies*), refer to **[viva_prep_guide.md](./viva_prep_guide.md)**.
