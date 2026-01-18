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
import { useEducation, type EducationItem } from "../../hooks/useEducation";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import GlassCard from "../ui/GlassCard";

const ICON_OPTIONS = [
  "GraduationCap",
  "BookOpen",
  "Award",
  "Briefcase",
  "Star",
  "Zap",
];

export default function EducationManager() {
  const { items } = useEducation();
  const [newItem, setNewItem] = useState({
    degree: "",
    school: "",
    field: "",
    year: "",
    description: "",
    icon: "GraduationCap",
    certificateUrl: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<EducationItem>>({});

  const handleAdd = async () => {
    if (
      !db ||
      !newItem.degree.trim() ||
      !newItem.school.trim() ||
      !newItem.field.trim() ||
      !newItem.year.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "education"), {
        degree: newItem.degree,
        school: newItem.school,
        field: newItem.field,
        year: newItem.year,
        description: newItem.description,
        icon: newItem.icon,
        certificateUrl: newItem.certificateUrl || "",
        order: items.length,
      });
      setNewItem({
        degree: "",
        school: "",
        field: "",
        year: "",
        description: "",
        icon: "GraduationCap",
        certificateUrl: "",
      });
      alert("Education item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item");
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (!window.confirm("Are you sure you want to delete this education item?"))
      return;

    try {
      await deleteDoc(doc(db, "education", id));
      alert("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  const handleEdit = (item: EducationItem) => {
    setEditingId(item.id);
    setEditData({
      degree: item.degree,
      school: item.school,
      field: item.field,
      year: item.year,
      description: item.description,
      icon: item.icon,
    });
  };

  const handleSaveEdit = async () => {
    if (!db || !editingId) return;

    try {
      await updateDoc(doc(db, "education", editingId), editData);
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
      <h2 className="text-2xl font-bold mb-6">Manage Education Section</h2>

      {/* Add New Item */}
      <div className="mb-8 p-4 border border-glass-border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Education Entry</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Degree (e.g., Bachelor of Science)"
            value={newItem.degree}
            onChange={(e) => setNewItem({ ...newItem, degree: e.target.value })}
          />
          <Input
            placeholder="School/Institution Name"
            value={newItem.school}
            onChange={(e) => setNewItem({ ...newItem, school: e.target.value })}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Field of Study"
            value={newItem.field}
            onChange={(e) => setNewItem({ ...newItem, field: e.target.value })}
          />
          <Input
            placeholder="Year (e.g., 2018 - 2022)"
            value={newItem.year}
            onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
          />
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
        <div className="grid md:grid-cols-1 gap-4 mb-4">
          <Input
            placeholder="Certificate URL (optional) - Link to view the certificate"
            value={newItem.certificateUrl}
            onChange={(e) =>
              setNewItem({ ...newItem, certificateUrl: e.target.value })
            }
          />
        </div>
        <Button onClick={handleAdd} className="w-full">
          <Plus className="mr-2" size={18} />
          Add Education Entry
        </Button>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Education Entries</h3>
        {items.length === 0 ? (
          <p className="text-gray-400">No education entries added yet.</p>
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
                        value={editData.degree || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, degree: e.target.value })
                        }
                        placeholder="Degree"
                      />
                      <Input
                        value={editData.school || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, school: e.target.value })
                        }
                        placeholder="School"
                      />
                      <Input
                        value={editData.field || ""}
                        onChange={(e) =>
                          setEditData({ ...editData, field: e.target.value })
                        }
                        placeholder="Field"
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
                      <Input
                        value={editData.certificateUrl || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            certificateUrl: e.target.value,
                          })
                        }
                        placeholder="Certificate URL (optional)"
                      />
                      <select
                        value={editData.icon || "GraduationCap"}
                        onChange={(e) =>
                          setEditData({ ...editData, icon: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm"
                      >
                        {ICON_OPTIONS.map((icon) => (
                          <option key={icon} value={icon}>
                            {icon}
                          </option>
                        ))}
                      </select>
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
                      <p className="font-semibold">{item.degree}</p>
                      <p className="text-sm text-gray-400">{item.school}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.field} • {item.year}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </p>
                      {item.certificateUrl && (
                        <p className="text-xs text-blue-400 mt-1">
                          Certificate:{" "}
                          <a
                            href={item.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-blue-300"
                          >
                            {item.certificateUrl.substring(0, 40)}...
                          </a>
                        </p>
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
