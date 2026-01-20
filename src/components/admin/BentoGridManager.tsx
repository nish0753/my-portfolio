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
  "Palette",
  "Zap",
  "Globe",
  "Layers",
  "Sparkles",
  "Star",
  "Rocket",
  "Lightbulb",
];

const CATEGORY_OPTIONS = ["main", "skill", "stat"];

export default function BentoGridManager() {
  const { items } = useBentoGrid();
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    icon: "Code2",
    category: "skill",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<BentoItem>>({});

  const loadSampleData = async () => {
    if (!db) return;
    if (!confirm("This will add default items to Firebase. Continue?")) return;

    const defaultItems = [
      {
        title: "Full-Stack Development",
        description:
          "I specialize in building complete web applications from concept to deployment. From responsive frontends with React and TypeScript to robust backends with Node.js and cloud services, I deliver end-to-end solutions that scale.",
        icon: "Code2",
        category: "main",
        order: 0,
      },
      {
        title: "UI/UX Design",
        description: "Creating beautiful interfaces",
        icon: "Palette",
        category: "skill",
        order: 1,
      },
      {
        title: "Performance",
        description: "Optimizing for speed",
        icon: "Zap",
        category: "skill",
        order: 2,
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
      await addDoc(collection(db, "bentoGrid"), {
        title: newItem.title,
        description: newItem.description,
        icon: newItem.icon,
        category: newItem.category,
        order: items.length,
      });
      setNewItem({
        title: "",
        description: "",
        icon: "Code2",
        category: "skill",
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
