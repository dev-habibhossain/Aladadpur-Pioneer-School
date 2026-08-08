# PRD.md
## Product Requirements Document (PRD) — School Management System

| | |
|---|---|
| **Product Name** | Spik School Management System (SMS) |
| **Document Version** | 2.0.0 |
| **System Architecture** | Full-Stack MERN (Decoupled REST API & React SPA) |

---

## 1. Executive Product Vision
The **Spik School Management System** simplifies institutional administration through unified role-based workflows. By marrying robust backend data security with a sleek dashboard UI ("Spik Visual Theme"), the system automates academic management, fee processing, attendance verification, and exam reporting into a single platform.

---

## 2. Platform Core Functional Modules

### 2.1 Role-Based Dashboard Ecosystem
*   **Admin Dashboard:** High-level metrics (15.00K Students, 2.00K Teachers, 5.6K Parents, $19.3K Earnings), exam result trends, gender demographics donut chart, star student leaderboard, and system notice feed.
*   **Teacher Dashboard:** Real-time class schedule, student attendance marker, homework submission manager, and exam grade entry portal.
*   **Student Dashboard:** Personal attendance summary, active assignment dropzone, exam score cards, and daily class timetable.
*   **Parent Dashboard:** Multi-child selector, attendance monitoring (<75% alert banner), fee invoice ledger, and direct report card viewer.
*   **Accountant Dashboard:** Revenue tracking, fee structure builder, overdue invoice register, and PDF receipt generator.

---

## 3. Product Success Key Performance Indicators (KPIs)
*   **System Performance:** API response latency stays under 300ms for 95% of requests.
*   **Financial Accuracy:** Zero rounding mismatches in fee collection and partial payment calculation.
*   **Data Integrity:** 100% adherence to database soft-deletion rules for archived students and staff.
*   **UX Accessibility:** Mobile and desktop viewport compatibility across all 19 system pages.
