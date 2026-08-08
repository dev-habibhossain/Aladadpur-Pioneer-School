# SETUP_AND_PAGEMAP.md
## Directory Map, Setup Commands & Page Routing Engine

| | |
|---|---|
| **Project** | School Management System (SMS) |
| **Total Directory Pages** | 19 Pages across 5 Roles |
| **Build Architecture** | React Router DOM v6 Layout Route Structure |

---

## 1. Global 19-Page Directory Structure Map

### Public Routes
1. Landing Page (`/` -> `index.html`)
2. Login Portal (`/login` -> `login.html`)

### Admin Role Pages (`/admin/*`)
3. Dashboard (`/admin/dashboard` -> `admin-dashboard.html`)
4. Student Directory (`/admin/students` -> `admin-students.html`)
5. Teacher Roster (`/admin/teachers` -> `admin-teachers.html`)
6. Academic Configuration (`/admin/academics` -> `admin-academics.html`)
7. System Attendance Overview (`/admin/attendance` -> `admin-attendance.html`)
8. Institutional Finance (`/admin/finance` -> `admin-finance.html`)

### Teacher Role Pages (`/teacher/*`)
9. Teacher Dashboard (`/teacher/dashboard` -> `teacher-dashboard.html`)
10. Class Attendance (`/teacher/attendance` -> `teacher-attendance.html`)
11. Homework & Assignments (`/teacher/assignments` -> `teacher-assignments.html`)
12. Examinations & Grading (`/teacher/exams` -> `teacher-exams.html`)

### Student Role Pages (`/student/*`)
13. Student Dashboard (`/student/dashboard` -> `student-dashboard.html`)
14. Submissions & Assignments (`/student/assignments` -> `student-assignments.html`)
15. Report Cards & Results (`/student/results` -> `student-results.html`)
16. Personal Attendance Log (`/student/attendance` -> `student-attendance.html`)

### Parent Role Pages (`/parent/*`)
17. Parent Dashboard (`/parent/dashboard` -> `parent-dashboard.html`)
18. Student Fee Payments (`/parent/fees` -> `parent-fees.html`)
19. Child Academic Progress (`/parent/academics` -> `parent-academics.html`)

### Accountant Role Pages (`/accountant/*`)
20. Financial Dashboard (`/accountant/dashboard` -> `accountant-dashboard.html`)
21. Fee Collection & Invoicing (`/accountant/fees` -> `accountant-fees.html`)

---

## 2. Environment Setup Commands & CDN Manifest

### 2.1 External Mockup CDN Imports (`index.html`)
```html
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- Google Fonts: Plus Jakarta Sans -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
<!-- Chart.js Engine -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

### 2.2 Terminal Package Installation Commands

```bash
# Backend Setup
cd backend
npm init -y
npm install express mongoose dotenv cors cookie-parser bcryptjs jsonwebtoken helmet express-rate-limit express-mongo-sanitize multer cloudinary nodemailer pdfkit morgan

# Frontend Setup
cd ../frontend
npm create vite@latest . -- --template react
npm install react-router-dom lucide-react clsx tailwind-merge class-variance-authority react-hook-form zod @hookform/resolvers recharts react-hot-toast @tanstack/react-query axios date-fns @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-select
npm install -D tailwindcss postcss autoprefixer
```
