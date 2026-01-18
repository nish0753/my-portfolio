import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  field: string;
  year: string;
  description: string;
  icon: string;
  certificateUrl?: string;
  order: number;
}

const DEFAULT_EDUCATION: EducationItem[] = [
  {
    id: "1",
    degree: "Bachelor of Science",
    school: "University Name",
    field: "Computer Science",
    year: "2018 - 2022",
    description:
      "Specialized in Web Development and Software Engineering with focus on full-stack development",
    icon: "GraduationCap",
    order: 0,
  },
  {
    id: "2",
    degree: "Advanced Certification",
    school: "Online Platform",
    field: "Full-Stack Development",
    year: "2022 - 2023",
    description:
      "Comprehensive training in React, Node.js, and modern web development practices",
    icon: "BookOpen",
    certificateUrl: "",
    order: 1,
  },
  {
    id: "3",
    degree: "Professional Diploma",
    school: "Training Institute",
    field: "UI/UX Design",
    year: "2023",
    description:
      "Mastered design principles, prototyping, and user-centered design methodology",
    icon: "Award",
    order: 2,
  },
];

export function useEducation() {
  const [items, setItems] = useState<EducationItem[]>(DEFAULT_EDUCATION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setItems(DEFAULT_EDUCATION);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "education"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const educationData = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as EducationItem,
        );

        setItems(educationData.length > 0 ? educationData : DEFAULT_EDUCATION);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching education:", error);
        setItems(DEFAULT_EDUCATION);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { items, loading };
}
