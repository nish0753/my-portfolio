import React from 'react';
import { CheckCircle, Clock, Heart, Lightbulb } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step = ({ icon, title, description }: StepProps) => (
  <div className="relative flex gap-4 items-start group">
    <div className="w-12 h-12 rounded-lg bg-slate-800/50 border border-slate-700/50 flex items-center justify-center text-blue-400 flex-shrink-0 z-10 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
      {icon}
    </div>
    <div className="flex-grow">
      <h3 className="font-display font-semibold text-lg sm:text-xl mb-2 text-slate-50 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{description}</p>
    </div>
  </div>
);

const WorkWithMe = () => {
  const steps = [
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Engineer first, empath second",
      description: "I combine technical expertise with a deep understanding of your business needs and user experience."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Your product becomes my world",
      description: "I immerse myself in your vision, treating your project with the same care and attention as my own."
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Post-launch care included",
      description: "Our relationship doesn't end at deployment. I provide ongoing support to ensure long-term success."
    }
  ];

  return (
    <section id="work-with-me" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">Why Work With Me</h2>
          <p className="section-subtitle">
            From a tiny seed of an idea to a blooming product, I'll be with you every step of the way.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-800 hidden md:block"></div>
          
          <div className="space-y-12 md:space-y-16 relative">
            {steps.map((step, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
                <Step {...step} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 md:mt-16 md:ml-12">
            <div className="professional-card p-6 sm:p-8 relative">
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed italic">
                "I don't just build what you ask for; I help you discover what you truly need. Together, we'll craft a solution that surpasses expectations and stands the test of time."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkWithMe;
