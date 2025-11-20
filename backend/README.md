# Expense Tracker Backend API

A RESTful API server for managing daily expenses with category-wise tracking and summaries.

## 🏗️ Architecture

The backend follows a clean, modular architecture with clear separation of concerns:

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── expenseController.js # Business logic for expense operations
├── middleware/
│   ├── errorHandler.js      # Global error handling
│   ├── notFound.js          # 404 handler
│   └── validateRequest.js   # Request validation middleware
├── models/
│   └── Expense.js           # Mongoose schema and model
├── routes/
│   └── expenseRoutes.js     # API route definitions
├── utils/
│   └── constants.js         # Shared constants
├── .env.example             # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── server.js               # Main application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn

### Installation

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your configuration:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/expense-tracker
   CLIENT_URL=http://localhost:5173
   ```

4. **Start MongoDB:**

   Make sure MongoDB is running on your system:

   ```bash
   # Windows (if MongoDB is installed as a service)
   net start MongoDB

   # Or run mongod directly
   mongod
   ```

5. **Start the server:**

   **Development mode (with auto-reload):**

   ```bash
   npm run dev
   ```

   **Production mode:**

   ```bash
   npm start
   ```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Expenses

#### Get All Expenses

```http
GET /expenses
```

**Query Parameters:**

- `category` (optional): Filter by category
- `dateFrom` (optional): Filter expenses from this date (YYYY-MM-DD)
- `dateTo` (optional): Filter expenses up to this date (YYYY-MM-DD)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50, max: 100)

**Response:**

```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "totalPages": 5,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "amount": 50.99,
      "category": "Food",
      "description": "Grocery shopping",
      "date": "2025-11-20",
      "createdAt": "2025-11-20T10:30:00.000Z",
      "updatedAt": "2025-11-20T10:30:00.000Z"
    }
  ]
}
```

#### Get Single Expense

```http
GET /expenses/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "amount": 50.99,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2025-11-20"
  }
}
```

#### Create Expense

```http
POST /expenses
```

**Request Body:**

```json
{
  "amount": 50.99,
  "category": "Food",
  "description": "Grocery shopping",
  "date": "2025-11-20"
}
```

**Validation Rules:**

- `amount`: Required, must be > 0
- `category`: Required, must be one of: Food, Transport, Shopping, Bills, Entertainment, Healthcare, Education, Other
- `description`: Optional, max 200 characters
- `date`: Optional, ISO 8601 format, cannot be in the future

**Response:**

```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "amount": 50.99,
    "category": "Food",
    "description": "Grocery shopping",
    "date": "2025-11-20"
  }
}
```

#### Update Expense

```http
PUT /expenses/:id
```

**Request Body:** (all fields optional)

```json
{
  "amount": 55.99,
  "category": "Shopping",
  "description": "Updated description",
  "date": "2025-11-21"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Expense updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "amount": 55.99,
    "category": "Shopping",
    "description": "Updated description",
    "date": "2025-11-21"
  }
}
```

#### Delete Expense

```http
DELETE /expenses/:id
```

**Response:**

```json
{
  "success": true,
  "message": "Expense deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "amount": 50.99,
    "category": "Food"
  }
}
```

### Summary Endpoints

#### Get Expenses by Category

```http
GET /expenses/summary/by-category
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "category": "Food",
      "total": 450.5,
      "count": 12
    },
    {
      "category": "Transport",
      "total": 200.0,
      "count": 8
    }
  ]
}
```

#### Get Total Expenses

```http
GET /expenses/summary/total
```

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 1250.5
  }
}
```

#### Get Complete Statistics

```http
GET /expenses/summary/statistics
```

**Response:**

```json
{
  "success": true,
  "data": {
    "total": 1250.5,
    "count": 45,
    "expensesByCategory": {
      "Food": 450.5,
      "Transport": 200.0,
      "Shopping": 350.0
    },
    "categoryTotals": [
      {
        "category": "Food",
        "total": 450.5,
        "count": 12
      }
    ]
  }
}
```

### Health Check

```http
GET /health
```

**Response:**

```json
{
  "success": true,
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

| Variable      | Description               | Default                                   |
| ------------- | ------------------------- | ----------------------------------------- |
| `PORT`        | Server port               | 5000                                      |
| `NODE_ENV`    | Environment mode          | development                               |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/expense-tracker |
| `CLIENT_URL`  | Frontend URL for CORS     | http://localhost:5173                     |

## 🚨 Troubleshooting

### MongoDB Connection Issues

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Ensure MongoDB is running:

```bash
net start MongoDB
```

### Port Already in Use

```
Error: Port 5000 is already in use
```

**Solution:** Change PORT in `.env` or kill the process using port 5000

### CORS Errors

**Solution:** Ensure `CLIENT_URL` in `.env` matches your frontend URL

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## 👨‍💻 Author

Gourav Chaudhary

## 📄 License

ISC
