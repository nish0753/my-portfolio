# 🌟 Apple-Inspired Portfolio

A world-class, modern portfolio website built with React, TypeScript, Tailwind CSS, and Firebase. Features a stunning liquid glass design aesthetic inspired by Apple's design language.

## ✨ Features

- **Liquid Glass Aesthetics**: Deep black background with translucent glass cards, blur effects, and subtle animations
- **Bento Grid Layout**: Asymmetric card layout for skills and about section
- **Real-time Updates**: Firebase Firestore with live listeners for instant content updates
- **Admin Dashboard**: Secure admin panel with Google authentication
- **Project Management**: Add, edit, and delete projects through an intuitive interface
- **Smooth Animations**: Framer Motion for staggered fade-ins and hover effects
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom glass effects
- **Animations**: Framer Motion
- **Backend**: Firebase (Firestore + Authentication)
- **Routing**: React Router v6
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Firebase project set up
- Google account for admin authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   
   Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   
   - Enable Firestore Database
   - Enable Google Authentication
   - Create a Firestore collection named `projects`

4. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your Firebase credentials:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` with your Firebase config values.

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173`

## �� Admin Access

1. Navigate to `/login`
2. Click "Sign in with Google"
3. After authentication, access the admin dashboard at `/admin`
4. Add, edit, or delete projects in real-time

## 📦 Build for Production

```bash
npm run build
```

## 🎨 Customization

1. **Colors**: Edit `tailwind.config.js` to customize the glass effect opacity
2. **Fonts**: Change font family in `tailwind.config.js` and `globals.css`
3. **Content**: Update Hero text in `Hero.tsx` and about section in `BentoGrid.tsx`
4. **Contact Info**: Update email and social links in `Home.tsx`

---

**Built with ❤️ using React + TypeScript + Tailwind CSS + Firebase**
