# SYSTEM_REQUIREMENTS.md
## System Requirements Specification (SRS) — School Management System (SMS)

| | |
|---|---|
| **Project Name** | School Management System (SMS - "Spik Theme") |
| **Document Type** | System Requirements Specification & Architecture Definition |
| **Version** | 2.0.0 |
| **Status** | Approved Specification |

---

## 1. Executive System Overview
The **School Management System (SMS)** is an enterprise web application built on the MERN stack (MongoDB Atlas, Express.js, React 18+, Node.js). It provides administrative, academic, attendance, examination, and financial management tools for educational institutions across 5 distinct system roles (Admin, Teacher, Student, Parent, Accountant).

---

## 2. Complete Technology Stack & Package Inventory

### 2.1 Backend Environment (`/backend`)
*   **Runtime Engine:** Node.js (v18+ LTS)
*   **Core Framework:** `express`
*   **Database & ODM:** `mongoose`
*   **Security & Sanitization:**
    *   `bcryptjs` (Password hashing)
    *   `jsonwebtoken` (Stateless access & refresh token management)
    *   `helmet` (HTTP security headers)
    *   `express-rate-limit` (Brute-force and DDoS rate limiting)
    *   `express-mongo-sanitize` (NoSQL injection prevention)
*   **Storage & Uploads:** `multer` (Multipart form-data processing), `cloudinary` (Cloud asset storage)
*   **Utilities & Services:**
    *   `cookie-parser` (HttpOnly refresh token cookie handling)
    *   `cors` (Cross-Origin Resource Sharing)
    *   `dotenv` (Environment configurations)
    *   `nodemailer` (Transactional email dispatcher)
    *   `pdfkit` (Dynamic PDF report card & payment receipt generator)
    *   `morgan` (HTTP request logger)

### 2.2 Frontend Environment (`/frontend`)
*   **Core Engine:** `react`, `react-dom`, `react-router-dom` (v6+)
*   **State Management & Data Fetching:** `@tanstack/react-query`, `axios`
*   **Styling & UI Engine:**
    *   `tailwind-merge`, `clsx`, `class-variance-authority` (Utility composition)
    *   `lucide-react` (Iconography system)
    *   Radix UI Primitives (`@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@radix-ui/react-select`)
*   **Forms & Validation:** `react-hook-form`, `zod`, `@hookform/resolvers`
*   **Data Visualization & Feedback:** `recharts` (Analytics and charts), `react-hot-toast` (Toast feedback)
*   **Date Processing:** `date-fns`

---

## 3. Role-Based Access Control (RBAC) Matrix

| System Module / Scope | Admin | Teacher | Student | Parent | Accountant |
|---|:---:|:---:|:---:|:---:|:---:|
| **User & Profile Management** | Full CRUD | Self Only | Self Only | Self Only | Self Only |
| **Academic Structure (Sessions, Classes)** | Full CRUD | Read-Only | Read-Only | Read-Only | Read-Only |
| **Attendance Engine** | Full Access | Assign Classes | Own History | Linked Child | No Access |
| **Exam & Grade Management** | Full Access | Assign Subjects | Own Results | Linked Child | No Access |
| **Assignments & Homework** | Full Access | Assign Classes | Submit Work | Read-Only | No Access |
| **Finance & Fee Structure** | Full Access | No Access | Own Invoices | Pay Invoices | Full Access |
| **Library Management** | Full Access | Read Catalog | Issue/Borrow | Read-Only | No Access |
| **Noticeboard & Communication** | Publish All | Class Notices | Read Scope | Read Scope | Read Scope |

---

## 4. Security Architecture & Guardrails
1.  **Authentication Loop:** Short-lived JWT Access Token (15-min lifespan) paired with a long-lived HttpOnly, SameSite=Strict Refresh Token Cookie (7-day lifespan).
2.  **Brute-Force Lockout:** Account locked for 15 minutes following 5 consecutive failed login attempts (`express-rate-limit` + Mongoose model locking).
3.  **Data Sanitization:** Strict MongoDB query sanitization (`express-mongo-sanitize`) to prevent `$gt` NoSQL injection attacks.
4.  **Transport Security:** Forced HTTPS with dynamic HTTP Strict Transport Security (HSTS) headers via `helmet`.
