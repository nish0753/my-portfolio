import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Resume {
  url: string | null;
  fileName?: string;
  updatedAt?: string;
}

export function useResume() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "settings", "resume"),
      (doc) => {
        if (doc.exists()) {
          setResume(doc.data() as Resume);
        } else {
          setResume(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching resume:", error);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { resume, loading };
}
