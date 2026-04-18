import { useState, useEffect } from "react";
import { User, Save, Loader } from "lucide-react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Button from "../admin-ui/Button";
import Input from "../admin-ui/Input";
import Textarea from "../admin-ui/Textarea";
import GlassCard from "../admin-ui/GlassCard";

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  availableForWork: boolean;
  heroSkills?: string[];
  heroSkillsText?: string;
}

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: "Your Name",
    title: "Creative Developer & Designer",
    bio: "I craft digital experiences that blend elegant design with powerful technology. Specializing in React, TypeScript, and modern web architecture.",
    email: "hello@example.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    availableForWork: true,
    heroSkills: ["Python", "PyTorch", "Scikit-Learn", "LangChain"],
    heroSkillsText: "Python, PyTorch, Scikit-Learn, LangChain",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    if (!db) return;
    setLoading(true);
    try {
      const docRef = doc(db, "settings", "profile");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as ProfileData;
        setFormData({
          ...data,
          heroSkillsText: (data.heroSkills || []).join(", ")
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      alert(
        "Firebase is not configured. Please set up your Firebase credentials.",
      );
      return;
    }

    setSaving(true);
    try {
      const finalData = { ...formData };
      if (finalData.heroSkillsText !== undefined) {
        finalData.heroSkills = finalData.heroSkillsText.split(",").map(s => s.trim()).filter(Boolean);
        delete finalData.heroSkillsText;
      }
      
      await setDoc(doc(db, "settings", "profile"), {
        ...finalData,
        updatedAt: new Date().toISOString(),
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <GlassCard>
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin" size={48} />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <User className="text-purple-400" size={28} />
          <h2 className="text-2xl font-bold">Profile Settings</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title / Role"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Creative Developer & Designer"
          />

          <Textarea
            label="About Me / Bio"
            required
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
          />
          
          <Input
            label="Top Skills (comma separated, e.g., Python, Git, React)"
            value={formData.heroSkillsText !== undefined ? formData.heroSkillsText : (formData.heroSkills || []).join(", ")}
            onChange={(e) =>
              setFormData({ 
                ...formData, 
                heroSkillsText: e.target.value
              })
            }
            placeholder="Python, PyTorch, React, Node.js"
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="hello@example.com"
          />

          <Input
            label="LinkedIn URL"
            value={formData.linkedin}
            onChange={(e) =>
              setFormData({ ...formData, linkedin: e.target.value })
            }
            placeholder="https://linkedin.com/in/yourprofile"
          />

          <Input
            label="GitHub URL"
            value={formData.github}
            onChange={(e) =>
              setFormData({ ...formData, github: e.target.value })
            }
            placeholder="https://github.com/yourusername"
          />

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.availableForWork}
              onChange={(e) =>
                setFormData({ ...formData, availableForWork: e.target.checked })
              }
              className="w-5 h-5 rounded bg-slate-800/50 border border-slate-700/50"
            />
            <span className="text-gray-300">
              Available for work (shows badge on homepage)
            </span>
          </label>

          <div className="pt-4">
            <Button type="submit" disabled={saving} className="w-full">
              {saving ? (
                <>
                  <Loader className="animate-spin mr-2" size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2" size={20} />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </GlassCard>
  );
}
