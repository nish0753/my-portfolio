import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import EditorGuide from "./pages/EditorGuide";
import { isDemoFirebase } from "./lib/firebase";

function App() {
  // Initialize theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
        {isDemoFirebase && (
          <div className="bg-amber-500/90 text-black text-sm px-4 py-2 text-center font-semibold">
            Warning: Firebase env vars are missing in this build. Data edits may
            not persist for other users.
          </div>
        )}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guide" element={<EditorGuide />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
