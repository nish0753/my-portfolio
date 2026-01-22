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
      "I build predictive models and data pipelines to solve business problems, taking projects from exploratory data analysis to production-ready ML systems.",
    icon: "Code2",
    category: "main",
    order: 0,
    technologies: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Feature Engineering",
      "Model Evaluation",
    ],
  },
  {
    id: "2",
    title: "Generative AI & LLM Applications",
    description:
      "I develop GenAI solutions such as LLM-powered applications, retrieval-augmented generation (RAG) systems, and tool-using AI agents.",
    icon: "Sparkles",
    category: "skill",
    order: 1,
    technologies: [
      "LLMs",
      "Prompt Engineering",
      "RAG",
      "LangChain",
      "Vector Databases",
    ],
  },
  {
    id: "3",
    title: "ML Engineering & Deployment",
    description:
      "I focus on deploying ML models into scalable applications, transforming notebooks into APIs and integrating them into real products.",
    icon: "Rocket",
    category: "skill",
    order: 2,
    technologies: [
      "Flask / FastAPI",
      "APIs",
      "Model Serving",
      "Performance Optimization",
    ],
  },
  {
    id: "4",
    title: "Full-Stack for AI Products",
    description:
      "I use full-stack technologies to build and deploy ML-powered applications with clean APIs and user-friendly interfaces.",
    icon: "Globe",
    category: "skill",
    order: 3,
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Tailwind",
      "Cloud Basics",
    ],
  },
  {
    id: "5",
    title: "Data Engineering (Foundational)",
    description:
      "I design basic ETL pipelines and data workflows to support analytics and machine learning systems.",
    icon: "Layers",
    category: "skill",
    order: 4,
    technologies: ["ETL", "Data Pipelines", "SQL", "Data Modeling"],
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
