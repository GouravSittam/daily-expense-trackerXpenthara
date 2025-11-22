# ✅ Deployment Checklist

## Pre-Deployment

- [ ] All code changes committed
- [ ] Pushed to GitHub
- [ ] MongoDB Atlas cluster running
- [ ] MongoDB Network Access: 0.0.0.0/0 added

## Vercel Configuration

- [ ] Project imported/connected to GitHub
- [ ] Root directory set to `backend`
- [ ] Environment variables added:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET (32+ characters)
  - [ ] JWT_EXPIRE (e.g., "7d")
  - [ ] CLIENT_URL
  - [ ] NODE_ENV (set to "production")

## Post-Deployment Testing

- [ ] Health check: `curl https://trackwise-penthara-backend.vercel.app/api/health`
- [ ] API info: `curl https://trackwise-penthara-backend.vercel.app/api`
- [ ] Check Vercel logs for errors
- [ ] No 500 errors
- [ ] MongoDB shows active connections

## Frontend Update

- [ ] Update VITE_API_URL in frontend .env
- [ ] Redeploy frontend
- [ ] Test frontend-backend communication
- [ ] Test user registration
- [ ] Test user login
- [ ] Test expense CRUD operations

## Final Verification

- [ ] All endpoints working
- [ ] Authentication working
- [ ] Database operations successful
- [ ] No CORS errors
- [ ] No console errors

---

## Quick Commands

### Test Health

```powershell
curl https://trackwise-penthara-backend.vercel.app/api/health
```

### View Logs

```powershell
vercel logs trackwise-penthara-backend.vercel.app --follow
```

### Commit & Push

```powershell
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

---

**Status:** ⏳ Ready to deploy
**Date:** November 22, 2024
