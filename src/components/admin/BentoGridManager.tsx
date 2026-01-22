import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useBentoGrid, type BentoItem } from "../../hooks/useBentoGrid";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import GlassCard from "../ui/GlassCard";

const ICON_OPTIONS = [
  "Code2",
  "Sparkles",
  "Zap",
  "Globe",
  "Layers",
  "Rocket",
  "Star",
  "Lightbulb",
  "Brain",
  "Database",
  "BarChart",
  "Bot",
];

const CATEGORY_OPTIONS = ["main", "skill", "stat"];

export default function BentoGridManager() {
  const { items } = useBentoGrid();
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    icon: "Code2",
    category: "skill",
    technologies: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<BentoItem>>({});

  const loadSampleData = async () => {
    if (!db) return;
    if (!confirm("This will add default items to Firebase. Continue?")) return;

    const defaultItems = [
      {
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
        title: "Data Engineering (Foundational)",
        description:
          "I design basic ETL pipelines and data workflows to support analytics and machine learning systems.",
        icon: "Layers",
        category: "skill",
        order: 4,
        technologies: ["ETL", "Data Pipelines", "SQL", "Data Modeling"],
      },
    ];

    try {
      for (const item of defaultItems) {
        await addDoc(collection(db, "bentoGrid"), item);
      }
      alert("Sample data loaded successfully!");
    } catch (error) {
      console.error("Error loading sample data:", error);
      alert("Error loading sample data");
    }
  };

  const handleAdd = async () => {
    if (!db || !newItem.title.trim() || !newItem.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const techArray = newItem.technologies
        ? newItem.technologies
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      await addDoc(collection(db, "bentoGrid"), {
        title: newItem.title,
        description: newItem.description,
        icon: newItem.icon,
        category: newItem.category,
        order: items.length,
        technologies: techArray,
      });
      setNewItem({
        title: "",
        description: "",
        icon: "Code2",
        category: "skill",
        technologies: "",
      });
      alert("Bento item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteDoc(doc(db, "bentoGrid", id));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  const handleEdit = (item: BentoItem) => {
    setEditingId(item.id);
    setEditData({
      title: item.title,
      description: item.description,
      icon: item.icon,
      category: item.category,
      technologies: item.technologies || [],
    });
  };

  const handleSaveEdit = async () => {
    if (!db || !editingId) return;

    try {
      await updateDoc(doc(db, "bentoGrid", editingId), editData);
      setEditingId(null);
      setEditData({});
      alert("Item updated successfully!");
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item");
    }
  };

  return (
    <GlassCard>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage "What I Do" Section</h2>
        <Button onClick={loadSampleData} variant="secondary">
          Load Sample Data
        </Button>
      </div>

      {/* Add New Item */}
      <div className="mb-8 p-4 border border-glass-border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value as any })
            }
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
          <select
            value={newItem.icon}
            onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <Input
            placeholder="Skills (comma-separated, e.g. Python, SQL, Pandas)"
            value={newItem.technologies}
            onChange={(e) =>
              setNewItem({ ...newItem, technologies: e.target.value })
            }
          />
          <p className="text-xs text-gray-400 mt-1">
            Skills shown as tags below the description
          </p>
        </div>
        <Button onClick={handleAdd} className="w-full">
          <Plus className="mr-2" size={18} />
          Add Item
        </Button>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Items</h3>
        {items.length === 0 ? (
          <p className="text-gray-400">No items added yet.</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-glass-border"
              >
                {editingId === item.id ? (
                  <>
                    <div className="flex-1 space-y-2">
                      <Input
                        value={editData.title || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        placeholder="Title"
                      />
                      <Textarea
                        value={editData.description || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        placeholder="Description"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={editData.category || "skill"}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              category: e.target.value as any,
                            })
                          }
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        >
                          {CATEGORY_OPTIONS.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                        <select
                          value={editData.icon || "Code2"}
                          onChange={(e) =>
                            setEditData({ ...editData, icon: e.target.value })
                          }
                          className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                        >
                          {ICON_OPTIONS.map((icon) => (
                            <option key={icon} value={icon}>
                              {icon}
                            </option>
                          ))}
                        </select>
                      </div>
                      <Input
                        value={(editData.technologies || []).join(", ")}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="Skills (comma-separated, e.g. Python, SQL, Pandas)"
                        className="mt-2"
                      />
                    </div>
                    <Button onClick={handleSaveEdit} size="sm">
                      <Save size={16} />
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null);
                        setEditData({});
                      }}
                      variant="ghost"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Category: {item.category} | Icon: {item.icon}
                      </p>
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => handleEdit(item)}
                      variant="ghost"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
