import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { ProfileData } from "../components/admin/ProfileSettings";

const DEFAULT_PROFILE: ProfileData = {
  name: "Your Name",
  title: "Your Title",
  bio: "Short bio about you.",
  email: "you@example.com",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
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
