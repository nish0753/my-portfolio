import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Sparkles, ChevronUp, ChevronDown } from "lucide-react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { Project } from "../ProjectCard";
import Button from "../admin-ui/Button";
import Input from "../admin-ui/Input";
import Textarea from "../admin-ui/Textarea";
import GlassCard from "../admin-ui/GlassCard";

const SAMPLE_PROJECTS = [
  {
    title: "Analytics Dashboard Pro",
    description:
      "A real-time analytics platform handling 10k+ events per second. Built with React, WebSockets, and D3.js for rich data visualization.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["React", "WebSockets", "D3.js", "Python"],
    category: "2024 — SaaS Platform",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/analytics-pro",
    featured: true,
    problemStatement: "Monitoring high-volume real-time event streams without client browser lag or server memory leaks.",
    metrics: [
      { label: "Event Rate", value: "10k+/sec" },
      { label: "Latencies", value: "< 18ms" },
      { label: "Lighthouse", value: "99/100" },
    ],
    architectureHighlights: [
      "WebSocket connection pooling with automatic reconnection backoff",
      "Virtual windowing rendering 100,000 data points smoothly with Canvas/D3",
      "Modular dashboard widget system with customizable layout state",
    ],
  },
  {
    title: "LLM Document Search (RAG)",
    description:
      "Generative AI pipeline indexing multi-page PDFs into vector embeddings. Built with Python, LangChain, FAISS, and Streamlit.",
    imageUrl:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop",
    technologies: ["Python", "RAG", "LangChain", "FAISS"],
    category: "2024 — AI & Data",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/rag-pdf-search",
    featured: true,
    problemStatement: "Extracting and searching unstructured documents with contextual precision and low retrieval hallucination.",
    metrics: [
      { label: "Accuracy", value: "94.8%" },
      { label: "Retrieval Speed", value: "120ms" },
      { label: "Docs Processed", value: "50k+ pages" },
    ],
    architectureHighlights: [
      "FAISS vector store with semantic chunk overlap optimization",
      "LangChain conversational retrieval chain with source attribution",
      "Streamlit web UI for interactive chat & document preview",
    ],
  },
];

interface ProjectFormProps {
  projects: Project[];
}

