import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "main" | "skill" | "stat";
  order: number;
  technologies?: string[]; // For main items - editable tech tags
}

const DEFAULT_BENTO_ITEMS: BentoItem[] = [
  {
    id: "1",
    title: "Data Science & Machine Learning",
    description:
      "I build predictive models and data pipelines that solve real business problems. From exploratory analysis to production-ready ML systems, I turn raw data into actionable insights using Python, SQL, and modern ML frameworks.",
    icon: "Code2",
    category: "main",
    order: 0,
    technologies: ["Python", "SQL", "Pandas", "Scikit-learn", "Streamlit"],
  },
  {
    id: "2",
    title: "Generative AI & LLMs",
    description:
      "Building AI agents, RAG systems, and LLM-powered applications",
    icon: "Sparkles",
    category: "skill",
    order: 1,
  },
  {
    id: "3",
    title: "ML Model Development",
    description: "Feature engineering, model training, and evaluation",
    icon: "Zap",
    category: "skill",
    order: 2,
  },
  {
    id: "4",
    title: "End-to-End Deployment",
    description: "From Jupyter notebooks to production APIs",
    icon: "Rocket",
    category: "skill",
    order: 3,
  },
  {
    id: "5",
    title: "Full-Stack for AI",
    description: "React, Node.js, and cloud services to deploy ML products",
    icon: "Globe",
    category: "skill",
    order: 4,
  },
  {
    id: "6",
    title: "Data Engineering",
    description: "ETL pipelines and data infrastructure",
    icon: "Layers",
    category: "skill",
    order: 5,
  },
];

export function useBentoGrid() {
  const [items, setItems] = useState<BentoItem[]>(DEFAULT_BENTO_ITEMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setItems(DEFAULT_BENTO_ITEMS);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "bentoGrid"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const bentoData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as BentoItem,
        );

        setItems(bentoData.length > 0 ? bentoData : DEFAULT_BENTO_ITEMS);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching bento grid:", error);
        setItems(DEFAULT_BENTO_ITEMS);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { items, loading };
}
