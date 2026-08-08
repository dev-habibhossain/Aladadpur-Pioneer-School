# USER_FLOW.md
## User Flow & System Decision Trees

| | |
|---|---|
| **Project** | School Management System (SMS) |
| **Document Type** | Logical User Flow Specification |

---

## 1. Authentication & Role Routing Loop

```
                     [ Public Landing / Login Page ]
                                   │
                           ( Submit Credentials )
                                   │
                                   ▼
                       [ POST /api/v1/auth/login ]
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
          ( Validation Failure )         ( Auth Success )
                    │                             │
                    ▼                             ▼
           [ Error Toast Display ]     [ Set HttpOnly Cookie ]
                    │                             │
            ( Retry Count >= 5 )                  ▼
                    │                   [ Issue JWT Access Token ]
                    ▼                             │
          [ Account Lock 15 Min ]                 ▼
                                        [ Evaluate User Role ]
                                                  │
         ┌──────────────┬──────────────┬──────────┴───┬──────────────┐
         ▼              ▼              ▼              ▼              ▼
     [ Admin ]      [ Teacher ]    [ Student ]     [ Parent ]   [ Accountant ]
         │              │              │              │              │
         ▼              ▼              ▼              ▼              ▼
    /admin/dash   /teacher/dash  /student/dash  /parent/dash  /accountant/dash
```

---

## 2. Teacher Attendance Workflow Flowchart

```
[ Teacher Dashboard ] ──> Select "Take Attendance" ──> Choose Class & Section
                                                              │
                                                              ▼
                                                 Fetch Student Roster (API)
                                                              │
                                                              ▼
                                                 Mark Present / Absent / Late
                                                              │
                                                              ▼
                                                  Submit Attendance Record
                                                              │
                                    ┌─────────────────────────┴────────────────────────┐
                                    ▼                                                  ▼
                        ( Today's Date Verified )                           ( Past Date Override )
                                    │                                                  │
                                    ▼                                                  ▼
                          [ DB Record Saved ]                              [ Requires Admin Override ]
```
