# Expense Tracker - Full Stack Application

A comprehensive expense tracking application with React frontend and Node.js/Express backend.

## 🎯 Project Overview

Track your daily expenses with category-wise summaries, visualizations, and filtering capabilities. Built with modern web technologies and following industry best practices.

## ✨ Features

- ✅ Add, edit, and delete expenses
- ✅ View expenses with filtering options
- ✅ Category-wise expense summaries
- ✅ Visual charts for expense distribution
- ✅ Responsive design for all devices
- ✅ RESTful API backend
- ✅ MongoDB database for persistent storage
- ✅ Real-time data updates

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **Recharts** - Charting library
- **GSAP & Framer Motion** - Animations
- **ESLint** - Code linting

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **dotenv** - Environment variables

## 📁 Project Structure

```
pentharaTech/
├── backend/                 # Backend API server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── server.js           # Entry point
│   ├── package.json        # Backend dependencies
│   └── README.md           # Backend documentation
│
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── ExpenseSummary.jsx
│   │   ├── ChartComponent.jsx
│   │   └── Shuffle.jsx
│   ├── pages/              # Page-level views
│   │   └── ExpenseTracker.jsx
│   ├── services/           # API service layer
│   │   └── ExpenseService.js
│   ├── utils/              # Helper functions
│   │   └── constants.js
│   ├── assets/             # Images, styles
│   ├── App.jsx             # Root component
│   └── main.jsx            # Entry point
│
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Frontend dependencies
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun**
- **MongoDB** (v6.0 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GouravSittam/daily-expense-trackerXpenthara.git
   cd daily-expense-trackerXpenthara
   ```

2. **Setup Backend:**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB URI and configuration
   ```

3. **Setup Frontend:**
   ```bash
   cd ..
   npm install  # or bun install
   cp .env.example .env
   # Edit .env if you need to change API URL
   ```

### Running the Application

#### Start MongoDB

```bash
# Windows
net start MongoDB

# Or run mongod directly
mongod
```

#### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
# From root directory
npm run dev  # or bun run dev
```

Frontend will run on `http://localhost:5173`

Now open your browser and navigate to `http://localhost:5173`

## 📋 Environment Variables

### Backend (.env in backend/)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/expense-tracker
CLIENT_URL=http://localhost:5173
```

### Frontend (.env in root/)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🔧 Available Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
npm start        # Start production server
npm run dev      # Start development server with auto-reload
```

## 📡 API Documentation

See [Backend README](./backend/README.md) for detailed API documentation.

### Quick API Reference

**Base URL:** `http://localhost:5000/api`

| Method | Endpoint                        | Description         |
| ------ | ------------------------------- | ------------------- |
| GET    | `/expenses`                     | Get all expenses    |
| GET    | `/expenses/:id`                 | Get single expense  |
| POST   | `/expenses`                     | Create new expense  |
| PUT    | `/expenses/:id`                 | Update expense      |
| DELETE | `/expenses/:id`                 | Delete expense      |
| GET    | `/expenses/summary/statistics`  | Get all statistics  |
| GET    | `/expenses/summary/by-category` | Get category totals |
| GET    | `/expenses/summary/total`       | Get total expenses  |

## 🎨 UI Components

### ExpenseForm

- Input form for adding new expenses
- Real-time validation
- Category selection dropdown
- Date picker

### ExpenseList

- Display all expenses in a table
- Delete functionality
- Responsive design
- Empty state handling

### ExpenseSummary

- Category-wise expense breakdown
- Total expense display
- Color-coded categories

### ChartComponent

- Visual representation using pie chart
- Interactive tooltips
- Responsive sizing

## 📝 Best Practices Implemented

### Code Quality

- ✅ Consistent naming conventions (PascalCase, camelCase, kebab-case)
- ✅ JSDoc comments for all functions
- ✅ Modular file structure
- ✅ Separation of concerns
- ✅ Error handling and validation

### Frontend

- ✅ Component-based architecture
- ✅ Custom hooks for data fetching
- ✅ Proper state management
- ✅ Async/await for API calls
- ✅ Loading and error states

### Backend

- ✅ RESTful API design
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ MongoDB indexing for performance
- ✅ Environment-based configuration

## 🔒 Security Features

- Input validation on both frontend and backend
- MongoDB injection prevention
- CORS configuration
- Environment variables for sensitive data
- Error messages don't expose system details

## 🐛 Troubleshooting

### Common Issues

**Issue:** Cannot connect to MongoDB

```
Solution: Ensure MongoDB is running (net start MongoDB on Windows)
```

**Issue:** CORS errors

```
Solution: Check CLIENT_URL in backend/.env matches your frontend URL
```

**Issue:** Port already in use

```
Solution: Change PORT in .env or kill the process using the port
```

**Issue:** API calls failing

```
Solution: Ensure backend server is running and VITE_API_URL is correct
```

## 🎯 Assignment Requirements Met

✅ **Add expense** - Form with amount, category, date, and description  
✅ **View and filter expenses** - List view with filtering capabilities  
✅ **Total per category** - Summary component with category breakdown  
✅ **Chart visualization** - Pie chart showing expense distribution  
✅ **Proper file structure** - components/, pages/, services/, utils/  
✅ **Naming conventions** - PascalCase, camelCase, kebab-case  
✅ **Commenting** - JSDoc comments and inline explanations  
✅ **CSS Framework** - Tailwind CSS for styling  
✅ **Best practices** - Error handling, validation, modular code

## 🚀 Deployment

### Frontend

Can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Backend

Can be deployed to:

- Heroku
- Railway
- DigitalOcean
- AWS EC2

### Database

- MongoDB Atlas (cloud)
- Self-hosted MongoDB

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Multi-user support
- [ ] Export expenses to CSV/PDF
- [ ] Budget tracking and alerts
- [ ] Recurring expenses
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Advanced filtering and search
- [ ] Dark mode

## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

## 👨‍💻 Author

**Gourav Chaudhary**

- GitHub: [@GouravSittam](https://github.com/GouravSittam)
- Repository: [daily-expense-trackerXpenthara](https://github.com/GouravSittam/daily-expense-trackerXpenthara)

## 📄 License

ISC

## 🙏 Acknowledgments

- Penthara Tech for the assignment opportunity
- React and Node.js communities for excellent documentation
- All open-source libraries used in this project

---

**Note:** This project was developed as part of an interview assignment for Penthara Tech, following all specified requirements and best practices.
