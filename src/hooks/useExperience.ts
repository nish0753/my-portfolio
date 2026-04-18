import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  description: string;
  year: string;
  order: number;
}

const DEFAULT_EXPERIENCE: ExperienceItem[] = [
  {
    id: "1",
    role: "Consultant Intern",
    company: "HighRadius",
    description: "Consulting on implementation protocols and integrating ML techniques to improve operational efficiency.",
    year: "Dec 2025 - Present",
    order: 0,
  }
];

export function useExperience() {
  const [items, setItems] = useState<ExperienceItem[]>(DEFAULT_EXPERIENCE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setItems(DEFAULT_EXPERIENCE);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "experience"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const experienceData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as ExperienceItem,
        );

        setItems(experienceData.length > 0 ? experienceData : DEFAULT_EXPERIENCE);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching experience:", error);
        setItems(DEFAULT_EXPERIENCE);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { items, loading };
}
