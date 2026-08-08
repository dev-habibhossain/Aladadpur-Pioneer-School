# API_SPECIFICATION.md
## REST API Specification — School Management System (SMS)

| | |
|---|---|
| **Base URL** | `/api/v1` |
| **Authentication** | Bearer Access Token (Header) + HttpOnly Refresh Token (Cookie) |
| **API Version** | v1.0.0 |

---

## 1. Response Envelope Formats

### 1.1 Standard Single Data Payload
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": {
    "_id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Evelyn Harper",
    "admissionNumber": "PRE43178",
    "status": "active"
  }
}
```

### 1.2 Paginated List Payload
```json
{
  "success": true,
  "count": 25,
  "pagination": {
    "page": 1,
    "limit": 25,
    "totalPages": 4,
    "totalRecords": 87
  },
  "data": []
}
```

---

## 2. API Endpoint Directory

### Authentication Endpoints (`/auth`)
*   `POST /auth/login` - Authenticate credentials, set HttpOnly cookie, return JWT access token.
*   `POST /auth/refresh-token` - Refresh access token using HttpOnly cookie.
*   `POST /auth/logout` - Clear refresh cookie & invalidate active session.
*   `GET /auth/me` - Fetch profile data of currently authenticated user.

### User & Student Management (`/users`, `/students`)
*   `GET /students` - Query student directory (supports class, section, status filters).
*   `POST /students` - Enroll new student & construct auth profile.
*   `GET /students/:id` - Fetch student profile data.
*   `PATCH /students/:id` - Update student profile attributes.
*   `PATCH /students/:id/status` - Execute soft-delete status update (active/inactive/graduated).

### Attendance Engine (`/attendance`)
*   `POST /attendance` - Submit daily attendance list for a class section.
*   `GET /attendance` - Fetch attendance records (supports class, date range filters).

### Fee & Financial System (`/fees`, `/invoices`, `/payments`)
*   `POST /fee-structures` - Define fee schedules per class/session.
*   `GET /invoices/student/:studentId` - Fetch student invoice history.
*   `POST /payments` - Record payment transaction against an invoice.
*   `GET /payments/receipt/:paymentId` - Stream generated PDF receipt document.
