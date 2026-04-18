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
import { useExperience, type ExperienceItem } from "../../hooks/useExperience";
import Button from "../admin-ui/Button";
import Input from "../admin-ui/Input";
import Textarea from "../admin-ui/Textarea";
import GlassCard from "../admin-ui/GlassCard";

export default function ExperienceManager() {
  const { items } = useExperience();
  const [newItem, setNewItem] = useState({
    role: "",
    company: "",
    year: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<ExperienceItem>>({});

  const handleAdd = async () => {
    if (
      !db ||
      !newItem.role.trim() ||
      !newItem.company.trim() ||
      !newItem.year.trim()
    ) {
      alert("Please fill in role, company, and year.");
      return;
    }

    try {
      await addDoc(collection(db, "experience"), {
        role: newItem.role,
        company: newItem.company,
        year: newItem.year,
        description: newItem.description,
        order: items.length,
      });
      setNewItem({
        role: "",
        company: "",
        year: "",
        description: "",
      });
      alert("Experience item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (!window.confirm("Are you sure you want to delete this experience item?"))
      return;

    try {
      await deleteDoc(doc(db, "experience", id));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  const handleEdit = (item: ExperienceItem) => {
    setEditingId(item.id);
    setEditData({
      role: item.role,
      company: item.company,
      year: item.year,
      description: item.description,
    });
  };

  const handleSaveEdit = async () => {
    if (!db || !editingId) return;

    try {
      await updateDoc(doc(db, "experience", editingId), editData);
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
        <h2 className="text-2xl font-bold">Manage Work Experience</h2>
      </div>

      {/* Add New Item */}
      <div className="mb-8 p-4 border border-glass-border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Experience Entry</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Job Title / Role (e.g., ML Engineer)"
            value={newItem.role}
            onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
          />
          <Input
            placeholder="Company Name"
            value={newItem.company}
            onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
          />
        </div>
        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <Input
            placeholder="Date Range (e.g., Dec 2025 - Present)"
            value={newItem.year}
            onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
          />
        </div>
        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <Textarea
            placeholder="Description of your responsibilities and achievements"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
        </div>
        <Button onClick={handleAdd} className="w-full">
          <Plus className="mr-2" size={18} />
          Add Experience Entry
        </Button>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Experience Entries</h3>
        {items.length === 0 ? (
          <p className="text-gray-400">No experience entries added yet.</p>
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
                        value={editData.role || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, role: e.target.value })
                        }
                        placeholder="Job Title"
                      />
                      <Input
                        value={editData.company || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, company: e.target.value })
                        }
                        placeholder="Company"
                      />
                      <Input
                        value={editData.year || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, year: e.target.value })
                        }
                        placeholder="Year"
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
                      <p className="font-semibold">{item.role}</p>
                      <p className="text-sm text-[hsl(var(--primary))]">{item.company}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.year}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {item.description}
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
