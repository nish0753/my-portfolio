import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { ProfileData } from "../components/admin/ProfileSettings";

const DEFAULT_PROFILE: ProfileData = {
  name: "Nishant Srivastava",
  title: "Data Scientist & ML Engineer",
  bio: "I build predictive models, ML pipelines, and GenAI applications that solve real-world problems. Specializing in Python, Machine Learning, and LLM-powered solutions.",
  email: "nishant0753@gmail.com",
  linkedin: "https://linkedin.com/in/nishant-srivastava",
  github: "https://github.com/nish0753",
  availableForWork: true,
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "settings", "profile"),
      (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as ProfileData);
        } else {
          setProfile(DEFAULT_PROFILE);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching profile:", error);
        setProfile(DEFAULT_PROFILE);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { profile, loading };
}
