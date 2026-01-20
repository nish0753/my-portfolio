# 🚀 Deployment Checklist for Portfolio

## ✅ Issues Found & Fixed

### Issue #1: Firebase Authentication Domain

**Problem:** Your deployed domain isn't authorized in Firebase, causing "Failed to sign in" errors.

**Solution:**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `my-portfolio-13930`
3. Navigate to: **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add your deployment domain:
   - For Render: `your-app-name.onrender.com`
   - For Netlify: `your-app-name.netlify.app`
   - For Vercel: `your-app-name.vercel.app`
6. Click **Save**

### Issue #2: Environment Variables Not Set

**Problem:** Firebase credentials aren't available during build on deployment platform.

**Solution:** Add these 6 environment variables in your deployment platform:

#### For Render:

1. Go to Dashboard → Your Service → Environment
2. Add each variable:

| Variable Name                       | Value                                       |
| ----------------------------------- | ------------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | `AIzaSyCDYQwKRLgHCSNhbvPhRzK9AE9gM3spbpM`   |
| `VITE_FIREBASE_AUTH_DOMAIN`         | `my-portfolio-13930.firebaseapp.com`        |
| `VITE_FIREBASE_PROJECT_ID`          | `my-portfolio-13930`                        |
| `VITE_FIREBASE_STORAGE_BUCKET`      | `my-portfolio-13930.firebasestorage.app`    |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `344758140293`                              |
| `VITE_FIREBASE_APP_ID`              | `1:344758140293:web:5bba3917107b0b401a18ec` |

3. Click **Save Changes**

#### For Netlify:

1. Site settings → Build & deploy → Environment
2. Add same 6 variables above
3. Click **Save**

#### For Vercel:

1. Project Settings → Environment Variables
2. Add same 6 variables above
3. Redeploy

---

## 📋 Step-by-Step Deployment Guide

### Option 1: Deploy to Render (Recommended)

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "feat: Add Render deployment configuration"
   git push origin main
   ```

2. **Create Render Account:**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

3. **Create New Web Service:**
   - Click **New +** → **Web Service**
   - Connect your GitHub repository
   - Configure:
     - **Name:** `your-portfolio-name`
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `npm run preview -- --host 0.0.0.0 --port $PORT`
     - **Environment:** Node 22

4. **Add Environment Variables:**
   - Add all 6 Firebase variables from table above

5. **Deploy:**
   - Click **Create Web Service**
   - Wait for build to complete (~3-5 minutes)

6. **Add Domain to Firebase:**
   - Copy your Render URL: `your-app.onrender.com`
   - Add to Firebase authorized domains (see Issue #1 above)

7. **Test:**
   - Visit your site
   - Click "Admin" and try to log in with Google

---

### Option 2: Deploy to Netlify

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Build Locally:**

   ```bash
   npm run build
   ```

3. **Deploy:**

   ```bash
   netlify deploy --prod
   ```

   - Choose `dist` folder when prompted

4. **Or Use Netlify Dashboard:**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop `dist` folder
   - Or connect GitHub repo

5. **Add Environment Variables:**
   - Site settings → Build & deploy → Environment
   - Add all 6 Firebase variables

6. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

7. **Add Domain to Firebase:**
   - Copy Netlify URL
   - Add to Firebase authorized domains

---

### Option 3: Deploy to Vercel

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Deploy:**

   ```bash
   vercel --prod
   ```

3. **Or Use Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

4. **Add Environment Variables:**
   - Project Settings → Environment Variables
   - Add all 6 Firebase variables
   - Select all environments (Production, Preview, Development)

5. **Add Domain to Firebase:**
   - Copy Vercel URL
   - Add to Firebase authorized domains

---

## 🔍 Troubleshooting

### Issue: "Failed to sign in"

**Solution:** Your deployment domain isn't in Firebase authorized domains. Add it!

### Issue: Blank page after deployment

**Solutions:**

1. Check browser console for errors
2. Verify all 6 environment variables are set correctly
3. Check build logs for errors
4. Make sure build command is `npm run build`
5. Ensure output directory is `dist`

### Issue: Firebase not working

**Solutions:**

1. Verify environment variable names start with `VITE_`
2. Check Firebase project is active in console
3. Verify Firebase credentials are correct
4. Check browser console for specific Firebase errors

### Issue: Admin panel not accessible

**Solutions:**

1. Make sure you added deployment domain to Firebase
2. Clear browser cache
3. Try incognito/private browsing
4. Check if Google OAuth is enabled in Firebase Console

---

## ✅ Post-Deployment Checklist

- [ ] Portfolio homepage loads correctly
- [ ] All sections render (Hero, Skills, Projects, Education, etc.)
- [ ] Admin login with Google works
- [ ] Can edit profile from admin panel
- [ ] Can add/edit/delete projects
- [ ] Can upload resume
- [ ] Can edit skills
- [ ] Can edit education
- [ ] Can edit "What I Do" section
- [ ] Visitor count increments
- [ ] Mobile responsive design works
- [ ] All images load correctly
- [ ] Navigation works on all pages

---

## 🔐 Security Notes

**IMPORTANT:**

- Never commit `.env` file to GitHub (already in `.gitignore` ✅)
- Firebase credentials in environment variables are safe for frontend
- Consider adding Firebase Security Rules to restrict database writes to authenticated users only

**Firebase Security Rules Example:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read to everyone
    match /{document=**} {
      allow read: if true;
    }

    // Allow write only to authenticated users
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

To add these rules:

1. Firebase Console → Firestore Database → Rules
2. Paste above rules
3. Click **Publish**

---

## 📱 Testing Checklist

Before deploying:

- [x] Runs locally without errors: `npm run dev`
- [x] Build succeeds: `npm run build`
- [x] Preview works: `npm run preview`
- [x] Mobile responsive
- [x] Firebase authentication works
- [x] All admin features work

After deploying:

- [ ] Visit deployed URL
- [ ] Test on mobile device
- [ ] Test admin login
- [ ] Make a test edit in admin panel
- [ ] Verify edit appears on homepage

---

## 🆘 Need Help?

If you encounter issues:

1. Check deployment platform logs
2. Check browser console for errors
3. Verify all environment variables
4. Confirm Firebase domain authorization
5. Test locally first to isolate issues

---

Generated: January 20, 2026
