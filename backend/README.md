<div align="center">

# 🚀 Expense Tracker - Backend API

### _Powerful RESTful API for expense management_

A production-ready Express.js backend with MongoDB, comprehensive validation, and advanced features.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](../LICENSE)

[Live API](https://trackwise-penthara-backend.vercel.app) • [API Docs](#-api-endpoints) • [Installation](#-quick-start) • [Testing](#-testing)

</div>

---

## ✨ Features

- 🔌 **RESTful API** - Clean, predictable endpoints
- 💾 **MongoDB Integration** - NoSQL database with Mongoose ODM
- ✅ **Input Validation** - Comprehensive validation with Express Validator
- 🛡️ **Error Handling** - Global error handling middleware
- 📊 **Statistics Endpoints** - Category totals, date ranges
- 🔄 **CORS Enabled** - Cross-origin resource sharing
- 📝 **Request Logging** - Morgan HTTP request logger
- 🚀 **Auto-reload** - Nodemon for development
- 🏗️ **MVC Architecture** - Clean separation of concerns

---

## 🌐 Production Deployment

### ✅ Live & Running

| Status      | URL                                                                      |
| ----------- | ------------------------------------------------------------------------ |
| 🟢 Live     | https://trackwise-penthara-backend.vercel.app                            |
| 🟢 Health   | [Check Health](https://trackwise-penthara-backend.vercel.app/api/health) |
| 🟢 Database | MongoDB Atlas Connected                                                  |
| 🟢 CORS     | Configured for https://trackwise-penthara.vercel.app                     |

### 📡 Test Live API

```bash
# Health Check
curl https://trackwise-penthara-backend.vercel.app/api/health

# Get All Expenses
curl https://trackwise-penthara-backend.vercel.app/api/expenses

# Get Statistics
curl https://trackwise-penthara-backend.vercel.app/api/expenses/summary/statistics
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-11-20T11:53:46.855Z"
}
```

---

## 🏗️ Architecture

```
backend/
├── 📁 config/
│   └── database.js               # 🔌 MongoDB connection & config
├── 📁 controllers/
│   └── expenseController.js      # 🎮 Business logic layer
├── 📁 middleware/
│   ├── errorHandler.js           # ❌ Global error handler
│   ├── notFound.js               # 🔍 404 handler
│   └── validateRequest.js        # ✅ Validation middleware
├── 📁 models/
│   └── Expense.js                # 📐 Mongoose schema & model
├── 📁 routes/
│   └── expenseRoutes.js          # 🛣️ API route definitions
├── 📁 utils/
│   └── constants.js              # 🛠️ Shared constants
├── .env.example                  # 📝 Environment template
├── server.js                     # 🚀 Application entry point
└── package.json                  # 📦 Dependencies
```

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+  |  MongoDB Atlas Account  |  npm
```

### Installation

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env

# Edit .env with your MongoDB Atlas connection string
```

### Environment Variables

Create `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker

# Frontend URL (for CORS)
CLIENT_URL=https://trackwise-penthara.vercel.app
# For development: http://localhost:5173
```

### Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on **http://localhost:5000** (Development) 🚀
**Production**: https://trackwise-penthara-backend.vercel.app 🌐

---

## 📡 API Endpoints

### Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://trackwise-penthara-backend.vercel.app/api`

<table>
<tr>
<th>Method</th>
<th>Endpoint</th>
<th>Description</th>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/expenses</code></td>
<td>📋 Get all expenses (with filters)</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/expenses/:id</code></td>
<td>🔍 Get single expense by ID</td>
</tr>
<tr>
<td><code>POST</code></td>
<td><code>/expenses</code></td>
<td>➕ Create new expense</td>
</tr>
<tr>
<td><code>PUT</code></td>
<td><code>/expenses/:id</code></td>
<td>✏️ Update expense</td>
</tr>
<tr>
<td><code>DELETE</code></td>
<td><code>/expenses/:id</code></td>
<td>🗑️ Delete expense</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/expenses/stats/total</code></td>
<td>💰 Get total expenses</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/expenses/stats/by-category</code></td>
<td>📊 Category-wise totals</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/expenses/stats/by-date-range</code></td>
<td>📅 Date range statistics</td>
</tr>
<tr>
<td><code>GET</code></td>
<td><code>/health</code></td>
<td>❤️ Health check</td>
</tr>
</table>

---

### 📋 Get All Expenses

```http
GET /api/expenses?category=Food&dateFrom=2025-11-01&limit=20
```

**Query Parameters:**

| Parameter  | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| `category` | string | Filter by category (optional)    |
| `dateFrom` | date   | Start date YYYY-MM-DD (optional) |
| `dateTo`   | date   | End date YYYY-MM-DD (optional)   |
| `page`     | number | Page number (default: 1)         |
| `limit`    | number | Items per page (max: 100)        |

**Success Response:**

```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "totalPages": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "amount": 500,
      "category": "Food",
      "description": "Dinner",
      "date": "2025-11-20T00:00:00.000Z",
      "createdAt": "2025-11-20T10:30:00.000Z",
      "updatedAt": "2025-11-20T10:30:00.000Z"
    }
  ]
}
```

---

### 🔍 Get Single Expense

```http
GET /api/expenses/:id
```

**Success Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "amount": 500,
    "category": "Food",
    "description": "Dinner",
    "date": "2025-11-20T00:00:00.000Z"
  }
}
```

---

### ➕ Create Expense

```http
POST /api/expenses
Content-Type: application/json
```

**Request Body:**

```json
{
  "amount": 500,
  "category": "Food",
  "description": "Dinner with friends",
  "date": "2025-11-20"
}
```

**Validation Rules:**

| Field         | Type   | Required | Rules                                                                                 |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| `amount`      | number | ✅ Yes   | Must be > 0                                                                           |
| `category`    | string | ✅ Yes   | One of: Food, Transport, Shopping, Bills, Entertainment, Healthcare, Education, Other |
| `description` | string | ❌ No    | Max 200 characters                                                                    |
| `date`        | date   | ✅ Yes   | YYYY-MM-DD format, not in future                                                      |

**Success Response:**

```json
{
  "success": true,
  "message": "Expense added successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "amount": 500,
    "category": "Food",
    "description": "Dinner with friends",
    "date": "2025-11-20T00:00:00.000Z",
    "createdAt": "2025-11-20T10:30:00.000Z"
  }
}
```

---

### ✏️ Update Expense

```http
PUT /api/expenses/:id
Content-Type: application/json
```

**Request Body:** (All fields optional)

```json
{
  "amount": 600,
  "description": "Updated dinner description"
}
```

---

### 🗑️ Delete Expense

```http
DELETE /api/expenses/:id
```

**Success Response:**

```json
{
  "success": true,
  "message": "Expense deleted successfully"
}
```

---

### 💰 Get Total Expenses

```http
GET /api/expenses/stats/total
```

**Success Response:**

```json
{
  "success": true,
  "data": {
    "total": 15750.5
  }
}
```

---

### 📊 Get Category Statistics

```http
GET /api/expenses/stats/by-category
```

**Success Response:**

```json
{
  "success": true,
  "data": {
    "Food": 5000,
    "Transport": 3000,
    "Shopping": 2500,
    "Bills": 5250.5
  }
}
```

---

### 📅 Get Date Range Statistics

```http
GET /api/expenses/stats/by-date-range?dateFrom=2025-11-01&dateTo=2025-11-30
```

**Success Response:**

```json
{
  "success": true,
  "data": {
    "total": 8500,
    "count": 15,
    "dateFrom": "2025-11-01",
    "dateTo": "2025-11-30"
  }
}
```

---

## ❌ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "amount",
      "message": "Amount must be greater than 0"
    }
  ]
}
```

