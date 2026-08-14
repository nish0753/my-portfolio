import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { ProfileData } from "../components/admin/ProfileSettings";

export interface StatItem {
  value: string;
  label: string;
}

const DEFAULT_STATS: StatItem[] = [
  { value: "6+", label: "years experience" },
  { value: "40+", label: "projects shipped" },
  { value: "15+", label: "happy clients" },
  { value: "∞", label: "cups of coffee" },
];

const DEFAULT_PROFILE: ProfileData = {
  name: "Nishant Kumar",
  title: "Data Scientist & ML Engineer",
  bio: "I'm a full stack developer with six years of experience turning fuzzy product ideas into shipped, maintainable software. I care equally about a clean API contract and a well-set line of type — the seam between backend and frontend is where I do my best work.\n\nLately I've been focused on real-time interfaces, design systems, and making CI pipelines boring in the best possible way. Off the clock: film photography, sourdough, long bike rides.",
  email: "",
  linkedin: "",
  github: "",
  availableForWork: true,
  heroSkills: ["Python", "PyTorch", "Scikit-Learn", "LangChain"],
  heroHeadline: "Nishant builds calm, dependable software.",
  portraitUrl: "/portrait_character.png",
  aboutHeadline: "A builder across the whole stack.",
  footerTagline: "Building calm, dependable software — open to roles and selective freelance work.",
  stats: DEFAULT_STATS,
};

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setProfile(DEFAULT_PROFILE);
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

  return { profile: profile ?? DEFAULT_PROFILE, loading };
}
