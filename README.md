# 💸 Expense Tracker Web App

A modern, responsive **Expense Tracker** web application that helps users track daily expenses, visualize spending, and manage finances efficiently.

The app supports **manual cash entry** today and is **designed for future integration with digital payments like UPI**.

---

## 🚀 Features

- ✅ Add, edit, and delete expenses  
- 💾 Persistent data using **LocalStorage**  
- 📊 Category-wise **Pie Chart visualization**  
- 💳 Track expenses by **Payment Mode** (Cash / UPI / Card)  
- 📅 Clearly defined **Expense Date** (no confusion like DOB)  
- 📱 Fully **responsive design** (mobile & desktop)  
- ✨ Smooth expand/collapse container animation  

---

## 🧠 Payment Mode & UPI Thought Process

The app allows users to select a **Payment Mode**:
- Cash
- UPI
- Card

Currently, all expenses are added manually.  
However, the structure is intentionally designed so that **UPI expenses can be auto-tracked in the future**, while cash expenses remain manual — similar to real-world finance apps.

> Due to RBI and NPCI restrictions, direct UPI access is not allowed in web apps.  
> Future integration can be done using SMS parsing, email parsing, or Account Aggregator APIs.

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Flexbox, Media Queries)
- **JavaScript (ES6)**
- **Chart.js** (Data Visualization)
- **LocalStorage** (Client-side persistence)

---



