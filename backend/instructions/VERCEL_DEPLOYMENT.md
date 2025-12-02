# Vercel Deployment Configuration

## Environment Variables

Make sure to set the following environment variables in your Vercel dashboard:

1. **MONGODB_URI**: Your MongoDB connection string
2. **JWT_SECRET**: A secure secret key for JWT tokens
3. **JWT_EXPIRE**: Token expiration time (e.g., "7d")
4. **CLIENT_URL**: Your frontend URL (e.g., https://your-frontend.vercel.app)
5. **NODE_ENV**: Set to "production"

## Steps to Deploy

1. Push your code to GitHub
2. Go to Vercel dashboard
3. Import your repository
4. Set the root directory to `backend`
5. Add the environment variables mentioned above
6. Deploy

## Testing the Deployment

After deployment, test these endpoints:

- Health Check: `https://trackwise-penthara-backend.vercel.app/api/health`
- API Info: `https://trackwise-penthara-backend.vercel.app/api`

## Important Notes

- The serverless function is located in `api/index.js`
- All routes are handled through the Express app exported from `server.js`
- Database connection is established on each request (serverless nature)
- Make sure MongoDB Atlas allows connections from all IP addresses (0.0.0.0/0) for Vercel
