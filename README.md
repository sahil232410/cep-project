# 🌿 EcoGuide – Waste Segregation & Environmental Awareness Platform

EcoGuide is a complete, polished, and responsive web application built as a **Community Engagement Project (CEP)** for the BSc IT curriculum. The platform helps citizens identify household waste items, learn their correct classifications, track their daily disposal habits, and study local community survey data.

---

## 💻 Tech Stack & Architecture

To keep the project lightweight, beginner-friendly, and easy to explain during a Viva, we used:
1. **React.js (Frontend Framework):** Component-based rendering using functional components.
2. **Vite (Build Tool & Dev Server):** Ultra-fast compilation and Hot Module Replacement (HMR).
3. **Vanilla CSS (Styling):** Customized, responsive design system utilizing CSS Custom Properties (Variables) for easy styling changes and theme support. No complex CSS frameworks (like Tailwind) were used, keeping the code simple.
4. **Lucide React (Icons):** Modern, SVG-based vector icons for crisp visual interfaces.
5. **HTML5 APIs:**
   * **`FileReader` API:** Used to read and load uploaded waste photos in the scanner simulator.
   * **`localStorage` API:** Used to persist the user's dark/light mode theme and daily waste logs.

---

## 📂 Project Directory Structure

```text
tp/
├── public/                # Static assets (favicons, etc.)
├── src/
│   ├── assets/            # App images/illustrations
│   ├── components/        # Reusable UI component pages
│   │   ├── About.jsx      # Project team details (Sahil, Atul, Shezad)
│   │   ├── Categories.jsx # Waste categories grid & inline recycling guide
│   │   ├── Community.jsx  # Neighborhood survey charts & CEP findings
│   │   ├── EcoTips.jsx    # Actionable habits grid with category filters
│   │   ├── FindWaste.jsx  # Search engine list & detail modal popup
│   │   ├── Footer.jsx     # Bottom navigation links & municipal warning
│   │   ├── Gallery.jsx    # Field campaign activities & proof uploads
│   │   ├── Home.jsx       # Hero section, stats, & Personal Waste Tracker
│   │   ├── Navbar.jsx     # Sticky header, responsive menu, & Theme Toggle
│   │   ├── Quiz.jsx       # Interactive 15-question waste segregation game
│   │   └── Scanner.jsx    # Smart AI scanner simulator with file uploads
│   ├── data/              # Local datasets (acting as mock database)
│   │   ├── communityData.js  # Survey questions, observations, and findings
│   │   ├── ecoTips.js        # Sustainable tips grouped by category
│   │   ├── quizQuestions.js  # Multiple choice scenario questions
│   │   └── wasteData.js      # Complete household items database (52 items)
│   ├── App.jsx            # Main app router (switches pages via state)
│   ├── index.css          # Master stylesheet (paddings, colors, responsiveness)
│   └── main.jsx           # App entry point
├── package.json           # Scripts and package dependencies
└── README.md              # Project documentation report
```

---

## 🌟 Key Features & Functionalities

### 1. Main Navigation & Routing (`App.jsx` + `Navbar.jsx` + `Footer.jsx`)
* **State-Based Navigation:** Instead of adding heavy routing libraries (like React Router), the app switches screens using a simple `currentPage` state string in `App.jsx`. A `switch-case` helper returns the active component.
* **Smooth Page Transitions:** Wrapped the route rendering in a `div` key-matched to `currentPage`. This triggers a CSS keyframe animation (`fadeInEffect`) that smoothly fades and slides the page up on every navigation click.

### 2. Light & Dark Mode Toggle (`Navbar.jsx` + `index.css`)
* **Dynamic Attribute Toggle:** Clicking the theme button toggles the `data-theme` attribute on the root HTML node (`document.documentElement`) between `'light'` and `'dark'`.
* **CSS Custom Variables:** Color properties inside `index.css` reference root variables (like `--bg-app` or `--text-main`). We overwrite these variable hex codes under `[data-theme='dark']` so the interface adapts cleanly.
* **Persistent Preference:** Uses `localStorage.getItem('theme')` to save user selections, ensuring their preference remains active even after refreshing the tab.

### 3. Personal Waste Tracker Dashboard (`Home.jsx`)
* **Interactive Logs:** Users add item names, select category categories (Wet, Dry, Recyclable, E-waste), input weights in grams, and click "Log Waste Item".
* **State Calculations:**
  * Sums up total logged weight (converted to `kg`).
  * Calculates a **Recovery & Recycle Rate** percentage based on compostable wet waste and recyclable materials logged.
* **Gamification (Eco Badges):** Displays active badges (`Eco Starter`, `Green Citizen`, `Zero Waste Champion`) based on total logged weights.
* **Mock DB Sync:** Saves the list of logs to `localStorage` so users can check back on their data at any time.

