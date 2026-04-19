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
      // Fetch all projects (no orderBy to avoid excluding docs without 'order' field)
      const q = query(collection(db, "projects"));

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
          // Sort client-side: by 'order' field if present, otherwise by createdAt
          projectsData.sort((a, b) => {
            const orderA = (a as any).order ?? 9999;
            const orderB = (b as any).order ?? 9999;
            return orderA - orderB;
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
