# Nishant - Machine Learning Engineer Portfolio

A modern, responsive, and dynamic portfolio built to showcase data science and machine learning expertise. This platform features a custom Firebase-powered Content Management System (CMS), allowing seamless resume updates, project dynamic additions, and live tech-stack modifications without modifying codebase.

## Key Features

- **Dynamic Content Management:** Full administrative backend (`/admin`) to manage the hero section, skills, robust project showcases, and personal details effortlessly.
- **Firebase Integration:** Securely leverages Google Firebase Firestore and Authentication for all persistent data structuring and admin authorization.
- **Modern UI Stack:** Built entirely from scratch using React, TypeScript, Tailwind CSS, and Shadcn UI components.
- **Performance Optimized:** Utilizing Vite for blazing-fast continuous integration and loading speeds. 
- **Responsive Architecture:** Fully scalable layout dynamically adjusting across desktop, tablet, and mobile environments.

## Technology Stack

- **Framework:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion (Animations), Shadcn UI
- **Backend & Database:** Firebase Authentication, Firestore Database
- **Routing:** React Router v6

## Local Development

If you wish to spin up this project locally to explore the architecture:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file at the root directory and ensure all Firebase configuration variables are provided:
   ```env
   VITE_FIREBASE_API_KEY=""
   VITE_FIREBASE_AUTH_DOMAIN=""
   VITE_FIREBASE_PROJECT_ID=""
   VITE_FIREBASE_STORAGE_BUCKET=""
   VITE_FIREBASE_MESSAGING_SENDER_ID=""
   VITE_FIREBASE_APP_ID=""
   ```

3. **Spin up Local Server**
   ```bash
   npm run dev
   ```

## Production Deployment

This project is configured out-of-the-box for modern Jamstack deployment services such as Vercel or Netlify.

```bash
npm run build
```

## Architecture Notes
- The `/admin` portal utilizes Firebase Auth to ensure high-security write access to the main database. 
- The project utilizes `framer-motion` strategically to provide high-fidelity aesthetic transitions without compromising the Core Web Vitals score.

---
*Designed & Engineered globally for the open-source community.*
