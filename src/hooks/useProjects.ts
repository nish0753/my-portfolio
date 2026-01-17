import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { Project } from "../components/ProjectCard";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If Firebase is not configured, return empty projects
    if (!db) {
      console.warn("Firebase not configured. Showing demo mode.");
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      // Create a query with real-time listener
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));

      // Set up real-time listener (onSnapshot)
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const projectsData: Project[] = [];
          snapshot.forEach((doc) => {
            projectsData.push({
              id: doc.id,
              ...doc.data(),
            } as Project);
          });
          setProjects(projectsData);
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching projects:", err);
          setError(err.message);
          setProjects([]);
          setLoading(false);
        },
      );

      // Cleanup listener on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up Firebase listener:", err);
      setProjects([]);
      setLoading(false);
    }
  }, []);

  return { projects, loading, error };
}
