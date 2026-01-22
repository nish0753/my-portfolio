import { motion } from "framer-motion";
import { Download, Github, ArrowDown } from "lucide-react";
import Button from "./ui/Button";
import { useResume } from "../hooks/useResume";
import { useProfile } from "../hooks/useProfile";

export default function Hero() {
  const { resume } = useResume();
  const { profile } = useProfile();

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleResumeDownload = () => {
    if (resume?.url) {
      window.open(resume.url, "_blank");
    }
  };

  return (
    <div className="pb-20 pt-36 relative">
      {/* Grid background */}
      <div className="h-screen w-full dark:bg-black bg-black dark:bg-grid-white/[0.03] bg-grid-white/[0.03] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          {/* Available for work badge */}
          {profile.availableForWork && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Available for work</span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          >
            <span className="block text-white">Hi, I'm </span>
            <span className="block bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 font-light"
          >
            {profile.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-gray-500 mb-12 max-w-2xl mx-auto text-center"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Main buttons row */}
            <div className="flex gap-4 justify-center flex-wrap items-center">
              {resume?.url && (
                <Button
                  size="lg"
                  onClick={handleResumeDownload}
                  variant="secondary"
                  className="group"
                >
                  <Download className="inline-block mr-2" size={18} />
                  View Resume
                </Button>
              )}
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 font-bold"
              >
                Show My Work
                <ArrowDown className="inline-block ml-2" size={18} />
              </Button>
              {profile.github && (
                <Button
                  size="lg"
                  onClick={() => window.open(profile.github, "_blank")}
                  variant="secondary"
                  className="group"
                >
                  <Github className="inline-block mr-2" size={20} />
                  GitHub
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mouse scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1 h-2 bg-gray-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
