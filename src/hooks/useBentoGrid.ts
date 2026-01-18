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
}

const DEFAULT_BENTO_ITEMS: BentoItem[] = [
  {
    id: "1",
    title: "Full-Stack Development",
    description:
      "I specialize in building complete web applications from concept to deployment. From responsive frontends with React and TypeScript to robust backends with Node.js and cloud services, I deliver end-to-end solutions that scale.",
    icon: "Code2",
    category: "main",
    order: 0,
  },
  {
    id: "2",
    title: "UI/UX Design",
    description: "Creating beautiful interfaces",
    icon: "Palette",
    category: "skill",
    order: 1,
  },
  {
    id: "3",
    title: "Performance",
    description: "Optimizing for speed",
    icon: "Zap",
    category: "skill",
    order: 2,
  },
  {
    id: "4",
    title: "Full Stack",
    description: "End-to-end development",
    icon: "Globe",
    category: "skill",
    order: 3,
  },
  {
    id: "5",
    title: "Experience",
    description: "Experience stats",
    icon: "Layers",
    category: "stat",
    order: 4,
  },
  {
    id: "6",
    title: "Architecture",
    description: "Scalable systems design",
    icon: "Layers",
    category: "skill",
    order: 5,
  },
  {
    id: "7",
    title: "Animation",
    description: "Delightful interactions",
    icon: "Sparkles",
    category: "skill",
    order: 6,
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
