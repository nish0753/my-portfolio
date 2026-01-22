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
  // Core Skills
  { id: "1", name: "Python", category: "Core Skills", order: 0 },
  { id: "2", name: "SQL", category: "Core Skills", order: 1 },
  { id: "3", name: "Pandas", category: "Core Skills", order: 2 },
  { id: "4", name: "NumPy", category: "Core Skills", order: 3 },
  { id: "5", name: "Data Cleaning & EDA", category: "Core Skills", order: 4 },
  { id: "6", name: "Machine Learning", category: "Core Skills", order: 5 },
  // ML & AI
  { id: "7", name: "Scikit-learn", category: "ML & AI", order: 6 },
  { id: "8", name: "Feature Engineering", category: "ML & AI", order: 7 },
  { id: "9", name: "Model Evaluation", category: "ML & AI", order: 8 },
  { id: "10", name: "Generative AI (LLMs)", category: "ML & AI", order: 9 },
  { id: "11", name: "Prompt Engineering", category: "ML & AI", order: 10 },
  { id: "12", name: "RAG", category: "ML & AI", order: 11 },
  // Tools
  { id: "13", name: "Git & GitHub", category: "Tools", order: 12 },
  { id: "14", name: "Jupyter Notebook", category: "Tools", order: 13 },
  { id: "15", name: "Streamlit", category: "Tools", order: 14 },
  { id: "16", name: "Flask", category: "Tools", order: 15 },
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
