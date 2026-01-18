import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../lib/firebase";

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

    const trackVisitor = async () => {
      try {
        const statsRef = doc(db, "settings", "visitors");
        const statsDoc = await getDoc(statsRef);

        if (statsDoc.exists()) {
          // Update existing visitor count
          await updateDoc(statsRef, {
            totalVisitors: increment(1),
            lastVisit: new Date().toISOString(),
          });
          const updatedDoc = await getDoc(statsRef);
          setStats(updatedDoc.data() as VisitorStats);
        } else {
          // Create new visitor stats
          const initialStats = {
            totalVisitors: 1,
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

    trackVisitor();
  }, []);

  return { stats, loading };
}
