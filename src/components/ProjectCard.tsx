export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category?: string;
  problemStatement?: string;
  metrics?: { label: string; value: string }[];
  architectureHighlights?: string[];
  order?: number;
}
