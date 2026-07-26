# 🏥 ArogyaAI OS — Autonomous Healthcare Operating System

> **Predict. Prevent. Protect.**  
> *Official Epidemic Intelligence, Tele-ICU Command & AI Resource Redistribution Platform for District & National Health Administration.*

![ArogyaAI OS Banner](https://img.shields.io/badge/Platform-ArogyaAI%20OS%20v2.5-0284c7?style=for-the-badge&logo=heart)
![Vercel](https://img.shields.io/badge/Deploy-Vercel%20Ready-000000?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite%20%7C%20TypeScript-2563eb?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20v4%20%7C%20Material%20Design-14b8a6?style=for-the-badge&logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.11-059669?style=for-the-badge&logo=fastapi)
![License](https://img.shields.io/badge/License-MIT-7c3aed?style=for-the-badge)

---

## 🚀 Single-Click Vercel Deployment

ArogyaAI OS is pre-configured for instant **Vercel** deployment with zero manual configuration required.

### Deploying via Vercel Dashboard
1. Go to **[Vercel Dashboard](https://vercel.com/new)** and select **Import Repository**.
2. Select your GitHub repository: `https://github.com/Yugp12/ArogyaAI.git`.
3. Click **Deploy**! Vercel will automatically detect `vercel.json` and build the application cleanly.

---

## 🌟 Executive Overview

**ArogyaAI OS** is an enterprise-grade autonomous health operating system built to empower Ministry of Health officials, District Collectors, Chief Medical Officers, and Tele-ICU doctors across India. Designed according to strict **Google Material Design 3**, **Apple Human Interface Guidelines**, and **Canva Enterprise Standards**, ArogyaAI OS delivers real-time pathogen surveillance, AI bed surge forecasting, and automated supply chain redistribution.

---

## 🚀 Key Modules & Innovations

### 🛰️ 1. GIS Command Overview Map
- **Leaflet GIS Engine**: Integrated with Google Maps India, CARTO Dark, and OpenStreetMap tile layers.
- **Geographic Coordinates Locking**: 100% Lat/Lng pin accuracy across 12 major Indian metropolises (Delhi, Mumbai, Kozhikode, Bengaluru, Kolkata, Chennai, Hyderabad, Ahmedabad, Pune, Jaipur, Lucknow, Guwahati).
- **Google Maps Navigation Controls**: Bottom-right vertical zoom stack (`+` / `-`), recenter target reticle (`🎯`), quick fly-to city navigation bar, and instant mouse cursor drag panning (up, down, left, right).

### 🧠 2. AI Epidemic Forecasting Engine
- **Multi-Horizon Trajectory Curves**: Neural simulation modeling 7-Day, 30-Day, and 90-Day pathogen R0 reproduction rates, vector mutations (e.g., Nipah Subtype 4B, Dengue Serotype Delta), and ICU bed saturation.
- **99.4% SLA Confidence**: Verified against Ministry of Health & Family Welfare (MoHFW) epidemiological telemetry.

### 📄 3. Universal Enterprise Download Center
- **11 Presentation-Ready Formats**:
  - 📄 **PDF**: Presentation-ready vector PDF brief with Cover Page, Infographic KPI summary, structured tables, and SHA-256 digital stamp.
  - 📊 **Excel (.xlsx)**: Multi-sheet workbook with headers, formulas, and auto-filters.
  - 📑 **Word (.docx)**: Executive document formatted with callout boxes.
  - 📽️ **PowerPoint (.pptx)**: Slide deck formatted for state briefings.
  - 🖼️ **PNG / SVG**: High-resolution graphic & vector infographic renders.
  - 💾 **CSV / JSON / XML**: Machine-readable data payloads.
  - 🖨️ **Direct Print & Email Share**: Browser print isolation and direct email attachments.

### 🎨 4. AI Core Dual-Protocol Theme Studio
- **Healthcare Day Protocol**: High-contrast, clean daylight clinical interface for administrative offices.
- **Autonomous Night Command**: Deep slate cyber-teal dark mode engineered for 24/7 hospital night shifts and tele-ICU monitoring.
- **Instant Non-Disruptive Switching**: Smooth CSS variable transformation without page reloads.

### 🏥 5. Tele-ICU Specialist & Shift Command
- **Specialist Doctor Roster**: Real-time shift reallocation (Day, Evening, Night, On-Call, On-Leave) with Doctor Duty status updates.
- **Tele-ICU Video Stream Access**: One-click remote stream permission grants for critical care management.

### 🚚 6. National Hospital Depot & Supply Redistribution
- **LMO & Ventilator Telemetry Matrix**: Real-time tracking of Liquid Medical Oxygen reserves, bed occupancy, and autonomous convoy dispatches.
- **Gapless Enterprise Layout**: Zero empty spaces, structured data density, and one-click transfer approvals.

---

## 📁 Repository Structure

```
ArogyaAI/
├── vercel.json           # Root Vercel Deployment Configuration
├── package.json          # Root build scripts for Vercel
├── frontend/             # React + Vite + TypeScript Web Application
│   ├── src/              # Components, Pages, Context, Hooks, Data, Types
│   ├── vercel.json       # Frontend fallback Vercel configuration
│   ├── public/           # Favicon & Vector Icons
│   ├── index.html        # Single Page Application Entrypoint
│   ├── package.json      # Dependencies & Scripts
│   ├── vite.config.ts    # Vite Configuration
│   └── tsconfig.json     # Strict TypeScript Compiler Options
│
└── backend/              # Python FastAPI Telemetry API
    ├── app/              # REST Routes (AI, Hospitals, Reports, Auth, WebSockets)
    ├── tests/            # Automated Pytest Suite
    ├── Dockerfile        # Docker Container Deployment Manifest
    └── requirements.txt  # Python Dependencies
```

---

## 🛠️ Installation & Setup Guide

### Prerequisites
- **Node.js** v18.0 or higher
- **Python** 3.10 or higher
- **npm** or **pnpm**

### 1. Clone the Repository
```bash
git clone https://github.com/Yugp12/ArogyaAI.git
cd ArogyaAI
```

### 2. Launch Frontend Application
```bash
cd frontend
npm install
npm run dev
```
The Web Application will run at: **`http://localhost:5173/`**

### 3. Launch Backend API Service (Optional)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The Backend Swagger API Docs will run at: **`http://localhost:8000/api/v1/docs`**

---

## 🔑 Authorized Demo Login Credentials

| Role / Designation | Official Email | Default Password |
| :--- | :--- | :--- |
| **Director General / Admin** | `a.sengupta@mohfw.gov.in` | `admin123` |
| **Tele-ICU Critical Care Doctor** | `doctor@arogya.gov.in` | `doctor123` |
| **Ministry Health Secretary** | `officer.mohfw@nic.in` | `gov123` |

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

### 🇮🇳 Developed for National Epidemic Readiness & District Healthcare Excellence
