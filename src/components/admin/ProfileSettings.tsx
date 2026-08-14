import { useState, useEffect } from "react";
import { User, Save, Loader, Plus, Trash2 } from "lucide-react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Button from "../admin-ui/Button";
import Input from "../admin-ui/Input";
import Textarea from "../admin-ui/Textarea";
import GlassCard from "../admin-ui/GlassCard";

export interface StatItem {
  value: string;
  label: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  github: string;
  whatsappPhone?: string;
  availableForWork: boolean;
  heroSkills?: string[];
  heroSkillsText?: string;
  heroHeadline?: string;
  portraitUrl?: string;
  aboutHeadline?: string;
  footerTagline?: string;
  groqApiKey?: string;
  stats?: StatItem[];
}

const DEFAULT_STATS: StatItem[] = [
  { value: "6+", label: "years experience" },
  { value: "40+", label: "projects shipped" },
  { value: "15+", label: "happy clients" },
  { value: "∞", label: "cups of coffee" },
];

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
    whatsappPhone: "+918709808019",
    availableForWork: true,
    heroSkills: ["Python", "PyTorch", "Scikit-Learn", "LangChain"],
    heroSkillsText: "Python, PyTorch, Scikit-Learn, LangChain",
    heroHeadline: "Nishant builds calm, dependable software.",
    portraitUrl: "/portrait_character.png",
    aboutHeadline: "A builder across the whole stack.",
    footerTagline: "Building calm, dependable software — open to roles and selective freelance work.",
    groqApiKey: "",
    stats: DEFAULT_STATS,
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
          heroSkillsText: (data.heroSkills || []).join(", "),
          stats: data.stats && data.stats.length > 0 ? data.stats : DEFAULT_STATS,
        });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatChange = (index: number, field: 'value' | 'label', val: string) => {
    const newStats = [...(formData.stats || [])];
    newStats[index] = { ...newStats[index], [field]: val };
    setFormData({ ...formData, stats: newStats });
  };

  const handleAddStat = () => {
    setFormData({
      ...formData,
      stats: [...(formData.stats || []), { value: "0", label: "new stat" }]
    });
  };

  const handleRemoveStat = (index: number) => {
    const newStats = (formData.stats || []).filter((_, i) => i !== index);
    setFormData({ ...formData, stats: newStats });
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
          <h2 className="text-2xl font-bold">Profile & Contact Settings</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Ada Lovelace"
          />

          <Input
            label="Hero Headline"
            required
            value={formData.heroHeadline || ""}
            onChange={(e) =>
              setFormData({ ...formData, heroHeadline: e.target.value })
            }
            placeholder="Nishant builds calm, dependable software."
          />

          <Input
            label="WhatsApp Phone Number (with country code, e.g. +918709808019)"
            value={formData.whatsappPhone || ""}
            onChange={(e) =>
              setFormData({ ...formData, whatsappPhone: e.target.value })
            }
            placeholder="+918709808019"
          />

          <Input
            label="Groq API Key (Optional — for Groq LLM Chatbot)"
            type="password"
            value={formData.groqApiKey || ""}
            onChange={(e) =>
              setFormData({ ...formData, groqApiKey: e.target.value })
            }
            placeholder="gsk_..."
          />

          <Input
            label="Portrait Image URL"
            value={formData.portraitUrl || ""}
            onChange={(e) =>
              setFormData({ ...formData, portraitUrl: e.target.value })
            }
            placeholder="e.g., /hero_illustration.svg or a direct HTTPS image URL"
          />

          <Input
            label="About Section Headline"
            value={formData.aboutHeadline || ""}
            onChange={(e) =>
              setFormData({ ...formData, aboutHeadline: e.target.value })
            }
            placeholder="A builder across the whole stack."
          />

          <Textarea
            label="Footer Tagline"
            value={formData.footerTagline || ""}
            onChange={(e) =>
              setFormData({ ...formData, footerTagline: e.target.value })
            }
            rows={2}
            placeholder="Building calm, dependable software — open to roles and selective freelance work."
          />

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

          <div className="space-y-3 pt-6 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-slate-300">
                Hero Statistics Grid (Editable Stats)
              </label>
              <Button
                type="button"
                onClick={handleAddStat}
                className="text-xs py-1 px-3"
              >
                <Plus size={14} className="mr-1" /> Add Stat
              </Button>
            </div>
            <p className="text-xs text-slate-400">
              Customize the numbers/symbols and labels displayed in the Hero section stats grid on the homepage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(formData.stats || []).map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg">
                  <div className="w-1/3">
                    <Input
                      placeholder="Value (e.g. 6+)"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                    />
                  </div>
                  <div className="w-2/3">
                    <Input
                      placeholder="Label (e.g. YEARS EXPERIENCE)"
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveStat(idx)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded transition-colors"
                    title="Remove stat"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

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
                  Save Profile Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </GlassCard>
  );
}
