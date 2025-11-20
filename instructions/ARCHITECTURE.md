# 🏗️ System Architecture - Expense Tracker

## Overview

This document provides a comprehensive view of the Expense Tracker application architecture.

## 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React Frontend (http://localhost:5173)                  │   │
│  │  - Components (UI Elements)                               │   │
│  │  - Pages (Route Views)                                    │   │
│  │  - Services (API Calls)                                   │   │
│  │  - Utils (Helper Functions)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST API
┌─────────────────────────────────────────────────────────────────┐
│                        SERVER LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express Backend (http://localhost:5000)                 │   │
│  │  ┌────────────┐  ┌────────────┐  ┌──────────────┐      │   │
│  │  │  Routes    │→│ Middleware │→│ Controllers │       │   │
│  │  └────────────┘  └────────────┘  └──────────────┘      │   │
│  │         ↓              ↓                ↓                │   │
│  │  ┌────────────────────────────────────────────────┐     │   │
│  │  │           Models (Mongoose)                    │     │   │
│  │  └────────────────────────────────────────────────┘     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ MongoDB Driver
┌─────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  MongoDB (mongodb://localhost:27017)                     │   │
│  │  Database: expense-tracker                               │   │
│  │  Collection: expenses                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### Example: Creating a New Expense

```
1. User fills form in ExpenseForm.jsx
   ↓
2. handleAddExpense() called in ExpenseTracker.jsx
   ↓
3. addExpense() in ExpenseService.js
   ↓
4. fetch() POST request to /api/expenses
   ↓
5. Express server receives request at expenseRoutes.js
   ↓
6. Validation middleware (validateRequest.js)
   ↓
7. createExpense() in expenseController.js
   ↓
8. new Expense() creates Mongoose model
   ↓
9. expense.save() saves to MongoDB
   ↓
10. Response sent back through layers
   ↓
11. Frontend updates state and UI
```

## 📁 Detailed Component Architecture

### Frontend Structure

```
src/
├── components/              # Reusable UI Components
│   ├── ExpenseForm.jsx     # Form for adding expenses
│   │   • Form validation
│   │   • State management
│   │   • Submit handler
│   │
│   ├── ExpenseList.jsx     # Display expenses in table
│   │   • Expense listing
│   │   • Delete functionality
│   │   • Empty state
│   │
│   ├── ExpenseSummary.jsx  # Category summaries
│   │   • Total calculation
│   │   • Category breakdown
│   │   • Color-coded display
│   │
│   ├── ChartComponent.jsx  # Pie chart visualization
│   │   • Recharts integration
│   │   • Interactive tooltips
│   │   • Responsive design
│   │
│   └── Shuffle.jsx         # Animated text effect
│       • GSAP animation
│       • Hover effects
│
├── pages/                   # Page-level Views
│   └── ExpenseTracker.jsx  # Main application page
│       • State management
│       • Component composition
│       • Data fetching
│       • Event handling
│
├── services/                # API Communication Layer
│   └── ExpenseService.js   # API calls to backend
│       • getExpenses()
│       • addExpense()
│       • deleteExpense()
│       • updateExpense()
│       • getExpensesByCategory()
│       • getTotalExpenses()
│
└── utils/                   # Helper Functions
    └── constants.js        # Shared constants
        • CATEGORIES array
        • getCategoryColor()
        • getCategoryColorHex()
```

### Backend Structure

```
backend/
├── server.js               # Application Entry Point
│   • Express app setup
│   • Middleware configuration
│   • Route mounting
│   • Database connection
│   • Error handling
│   • Server startup
│
├── config/
│   └── database.js        # MongoDB Configuration
│       • Connection setup
│       • Error handling
│       • Event listeners
│       • Graceful shutdown
│
├── models/
│   └── Expense.js         # Data Model
│       • Schema definition
│       • Validation rules
│       • Indexes
│       • Instance methods
│       • Static methods
│       • Middleware hooks
│
├── controllers/
│   └── expenseController.js  # Business Logic
│       • getAllExpenses()
│       • getExpenseById()
│       • createExpense()
│       • updateExpense()
│       • deleteExpense()
│       • getExpensesByCategory()
│       • getTotalExpenses()
│       • getExpenseStatistics()
│
├── routes/
│   └── expenseRoutes.js   # API Endpoint Definitions
│       • Route definitions
│       • Validation rules
│       • Controller mapping
│       • HTTP method handling
│
├── middleware/
│   ├── errorHandler.js    # Global Error Handler
│   │   • Catch all errors
│   │   • Format error responses
│   │   • Log errors
│   │
│   ├── notFound.js        # 404 Handler
│   │   • Catch undefined routes
│   │   • Return 404 response
│   │
│   └── validateRequest.js # Input Validation
│       • Validate request data
│       • Format validation errors
│       • Return error response
│
└── utils/
    └── constants.js       # Shared Constants
        • CATEGORIES
        • STATUS_CODES
        • PAGINATION
```

## 🔌 API Endpoints

### Expense Operations

| Method | Endpoint            | Controller     | Description                   |
| ------ | ------------------- | -------------- | ----------------------------- |
| GET    | `/api/expenses`     | getAllExpenses | Get all expenses with filters |
| GET    | `/api/expenses/:id` | getExpenseById | Get single expense            |
| POST   | `/api/expenses`     | createExpense  | Create new expense            |
| PUT    | `/api/expenses/:id` | updateExpense  | Update expense                |
| DELETE | `/api/expenses/:id` | deleteExpense  | Delete expense                |

### Summary Operations

| Method | Endpoint                            | Controller            | Description         |
| ------ | ----------------------------------- | --------------------- | ------------------- |
| GET    | `/api/expenses/summary/statistics`  | getExpenseStatistics  | Get complete stats  |
| GET    | `/api/expenses/summary/by-category` | getExpensesByCategory | Get category totals |
| GET    | `/api/expenses/summary/total`       | getTotalExpenses      | Get total amount    |

### Utility Endpoints

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/api/health` | Server health check |
| GET    | `/api`        | API information     |

## 🗄️ Database Schema

```javascript
Expense Schema {
  // Required Fields
  amount: {
    type: Number,
    required: true,
    min: 0.01,
    validation: > 0
  },

  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Shopping', 'Bills',
           'Entertainment', 'Healthcare', 'Education', 'Other']
  },

  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },

  date: {
    type: Date,
    required: true,
    default: Date.now,
    validation: not in future
  },

  // Auto-generated
  createdAt: Date,
  updatedAt: Date
}