### Common Error Codes

| Code  | Description                        |
| ----- | ---------------------------------- |
| `400` | Bad Request - Validation error     |
| `404` | Not Found - Resource doesn't exist |
| `500` | Internal Server Error              |

---

## 🧪 Testing

### Using cURL

```bash
# Create an expense
# Development
curl -X POST http://localhost:5000/api/expenses \

# Production
curl -X POST https://trackwise-penthara-backend.vercel.app/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 500,
    "category": "Food",
    "description": "Lunch",
    "date": "2025-11-20"
  }'

# Get all expenses
# Development
curl http://localhost:5000/api/expenses

# Production
curl https://trackwise-penthara-backend.vercel.app/api/expenses

# Get by category
# Development
curl http://localhost:5000/api/expenses?category=Food

# Production
curl https://trackwise-penthara-backend.vercel.app/api/expenses?category=Food

# Health check
# Development
curl http://localhost:5000/api/health

# Production
curl https://trackwise-penthara-backend.vercel.app/api/health
```

### Using Postman

**Development:**

1. Set base URL: `http://localhost:5000/api`

**Production:**

1. Set base URL: `https://trackwise-penthara-backend.vercel.app/api`

---

## 📦 Dependencies

### Production

| Package             | Version | Purpose               |
| ------------------- | ------- | --------------------- |
| `express`           | ^4.18.2 | Web framework         |
| `mongoose`          | ^8.0.0  | MongoDB ODM           |
| `express-validator` | ^7.0.1  | Input validation      |
| `cors`              | ^2.8.5  | CORS middleware       |
| `dotenv`            | ^16.3.1 | Environment variables |
| `morgan`            | ^1.10.0 | HTTP logger           |

