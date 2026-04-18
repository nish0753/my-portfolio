import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuoteIcon, Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  companyIcon?: string;
  testimonial: string;
  avatarUrl: string;
}

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const getGradientColor = (name: string) => {
  const colors = [
    ['#3B82F6', '#2563EB'],
    ['#10B981', '#059669'],
    ['#8B5CF6', '#7C3AED'],
    ['#F59E0B', '#D97706'],
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

interface TestimonialCardProps extends TestimonialProps {
  rating?: number;
  platform?: string;
}

const TestimonialCard = ({ name, role, company, companyIcon, testimonial, avatarUrl, rating, platform }: TestimonialCardProps) => {
  const initials = getInitials(name);
  const [gradientStart, gradientEnd] = getGradientColor(name);

  return (
    <Card className="professional-card overflow-hidden h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 flex items-center justify-center flex-shrink-0"
            style={{
              background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
            }}
          >
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={name} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement?.classList.add('flex');
                }}
              />
            ) : null}
            <span className="text-lg font-bold text-white tracking-tight">
              {initials}
            </span>
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-display font-semibold text-base text-slate-50 mb-1">{name}</h3>
            <p className="text-sm text-slate-400 mb-1">{role}</p>
            <div className="flex items-center gap-2 mb-2">
              {companyIcon && (
                <img 
                  src={companyIcon} 
                  alt={company} 
                  className="h-5 w-5 object-contain opacity-90"
                />
              )}
              <p className="text-xs text-slate-500">{company}</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 ${i < (rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                />
              ))}
              {platform && (
                <span className="text-xs text-slate-500 ml-1">• {platform}</span>
              )}
            </div>
          </div>
        </div>
        
        <Separator className="bg-slate-800 my-4" />
        
        <div className="relative flex-grow">
          <QuoteIcon className="h-6 w-6 text-slate-800 absolute -top-1 -left-1" />
          <p className="text-sm text-slate-300 leading-relaxed pt-2 pl-3 italic">{testimonial}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Jason Sigal",
      role: "Senior Software Engineer",
      company: "Spotify",
      companyIcon: "/spotify_dp.svg",
      testimonial: "Divyanshu improved the p5.sound library with modern architecture and seamless feature integration. Thoughtful, smart, and driven to make a real difference.",
      avatarUrl: "/testimonial-jason.png",
      rating: 5
    },
    {
      name: "Mayank",
      role: "Co-founder & CTO",
      company: "Propel",
      companyIcon: "/propel_dp.svg",
      testimonial: "Brings architectural clarity, ships on time, and deeply cares.",
      avatarUrl: "/testimonial-mayank.png",
      rating: 5
    },
    {
      name: "Aman Singhla ",
      role: "Founder",
      company: "Cure.link",
      companyIcon: "/cure_link_dp.jpg",
      testimonial: "Backend systems built with precision. Doesn't disappear after delivery — stays to make it better.",
      avatarUrl: "/testimonial-aman.png",
      rating: 5
    },
    {
      name: "Omar Siha",
      role: "Founder",
      company: "Omni-Social",
      companyIcon: "/omni_social_dp.webp",
      testimonial: "Integrated complex social APIs with zero fuss. Fast, clean, and reliable.",
      avatarUrl: "/testimonial-omar.png",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">
            Trusted by founders and engineers to deliver exceptional results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
