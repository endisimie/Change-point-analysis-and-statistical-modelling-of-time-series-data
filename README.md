# Change-point-analysis-and-statistical-modelling-of-time-series-data

# 🛢️ Change Point Detection in Brent Oil Prices – Task 1

This repository contains the **foundation work for analyzing structural changes** in historical Brent crude oil prices. The analysis is part of the **10 Academy Week 10 Challenge**, focused on **Bayesian Change Point Detection** to uncover how real-world events affect oil market behavior.

---

## 🎯 Task 1 Objective

The goal of Task 1 is to lay a strong foundation for the full analysis by:
- Planning a data analysis workflow
- Understanding the statistical model and time series properties
- Researching key geopolitical/economic events
- Identifying assumptions and defining communication strategy

---

## 📊 Dataset Information

### 📌 BrentOilPrices.csv
- **Source:** Historical daily prices from 20 May 1987 to 30 Sept 2022
- **Fields:**
  - `Date`: Format `dd-mmm-yy` (converted to datetime)
  - `Price`: Brent crude oil price (USD/barrel)

### 📌 oil_market_events.csv
- **Source:** Compiled manually
- **Fields:**
  - `Event`: Title of the major event
  - `Start Date`: Approximate date of occurrence
  - `Description`: Summary of the event
  - `Price on Event Date`: Brent price on or near the event date

---

## ⚙️ Workflow Overview (Task 1 Requirement)

### Step 1: Load & Clean the Data
- Convert `Date` field to proper datetime
- Sort chronologically
- Handle any missing or invalid entries

### Step 2: Plot Price Trends
- Use `matplotlib` or `seaborn` to plot oil price time series
- Visually identify trends, volatility, and potential change points

### Step 3: Research & Compile Events
- Identify 15+ major events that likely impacted oil prices (e.g., Gulf War, COVID-19)
- Match them to the Brent data using `nearest` date lookup

### Step 4: Analyze Time Series Properties
- Convert prices to **log returns** for stationarity:
  ```python
  df["Log_Returns"] = np.log(df["Price"]) - np.log(df["Price"].shift(1))

# How to run the project
  # Clone repo
git clone https://github.com/your-username/projectname.git
cd brent-task1-foundation

# Setup environment
python -m venv .venv
source .venv/bin/activate     # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run scripts

