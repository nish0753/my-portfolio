import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Loader, Eye, ShieldAlert } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { isAuthorizedAdmin } from "../lib/auth";
import { useProjects } from "../hooks/useProjects";
import { useResume } from "../hooks/useResume";
import { useVisitors } from "../hooks/useVisitors";
import ProjectForm from "../components/admin/ProjectForm";
import ResumeUpload from "../components/admin/ResumeUpload";
import ProfileSettings from "../components/admin/ProfileSettings";
import SkillsManager from "../components/admin/SkillsManager";
import BentoGridManager from "../components/admin/BentoGridManager";
import EducationManager from "../components/admin/EducationManager";
import Button from "../components/ui/Button";
import GlassCard from "../components/ui/GlassCard";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const { projects, loading: projectsLoading } = useProjects();
  const { resume, loading: resumeLoading } = useResume();
  const { stats: visitorStats } = useVisitors();
  const navigate = useNavigate();

  useEffect(() => {
    // Only require authentication if Firebase is configured
    if (auth && !authLoading && !user) {
      navigate("/login");
    }

    // Check if logged-in user is authorized
    if (auth && !authLoading && user && !isAuthorizedAdmin(user.email)) {
      // Sign them out and redirect
      signOut(auth).then(() => {
        navigate("/login");
      });
    }
  }, [user, authLoading, navigate]);

  const handleSignOut = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (authLoading || projectsLoading || resumeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  // Only block access if Firebase is configured and user is not logged in
  if (auth && !user) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-12 h-12 rounded-full border-2 border-glass-border"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                  <p className="text-gray-400 text-sm">
                    {user?.email || "Demo Mode"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate("/")} variant="secondary">
                  View Site
                </Button>
                {auth && user && (
                  <Button onClick={handleSignOut} variant="ghost">
                    <LogOut className="mr-2" size={20} />
                    Sign Out
                  </Button>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <GlassCard>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">{projects.length}</p>
              <p className="text-gray-400">Total Projects</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">
                {projects.filter((p) => p.featured).length}
              </p>
              <p className="text-gray-400">Featured</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">
                {projects.filter((p) => p.liveUrl).length}
              </p>
              <p className="text-gray-400">Live Projects</p>
            </div>
          </GlassCard>
          <GlassCard>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Eye className="text-gradient-accent mr-2" size={28} />
                <p className="text-4xl font-bold">
                  {visitorStats.totalVisitors}
                </p>
              </div>
              <p className="text-gray-400">Portfolio Visitors</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          <ProfileSettings />
        </motion.div>

        {/* Resume Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ResumeUpload currentResumeUrl={resume?.url || undefined} />
        </motion.div>

        {/* BentoGrid Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.23 }}
          className="mb-8"
        >
          <BentoGridManager />
        </motion.div>

        {/* Education Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <EducationManager />
        </motion.div>

        {/* Skills Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.27 }}
          className="mb-8"
        >
          <SkillsManager />
        </motion.div>

        {/* Project Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.29 }}
        >
          <ProjectForm projects={projects} />
        </motion.div>
      </div>
    </div>
  );
}