export default function ProjectForm({ projects }: ProjectFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    problemStatement: "",
    metricsText: "",
    architectureHighlightsText: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      alert(
        "Firebase is not configured. Please set up your Firebase credentials.",
      );
      return;
    }
    setLoading(true);

    try {
      // Parse metrics: "10k+/sec:Event Rate, < 18ms:Latency"
      const parsedMetrics = formData.metricsText
        .split(",")
        .map((m) => {
          const parts = m.split(":");
          if (parts.length === 2) {
            return { value: parts[0].trim(), label: parts[1].trim() };
          }
          return null;
        })
        .filter(Boolean);

      // Parse architecture highlights: line by line
      const parsedHighlights = formData.architectureHighlightsText
        .split("\n")
        .map((h) => h.replace(/^-\s*/, "").trim())
        .filter(Boolean);

      const projectData = {
        title: formData.title,
        description: formData.description,
        category: formData.category || "Featured Project",
        imageUrl: formData.imageUrl,
        technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean),
        liveUrl: formData.liveUrl,
        githubUrl: formData.githubUrl,
        featured: formData.featured,
        problemStatement: formData.problemStatement,
        metrics: parsedMetrics,
        architectureHighlights: parsedHighlights,
        updatedAt: new Date().toISOString(),
      };

      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), projectData);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date().toISOString(),
          order: projects.length,
        });
      }

      resetForm();
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category || "",
      imageUrl: project.imageUrl || "",
      technologies: (project.technologies || []).join(", "),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured || false,
      problemStatement: project.problemStatement || "",
      metricsText: (project.metrics || [])
        .map((m) => `${m.value}:${m.label}`)
        .join(", "),
      architectureHighlightsText: (project.architectureHighlights || []).join("\n"),
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    if (!db) {
      alert("Firebase is not configured.");
      return;
    }
    try {
      await deleteDoc(doc(db, "projects", projectId));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(
        `Failed to delete project: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      problemStatement: "",
      metricsText: "",
      architectureHighlightsText: "",
    });
    setEditingProject(null);
  };

  const handleAddSampleProjects = async () => {
    if (!db) {
      alert("Firebase is not configured.");
      return;
    }
    if (!confirm("This will add sample projects. Continue?")) return;
    setLoading(true);
    try {
      for (const project of SAMPLE_PROJECTS) {
        await addDoc(collection(db, "projects"), {
          ...project,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      alert("Sample projects added successfully!");
    } catch (error) {
      console.error("Error adding sample projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0 || !db) return;
    try {
      const current = projects[index];
      const above = projects[index - 1];
      const currentOrder = (current as any).order ?? index;
      const aboveOrder = (above as any).order ?? index - 1;
      await updateDoc(doc(db, "projects", current.id), { order: aboveOrder });
      await updateDoc(doc(db, "projects", above.id), { order: currentOrder });
    } catch (error) {
      console.error("Error reordering:", error);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index >= projects.length - 1 || !db) return;
    try {
      const current = projects[index];
      const below = projects[index + 1];
      const currentOrder = (current as any).order ?? index;
      const belowOrder = (below as any).order ?? index + 1;
      await updateDoc(doc(db, "projects", current.id), { order: belowOrder });
      await updateDoc(doc(db, "projects", below.id), { order: currentOrder });
    } catch (error) {
      console.error("Error reordering:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Projects & Case Studies</h2>
        <div className="flex gap-3">
          <Button
            onClick={handleAddSampleProjects}
            variant="secondary"
            disabled={loading}
          >
            <Sparkles className="mr-2" size={20} />
            Load Sample Projects
          </Button>
          <Button
            onClick={() => {
              resetForm();
              setIsFormOpen(true);
            }}
          >
            <Plus className="mr-2" size={20} />
            Add Project
          </Button>
        </div>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setIsFormOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <GlassCard>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">
                  {editingProject ? "Edit Project & Case Study" : "Add New Project"}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Project Title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Analytics Dashboard Pro"
                />

                <Input
                  label="Category (e.g. 2024 — SaaS Platform or AI & Data)"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="2024 — SaaS Platform"
                />

                <Textarea
                  label="Short Description"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="A brief overview of your project..."
                  rows={3}
                />

                <Textarea
                  label="Case Study: Problem Statement & Challenge"
                  value={formData.problemStatement}
                  onChange={(e) =>
                    setFormData({ ...formData, problemStatement: e.target.value })
                  }
                  placeholder="Describe the technical problem or business challenge solved..."
                  rows={3}
                />

                <Input
                  label="Case Study Metrics (format: Value:Label, Value:Label)"
                  value={formData.metricsText}
                  onChange={(e) =>
                    setFormData({ ...formData, metricsText: e.target.value })
                  }
                  placeholder="10k+/sec:Event Rate, < 18ms:Latency, 99/100:Lighthouse"
                />

                <Textarea
                  label="Architecture & Technical Highlights (one bullet point per line)"
                  value={formData.architectureHighlightsText}
                  onChange={(e) =>
                    setFormData({ ...formData, architectureHighlightsText: e.target.value })
                  }
                  placeholder="WebSocket connection pooling with backoff&#10;Virtual windowing with D3&#10;Modular widget architecture"
                  rows={4}
                />

                <Input
                  label="Image URL"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                />

                <Input
                  label="Technologies / Tags (comma-separated)"
                  required
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="React, TypeScript, Tailwind CSS, Python"
                />

                <Input
                  label="Live URL"
                  value={formData.liveUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, liveUrl: e.target.value })
                  }
                  placeholder="https://example.com"
                />

                <Input
                  label="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  placeholder="https://github.com/username/repo"
                />

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-5 h-5 rounded bg-slate-800/50 border border-slate-700/50"
                  />
                  <span className="text-gray-300">Featured Project</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading
                      ? "Saving..."
                      : editingProject
                        ? "Update Project"
                        : "Add Project"}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project, index) => (
          <GlassCard
            key={project.id}
            className="flex items-center justify-between"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-lg font-bold text-[hsl(var(--primary))] mr-4">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {project.description}
              </p>
              <div className="flex gap-2 mt-2">
                {(project.technologies || []).slice(0, 4).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded bg-slate-800/50 border border-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1 mr-3">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Up"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === projects.length - 1}
                className="p-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move Down"
              >
                <ChevronDown size={16} />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-white/10 transition-colors"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:bg-red-500/20 transition-colors text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </GlassCard>
        ))}

        {projects.length === 0 && (
          <GlassCard className="text-center py-12">
            <p className="text-gray-400">
              No projects yet. Click "Add Project" to get started!
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