// Indexes
- date: -1 (descending)
- category: 1 (ascending)
- amount: -1 (descending)
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────┐
│  Input Validation (Frontend)           │
│  - Form validation                      │
│  - Type checking                        │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Request Validation (Backend)           │
│  - express-validator                    │
│  - Schema validation                    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  Database Validation (Mongoose)         │
│  - Schema validation                    │
│  - Type casting                         │
│  - Custom validators                    │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│  MongoDB                                │
│  - Data persistence                     │
└─────────────────────────────────────────┘
```

## 🛡️ Error Handling Flow

```
Error Occurs
    ↓
Try-Catch Block (Controller)
    ↓
Error Handler Middleware
    ↓
┌─────────────────────────────────┐
│  Error Type Classification      │
├─────────────────────────────────┤
│ • Validation Error → 400        │
│ • Not Found → 404               │
│ • Cast Error → 400              │
│ • Duplicate Key → 400           │
│ • Other → 500                   │
└─────────────────────────────────┘
    ↓
Formatted Error Response
    ↓
Client Receives Error
```

## 📡 Data Flow Diagram

### Creating an Expense

```
Frontend                  Backend                  Database
   │                         │                         │
   │  POST /api/expenses     │                         │
   ├────────────────────────>│                         │
   │                         │  Validate Input         │
   │                         ├──────────────┐          │
   │                         │              │          │
   │                         │<─────────────┘          │
   │                         │                         │
   │                         │  Create Model           │
   │                         ├──────────────┐          │
   │                         │              │          │
   │                         │<─────────────┘          │
   │                         │                         │
   │                         │   Save Document         │
   │                         ├────────────────────────>│
   │                         │                         │
   │                         │   Document Saved        │
   │                         │<────────────────────────┤
   │                         │                         │
   │   Response (201)        │                         │
   │<────────────────────────┤                         │
   │                         │                         │
   │  Update UI              │                         │
   ├──────────┐              │                         │
   │          │              │                         │
   │<─────────┘              │                         │
```

## 🔄 State Management Flow

```
                    User Action
                        ↓
              ┌─────────────────┐
              │  React Event    │
              │   Handler       │
              └─────────────────┘
                        ↓
              ┌─────────────────┐
              │  Service Layer  │
              │  (API Call)     │
              └─────────────────┘
                        ↓
              ┌─────────────────┐
              │  Backend API    │
              └─────────────────┘
                        ↓
              ┌─────────────────┐
              │  Database       │
              └─────────────────┘
                        ↓
              ┌─────────────────┐
              │  Response       │
              └─────────────────┘
                        ↓
        ┌───────────────────────────┐
        │  Update React State       │
        │  (useState hook)          │
        └───────────────────────────┘
                        ↓
        ┌───────────────────────────┐
        │  Re-render Components     │
        │  - ExpenseList            │
        │  - ExpenseSummary         │
        │  - ChartComponent         │
        └───────────────────────────┘
