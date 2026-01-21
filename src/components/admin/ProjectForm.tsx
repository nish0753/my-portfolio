import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, X, Sparkles } from "lucide-react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import type { Project } from "../ProjectCard";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import GlassCard from "../ui/GlassCard";

const SAMPLE_PROJECTS = [
  {
    title: "Customer Churn Prediction Model",
    description:
      "Machine learning model to predict customer churn using Random Forest and XGBoost algorithms. Achieved 92% accuracy with feature engineering and hyperparameter tuning. Includes interactive dashboard for model insights.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Matplotlib",
      "Streamlit",
    ],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/churn-prediction",
    featured: true,
  },
  {
    title: "COVID-19 Data Analysis Dashboard",
    description:
      "Interactive dashboard analyzing global COVID-19 trends with real-time data visualization. Features time-series analysis, predictive modeling, and geographical heatmaps for infection rates and vaccination progress.",
    imageUrl:
      "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&h=600&fit=crop",
    technologies: ["Python", "Plotly", "Dash", "NumPy", "SQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/covid-dashboard",
    featured: true,
  },
  {
    title: "NLP Sentiment Analysis System",
    description:
      "Natural Language Processing system for sentiment analysis of product reviews and social media posts. Uses BERT transformers and achieves 89% accuracy on multi-class classification tasks.",
    imageUrl:
      "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&h=600&fit=crop",
    technologies: ["Python", "PyTorch", "Transformers", "NLTK", "Flask"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/sentiment-analysis",
    featured: false,
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
    imageUrl: "",
    technologies: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
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
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(",").map((t) => t.trim()),
        updatedAt: new Date().toISOString(),
      };

      if (editingProject) {
        // Update existing project
        await updateDoc(doc(db, "projects", editingProject.id), projectData);
      } else {
        // Add new project
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: new Date().toISOString(),
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
      imageUrl: project.imageUrl || "",
      technologies: project.technologies.join(", "),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured || false,
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
      imageUrl: "",
      technologies: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
    });
    setEditingProject(null);
  };

  const handleAddSampleProjects = async () => {
    if (!db) {
      alert(
        "Firebase is not configured. Please set up your Firebase credentials.",
      );
      return;
    }

    if (!confirm("This will add 3 sample projects. Continue?")) return;

    setLoading(true);
    try {
      for (const project of SAMPLE_PROJECTS) {
        await addDoc(collection(db, "projects"), {
          ...project,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
      alert(
        "Sample projects added successfully! You can now edit or delete them.",
      );
    } catch (error) {
      console.error("Error adding sample projects:", error);
      alert("Failed to add sample projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Projects</h2>
        <div className="flex gap-3">
          <Button
            onClick={handleAddSampleProjects}
            variant="secondary"
            disabled={loading}
          >
            <Sparkles className="mr-2" size={20} />
            Load Sample Data
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
                  {editingProject ? "Edit Project" : "Add New Project"}
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
                  placeholder="My Awesome Project"
                />

                <Textarea
                  label="Description"
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="A brief description of your project..."
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
                  label="Technologies (comma-separated)"
                  required
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="React, TypeScript, Tailwind CSS"
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
                    className="w-5 h-5 rounded glass-effect"
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
        {projects.map((project) => (
          <GlassCard
            key={project.id}
            className="flex items-center justify-between"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {project.description}
              </p>
              <div className="flex gap-2 mt-2">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded glass-effect"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="p-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="p-2 rounded-lg glass-effect hover:bg-red-500/20 transition-colors text-red-400"
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
