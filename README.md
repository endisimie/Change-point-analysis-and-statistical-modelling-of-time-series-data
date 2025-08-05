# 🛢️ Brent Oil Change Point Analysis Dashboard

This project analyzes historical Brent crude oil prices to detect significant **structural breaks** using **Bayesian change point modeling (PyMC3)** and visualizes the results through an interactive **Flask + React dashboard**.

> Completed as part of the **10 Academy – Week 10 Challenge**

---

## 📌 Objectives

- Detect **change points** in Brent oil price trends using Bayesian modeling.
- Associate change points with **real-world geopolitical/economic events**.
- Present insights in an interactive dashboard for stakeholders.

---

## 🧭 Task Overview

### ✅ Task 1: Laying the Foundation for Analysis
- Cleaned and structured `BrentOilPrices.csv` and created `oil_market_events.csv` with 15+ major global events.
- Conducted **exploratory data analysis** (EDA) to inspect trends, spikes, and volatility.
- Converted raw prices to **log returns** for stationarity.
- Discussed the purpose and outputs of **Bayesian change point models**.

### ✅ Task 2: Change Point Modeling & Insight Generation
- Modeled log returns in **PyMC3** using a switch function at τ (change point).
- Exported posterior summary of `mu1`, `mu2`, `tau`, and `sigma`.
- Identified a major change in late 2014 (OPEC price war).
- Quantified average return shift and matched it with events.

### ✅ Task 3: Interactive Dashboard Development
- Developed a **Flask backend** that exposes API endpoints for:
  - `/api/data`: oil prices and events
  - `/api/analysis`: model summary (change point info)
- Built a **React frontend** with:
  - Recharts line chart with **change point reference line** and **event markers**
  - Summary cards showing `mu1`, `mu2`, and volatility shift
  - Responsive, CSS-styled UI

---

---

## ⚙️ How to Run the Project

### 🐍 Backend – Flask API

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r ../requirements.txt
python app.py
```
## Frontend – React Dashboard

```bash
cd frontend
npm install
npm run dev

