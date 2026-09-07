# Rudra Prakash Yadav — Interactive Cinematic Portfolio

> **"An interactive cinematic comic-book journey of a Computer Science student becoming a software engineer."**

A premium, futuristic, and recruiter-ready personal portfolio website engineered specifically for **Rudra Prakash Yadav**, based on his uploaded 8-Chapter Comic Story, CV / Resume, and personal photos.

---

## 🌟 Key Features

1. **Cinematic Hero Landing**:
   - High-fidelity dark aesthetics with glowing electric cyan/blue neon accents.
   - Dynamic HTML5 Canvas particle network reacting to cursor physics and clicks.
   - Interactive live typing code terminal cycling Rudra's mantras:
     - `print("Building ideas")`
     - `print("Solving problems")`
     - `print("Learn every day")`
     - `print("Make an impact")`
   - Hero portrait with cyberpunk frame and status indicators.

2. **8-Chapter Comic Story Explorer**:
   - Chapter 01: *The Spark* (Introduction)
   - Chapter 02: *The Foundation* (Education @ LPU & LPS)
   - Chapter 03: *The Arsenal* (Skills & Tech Stack)
   - Chapter 04: *The Crucible* (Continuous Learning & DSA)
   - Chapter 05: *The Inventions* (AI Toxicity Detector & Smart Luggage Trolley)
   - Chapter 06: *The Arena* (GeeksforGeeks Hackathon 2026)
   - Chapter 07: *The Mastery* (Infosys AI/ML & Python Certifications)
   - Chapter 08: *The Horizon* (Career Goal & Impact)
   - Interactive modal reader with keyboard arrow navigation and chapter dots.

3. **Interactive Project Demonstrators**:
   - **AI Toxicity Detector**: Includes a live in-browser NLP text analyzer widget simulating transformer predictions, latency metrics, and toxicity classification.
   - **Smart Luggage Trolley**: Includes an interactive autonomous radar telemetry visualizer with switchable Follow Mode, obstacle detection, and anti-theft buzzer triggers.

4. **Filterable Skills Matrix**:
   - Categories: Languages, Frameworks, Databases, Cloud & DevOps, Developer Tools, Core CS, Soft Skills, and AI / LLMs.

5. **Interactive Developer Terminal Shell**:
   - Built-in terminal allowing recruiters to run commands (`help`, `whoami`, `skills`, `projects`, `education`, `certs`, `story`, `contact`, `sudo hire`, `clear`).

6. **Recruiter Ready & CV Download**:
   - Instant formatted CV viewer modal with print and direct image download.
   - Direct links to verified LinkedIn, GitHub, Email, and Phone.
   - Audio feedback toggle for subtle futuristic sound effects.

---

## 🚀 How to Run Locally

### Option 1: Direct File Open
Simply double-click `index.html` or open it with any web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).

### Option 2: Run Built-in PowerShell Web Server
In PowerShell, navigate to the folder and run:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
This will start a local server at `http://localhost:3000/` and open it in your browser.

---

## 📦 Deployment to GitHub Pages or Vercel

### To Deploy on GitHub Pages:
1. Initialize git in this directory:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a repository on GitHub (e.g., `rudraprakashyadav.github.io` or `portfolio`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/rudraprakashyadav/portfolio.git
   git push -u origin main
   ```
4. In your GitHub repository settings, enable **GitHub Pages** from the `main` branch root.

### To Deploy on Vercel:
1. Run `npx vercel` or link your GitHub repository on [Vercel Dashboard](https://vercel.com).
2. It will deploy automatically with zero configuration!

---

## 📂 Project Structure

```
rudra-portfolio/
├── index.html                  # Master Single Page Application
├── server.ps1                  # Local lightweight HTTP server
├── README.md                   # Documentation & guide
└── assets/
    ├── css/
    │   └── style.css           # Glassmorphism, animations, cyber glowing effects
    ├── js/
    │   ├── app.js              # Main UI controller, live demos, audio effects
    │   ├── particles.js        # Canvas particle network physics engine
    │   └── terminal.js         # Interactive developer terminal shell
    └── images/
        ├── comic-journey.jpg   # Original 8-chapter comic graphic
        ├── cv-resume.jpg       # Original verified resume
        ├── profile-hero.jpg    # Cropped hero portrait
        ├── profile-achievement.jpg
        ├── panel-1-intro.jpg
        ├── panel-2-education.jpg
        ├── panel-3-skills.jpg
        ├── panel-4-learning.jpg
        ├── panel-5-projects.jpg
        ├── panel-6-achievements.jpg
        ├── panel-7-certifications.jpg
        └── panel-8-goal.jpg
```
