# 🚀 Render Deployment Guide - Lunoré

## Step-by-Step Deployment

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### Step 2: Create Blueprint on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Select the repository with `render.yaml`
5. Click **"Apply"**

Render will create both services automatically.

### Step 3: Configure Backend Environment Variables

Go to **lunore-backend** service → Environment:

**MONGODB_URI**
```
mongodb+srv://username:password@cluster.mongodb.net/lunore?retryWrites=true&w=majority
```

**JWT_SECRET** (generate: `openssl rand -base64 32`)
```
your-generated-secret-here
```

**CORS_ORIGIN** (wait for frontend URL first, then add)
```
https://lunore-frontend.onrender.com
```

Click **"Save Changes"** - Backend will auto-redeploy.

### Step 4: Configure Frontend Environment Variables

Go to **lunore-frontend** service → Environment:

**VITE_API_URL**
```
https://lunore-backend.onrender.com
```

Click **"Save Changes"** - Frontend will auto-redeploy.

### Step 5: Verify Deployment

**Backend Health Check:**
```
https://lunore-backend.onrender.com/api/health
```

**Frontend:**
```
https://lunore-frontend.onrender.com
```

## Environment Variables Summary

| Service | Variable | Value | Required |
|---------|----------|-------|----------|
| Backend | MONGODB_URI | Your MongoDB connection string | ✅ Yes |
| Backend | JWT_SECRET | Random secure string | ✅ Yes |
| Backend | CORS_ORIGIN | Frontend URL | ✅ Yes |
| Backend | NODE_ENV | production | ✅ Auto-set |
| Backend | PORT | 5000 | ✅ Auto-set |
| Frontend | VITE_API_URL | Backend URL | ✅ Yes |

## Troubleshooting

**Build fails?**
- Check Render logs in the service dashboard
- Verify all dependencies are in package.json

**CORS errors?**
- Ensure CORS_ORIGIN matches your frontend URL exactly
- Include https:// in the URL

**MongoDB connection fails?**
- Verify connection string format
- Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas
- Check username/password are correct

**Frontend shows API errors?**
- Verify VITE_API_URL is set correctly
- Redeploy frontend after changing env vars

## Post-Deployment

✅ Test user registration
✅ Test login
✅ Test product browsing
✅ Test cart functionality
✅ Test checkout

---
**Your app is live!** 🎉