### 4. Search & Detail Modal (`FindWaste.jsx`)
* **Keyword Matching:** Filters the 52-item database by name and aliases (e.g. typing "remote" matches "Television / AC Remote").
* **Disposal Details Popup:** Clicking a card displays a modal detailing:
  * Description of the item.
  * Checklist of **What to Do** (green checks) and **What to Avoid** (red X marks).
  * Ecological impact statement and best disposal route (municipal collection vs drop-off bin).

### 5. Smart AI Waste Scanner Simulator (`Scanner.jsx`)
* **Simulated AI Processing:** When an image is uploaded or clicked, the app runs a loading process indicator (`0%` to `100%`) showing simulated processing statuses (*📷 Accessing Camera...*, *🧠 Analyzing shapes...*).
* **Multi-Object Matcher:** If a user uploads a generic trash photo:
  * It detects multiple components (Plastic Bottle, Used Tissue, Food Scraps, Battery) with confidence percentages.
  * Users can tap on **any** detected item button to load its specific recycling instructions instantly.
* **File Name Keyword Detector:** Detects filenames containing keywords like `battery`, `bottle`, `bulb` to match the exact item from your dataset.

### 6. Interactive Category Cards (`Categories.jsx`)
* **Color-Coded Categories:** Renders cards for Wet (organic), Dry (non-recyclable), Recyclable, and E-waste.
* **Inline Details Sheet:** Clicking an item highlights it and smoothly scrolls the user down to a detailed "Recycling Guide Board" detailing disposal steps and environmental impacts.

### 7. Sustainable Habits Filter (`EcoTips.jsx`)
* **Filter Pills:** Displays pill-buttons to filter tips by categories (Daily Habits, Reduction, Composting, Shopping).
* **Grid Mapping:** Renders Tip cards matching the active filter.

### 8. Interactive Waste Quiz (`Quiz.jsx`)
* **Multiple-Choice Scenarios:** Evaluates user responses to 15 questions regarding trash classification.
* **Instant Explanations:** Displays a descriptive explanation card explaining why the answer is correct or incorrect.
* **Progress Tracking:** Interactive top progress bar changes width (`%`) based on current question index.
* **Report Summary:** Shows total score, percentage, and tailored advice based on final quiz performance.

### 9. Community Survey Dashboard (`Community.jsx`)
* **Visual Survey Bars:** Renders neighborhood survey results with visual progress bars (e.g. "Do residents compost? 35% Yes").
* **CEP Observations & Gaps:** Outlines field notes, key findings, and action plans collected by the students during their community service audit.

### 10. Field Activity Proof Gallery (`Gallery.jsx`)
* **Interactive Campaign Logs:** Renders pre-logged default field events (beach cleanup, e-waste drive, residential surveys) detailing location, date, descriptions, and participating team members (Sahil, Atul, Shezad).
* **Proof Photo Upload Form:** Allows dynamic upload of fresh campaign photos (using `FileReader` encoding) and activity descriptions, synced in real-time to `localStorage`.
* **Verification & Deletes:** Features delete actions for custom entries and resets to restore original proof data.

---

## 🎓 Viva Questions & Answers (Cheat Sheet for Sahil, Atul, & Shezad)

**Q: Why did you choose React.js instead of plain HTML/CSS/JavaScript?**
> *"React allows us to build reusable components, making the codebase cleaner. It also gives us reactive state-management (using `useState`), so whenever the user logs an item or changes tabs, the UI updates instantly without reloading the entire page."*

**Q: How does the page change without a router?**
> *"We maintain a `currentPage` state in `App.jsx`. We write a custom `renderPage()` function containing a `switch` statement that returns the corresponding component based on `currentPage`. We pass `setCurrentPage` down as props to the Navbar and Footer to trigger tab changes."*

**Q: How did you implement Local Storage in the project?**
> *"We read data on initial load inside our `useState` declaration (`localStorage.getItem(...)`) and write changes using a `useEffect` hook. In this project, we save the user's Dark/Light mode theme and their logged waste items in the tracker."*

**Q: Explain how the theme switcher changes styles without inline styles.**
> *"We define CSS variables under `:root` in `index.css`. When the user clicks the theme button, we set the attribute `data-theme="dark"` on the document element. In the CSS, we redefine those same variables under the `[data-theme='dark']` block. Since all components reference these CSS variables, they adapt automatically."*

**Q: How does the AI Scanner simulation match photos?**
> *"We use HTML5 `FileReader` to preview the image. To keep it client-side without heavy servers, we scan the image file name for keywords like 'battery' or 'bottle' to match them with our `wasteItems` array. If there are no keywords, it simulates a multi-object detection scan, presenting a list of detected items (bottles, tissues, food) and allowing the user to click on any item to view its guide."*

**Q: How is the application made responsive for mobile phones?**
> *"We used CSS Media Queries (`@media`) and dynamic grid styling (`repeat(auto-fit, minmax(280px, 1fr))`). On smaller mobile viewports, the grid columns stack vertically automatically, paddings shrink, and the navbar links slide out via a hamburger menu toggle."*
