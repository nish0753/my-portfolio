import React from 'react';
import { Leaf, Database, Code2, Server, Award, Package } from 'lucide-react';

interface TechItemProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

const TechItem = ({ icon, title, items }: TechItemProps) => (
  <div className="magic-card p-6 h-full hover:scale-[1.02] transition-all duration-300 group">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-magic-deepPurple flex items-center justify-center text-magic-teal group-hover:text-magic-starlight transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-xl text-magic-twilight group-hover:text-magic-starlight transition-colors">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-magic-teal group-hover:bg-magic-spark transition-colors"></span>
          <span className="text-magic-twilight">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TechStack = () => {
  const techCategories = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Core Skills",
      items: ["Python", "SQL", "Pandas", "NumPy", "Data Cleaning & EDA"]
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "ML & AI",
      items: ["Machine Learning", "Scikit-learn", "Generative AI (LLMs)", "RAG", "Prompt Engineering"]
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Backend",
      items: ["FastAPI", "Flask", "Firebase", "REST APIs"]
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "ML Engineering",
      items: ["Feature Engineering", "Model Evaluation", "Model Serving", "Performance Optimization"]
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Tools & DevOps",
      items: ["Git & GitHub", "Docker", "Jupyter Notebook", "Streamlit"]
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Methodologies",
      items: ["Problem Solving", "Predictive Modeling", "Vector Databases", "LangChain"]
    }
  ];

  return (
    <section id="tech-stack" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-magic-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-magic-violet/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 cosmic-glow">Tech Stack & Values</h2>
          <p className="text-magic-twilight max-w-2xl mx-auto">
            A forest of tools and technologies that I've mastered to craft solutions.
          </p>
          <div className="w-24 h-1 bg-magic-violet mx-auto rounded-full mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => (
            <TechItem key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
