# Authentication System Documentation

## Overview

This expense tracker now includes a full-featured authentication system using email and password. The authentication is built with JWT (JSON Web Tokens) and integrates seamlessly with the existing project structure.

## Features

- ✅ User registration with email and password
- ✅ User login with JWT authentication
- ✅ Secure password hashing with bcryptjs
- ✅ Protected routes (frontend and backend)
- ✅ User-specific expense data
- ✅ Logout functionality
- ✅ Token-based session management
- ✅ Beautiful, themed authentication UI
- ✅ MongoDB database integration

## Architecture

### Backend Components

#### 1. **User Model** (`backend/models/User.js`)

- Email validation and uniqueness
- Password hashing with bcryptjs (10 salt rounds)
- Password comparison method for login
- Timestamps for createdAt and updatedAt

#### 2. **Auth Controller** (`backend/controllers/authController.js`)

- `register` - Create new user account
- `login` - Authenticate user and generate JWT
- `logout` - Clear authentication cookie
- `getProfile` - Get authenticated user's profile
- `updateProfile` - Update user information

#### 3. **Auth Middleware** (`backend/middleware/auth.js`)

- `protect` - Require authentication for routes
- `optionalAuth` - Optional authentication (useful for mixed access)
- Token verification from cookies or Authorization header

#### 4. **Auth Routes** (`backend/routes/authRoutes.js`)

```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
POST   /api/auth/logout      - Logout user
GET    /api/auth/profile     - Get user profile (protected)
PUT    /api/auth/profile     - Update profile (protected)
```

#### 5. **Updated Expense Model** (`backend/models/Expense.js`)

- Added `user` field (reference to User model)
- Expenses are now user-specific
- Updated aggregation methods to filter by user

#### 6. **Updated Expense Controller**

- All expense operations now filter by authenticated user
- CREATE operations attach user ID automatically
- READ/UPDATE/DELETE operations verify ownership

### Frontend Components

#### 1. **AuthService** (`src/services/AuthService.js`)

- `register` - User registration
- `login` - User login
- `logout` - User logout
- `getProfile` - Fetch user profile
- `updateProfile` - Update user data
- `getCurrentUser` - Get user from localStorage
- `getToken` - Get JWT token
- `isAuthenticated` - Check auth status

#### 2. **AuthContext** (`src/context/AuthContext.jsx`)

- Global authentication state management
- Auto-initialization on app load
- Token verification with backend
- Auth methods available throughout app via `useAuth()` hook

#### 3. **AuthPage** (`src/pages/AuthPage.jsx`)

- Beautiful login/register UI matching project theme
- Toggle between login and signup modes
- Form validation
- Error handling and display
- Gradient backgrounds with LightRays effect

#### 4. **Updated App Component** (`src/App.jsx`)

- React Router integration
- `ProtectedRoute` - Redirects to /auth if not logged in
- `PublicRoute` - Redirects to / if already logged in
- Loading states during auth check

#### 5. **Updated Navbar** (`src/components/Navbar.jsx`)

- User menu with email display
- Logout button
- User dropdown (desktop)
- Mobile-friendly auth UI

#### 6. **Updated ExpenseService**

- All API calls include JWT token in Authorization header
- Credentials: 'include' for cookie support
- Automatic auth header injection

## Environment Variables

### Backend (.env)

```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## Setup Instructions

### 1. Install Dependencies

Backend already has the required packages in package.json:

- bcryptjs (password hashing)
- jsonwebtoken (JWT tokens)
- cookie-parser (cookie handling)

Frontend needs react-router-dom (already in backend package.json):

```bash
cd d:\PROJECTS\pentharaTech
npm install react-router-dom
```

### 2. Configure Environment Variables

Create `.env` files in both root and backend directories based on the `.env.example` files.

**Important:** Change `JWT_SECRET` to a long, random string in production!

### 3. Database Migration

Since we added a `user` field to the Expense model, existing expenses won't have a user. You have two options:

**Option A: Start Fresh** (Recommended for development)

```javascript
// Drop the expenses collection in MongoDB
db.expenses.drop();
```

**Option B: Assign Existing Expenses to a User**

```javascript
// After creating a user, update existing expenses
db.expenses.updateMany(
  { user: { $exists: false } },
  { $set: { user: ObjectId("your-user-id-here") } }
);
```

### 4. Start the Application

Terminal 1 - Backend:

```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:

```bash
npm run dev
```

## Usage Flow

### New User Journey

1. User visits the app at `http://localhost:5173`
2. Not authenticated → Redirected to `/auth`
3. Clicks "Sign Up" and creates account with email/password
4. Upon successful registration → Automatically logged in
5. Redirected to `/` (expense tracker)
6. Can now create, view, edit, delete expenses (only their own)

### Returning User Journey

1. User visits the app
2. If token exists and is valid → Auto-logged in
3. Directed to expense tracker with their data
4. If token expired → Redirected to `/auth`

### Logout

1. Click user menu in navbar (top right)
2. Click "Logout" button
3. Redirected to `/auth` page
4. Token cleared from localStorage and cookies

## Security Features

1. **Password Security**

   - Passwords hashed with bcryptjs (10 rounds)
   - Never stored or transmitted in plain text
   - Password comparison uses constant-time algorithm

2. **JWT Tokens**

   - Signed with secret key
   - 30-day expiration by default
   - Stored in both localStorage and httpOnly cookies

3. **Route Protection**

   - Backend: Middleware verifies JWT on protected routes
   - Frontend: ProtectedRoute component checks auth state
   - Unauthorized requests return 400/401 status

4. **CORS Configuration**

   - Credentials enabled for cookie support
   - Origin validation based on CLIENT_URL

5. **Data Isolation**
   - Each user can only access their own expenses
   - User ID automatically attached to all operations
   - Database queries filtered by authenticated user

## API Examples

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Profile (with token)

```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Expense (authenticated)

```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.00,
    "category": "Food",
    "description": "Lunch",
    "date": "2025-11-22"
  }'
```

## Troubleshooting

### "Not authorized to access this route"

- Token is missing or invalid
- Try logging in again
- Check that token is being sent in requests

### "User with this email already exists"

- Email is already registered
- Try logging in instead
- Use a different email

### "Invalid email or password"

- Check email and password are correct
- Email is case-insensitive
- Password is case-sensitive

### Expenses not showing after login

- Check browser console for errors
- Verify backend is running and accessible
- Check that token is being sent with requests
- Try clearing localStorage and logging in again

### CORS errors

- Verify CLIENT_URL in backend .env matches frontend URL
- Ensure credentials: 'include' in fetch requests
- Check CORS configuration in server.js

## Code Style & Patterns

The authentication system follows the exact same patterns as the existing expense functionality:

- **Controllers**: Business logic separated from routes
- **Validation**: express-validator for request validation
- **Error Handling**: Consistent error responses with status codes
- **Comments**: Comprehensive JSDoc-style documentation
- **Naming**: camelCase for functions, SCREAMING_SNAKE_CASE for constants
- **Structure**: Same folder organization (models, controllers, routes, middleware)

## Future Enhancements

Potential additions to consider:

- Email verification
- Password reset functionality
- Social authentication (Google, GitHub)
- Two-factor authentication (2FA)
- Role-based access control (admin, user)
- Account deletion
- Profile picture upload
- User settings/preferences

## Credits

Created by **Gourav Chaudhary**

GitHub: [GouravSittam/daily-expense-trackerXpenthara](https://github.com/GouravSittam/daily-expense-trackerXpenthara)

---

**Built with 💜 for TrackWise Penthara**
