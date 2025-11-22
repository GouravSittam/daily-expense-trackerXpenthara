# Backend Deployment Guide for Vercel

## 📋 Pre-deployment Checklist

### 1. MongoDB Atlas Setup

- [ ] Create a MongoDB Atlas account (if not already created)
- [ ] Create a cluster
- [ ] Create a database user with password
- [ ] Whitelist all IP addresses (0.0.0.0/0) in Network Access
- [ ] Get your MongoDB connection string

### 2. Environment Variables Required

Set these in your Vercel project settings:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=https://your-frontend-app.vercel.app

# Environment
NODE_ENV=production
```

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Push your code to GitHub**

   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Import Project in Vercel**

   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the repository

3. **Configure Project Settings**

   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

4. **Add Environment Variables**

   - Go to Project Settings → Environment Variables
   - Add all variables listed above
   - Apply to Production, Preview, and Development

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy from backend directory**

   ```bash
   cd backend
   vercel --prod
   ```

4. **Add environment variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add JWT_EXPIRE
   vercel env add CLIENT_URL
   vercel env add NODE_ENV
   ```

## 🧪 Testing Your Deployment

After deployment, test these endpoints:

### 1. Health Check

```bash
curl https://trackwise-penthara-backend.vercel.app/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-11-22T..."
}
```

### 2. API Info

```bash
curl https://trackwise-penthara-backend.vercel.app/api
```

Expected response:

```json
{
  "success": true,
  "message": "Expense Tracker API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "expenses": "/api/expenses",
    "health": "/api/health"
  }
}
```

### 3. Register a Test User

```bash
curl -X POST https://trackwise-penthara-backend.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🐛 Troubleshooting

### Issue: 500 Internal Server Error

**Causes:**

1. Missing environment variables
2. MongoDB connection issues
3. Incorrect MongoDB URI
4. IP not whitelisted in MongoDB Atlas

**Solutions:**

1. Check all environment variables are set in Vercel
2. Verify MongoDB Atlas cluster is running
3. Ensure 0.0.0.0/0 is whitelisted in Network Access
4. Check Vercel function logs: https://vercel.com/dashboard → Your Project → Deployments → Click deployment → Logs

### Issue: Database Connection Timeout

**Causes:**

1. MongoDB URI is incorrect
2. Network access not configured in Atlas
3. Cluster is paused

**Solutions:**

1. Verify your MongoDB connection string
2. Add 0.0.0.0/0 to IP whitelist in Atlas
3. Resume cluster if paused

### Issue: CORS Errors

**Causes:**

1. CLIENT_URL not set correctly
2. Frontend URL doesn't match CLIENT_URL

**Solutions:**

1. Set CLIENT_URL to your frontend domain
2. Ensure no trailing slash in CLIENT_URL
3. Redeploy after updating environment variables

### Issue: JWT Token Issues

**Causes:**

1. JWT_SECRET not set
2. JWT_SECRET different between environments

**Solutions:**

1. Set JWT_SECRET in Vercel environment variables
2. Use the same secret across all environments

## 📊 Monitoring

### View Logs

```bash
vercel logs [deployment-url]
```

### View Function Invocations

Go to: https://vercel.com/dashboard → Your Project → Analytics

### Check Function Errors

Go to: https://vercel.com/dashboard → Your Project → Deployments → Select deployment → Runtime Logs

## 🔄 Redeployment

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically redeploy on push to main branch.

## 📝 Important Notes

1. **Serverless Nature**: Each function invocation creates a new container, so:

   - Database connections are cached
   - State is not maintained between requests
   - Cold starts may occur after inactivity

2. **Function Limits**:

   - Maximum execution time: 10 seconds (Hobby plan)
   - Maximum response size: 4.5 MB
   - Memory: 1024 MB

3. **Database Connection Pooling**:

   - Mongoose connection is cached to avoid reconnecting on every request
   - Connection timeout set to 5 seconds for faster failures

4. **CORS Configuration**:
   - Ensure CLIENT_URL matches your frontend domain
   - Use credentials: true for cookie-based auth

## 🎯 Next Steps

1. Update your frontend `.env` file with the backend URL:

   ```env
   VITE_API_URL=https://trackwise-penthara-backend.vercel.app/api
   ```

2. Deploy your frontend to Vercel

3. Update the CLIENT_URL environment variable with your frontend URL

4. Test the full application flow

## 🆘 Need Help?

- Check Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com/
- Check deployment logs for specific errors