### Development

| Package   | Version | Purpose             |
| --------- | ------- | ------------------- |
| `nodemon` | ^3.0.1  | Auto-restart server |

---

## 🛡️ Security Best Practices

✅ **Input Validation** - All requests validated with Express Validator  
✅ **MongoDB Injection Protection** - Mongoose sanitizes queries  
✅ **CORS Configuration** - Controlled cross-origin access  
✅ **Environment Variables** - Sensitive data in .env  
✅ **Error Handling** - No sensitive data in error responses

---

## 🐛 Debugging

### Enable Debug Logging

```bash
# Set in .env
NODE_ENV=development
DEBUG=true
```

### Check MongoDB Connection

```bash
# The server logs will show:
✅ Connected to MongoDB: expense-tracker
```

### Common Issues

| Issue                    | Solution                                           |
| ------------------------ | -------------------------------------------------- |
| Port already in use      | Change `PORT` in .env or kill process on port 5000 |
| MongoDB connection error | Check `MONGODB_URI` in .env file                   |
| CORS errors              | Verify `CLIENT_URL` in .env matches frontend URL   |

---

## 📝 Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js",
  "test": "echo \"Tests coming soon...\""
}
```

---

## 🚢 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set CLIENT_URL=your_frontend_url

# Deploy
git push heroku main
```

### Deploy to Railway/Render

1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Auto-deploy on push to main

---

## 📊 Database Schema

### Expense Model

```javascript
{
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Shopping', 'Bills',
           'Entertainment', 'Healthcare', 'Education', 'Other']
  },
  description: {
    type: String,
    maxLength: 200
  },
  date: {
    type: Date,
    required: true,
    max: Date.now
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes

- `category` - For faster category filtering
- `date` - For date range queries
- `createdAt` - For sorting by creation time

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests (when available)
5. Submit a pull request

---

## 📄 License

MIT License - see [LICENSE](../LICENSE) file

---

<div align="center">

### 👨‍💻 Developed by Gourav Chaudhary

[![GitHub](https://img.shields.io/badge/GitHub-GouravSittam-181717?style=flat-square&logo=github)](https://github.com/GouravSittam)

**Made with ❤️ using Node.js & Express**

[⬆ Back to Top](#-expense-tracker---backend-api)

</div>
  "message": "Server is running",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

## 🗄️ Database Schema

### Expense Model

```javascript
{
  amount: Number,        // Required, > 0
  category: String,      // Required, enum: [Food, Transport, Shopping, ...]
  description: String,   // Required, max 200 chars
  date: Date,           // Required, defaults to now, cannot be future
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-generated
}
```

**Indexes:**

- `date` (descending) - for recent-first queries
- `category` (ascending) - for category filtering
- `amount` (descending) - for sorting by amount

## 🔧 Development

### Available Scripts

```bash
# Start server in production mode
npm start

