import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { isAuthorizedAdmin } from "../lib/auth";

export interface VisitorStats {
  totalVisitors: number;
  lastVisit: string;
}

export function useVisitors() {
  const [stats, setStats] = useState<VisitorStats>({
    totalVisitors: 0,
    lastVisit: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    // Check if current user is admin before tracking
    const checkAndTrack = async (isAdmin: boolean) => {
      try {
        const statsRef = doc(db!, "settings", "visitors");
        const statsDoc = await getDoc(statsRef);

        if (statsDoc.exists()) {
          // Only increment if NOT admin
          if (!isAdmin) {
            await updateDoc(statsRef, {
              totalVisitors: increment(1),
              lastVisit: new Date().toISOString(),
            });
          }
          const updatedDoc = await getDoc(statsRef);
          setStats(updatedDoc.data() as VisitorStats);
        } else {
          // Create new visitor stats (only count if not admin)
          const initialStats = {
            totalVisitors: isAdmin ? 0 : 1,
            lastVisit: new Date().toISOString(),
          };
          await setDoc(statsRef, initialStats);
          setStats(initialStats);
        }
      } catch (error) {
        console.error("Error tracking visitor:", error);
      } finally {
        setLoading(false);
      }
    };

    // Wait briefly for auth state, then track
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isAdmin = user ? isAuthorizedAdmin(user.email) : false;
      checkAndTrack(isAdmin);
    });

    // Fallback: if auth doesn't respond quickly, track as non-admin
    const timeout = setTimeout(() => {
      if (loading) {
        checkAndTrack(false);
      }
    }, 1000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  return { stats, loading };
}
