# DESIGN_GUIDELINE.md
## Design Guidelines & Component Specification — "Spik" Theme

| | |
|---|---|
| **Project** | School Management System (SMS) |
| **Design System** | Spik (`sp!k`) Visual Standard |
| **Target Viewport** | Desktop First (Responsive Web App) |
| **Primary Font** | Plus Jakarta Sans |

---

## 1. Brand Visual Identity & Tokens

### 1.1 Core Brand Colors
*   **Primary Accent (`spikPurple`):** `#7C3AED`
*   **Active Highlight (`spikPurpleLight`):** `#F3E8FF`
*   **Dashboard Viewport Background (`mainBg`):** `#F8F9FD`
*   **Sidebar & Surface Background:** `#FFFFFF`

### 1.2 Metric Card Pastels (Dashboard Stats Containers)
*   **Students Metric Card:** `#F5EEF8` (Accent: `spikPurple` `#7C3AED`)
*   **Teachers Metric Card:** `#E0F2FE` (Accent: Sky Blue `#0284C7`)
*   **Parents Metric Card:** `#FFEDD5` (Accent: Orange `#EA580C`)
*   **Earnings Metric Card:** `#DCFCE7` (Accent: Emerald Green `#16A34A`)

### 1.3 Card Geometry & Elevation
*   **Standard Dashboard Cards:** `bg-white rounded-[18px] shadow-[0_4_20px_rgba(0,0,0,0.025)]`
*   **Metric Display Cards:** `rounded-[16px] p-5` with soft hover translation (`hover:-translate-y-0.5 transition-transform`)

---

## 2. Typography Hierarchy

Primary Font: **Plus Jakarta Sans**, `sans-serif`

```css
/* Typography Scale */
.text-dashboard-title { font-size: 1.25rem;  font-weight: 700; color: #1E293B; } /* text-xl font-bold */
.text-card-header     { font-size: 0.875rem; font-weight: 700; color: #1E293B; } /* text-sm font-bold */
.text-metric-value    { font-size: 1.5rem;   font-weight: 800; color: #1E293B; } /* text-2xl font-extrabold */
.text-sidebar-item    { font-size: 0.875rem; font-weight: 600; color: #64748B; } /* text-sm font-semibold */
.text-sidebar-sub     { font-size: 0.8125rem;font-weight: 500; color: #94A3B8; } /* text-xs font-medium */
.text-table-header    { font-size: 0.75rem;  font-weight: 600; color: #94A3B8; } /* text-xs font-semibold */
```

---

## 3. Chart & Analytics Visual Specifications

### 3.1 Line Chart (Exam Results & Trends)
*   **Library Engine:** Recharts or Chart.js
*   **Curve Spline:** Spline Tension `0.5`
*   **Dataset 1 (Teachers / Primary):** Line Color `#7C3AED` (`spikPurple`), Stroke Width `3px`
*   **Dataset 2 (Students / Secondary):** Line Color `#38BDF8` (`sky-400`), Stroke Width `3px`
*   **Axes:** No X-axis grid lines; Y-axis formatted with `'k'` suffix (0k to 100k)

### 3.2 Donut Chart (Student Demographics)
*   **Cutout Depth:** `78%` inner cutout ratio
*   **Border Radius:** Rounded segment corners (`borderRadius: 20`)
*   **Segments:** Male = `#7C3AED` (65%), Female = `#F59E0B` (35%)
*   **Center Display:** Absolutely centered layout displaying total count (`15000`) in `text-xl font-extrabold`.