# Start server in development mode with auto-reload
npm run dev

# Run tests (placeholder)
npm test
```

### Code Structure

- **Models**: Define data structure and business logic using Mongoose
- **Controllers**: Handle request/response logic
- **Routes**: Define API endpoints and validation rules
- **Middleware**: Cross-cutting concerns (error handling, validation)
- **Config**: Application configuration (database, environment)
- **Utils**: Shared utilities and constants

### Best Practices Implemented

1. **Naming Conventions**

   - PascalCase for models: `Expense.js`
   - camelCase for functions: `getExpenses()`
   - kebab-case for routes: `expense-routes.js`

2. **Error Handling**

   - Global error handler middleware
   - Validation errors with detailed messages
   - Try-catch blocks in all async operations

3. **Code Organization**

   - Separation of concerns
   - Modular architecture
   - Reusable components

4. **Documentation**
   - JSDoc comments for all functions
   - Clear API documentation
   - Inline comments for complex logic

## 🛡️ Error Handling

All errors return a consistent format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```

Common HTTP Status Codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Security Considerations

- Input validation using express-validator
- CORS configuration for frontend access
- Environment variables for sensitive data
- MongoDB injection prevention through Mongoose
- Error messages don't expose sensitive information

## 📝 Environment Variables

| Variable      | Description               | Example                                        |
| ------------- | ------------------------- | ---------------------------------------------- |
| `PORT`        | Server port               | 5000                                           |
| `NODE_ENV`    | Environment mode          | development / production                       |
| `MONGODB_URI` | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| `CLIENT_URL`  | Frontend URL for CORS     | https://trackwise-penthara.vercel.app          |

### Production Configuration

```bash
MONGODB_URI=mongodb+srv://penthara:PentharaTech@pentharatech.z6kcjf8.mongodb.net/expense-tracker
CLIENT_URL=https://trackwise-penthara.vercel.app
NODE_ENV=production
```

### Development Configuration

```bash
MONGODB_URI=mongodb+srv://penthara:PentharaTech@pentharatech.z6kcjf8.mongodb.net/expense-tracker
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

## 🚨 Troubleshooting

### MongoDB Connection Issues (Atlas)

```
Error: MongoServerError: bad auth
```

**Solution:** Check your MongoDB Atlas credentials in `.env`:

```bash
MONGODB_URI=mongodb+srv://penthara:PentharaTech@pentharatech.z6kcjf8.mongodb.net/expense-tracker
```

### Port Already in Use

```
Error: Port 5000 is already in use
```

**Solution:** Change PORT in `.env` or kill the process:

**Windows:**

```bash
netstat -ano | findstr :5000
taskkill /PID <process_id> /F
```

**Mac/Linux:**

```bash
lsof -ti:5000 | xargs kill -9
```

### CORS Errors

**Solution:** Ensure `CLIENT_URL` in `.env` matches your frontend URL:

**Production:**

```bash
CLIENT_URL=https://trackwise-penthara.vercel.app
```

**Development:**

```bash
CLIENT_URL=http://localhost:5173
```

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

## 🎯 Project Links

- **Live API**: https://trackwise-penthara-backend.vercel.app
- **Frontend**: https://trackwise-penthara.vercel.app
- **GitHub Repo**: https://github.com/GouravSittam/daily-expense-trackerXpenthara
- **API Health**: [Check Status](https://trackwise-penthara-backend.vercel.app/api/health)

---

<div align="center">

## 👨‍💻 Author

**Gourav Chaudhary**

[![GitHub](https://img.shields.io/badge/GitHub-GouravSittam-181717?style=for-the-badge&logo=github)](https://github.com/GouravSittam)

---

## 📄 License

ISC License - see the [LICENSE](../LICENSE) file for details

---

**Made with ❤️ by Gourav Chaudhary**

⭐ Star this repo if you find it helpful!

</div>