```

## 🎨 Component Hierarchy

```
ExpenseTracker (Page)
│
├── Header
│   └── Shuffle (Animated Title)
│
├── Main Content (Grid Layout)
│   │
│   ├── Left Column
│   │   ├── ExpenseForm
│   │   │   ├── Amount Input
│   │   │   ├── Category Select
│   │   │   ├── Date Input
│   │   │   ├── Description Input
│   │   │   └── Submit Button
│   │   │
│   │   └── ExpenseList
│   │       └── ExpenseItem (repeated)
│   │           ├── Amount Display
│   │           ├── Category Badge
│   │           ├── Description
│   │           ├── Date
│   │           └── Delete Button
│   │
│   └── Right Column
│       └── ExpenseSummary
│           ├── Total Display
│           └── Category List
│               └── CategoryItem (repeated)
│                   ├── Category Name
│                   ├── Amount
│                   └── Color Indicator
│
├── ChartComponent
│   └── Pie Chart (Recharts)
│       └── Category Segments
│
└── Footer
```

## 🔧 Middleware Pipeline

```
Incoming Request
      ↓
┌─────────────────┐
│  CORS           │  Allow cross-origin requests
└─────────────────┘
      ↓
┌─────────────────┐
│  Body Parser    │  Parse JSON/URL-encoded
└─────────────────┘
      ↓
┌─────────────────┐
│  Morgan Logger  │  Log HTTP requests
└─────────────────┘
      ↓
┌─────────────────┐
│  Route Handler  │  Match route
└─────────────────┘
      ↓
┌─────────────────┐
│  Validation     │  Validate input
└─────────────────┘
      ↓
┌─────────────────┐
│  Controller     │  Business logic
└─────────────────┘
      ↓
┌─────────────────┐
│  Error Handler  │  Catch errors (if any)
└─────────────────┘
      ↓
Response to Client
```

## 📊 Technologies & Their Roles

| Layer           | Technology           | Purpose                 |
| --------------- | -------------------- | ----------------------- |
| **Frontend UI** | React 19             | Component-based UI      |
| **Styling**     | Tailwind CSS 4       | Utility-first styling   |
| **Charts**      | Recharts             | Data visualization      |
| **Animation**   | GSAP & Framer Motion | UI animations           |
| **Build Tool**  | Vite                 | Fast dev server & build |
| **Backend**     | Express.js           | Web framework           |
| **Runtime**     | Node.js              | JavaScript runtime      |
| **Database**    | MongoDB              | NoSQL database          |
| **ODM**         | Mongoose             | MongoDB modeling        |
| **Validation**  | express-validator    | Input validation        |
| **CORS**        | cors                 | Cross-origin requests   |
| **Logging**     | morgan               | HTTP logging            |
| **Environment** | dotenv               | Config management       |

## 🚀 Deployment Architecture (Future)

```
┌──────────────────────────────────────────────────────────┐
│                     Production                            │
│                                                           │
│  Frontend (Vercel/Netlify)                               │
│  ├─ Static Assets (CDN)                                  │
│  └─ React App (SSR/SSG)                                  │
│                     ↓ HTTPS                              │
│                                                           │
│  Backend (Heroku/Railway)                                │
│  ├─ Express Server                                       │
│  ├─ API Endpoints                                        │
│  └─ Environment Variables                                │
│                     ↓ Encrypted                          │
│                                                           │
│  Database (MongoDB Atlas)                                │
│  ├─ Replica Set                                          │
│  ├─ Auto-scaling                                         │
│  └─ Backups                                              │
└──────────────────────────────────────────────────────────┘
```

## 📈 Performance Optimizations

### Frontend

- ✅ Code splitting (Vite)
- ✅ Tree shaking
- ✅ Component lazy loading potential
- ✅ Optimized re-renders

### Backend

- ✅ Database indexing
- ✅ Query optimization
- ✅ Connection pooling (Mongoose)
- ✅ Response compression potential

### Database

- ✅ Indexed fields (date, category, amount)
- ✅ Aggregation pipelines
- ✅ Lean queries (when appropriate)

## 🔍 Monitoring Points

- Server health: `GET /api/health`
- Request logging: Morgan middleware
- Error logging: Console + error handler
- Database connection status: Connection events

---

This architecture provides a scalable, maintainable, and production-ready application structure! 🚀
