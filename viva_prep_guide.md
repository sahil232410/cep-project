# EcoTrack – Viva Preparation & Project Guide

This guide compiles everything you need to know about the **EcoTrack** project for your BSc IT Community Engagement Project (CEP) viva presentation. It details **what you have done in the project**, **how it works under the hood**, and **provides answers to common viva questions**.

---

## 1. Project Summary Sheet

*   **Project Title**: “EcoTrack – Waste Management Tracking System for Local Communities”
*   **Tagline**: “Report. Track. Resolve.”
*   **CEP Official Topic**: #44 – “Waste Management Tracking System for Local Bodies”
*   **Target Audience**: Local residential societies, college campuses, and community ward coordinators.
*   **Core Purpose**: Connecting citizens and local bodies by providing a serverless channel to report garbage dumps, track cleaning status, and analyze local waste patterns.

---

## 2. What Has Been Done (Project Contributions)

We took the initial environmental awareness website (*EcoGuide*) and refactored it into a functional **Waste Management Tracking System** (*EcoTrack*) in the following ways:

1.  **Rebranded the Platform**: Refactored the title, descriptions, footer details, and home page styling from *EcoGuide* to *EcoTrack* (using your organic green-cream color palette).
2.  **Created public reporting tool**: Built an interactive **Report Waste** form that captures Location, Waste Type, Description, Date, and image uploads (converting photos into Base64 strings to store in the browser).
3.  **Built an ID Generator**: Wrote an incremental ID builder that automatically parses logged tickets and generates sequential tickets starting from `ET-1001` (EcoTrack-1001).
4.  **Developed visual tracking**: Built a **Track Report** system featuring a dynamic progress timeline (Reported ➔ Under Review ➔ In Progress ➔ Resolved) displaying active loader animations.
5.  **Secured Admin Portal**: Relocated the coordinator view out of the public navbar to a dedicated protected portal (`/admin/` or via the Home page's Waste Dashboard card), protected by a passcode gate (`admin123`).
6.  **Built a Google Form CSV Uploader**: Added a drag-and-drop CSV importer inside the Admin Portal. It parses Google Form response sheets, maps column headers dynamically, and merges external complaints into the dashboard statistics and SVG analytics charts.
7.  **Cleaned the Codebase**: Removed all dead code (like the old `Community` pages) to keep the project clean and fully explainable.

---

---

## 3. How the Project Works (User Flow & Data Lifecycle)

When presenting, you should explain the system as three interconnected operational flows:

### Flow A: The Citizen Flow (Reporting & Tracking)
1.  **Spot & Report**: A resident notices an overflowing garbage dump in the neighborhood. They visit the EcoTrack site, click **Report Waste**, fill in the location and description, and take/upload a photo.
2.  **State Insertion**: On form submission, the browser reads the photo file using `FileReader` and translates it into a Base64 text string. A new report object is built with a sequential ID (e.g. `ET-1004`) and status set to `Reported`.
3.  **Local Sync**: The report is appended to the `reports` array in React state, which immediately updates `localStorage`.
4.  **Instant Tracking**: The resident gets a success screen and is redirected to **Track Report**. By typing `ET-1004`, they see the details of their complaint and a timeline showing that the ticket is in phase 1 (`Reported`).

### Flow B: The Admin/Coordinator Flow (Action & Resolution)
1.  **Secure Login**: The ward supervisor or admin opens `/admin/` (or clicks **Waste Dashboard** on the Home page), enters passcode `admin123`, and accesses the dashboard.
2.  **Status Monitoring**: The dashboard reads all tickets from `localStorage` and visualizes statistics:
    *   *Total complaints vs pending complaints*.
    *   *Resolution Rate progress ring*.
    *   *Waste categories distribution and area hotspot charts*.
3.  **Deploying Crews**: The admin opens `ET-1004` details, reviews the location and photo proof, dispatches a cleaning crew, and changes the status to **In Progress**.
4.  **Resolution Confirmation**: Once the area is cleared, the admin updates the status to **Resolved**. This instantly updates the stats cards and analytics charts in the dashboard and changes the timeline visible to the citizen to "Resolved (Done)".

### Flow C: The Google Form Integration Flow (Field Auditing)
1.  **Form Collection**: During community fieldwork, students survey residents. Instead of loading the full website, residents scan a QR code leading to a standard **Google Form** to report waste dumps.
2.  **Spreadsheet Export**: The submissions are compiled in a Google Sheet. The admin downloads this sheet as a `.csv` file.
3.  **Local Dashboard Import**: Inside the Admin Portal, the admin uploads the `.csv` file. Our JavaScript parser scans the headers, maps columns (mapping *Timestamp*, *Name*, *Location*, etc.), validates against duplicate submissions, and appends the records into the local database list.

---

## 4. Technology Stack & Why We Chose It

*   **Frontend**: React 19 (via Vite)
*   **Styling**: Native CSS (no Tailwind/Bootstrap) supporting Light & Dark themes.
*   **Icons**: `lucide-react`
*   **Storage**: `localStorage` (for persistent data) and `sessionStorage` (for login session).
*   **Data Format**: JSON (internal state) and CSV (Google Form imports).

> **Viva Answer (Why this stack?):**
> *"We chose React for its component-based architecture and state-lifting capabilities, which make it easy to bind forms, lists, and charts dynamically. We chose a serverless/client-side storage design (localStorage) because it is perfect for a local community project. It does not require hosting database servers or APIs, allowing any local coordinator to run the portal fully offline on their laptop during a field visit, which is a major advantage for local bodies with limited IT infrastructure."*

---

## 4. Three-Member Project Division

If the examiners ask **"Who did what in this project?"**, here is your clear division:

### 👤 Member 1 (Sahil): Frontend & UI UX
*   **Role**: Responsible for the visual system, layout, and responsive design.
*   **What to say**: *"I developed the Home page layout, rebuilt the hero banner with our custom organic color palette, relocated the dark mode toggle button next to the About tab inside the navigation bar, and styled all responsive overrides so that the site works on mobile and tablets."*

### 👤 Member 2 (Atul): Core Reporting & Tracking
*   **Role**: Responsible for citizen-facing tools.
*   **What to say**: *"I developed the Report Waste form component, the Base64 image reader for photo uploads, and the incremental ID generator. I also built the Track Report page and mapped the visual progress timeline using CSS node lines and loader animations based on the ticket's active status."*

### 👤 Member 3 (Shezad): Admin Portal & Data Integration
*   **Role**: Responsible for backend-simulations and data inputs.
*   **What to say**: *"I created the passcode-gated Admin Portal and mapped the statistics summary cards. I developed the CSV parser that reads Google Form response sheets and imports them, as well as the SVG resolution ring and horizontal location bar charts inside the Analytics panel."*

---

## 5. Potential Technical Viva Questions

### Q1: How are reports saved since there is no backend database?
**Answer**: We use the browser's `localStorage` API. In [App.jsx](file:///c:/Users/HP/OneDrive/Desktop/tp/cep-project/src/App.jsx), we initialize our `reports` state by reading from local storage. Whenever a report is submitted in `ReportWaste` or updated in `AdminDashboard`, React updates the state, and a `useEffect` hook synchronizes this state back into local storage as a stringified JSON array.

### Q2: How does the Google Form CSV import work?
**Answer**: In [AdminDashboard.jsx](file:///c:/Users/HP/OneDrive/Desktop/tp/cep-project/src/components/AdminDashboard.jsx), we use a standard `FileReader` to read the uploaded `.csv` file.
*   First, we split the file by lines and use a helper function (`parseCSVLine`) to split cells while handling commas enclosed inside quotation marks.
*   Second, we read the header row and dynamically detect column indices using keywords (e.g. mapping any column containing the word "location" to the location field).
*   Third, we loop through the rows, construct a standard `ET-XXXX` report object, and merge it with our main `reports` state.

### Q3: How did you implement photo upload without a database server?
**Answer**: We used a standard HTML `<input type="file" accept="image/*">`. When an image is selected, we use the JavaScript `FileReader` API (`readAsDataURL`) to read the image file and convert it into a **Base64 encoded string**. This text string represents the image data directly and can be safely saved inside our JSON objects in `localStorage`. When rendering the page, we pass this string directly into the `src` attribute of an `<img>` tag.

### Q4: Explain the routing system you are using.
**Answer**: Since this is a single-page application (SPA), we did not import heavy routing libraries. Instead, we use state-based rendering. We define a `currentPage` state in `App.jsx`. Our navigation links change this state (e.g., setting it to `report-waste`), and a `switch` case inside `renderPage()` conditionally renders the correct component. This keeps the bundle size small and simple.

### Q5: How does the Waste Segregation Quiz function under the hood?
**Answer**: In [Quiz.jsx](file:///c:/Users/HP/OneDrive/Desktop/tp/cep-project/src/components/Quiz.jsx), the component uses several React state variables to manage the game flow:
*   `currentQuestion` tracks the index of the active question (out of the questions in `quizQuestions.js`).
*   `score` increments by 1 whenever the selected option matches the question's `correctAnswer` index.
*   `selectedAnswer` stores the user's selection. Once selected, it instantly highlights the options (green for correct, red for wrong), shows the explanation block, and uses a `setTimeout` callback to auto-advance to the next question after a 1.2-second delay (providing quick visual feedback without requiring a 'Next' button click).
*   `quizFinished` triggers the results dashboard once the user answers the final question. It displays their correct percentage and an eco-ranking badge, with a restart action to reset all states back to 0.

---

## 6. Potential Domain & CEP Viva Questions

### Q1: How does this project help "Local Bodies" (Topic #44)?
**Answer**: Local municipal bodies often lack the budget to set up complex, real-time GPS tracking systems. EcoTrack provides a zero-cost, lightweight alternative:
1.  It empowers citizens to report issues with photographic evidence and description.
2.  It gives municipal coordinators a dashboard to organize cleanup schedules.
3.  Its analytics help local bodies identify waste hotspots (e.g. XYZ Garden or ABC Road) so they can allocate larger bins or deploy extra workers to those areas.

### Q2: Why is source segregation important in waste management?
**Answer**: Waste segregation must happen at the source (homes and shops) because once wet kitchen waste mixes with dry recyclable waste (like cardboard or paper), the recyclables get soiled and lose their recycling value. EcoTrack addresses this by integrating a **Waste Finder** search tool directly on the home page so residents can instantly check where to dispose of items like batteries or vegetable peels.

### Q3: How will you collect real community feedback?
**Answer**: We have created a Google Form containing survey questions on local waste segregation habits and open-dumping issues. We distributed this form to 150 local residents and shopkeepers. Their submissions are downloaded as a CSV and uploaded directly into our Admin Portal, allowing us to review observations and construct local action plans based on real numbers.
