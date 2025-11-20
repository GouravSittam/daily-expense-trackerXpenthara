# 🚀 Quick Setup Guide - Expense Tracker

This guide will help you get the application running in under 5 minutes!

## ⚡ Prerequisites Check

Before starting, ensure you have:

- [ ] Node.js installed (v18+)

  ```bash
  node --version
  ```

- [ ] MongoDB installed

  ```bash
  mongod --version
  ```

- [ ] npm/yarn/bun package manager
  ```bash
  npm --version
  ```

## 📦 Step-by-Step Setup

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

**Expected output:** Dependencies installed successfully

### Step 2: Start MongoDB

**Windows:**

```bash
net start MongoDB
```

**Or manually:**

```bash
mongod
```

**Verify:** MongoDB should be running on `mongodb://localhost:27017`

### Step 3: Start Backend Server

```bash
# From backend directory
npm run dev
```

**Expected output:**

```
✅ MongoDB Connected: localhost
🚀 Expense Tracker API Server
📡 Server running on port: 5000
```

**Keep this terminal running!**

### Step 4: Install Frontend Dependencies

Open a **NEW terminal** and run:

```bash
# From project root
npm install
```

### Step 5: Start Frontend

```bash
npm run dev
```

**Expected output:**

```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 6: Open Application

1. Open your browser
2. Navigate to: `http://localhost:5173`
3. You should see the Expense Tracker interface!

## 🎉 That's It!

Your application is now running:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **MongoDB:** mongodb://localhost:27017/expense-tracker

## 🧪 Testing the Setup

### Test Backend API

Open a new terminal and run:

```bash
# Windows PowerShell
Invoke-WebRequest http://localhost:5000/api/health | Select-Object -ExpandProperty Content
```

**Expected response:**

```json
{ "success": true, "message": "Server is running", "timestamp": "..." }
```

### Test Frontend

1. Add a new expense:

   - Enter amount: 50
   - Select category: Food
   - Add description: Lunch
   - Click "Add Expense"

2. Check if expense appears in the list
3. Check if summary updates
4. Check if chart updates

## ❗ Troubleshooting

### MongoDB Not Starting

**Error:** "MongoDB service not found"

**Solution:**

1. Ensure MongoDB is installed
2. Try running `mongod` directly in a terminal
3. Or install MongoDB as a Windows service

### Backend Not Connecting to MongoDB

**Error:** "Error connecting to MongoDB"

**Solution:**

1. Check if MongoDB is running
2. Verify connection string in `backend/.env`
3. Check MongoDB logs

### Port Already in Use

**Error:** "Port 5000 is already in use"

**Solution:**

1. Edit `backend/.env`
2. Change `PORT=5000` to `PORT=5001`
3. Update frontend `.env`: `VITE_API_URL=http://localhost:5001/api`

### CORS Errors

**Error:** "CORS policy blocked"

**Solution:**

1. Ensure backend is running
2. Check `CLIENT_URL` in `backend/.env` matches frontend URL
3. Restart backend server

### API Calls Failing

**Error:** "Failed to fetch" or network errors

**Solution:**

1. Check if backend is running (`http://localhost:5000/api/health`)
2. Verify `VITE_API_URL` in frontend `.env`
3. Check browser console for detailed error

## 🔍 Verification Checklist

- [ ] MongoDB is running
- [ ] Backend server showing "MongoDB Connected" message
- [ ] Backend accessible at http://localhost:5000
- [ ] Frontend accessible at http://localhost:5173
- [ ] Can add expenses through the UI
- [ ] Expenses persist after page refresh
- [ ] Charts and summaries update correctly

## 📱 Next Steps

Now that your app is running:

1. **Explore the features:**

   - Add multiple expenses
   - Try different categories
   - Check the summary and charts

2. **Check the code:**

   - Review `src/components/` for React components
   - Review `backend/controllers/` for API logic
   - Review `backend/models/` for data schema

3. **Read documentation:**
   - Main README: `PROJECT_README.md`
   - Backend docs: `backend/README.md`

## 🎓 Development Tips

### Hot Reload

Both frontend and backend support hot reload:

- Edit any `.jsx` file → Frontend updates instantly
- Edit any `.js` file in backend → Server restarts automatically

### Debugging

**Frontend:**

- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls

**Backend:**

- Check terminal for error messages
- Logs show all incoming requests
- Add `console.log()` statements as needed

### Database Inspection

View your MongoDB data:

```bash
# Connect to MongoDB
mongosh

# Switch to database
use expense-tracker

# View expenses
db.expenses.find().pretty()
```

## 🛠️ Useful Commands

```bash
# Stop servers
Ctrl + C (in each terminal)

# Restart backend
npm run dev (in backend directory)

# Restart frontend
npm run dev (in root directory)

# Clear node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install

# View backend logs
# Just watch the terminal where backend is running

# Reset database (delete all expenses)
mongosh
use expense-tracker
db.expenses.deleteMany({})
```

## 🎉 Success!

You're all set! Start tracking your expenses!

Need help? Check:

- PROJECT_README.md for full documentation
- backend/README.md for API details
- GitHub Issues for known problems

Happy coding! 🚀
