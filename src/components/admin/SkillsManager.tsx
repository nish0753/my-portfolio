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
import { useSkills, type Skill } from "../../hooks/useSkills";
import Button from "../ui/Button";
import Input from "../ui/Input";
import GlassCard from "../ui/GlassCard";

export default function SkillsManager() {
  const { skills } = useSkills();
  const [newSkill, setNewSkill] = useState({ name: "", category: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Skill>>({});

  const handleAdd = async () => {
    if (!db || !newSkill.name.trim() || !newSkill.category.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "skills"), {
        name: newSkill.name,
        category: newSkill.category,
        order: skills.length,
      });
      setNewSkill({ name: "", category: "" });
      alert("Skill added successfully!");
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Error adding skill");
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) return;
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      await deleteDoc(doc(db, "skills", id));
      alert("Skill deleted successfully!");
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Error deleting skill");
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setEditData({ name: skill.name, category: skill.category });
  };

  const handleSaveEdit = async () => {
    if (!db || !editingId) return;

    try {
      await updateDoc(doc(db, "skills", editingId), editData);
      setEditingId(null);
      setEditData({});
      alert("Skill updated successfully!");
    } catch (error) {
      console.error("Error updating skill:", error);
      alert("Error updating skill");
    }
  };

  return (
    <GlassCard>
      <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>

      {/* Add New Skill */}
      <div className="mb-8 p-4 border border-glass-border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Add New Skill</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Input
            placeholder="Skill name (e.g., React)"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          />
          <Input
            placeholder="Category (e.g., Frontend)"
            value={newSkill.category}
            onChange={(e) =>
              setNewSkill({ ...newSkill, category: e.target.value })
            }
          />
        </div>
        <Button onClick={handleAdd} className="w-full">
          <Plus className="mr-2" size={18} />
          Add Skill
        </Button>
      </div>

      {/* Skills List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Current Skills</h3>
        {skills.length === 0 ? (
          <p className="text-gray-400">No skills added yet.</p>
        ) : (
          <div className="space-y-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-glass-border"
              >
                {editingId === skill.id ? (
                  <>
                    <Input
                      value={editData.name || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="flex-1"
                    />
                    <Input
                      value={editData.category || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="flex-1"
                    />
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
                      <p className="font-semibold">{skill.name}</p>
                      <p className="text-sm text-gray-400">{skill.category}</p>
                    </div>
                    <Button
                      onClick={() => handleEdit(skill)}
                      variant="ghost"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(skill.id)}
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
