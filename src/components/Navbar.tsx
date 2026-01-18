import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "#about" },
  { name: "Projects", path: "#projects" },
  { name: "Contact", path: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (path: string) => {
    if (path.startsWith("#")) {
      const element = document.querySelector(path);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="glass-effect rounded-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold">
              <span className="text-gradient">Portfolio</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => {
                    if (item.path.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.path);
                    }
                  }}
                  className="relative text-gray-300 font-medium group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-500 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-medium group"
              >
                <span className="text-gradient group-hover:opacity-100">
                  Admin
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass-effect hover:bg-white/10 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-glass-border"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => {
                      if (item.path.startsWith("#")) {
                        e.preventDefault();
                        handleNavClick(item.path);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="px-3 py-2 text-gray-300 font-medium rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    {item.name}
                  </a>
                ))}
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-gray-300 font-medium rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                  Admin
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
