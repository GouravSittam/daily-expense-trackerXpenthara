<div align="center">

# 💰 TrackWise - Brutalist Expense Tracker

### _Track your finances with cyber-brutalist style and power_

A stunning full-stack expense tracking application featuring brutalist design, user authentication, real-time sync, offline support, and immersive 3D backgrounds.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

[Live Demo](https://trackwise-penthara.vercel.app) • [Backend API](https://trackwise-penthara-backend.vercel.app) • [Report Bug](https://github.com/GouravSittam/daily-expense-trackerXpenthara/issues) • [Request Feature](https://github.com/GouravSittam/daily-expense-trackerXpenthara/issues)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎯 Core Features

- 🔐 **User Authentication** - Secure login & registration with JWT
- 📝 **Smart Expense Entry** - Quick form with validation
- 🔍 **Advanced Filtering** - By category, date range
- 🔄 **Flexible Sorting** - Date, amount, or category
- 💰 **Live Summaries** - Real-time category totals
- 📊 **Visual Analytics** - Interactive charts & graphs
- 📱 **Fully Responsive** - Perfect on any device

</td>
<td width="50%">

### ⚡ Advanced Features

- 🎨 **Brutalist Design** - Cyber-brutalist aesthetic with bold borders
- 🌈 **3D Backgrounds** - Interactive LightRays with OGL
- ✨ **GSAP Animations** - Smooth, professional animations
- 🌐 **Full-Stack API** - RESTful backend with Express
- 💾 **MongoDB Storage** - Cloud database with Atlas
- 📡 **Offline Mode** - Works without internet
- 🔄 **Auto-Sync** - Syncs when back online
- 🚀 **Fast Performance** - Optimized with Vite
- 🍪 **Secure Cookies** - HTTP-only cookie authentication

</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+  |  MongoDB Atlas Account  |  Git
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/GouravSittam/daily-expense-trackerXpenthara.git
cd daily-expense-trackerXpenthara

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend
npm install

# 4. Configure environment variables
# Create backend/.env file with your MongoDB URI
echo "MONGODB_URI=your_mongodb_atlas_connection_string" > .env
echo "PORT=5000" >> .env

# 5. Start the backend server
npm run dev
# Backend runs on http://localhost:5000 (Development)
# Production: https://trackwise-penthara-backend.vercel.app

# 6. In a new terminal, start the frontend
cd ..
npm run dev
# Frontend runs on http://localhost:5173 (Development)
```

### 🎉 Development: Open http://localhost:5173 in your browser

### 🚀 Production: App connects to https://trackwise-penthara-backend.vercel.app

---

## 🏗️ Architecture

<div align="center">

```mermaid
graph LR
    A[React Frontend] -->|REST API| B[Express Backend]
    B -->|Mongoose| C[(MongoDB Atlas)]
    A -->|Offline| D[LocalStorage]
    D -->|Auto Sync| B
```

</div>

### Tech Stack

**Frontend**

- ⚛️ React 19.2 - UI library with latest features
- 🎨 Tailwind CSS 4.1 - Modern utility-first styling
- ⚡ Vite 7.2 - Lightning-fast build tool
- 📊 Recharts 3.4 - Beautiful chart library
- 🎬 GSAP 3.13 - Professional animations
- 🌊 Framer Motion 12.23 - Smooth UI transitions
- 🌐 React Router DOM 7.9 - Client-side routing
- 🎭 OGL 1.0 - WebGL for 3D backgrounds
- 💎 Radix UI - Accessible component primitives
- 🎯 Lucide React - Beautiful icon library

**Backend**

- 🟢 Node.js & Express 4.18 - Server framework
- 🍃 MongoDB & Mongoose 8.0 - NoSQL database
- 🔐 JWT & bcryptjs - Secure authentication
- ✅ Express Validator 7.0 - Input validation
- 🔒 CORS enabled - Cross-origin requests
- 🍪 Cookie Parser - HTTP-only cookie handling

## 📁 Project Structure

```
pentharaTech/
├── 📁 src/
│   ├── components/
│   │   ├── ExpenseForm.jsx       # 📝 Add expense form
│   │   ├── ExpenseList.jsx       # 📋 List with filters
│   │   ├── ExpenseSummary.jsx    # 💰 Category summary
│   │   ├── ChartComponent.jsx    # 📊 Data visualization
│   │   ├── OfflineIndicator.jsx  # 📡 Sync status
│   │   ├── LightRays.jsx         # ✨ 3D background (OGL)
│   │   ├── Shuffle.jsx           # 🎭 Animated text effect
│   │   ├── BrutalLoader.jsx      # ⏳ Themed loading spinner
│   │   ├── Navbar.jsx            # 🧭 Navigation bar
│   │   └── ui/                   # 🎨 Radix UI components
│   ├── pages/
│   │   ├── ExpenseTracker.jsx    # 🏠 Main expense page
│   │   └── AuthPage.jsx          # 🔐 Login/Register page
│   ├── context/
│   │   └── AuthContext.jsx       # 🔑 Auth state management
│   ├── services/
│   │   ├── ExpenseService.js     # 💸 Expense API & offline
│   │   └── AuthService.js        # 🔐 Auth API operations
│   └── utils/
│       └── constants.js          # 🛠️ Shared constants
│
├── 📁 backend/
│   ├── config/
│   │   └── database.js           # 🔌 MongoDB connection
│   ├── controllers/
│   │   ├── expenseController.js  # 🎮 Expense logic
│   │   └── authController.js     # 🔐 Auth logic
│   ├── models/
│   │   ├── Expense.js            # 📐 Expense schema
│   │   └── User.js               # 👤 User schema
│   ├── routes/
│   │   ├── expenseRoutes.js      # 🛣️ Expense endpoints
│   │   └── authRoutes.js         # 🔐 Auth endpoints
│   ├── middleware/
│   │   ├── auth.js               # 🛡️ JWT verification
│   │   ├── errorHandler.js       # ❌ Error handling
│   │   └── validateRequest.js    # ✅ Validation
│   ├── api/
│   │   └── index.js              # 🚀 Vercel serverless
│   ├── server.js                 # 🚀 Entry point
│   └── vercel.json               # 📦 Vercel config
│
├── 📁 instructions/               # 📚 Project documentation
└── 📄 Configuration files
```

## 📋 Available Scripts

### Frontend

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | 🚀 Start development server (port 5173) |
| `npm run build`   | 📦 Build for production                 |
| `npm run preview` | 👀 Preview production build             |
| `npm run lint`    | 🔍 Check code quality                   |

### Backend

| Command       | Description                         |
| ------------- | ----------------------------------- |
| `npm run dev` | 🚀 Start with nodemon (auto-reload) |
| `npm start`   | ▶️ Start production server          |
| `npm test`    | 🧪 Run tests                        |

## 🎯 Usage Guide

### 🔐 Getting Started

1. **Create Account** - Register with email, password, and name
2. **Login** - Access your personal expense dashboard
3. **Start Tracking** - Add your first expense!

### 📝 Adding Expenses

<table>
<tr>
<td width="30%"><b>Step 1</b></td>
<td>Fill in the form with amount, category, date, and optional description</td>
</tr>
<tr>
<td><b>Step 2</b></td>
<td>Click <b>"Add Expense"</b> - Data saves instantly to your account!</td>
</tr>
<tr>
<td><b>Offline?</b></td>
<td>No worries! It saves locally and syncs when you're back online</td>
</tr>
</table>

### 🔍 Filtering & Sorting

### Cyber-Brutalist Aesthetic

Our app embraces a bold, **cyber-brutalist** design language featuring:

- **Bold Black Borders** - Thick 4-6px borders on all components
- **Eco Color Palette** - Cyan (#00D9FF), Purple (#A855F7), Green (#10B981)
- **Space Grotesk Font** - Modern, geometric typography
- **Shadow Brutal** - Dramatic offset shadows
- **3D Backgrounds** - Interactive WebGL light rays (OGL)
- **Uppercase Text** - Strong, confident UI labels
- **Zero Subtle** - No gradients, no soft edges, pure brutalism

### Color System

| Color      | Hex Code  | Usage                       |
| ---------- | --------- | --------------------------- |
| Eco Cyan   | `#00D9FF` | Primary actions, highlights |
| Eco Purple | `#A855F7` | Secondary actions, accents  |
| Eco Green  | `#10B981` | Success states, positives   |
| Eco Red    | `#EF4444` | Errors, deletions           |
| Black      | `#000000` | Borders, text               |
| White      | `#FFFFFF` | Backgrounds                 |

## 🔐 Authentication System

### Features

- **JWT Authentication** - Secure token-based auth
- **HTTP-Only Cookies** - XSS protection
- **Password Hashing** - bcryptjs encryption
- **Protected Routes** - Client & server-side guards
- **User Context** - Global auth state with React Context
- **Auto-Login** - Persistent sessions
- **Themed UI** - Brutalist login/register pages with 3D backgrounds

### Auth Flow

```
Register → Hash Password → Create User → Generate JWT → Set Cookie → Login
Login → Verify Credentials → Generate JWT → Set Cookie → Access Protected Routes
Logout → Clear Cookie → Redirect to Auth Page
```

- **Filter by Category**: Select any category from dropdown
- **Filter by Date**: Set from/to date range
- **Sort Options**: Click Date, Amount, or Category buttons
- **Toggle Order**: Click again for ascending ↑ / descending ↓

### 📊 Analytics

- **Summary Card**: View total expenses at a glance
- **Category Breakdown**: See percentage distribution
- **Charts**: Interactive pie & bar charts
- **Real-time Updates**: Everything updates instantly!

## 🎨 Expense Categories

| Icon | Category      | Color  |
| ---- | ------------- | ------ |
| 🍔   | Food          | Green  |
| 🚗   | Transport     | Blue   |
| 🛍️   | Shopping      | Pink   |
| 💳   | Bills         | Red    |
| 🎬   | Entertainment | Purple |
| 🏥   | Healthcare    | Teal   |
| 📚   | Education     | Indigo |
| 📦   | Other         | Gray   |

## 💡 Key Features Explained

### 📡 Offline-First Architecture

```
Internet Available → Saves to MongoDB + LocalStorage
Offline → Saves to LocalStorage only
Back Online → Auto-syncs pending changes
```

### 🔄 Smart Sync Logic

- **Automatic Detection**: App detects when you're back online
- **Queue Management**: Pending operations stored in sync queue
- **Retry Mechanism**: Failed syncs retry automatically
- **Conflict Resolution**: Latest data always wins

### 🎨 Responsive Design

| Device     | Layout                  | Experience          |
| ---------- | ----------------------- | ------------------- |
| 🖥️ Desktop | Two-column with sidebar | Full analytics view |
| 📱 Tablet  | Stacked layout          | Touch-optimized     |
| 📱 Mobile  | Single column           | Swipe gestures      |

### 💱 Currency Support

All amounts displayed in **₹ Indian Rupees** with proper formatting.

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| `POST` | `/api/auth/register` | Create new user        |
| `POST` | `/api/auth/login`    | Login user             |
| `POST` | `/api/auth/logout`   | Logout user            |
| `GET`  | `/api/auth/profile`  | Get user profile (JWT) |

### Expenses

| Method   | Endpoint                            | Description           |
| -------- | ----------------------------------- | --------------------- |
| `GET`    | `/api/expenses`                     | Get all expenses      |
| `GET`    | `/api/expenses/:id`                 | Get expense by ID     |
| `POST`   | `/api/expenses`                     | Create new expense    |
| `PUT`    | `/api/expenses/:id`                 | Update expense        |
| `DELETE` | `/api/expenses/:id`                 | Delete expense        |
| `GET`    | `/api/expenses/stats/total`         | Get total amount      |
| `GET`    | `/api/expenses/stats/by-category`   | Category-wise totals  |
| `GET`    | `/api/expenses/stats/by-date-range` | Date range totals     |
| `GET`    | `/api/expenses/summary/statistics`  | Comprehensive summary |

### Health

| Method | Endpoint      | Description  |
| ------ | ------------- | ------------ |
| `GET`  | `/api/health` | Health check |

### 📦 Request Example

```javascript
POST /api/expenses
Content-Type: application/json

{
  "amount": 500,
  "category": "Food",
  "date": "2025-11-20",
  "description": "Dinner with friends"
}
```

### ✅ Response Example

```javascript
{
  "success": true,
  "message": "Expense added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "amount": 500,
    "category": "Food",
    "date": "2025-11-20T00:00:00.000Z",
    "description": "Dinner with friends",
    "createdAt": "2025-11-20T10:30:00.000Z"
  }
}
```

## 🔒 Security Features

- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **HTTP-Only Cookies**: Protection against XSS attacks
- ✅ **Password Hashing**: bcryptjs with salt rounds
- ✅ **Input Validation**: Server-side validation with Express Validator
- ✅ **MongoDB Injection Protection**: Mongoose schema validation
- ✅ **CORS Configuration**: Controlled cross-origin requests
- ✅ **Protected Routes**: Both client and server-side route guards
- ✅ **Environment Variables**: Sensitive data in .env files
- ✅ **Error Handling**: Comprehensive error middleware
- ✅ **Token Expiration**: 30-day JWT expiration

## 🚀 Deployment

### Live URLs

- **Frontend**: https://trackwise-penthara.vercel.app ✅ (Live)
- **Backend**: https://trackwise-penthara-backend.vercel.app ✅ (Live)
- **Database**: MongoDB Atlas (Cloud) ✅ (Connected)

### Environment Variables for Production

**Frontend (.env.production)**

```bash
VITE_API_URL=https://trackwise-penthara-backend.vercel.app/api
```

**Backend (Vercel/Railway/Render)**

```bash
# MongoDB Atlas connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# Frontend URL (for CORS)
CLIENT_URL=https://trackwise-penthara.vercel.app

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d

# Environment
NODE_ENV=production
```

### Quick Deploy

**Backend (Already Deployed) ✅**

```bash
# Backend is live at:
https://trackwise-penthara-backend.vercel.app

# API Health Check:
curl https://trackwise-penthara-backend.vercel.app/api/health
```

**Frontend (Already Deployed) ✅**

```bash
# Frontend is live at:
https://trackwise-penthara.vercel.app

# Configured with production backend
# Auto-syncs with MongoDB Atlas
```

# 2. Import to Vercel

# - Connect GitHub repo

# - Add VITE_API_URL environment variable

# - Deploy!

````

**Frontend (Netlify)**

```bash
# 1. Build the project
npm run build

# 2. Deploy dist folder
netlify deploy --prod --dir=dist
````

## 🌐 Production Status

### ✅ Fully Deployed & Live

| Component    | Status       | URL                                                                  |
| ------------ | ------------ | -------------------------------------------------------------------- |
| Frontend     | ✅ Live      | https://trackwise-penthara.vercel.app                                |
| Backend API  | ✅ Live      | https://trackwise-penthara-backend.vercel.app                        |
| Database     | ✅ Connected | MongoDB Atlas                                                        |
| Health Check | ✅ Working   | [Test Now](https://trackwise-penthara-backend.vercel.app/api/health) |

### 📡 API Endpoints (Live)

```bash
# Health Check
GET https://trackwise-penthara-backend.vercel.app/api/health

# Get All Expenses
GET https://trackwise-penthara-backend.vercel.app/api/expenses

# Add Expense
POST https://trackwise-penthara-backend.vercel.app/api/expenses

# Get Statistics
GET https://trackwise-penthara-backend.vercel.app/api/expenses/summary/statistics
```

### 🔧 Configuration

**Frontend Environment:**

```bash
VITE_API_URL=https://trackwise-penthara-backend.vercel.app/api
```

**Backend Environment:**

```bash
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# CORS - Allow both localhost and production
CLIENT_URL=https://trackwise-penthara.vercel.app

# JWT
JWT_SECRET=your-production-secret
JWT_EXPIRE=30d

# Environment
NODE_ENV=production
```

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create your feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. 💾 Commit your changes
   ```bash
   git commit -m '✨ Add some AmazingFeature'
   ```
4. 📤 Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. 🎉 Open a Pull Request

### Code Style Guidelines

- Use **Prettier** for code formatting
- Follow **ESLint** rules
- Write **meaningful commit messages**
- Add **comments** for complex logic
- Update **documentation** for new features

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

<div align="center">

### Gourav Chaudhary

[![GitHub](https://img.shields.io/badge/GitHub-GouravSittam-181717?style=for-the-badge&logo=github)](https://github.com/GouravSittam)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/gourav-chaudhary)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF6B6B?style=for-the-badge&logo=google-chrome&logoColor=white)](https://yourportfolio.com)

</div>

---

## 🙏 Acknowledgments

Special thanks to:

- **[React Team](https://react.dev/)** - For the amazing UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first framework
- **[MongoDB](https://www.mongodb.com/)** - For the flexible database
- **[Recharts](https://recharts.org/)** - For beautiful charts
- **[GSAP](https://greensock.com/gsap/)** - For smooth animations
- **[OGL](https://github.com/oframe/ogl)** - For WebGL 3D backgrounds
- **[Framer Motion](https://www.framer.com/motion/)** - For React animations
- **[Radix UI](https://www.radix-ui.com/)** - For accessible components
- **[Lucide](https://lucide.dev/)** - For beautiful icons

---

## 🎨 UI Components

- **LightRays** - 3D animated background using WebGL (OGL)
- **BrutalLoader** - Themed loading spinner with animations
- **Shuffle** - Animated text effect component
- **OfflineIndicator** - Real-time network status
- **Navbar** - Brutalist navigation with user menu
- **ExpenseForm** - Validated form with Radix UI components
- **ChartComponent** - Interactive Recharts visualizations

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/GouravSittam/daily-expense-trackerXpenthara?style=social)
![GitHub forks](https://img.shields.io/github/forks/GouravSittam/daily-expense-trackerXpenthara?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/GouravSittam/daily-expense-trackerXpenthara?style=social)

---

<div align="center">

### ⭐ Star this repo if you find it helpful!

**Made with ❤️ by Gourav Chaudhary**

[Report Bug](https://github.com/GouravSittam/daily-expense-trackerXpenthara/issues) • [Request Feature](https://github.com/GouravSittam/daily-expense-trackerXpenthara/issues) • [Documentation](https://github.com/GouravSittam/daily-expense-trackerXpenthara/wiki)

</div>
