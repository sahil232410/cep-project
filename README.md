# 🌿 EcoTrack – Waste Management Tracking System for Local Communities

EcoTrack is a complete, polished, and responsive web application built as a **Community Engagement Project (CEP)** for the BSc IT curriculum (Topic #44: *"Waste Management Tracking System for Local Bodies"*). 

The platform allows local citizens to report community waste dumping issues, track cleanup schedules dynamically, search household segregation categories, take educational quizzes, and enables coordinators to manage tickets and view visual analytics.

---

## 💻 Tech Stack & Architecture

To keep the project lightweight, serverless, and easy to explain during a Viva, we used:
1. **React.js (Frontend Framework):** Component-based rendering using functional components and hooks.
2. **Vite (Build Tool & Dev Server):** Ultra-fast compilation and Hot Module Replacement (HMR).
3. **Vanilla CSS (Styling):** Customized, responsive design system utilizing CSS variables (`:root`) for easy styling changes and theme support. No CSS frameworks (like Tailwind) were used, keeping the code simple and readable.
4. **Lucide React (Icons):** Modern, SVG-based vector icons.
5. **HTML5 APIs:**
   * **`FileReader` API:** Reads and previews uploaded waste photos as Base64 strings.
   * **`localStorage` API:** Persists theme settings and logged waste tickets.
   * **`sessionStorage` API:** Saves the coordinator dashboard login session.

---

## 📂 Project Directory Structure

```text
cep-project/
├── public/                # Static assets (favicons, icons, etc.)
├── src/
│   ├── assets/            # App images (e.g. hero_bg.jpg background)
│   ├── components/        # Reusable UI component pages
│   │   ├── About.jsx      # Project team details (Sahil, Atul, Shezad)
│   │   ├── Categories.jsx # Waste categories grid & inline recycling guide
│   │   ├── EcoTips.jsx    # Actionable habits grid with category filters
│   │   ├── FindWaste.jsx  # Search engine list & detail modal popup
│   │   ├── Footer.jsx     # Bottom navigation links, warning banner & Admin Portal link
│   │   ├── Gallery.jsx    # Field campaign activities & proof uploads
│   │   ├── Home.jsx       # Hero section with background, stats, & core pillars
│   │   ├── Navbar.jsx     # Sticky header, navigation menu, & inline Theme Toggle
│   │   ├── Quiz.jsx       # Interactive waste segregation quiz
│   │   ├── Scanner.jsx    # Smart AI scanner simulator with file uploads
│   │   ├── ReportWaste.jsx# [NEW] Waste dump reporting form & ID generator
│   │   ├── TrackReport.jsx# [NEW] Report tracking & visual status timeline
│   │   └── AdminDashboard.jsx # [NEW] Coordinator dashboard & Google Form CSV parser
│   ├── data/              # Local datasets (acting as mock database)
│   │   ├── ecoTips.js        # Sustainable tips grouped by category
│   │   ├── quizQuestions.js  # Multiple choice scenario questions
│   │   └── wasteData.js      # Complete household items database (52 items)
│   ├── App.jsx            # Main app router & shared reports state manager
│   ├── index.css          # Master stylesheet (colors, alignment, responsiveness)
│   └── main.jsx           # App entry point
├── package.json           # Scripts and package dependencies
└── README.md              # Project documentation report (this file)
```

---

## 🌟 Key Features & Functionalities

### 1. Main Navigation & Routing (`App.jsx` + `Navbar.jsx` + `Footer.jsx`)
* **State-Based Navigation:** Switches screens using a `currentPage` state string in `App.jsx` with a `switch-case` helper rendering components conditionally.
* **Inline Theme Toggle:** Relocated the Light/Dark mode switcher button directly next to the **About** link at the end of the navigation list. Sets a `data-theme` attribute on the root HTML node and persists the selection in `localStorage`.

### 2. Custom Background Hero (`Home.jsx` + `index.css`)
* **Organic Background**: Integrates a custom green leafy backdrop (`/src/assets/hero_bg.jpg`) with translucent gradient overlays (light white in light mode, dark slate in dark mode) ensuring high text contrast.
* **Direct Actions**: Features direct buttons to **[ Report Waste ]** and **[ Track Report ]** along with 4 core feature cards mapping the platform pillars.

### 3. Report Waste Form (`ReportWaste.jsx`)
* **Complaint Form**: Captures reporter name (optional), location, date, waste category, and descriptive details.
* **Photo Proof Uploads**: Converts images to Base64 data strings using the `FileReader` API and saves them directly inside the reports state.
* **Sequential ID Generator**: Reads the current reports list and automatically increments ticket IDs (e.g. `ET-1001`, `ET-1002`, `ET-1003`).

### 4. Search & Timeline Tracking (`TrackReport.jsx`)
* **Timeline Visualizer**: Renders the complaint status (**Reported ➔ Under Review ➔ In Progress ➔ Resolved**) as a visual progress list using colored nodes and active spinning indicators.
* **Demo Links**: Pre-populates clickable demo ticket links (like `ET-1001`) to allow examiners to test tracking immediately.

### 5. Secure Coordinator Portal (`AdminDashboard.jsx`)
* **Passcode Gate**: The dashboard is isolated from the navbar and reachable via a locked **🔒 Admin Portal** link in the footer. Access is gated behind a passcode request (`admin123`) which stores auth state in `sessionStorage`.
* **Table Management**: Displays incoming tickets in a searchable table. Admins can delete entries or open a management drawer to change complaint statuses.

### 6. Google Form CSV Parser (`AdminDashboard.jsx`)
* **Spreadsheet Sync**: Includes a drag-and-drop CSV parser. Download responses from Google Forms spreadsheet, import the `.csv` file, and the uploader dynamically maps columns based on header keywords, imports records, and prevents duplicate entries.
* **Local Body Analytics**: Computes live SVG resolution rings and CSS horizontal bar graphs ranking top complaint hotspots and waste type distributions.

---

## 🎓 Viva Questions & Answers (Cheat Sheet for Sahil, Atul, & Shezad)

Examiner questions and their answers are documented in detail inside the **[viva_prep_guide.md](./viva_prep_guide.md)**.
