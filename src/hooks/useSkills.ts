import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface Skill {
  id: string;
  name: string;
  category: string;
  order: number;
}

const DEFAULT_SKILLS: Skill[] = [
  { id: "1", name: "React", category: "Frontend", order: 0 },
  { id: "2", name: "TypeScript", category: "Frontend", order: 1 },
  { id: "3", name: "Tailwind CSS", category: "Frontend", order: 2 },
  { id: "4", name: "Python", category: "Backend", order: 3 },
  { id: "5", name: "Node.js", category: "Backend", order: 4 },
  { id: "6", name: "Firebase", category: "Backend", order: 5 },
  { id: "7", name: "Pandas", category: "Data Science", order: 6 },
  { id: "8", name: "NumPy", category: "Data Science", order: 7 },
  { id: "9", name: "Scikit-learn", category: "Data Science", order: 8 },
  { id: "10", name: "Git", category: "Tools", order: 9 },
  { id: "11", name: "VS Code", category: "Tools", order: 10 },
  { id: "12", name: "Docker", category: "Tools", order: 11 },
];

export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setSkills(DEFAULT_SKILLS);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "skills"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const skillsData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Skill,
        );

        setSkills(skillsData.length > 0 ? skillsData : DEFAULT_SKILLS);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching skills:", error);
        setSkills(DEFAULT_SKILLS);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { skills, loading };
}
