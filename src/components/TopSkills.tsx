import React from 'react';
import { Database, Server, Code2, Globe, Coffee, Layers } from 'lucide-react';
import { Card } from "@/components/ui/card";

const TopSkills = () => {
  const dsStack = [
    {
      name: "Python",
      icon: <Code2 className="w-8 h-8" />,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      name: "Pandas",
      icon: <Database className="w-8 h-8" />,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      name: "Scikit-learn",
      icon: <Layers className="w-8 h-8" />,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      name: "SQL",
      icon: <Server className="w-8 h-8" />,
      color: "text-slate-300",
      bgColor: "bg-slate-800/50",
      borderColor: "border-slate-700/50"
    }
  ];

  const aiStack = [
    {
      name: "GenAI & LLMs",
      icon: <Globe className="w-8 h-8" />,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      name: "FastAPI / Flask",
      icon: <Globe className="w-8 h-8" />,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    }
  ];

  const additionalSkills = [
    "RAG", "Prompt Engineering", "LangChain", "Vector Databases", 
    "PyTorch", "NumPy", "Matplotlib", "Seaborn", "Feature Engineering",
    "Model Evaluation", "Docker", "Firebase", "Git & GitHub", "Streamlit"
  ];

  return (
    <section id="top-skills" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Specializing in Data Science, Machine Learning, and Generative AI
          </p>
        </div>

        {/* DS Stack */}
        <div className="mb-12">
          <div className="professional-card p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-slate-50 mb-2">
                Data Science & ML Core
              </h3>
              <p className="text-sm sm:text-base text-slate-400">
                End-to-end analytical solutions and predictive modeling
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {dsStack.map((tech, index) => (
                <Card 
                  key={index}
                  className={`${tech.bgColor} ${tech.borderColor} border p-6 hover:scale-105 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                      {tech.icon}
                    </div>
                    <h4 className="font-medium text-sm sm:text-base text-slate-50 text-center">
                      {tech.name}
                    </h4>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* AI Stack */}
        <div className="mb-12">
          <div className="professional-card p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-display font-semibold text-slate-50 mb-2">
                AI & Model Deployment
              </h3>
              <p className="text-sm sm:text-base text-slate-400">
                Building and scaling LLM-powered applications
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {aiStack.map((tech, index) => (
                <Card 
                  key={index}
                  className={`${tech.bgColor} ${tech.borderColor} border p-6 hover:scale-105 transition-all duration-300 group cursor-pointer`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                      {tech.icon}
                    </div>
                    <h4 className="font-medium text-sm sm:text-base text-slate-50 text-center">
                      {tech.name}
                    </h4>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Skills */}
        <div className="professional-card p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-display font-semibold text-slate-50 mb-6 text-center">
            Technical Arsenal
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {additionalSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm font-medium hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSkills;
