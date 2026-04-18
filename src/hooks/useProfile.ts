import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { ProfileData } from "../components/admin/ProfileSettings";

const DEFAULT_PROFILE: ProfileData = {
  name: "Nishant",
  title: "Data Scientist & ML Engineer",
  bio: "I build data-driven solutions using Machine Learning, analytics, and modern AI techniques to solve real-world problems. Specializing in Python, RAG, and LLM-powered applications.",
  email: "",
  linkedin: "",
  github: "",
  availableForWork: true,
  heroSkills: ["Python", "PyTorch", "Scikit-Learn", "LangChain"],
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
