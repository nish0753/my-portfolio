import { useState } from "react";
import { motion } from "framer-motion";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import GlassCard from "../components/ui/GlassCard";
import { LogIn, Loader } from "lucide-react";

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [signingIn, setSigningIn] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!auth || !googleProvider) {
      alert(
        "Firebase is not configured. Please set up your Firebase credentials.",
      );
      return;
    }
    setSigningIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/admin");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <GlassCard className="text-center">
            <div className="mb-6">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-glass-border"
                />
              )}
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => navigate("/admin")} className="flex-1">
                Go to Dashboard
              </Button>
              <Button onClick={handleSignOut} variant="secondary">
                Sign Out
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <GlassCard className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-gradient">Admin Login</span>
          </h1>
          <p className="text-gray-400 mb-8">
            Sign in with your Google account to access the admin dashboard.
          </p>
          <Button
            onClick={handleGoogleSignIn}
            disabled={signingIn}
            size="lg"
            className="w-full"
          >
            {signingIn ? (
              <>
                <Loader className="inline-block mr-2 animate-spin" size={20} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="inline-block mr-2" size={20} />
                Sign in with Google
              </>
            )}
          </Button>
        </GlassCard>
      </motion.div>
    </div>
  );
}
